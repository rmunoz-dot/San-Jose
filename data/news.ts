import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

// Conditional logger: only outputs in development mode
const isDev = import.meta.env.DEV;
const logger = {
  error: (...args: any[]) => isDev && console.error(...args),
};

export interface NewsItem {
  id: string; // Changed to string for Firestore document ID
  title: string;
  date: string;
  category: string;
  image: string;
  content: string;
}

export const getNews = async (): Promise<NewsItem[]> => {
  try {
    const newsRef = collection(db, 'news');
    // Order by a field if you add a timestamp later, for now we will just get them
    const q = query(newsRef);
    const querySnapshot = await getDocs(q);

    const newsData: NewsItem[] = [];
    querySnapshot.forEach((doc) => {
      newsData.push({ id: doc.id, ...doc.data() } as NewsItem);
    });

    return newsData;
  } catch (error) {
    logger.error("Error in Firestore operation:", error);
    return [];
  }
};

export const addNewsItem = async (item: Omit<NewsItem, 'id'>): Promise<string | null> => {
  try {
    const newsRef = collection(db, 'news');
    const docRef = await addDoc(newsRef, item);
    return docRef.id;
  } catch (error) {
    logger.error("Error in Firestore operation:", error);
    return null;
  }
};

export const deleteNewsItem = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'news', id));
    return true;
  } catch (error) {
    logger.error("Error in Firestore operation:", error);
    return false;
  }
};
