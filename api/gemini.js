export default async function handler(req, res) {
    // Aceptamos solo peticiones POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido. Usa POST.' });
    }

    const { topic } = req.body;
    if (!topic || typeof topic !== 'string') {
        return res.status(400).json({ error: 'El tema (topic) es requerido.' });
    }

    // Ya NO usamos VITE_ porque esta variable será secreta en el servidor Vercel.
    const apiKey = process.env.SANJOSE_GEMINI_API_KEY || process.env.VITE_SANJOSE_GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Falta la clave de Gemini en el servidor (SANJOSE_GEMINI_API_KEY).' });
    }

    const prompt = `Actúa como un profesor experto en pedagogía. Necesito ideas innovadoras, dinámicas y prácticas para una clase sobre: "${topic}".
Proporciona:
1. Un objetivo de aprendizaje claro.
2. Una actividad de inicio (para captar la atención).
3. Una actividad de desarrollo (práctica o exploratoria).
4. Una actividad de cierre (evaluación o reflexión).
Mantenlo conciso, inspirador y fácil de leer.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json(errorData);
        }

        const data = await response.json();
        // Devolvemos la respuesta al cliente
        return res.status(200).json(data);
    } catch (error) {
        console.error('Gemini Fetch Error:', error);
        return res.status(500).json({ error: 'Ocurrió un error en el servidor al generar ideas.' });
    }
}
