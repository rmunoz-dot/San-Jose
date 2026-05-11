import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where } from 'firebase/firestore';

// Conditional logger: only outputs in development mode
const isDev = import.meta.env.DEV;
const logger = {
    log: (...args: any[]) => isDev && console.log(...args),
    error: (...args: any[]) => isDev && console.error(...args),
    warn: (...args: any[]) => isDev && console.warn(...args),
};

export interface DocumentItem {
    id: string;
    title: string;
    category: string;
    date: string;
    fileUrl: string;
    fileName: string;
    thumbnailBase64?: string;
}

import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const generateThumbnail = async (file: File): Promise<string | null> => {
    try {
        logger.log("Comenzando generación de thumbnail pdf para:", file.name);
        const arrayBuffer = await file.arrayBuffer();
        const typedarray = new Uint8Array(arrayBuffer);
        const loadingTask = pdfjsLib.getDocument({ data: typedarray });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 0.6 });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
            logger.error("No se pudo obtener el contexto 2d del canvas.");
            return null;
        }

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvasContext: context, viewport }).promise;

        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        logger.log("¡Thumbnail PDF generado con éxito!");
        return dataUrl;
    } catch (error) {
        logger.warn("No se pudo generar la miniatura del PDF.");
        return null;
    }
};

// ─── Cloudinary upload ────────────────────────────────────────────────────────

const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'sanjose/convivencia');
    // Nota: access_mode NO se puede enviar en uploads unsigned.
    // El acceso público debe configurarse en el preset de Cloudinary.

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
        { method: 'POST', body: formData }
    );

    if (!response.ok) {
        const err = await response.json();
        const message = err.error?.message || JSON.stringify(err);
        logger.error('Cloudinary error (convivencia):', message);
        throw new Error(message);
    }

    const data = await response.json();
    return data.secure_url as string;
};

// ─── Firestore CRUD ───────────────────────────────────────────────────────────

export const getDocuments = async (): Promise<DocumentItem[]> => {
    try {
        const docsRef = collection(db, 'convivencia_documents');
        const querySnapshot = await getDocs(query(docsRef));

        const documentsData: DocumentItem[] = [];
        querySnapshot.forEach((d) => {
            documentsData.push({ id: d.id, ...d.data() } as DocumentItem);
        });

        return documentsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        logger.error("Error fetching documents from Firestore:", error);
        return [];
    }
};

export const addDocument = async (
    item: Omit<DocumentItem, 'id' | 'fileUrl'>,
    file: File
): Promise<string | null> => {
    try {
        // 1. Generar miniatura PRIMERO (antes de que el File sea usado en fetch)
        logger.log("Generando miniatura (convivencia)...");
        let thumbnailBase64: string | null = null;
        if (file.type === 'application/pdf') {
            thumbnailBase64 = await generateThumbnail(file);
            if (thumbnailBase64) {
                logger.log("Miniatura generada con éxito.");
            } else {
                logger.warn("No se pudo generar miniatura, continuando sin ella.");
            }
        }

        // 2. Subir el archivo a Cloudinary
        logger.log("Subiendo archivo a Cloudinary (convivencia)...");
        const fileUrl = await uploadToCloudinary(file);
        logger.log("Archivo subido. URL:", fileUrl);

        // 3. Guardar solo la metadata en Firestore (sin chunks)
        const docData: any = {
            title: item.title,
            category: item.category,
            date: item.date,
            fileName: item.fileName,
            fileUrl,
        };
        if (thumbnailBase64) {
            docData.thumbnailBase64 = thumbnailBase64;
        }

        const docsRef = collection(db, 'convivencia_documents');
        const docRef = await addDoc(docsRef, docData);

        logger.log("Metadata guardada en Firestore. ID:", docRef.id);
        return docRef.id;
    } catch (error: any) {
        logger.error("Error al subir documento de convivencia:", error);
        throw error;
    }
};

export const deleteDocumentItem = async (id: string, fileUrl: string): Promise<boolean> => {
    try {
        await deleteDoc(doc(db, 'convivencia_documents', id));
        logger.log("Documento de convivencia eliminado de Firestore. Archivo en Cloudinary:", fileUrl);
        return true;
    } catch (error) {
        logger.error("Error deleting document from Firestore:", error);
        return false;
    }
};

export const updateDocument = async (id: string, updates: Partial<DocumentItem>): Promise<boolean> => {
    try {
        const docRef = doc(db, 'convivencia_documents', id);
        await updateDoc(docRef, updates as any);
        return true;
    } catch (error) {
        logger.error("Error updating document in Firestore:", error);
        return false;
    }
};

// ─── Helpers de visualización ─────────────────────────────────────────────────

export const getDocumentBlobUrl = async (docId: string): Promise<string | null> => {
    try {
        const docsRef = collection(db, 'convivencia_documents');
        const querySnapshot = await getDocs(query(docsRef));
        let fileUrl: string | null = null;
        querySnapshot.forEach((d) => {
            if (d.id === docId) {
                fileUrl = (d.data() as DocumentItem).fileUrl;
            }
        });
        return fileUrl;
    } catch (e) {
        logger.error("Error obteniendo URL del documento de convivencia", e);
        return null;
    }
};

export const downloadDocumentFile = async (docId: string, fileName: string): Promise<boolean> => {
    try {
        const url = await getDocumentBlobUrl(docId);
        if (!url) return false;

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return true;
    } catch (e) {
        logger.error("Error downloading file", e);
        return false;
    }
};
