const fs = require('fs');
const https = require('https');

try {
    const envContent = fs.readFileSync('.env.local', 'utf-8');
    const match = envContent.match(/VITE_SANJOSE_GEMINI_API_KEY=(.*)/) || envContent.match(/VITE_GEMINI_API_KEY=(.*)/);

    if (!match) {
        console.log("No API Key found in .env.local");
        process.exit(1);
    }

    let apiKey = match[1].replace(/["']/g, '').trim();

    // Si la clave tiene algo extra o comentarios
    apiKey = apiKey.split(' ')[0];

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    https.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                const parsed = JSON.parse(data);
                if (parsed.models) {
                    const names = parsed.models.map(m => m.name).filter(name => name.includes('flash'));
                    console.log('Modelos flash disponibles:');
                    console.log(names.join('\n'));
                } else {
                    console.log('Estructura inesperada:', parsed);
                }
            } catch (e) {
                console.error("Error parseando:", e);
                console.log(data);
            }
        });
    }).on('error', err => {
        console.error("Fetch error:", err);
    });

} catch (err) {
    console.error("Error reading env:", err);
}
