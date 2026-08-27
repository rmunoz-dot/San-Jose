
import React, { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';

interface AdminTourProps {
    run: boolean;
    setRun: (run: boolean) => void;
    type: 'news' | 'documents' | 'convivencia' | 'utp';
}

const AdminTour: React.FC<AdminTourProps> = ({ run, setRun, type }) => {
    const [steps, setSteps] = useState<Step[]>([]);

    useEffect(() => {
        const newsSteps: Step[] = [
            {
                target: '#news-form-title',
                content: 'Aquí debes ingresar el título de la noticia. Sé descriptivo pero conciso.',
                placement: 'bottom',
                disableBeacon: true,
            },
            {
                target: '#news-form-category',
                content: 'Selecciona la categoría que mejor describa la noticia.',
                placement: 'bottom',
            },
            {
                target: '#news-form-editor',
                content: 'Este es el editor de texto. Puedes usar negritas, listas y otros formatos para darle estilo al contenido.',
                placement: 'bottom',
            },
            {
                target: '#news-form-image',
                content: 'Sube una imagen representativa. Se ajustará automáticamente al tamaño adecuado.',
                placement: 'bottom',
            },
            {
                target: '#news-form-submit',
                content: 'Cuando termines, haz clic aquí para publicar la noticia.',
                placement: 'top',
            },
            {
                target: '#news-list',
                content: 'Aquí aparecerán todas las noticias publicadas. Puedes eliminarlas si es necesario.',
                placement: 'top',
            }
        ];

        const documentSteps: Step[] = [
            {
                target: '#doc-form-title',
                content: 'Asigna un nombre claro al documento (ej: "Reglamento Interno 2024").',
                placement: 'bottom',
                disableBeacon: true,
            },
            {
                target: '#doc-form-category',
                content: 'Selecciona la categoría. Si es para UTP, asegúrate de elegir una opción que termine en "(UTP)".',
                placement: 'bottom',
            },
            {
                target: '#doc-form-file',
                content: (
                    <div>
                        Selecciona el archivo PDF. Recuerda que el límite es de 10 MB. 
                        Si es más grande, <a href="https://www.ilovepdf.com/es/comprimir_pdf" target="_blank" rel="noopener noreferrer" className="text-school-blue underline font-bold">usa este enlace para comprimirlo</a>.
                    </div>
                ),
                placement: 'bottom',
            },
            {
                target: '#doc-form-submit',
                content: 'Haz clic aquí para subir el documento al portal.',
                placement: 'top',
            },
            {
                target: '#doc-list',
                content: 'Desde aquí puedes ver, editar el nombre/fecha o eliminar los documentos existentes.',
                placement: 'top',
            }
        ];

        const convivenciaSteps: Step[] = [
            {
                target: '#conv-form-title',
                content: 'Indica el nombre del protocolo o documento. Sé descriptivo.',
                placement: 'bottom',
                disableBeacon: true,
            },
            {
                target: '#conv-title-advice',
                content: '¡Tip! Para que el "Plan de Gestión" principal se destaque solo en la web, asegúrate de incluir exactamente ese nombre en el título.',
                placement: 'bottom',
            },
            {
                target: '#conv-form-category',
                content: 'Clasifica el documento para facilitar su búsqueda.',
                placement: 'bottom',
            },
            {
                target: '#conv-form-file',
                content: (
                    <div>
                        Sube el archivo aquí. Recuerda que si es muy pesado, puedes <a href="https://www.ilovepdf.com/es/comprimir_pdf" target="_blank" rel="noopener noreferrer" className="text-school-blue underline font-bold">comprimirlo aquí</a>.
                    </div>
                ),
                placement: 'bottom',
            },
            {
                target: '#conv-form-submit',
                content: 'Haz clic aquí para finalizar la subida.',
                placement: 'top',
            },
            {
                target: '#conv-list',
                content: 'Aquí podrás ver y gestionar todos los documentos del área de convivencia.',
                placement: 'top',
            }
        ];

        const utpSteps: Step[] = [
            {
                target: '#doc-form-title',
                content: 'Ingresa el nombre del documento (por ejemplo, "Circular de Evaluaciones").',
                placement: 'bottom',
                disableBeacon: true,
            },
            {
                target: '#doc-form-category',
                content: 'Selecciona la categoría correspondiente de UTP, como Planificaciones o Material Docente.',
                placement: 'bottom',
            },
            {
                target: '#doc-form-file',
                content: (
                    <div>
                        Sube aquí tu archivo. Si pesa más de 10MB, <a href="https://www.ilovepdf.com/es/comprimir_pdf" target="_blank" rel="noopener noreferrer" className="text-school-blue underline font-bold">comprímelo aquí</a> primero.
                    </div>
                ),
                placement: 'bottom',
            },
            {
                target: '#doc-form-submit',
                content: 'Haz clic aquí para compartir el documento con la comunidad.',
                placement: 'top',
            },
            {
                target: '#doc-list',
                content: 'Aquí verás todo tu material ordenado. Podrás editarlo, verlo y descargarlo en cualquier momento.',
                placement: 'top',
            }
        ];

        if (type === 'news') setSteps(newsSteps);
        else if (type === 'documents') setSteps(documentSteps);
        else if (type === 'convivencia') setSteps(convivenciaSteps);
        else if (type === 'utp') setSteps(utpSteps);
    }, [type]);

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status, action } = data;
        
        // STATUS.FINISHED = finished all steps
        // STATUS.SKIPPED = user clicked skip
        // action === 'close' = user clicked 'X'
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as any) || action === 'close') {
            setRun(false);
        }
    };

    return (
        <Joyride
            steps={steps}
            run={run}
            continuous
            showProgress
            showSkipButton
            callback={handleJoyrideCallback}
            scrollOffset={100}
            locale={{
                back: 'Anterior',
                close: 'Cerrar',
                last: 'Finalizar',
                next: 'Siguiente',
                skip: 'Saltar Tutorial'
            }}
            styles={{
                options: {
                    primaryColor: '#0c2444', // School Navy
                    zIndex: 1000,
                },
                buttonNext: {
                   backgroundColor: '#d4af37', // School Gold
                   color: '#0c2444',
                   fontWeight: 'bold'
                },
                buttonBack: {
                   color: '#0c2444',
                }
            }}
        />
    );
};

export default AdminTour;
