const axios = require('axios');
const fs = require('fs');
require('dotenv').config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function sendToOpenAI(prompt) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'You are an expert assistant specialized in transforming text into well-structured HTML code. Your task is to create clear and accurate HTML with appropriate tags, including places for images, following all provided guidelines. Ensure you use the correct HTML structure, and include alt descriptions for images. Your output should only contain content to be placed between <body> and </body> tags.' },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 1500,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        if (response.data.choices && response.data.choices.length > 0) {
            const htmlContent = response.data.choices[0].message.content.trim();

            if (htmlContent) {
                fs.writeFileSync('artykul.html', htmlContent, 'utf-8');
                console.log('Plik HTML został zapisany!');
            } else {
                console.error('Odpowiedź nie zawiera treści HTML!');
            }
        } else {
            console.error('Brak danych w odpowiedzi z OpenAI.');
        }

    } catch (error) {
        console.error('Błąd z zapytaniem do OpenAI:', error.response ? error.response.data : error.message);
    }
}

function readTextFromFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error('Błąd podczas odczytu pliku:', error);
        return '';
    }
}

// Odczytujemy zawartość pliku 'text.txt'
const textContent = readTextFromFile('text.txt');

const prompt = `
Przekształć poniższy tekst w kod HTML, który zawiera dostosowane od treści tagi i struktury, takie jak <h1>, <h2>, <h3>, <h4>, <p>, oraz <img> z atrybutem src="image_placeholder.jpg" i alt, który dokładnie opisuje obrazek związany z treścią. Dodaj również podpisy pod obrazkami, które będą dobrze komponować się z treścią. Obrazy masz dostosować do treści i umieścić je w adekwatne do treści miejsca. 
Użyj odpowiednich tagów HTML do oddzielenia nagłówków, akapitów i obrazów. Pamiętaj, że treść powinna być czytelna, estetyczna i łatwa do zrozumienia, z obrazkami, które w pełni pasują do tematyki każdego akapitu.

Pamiętaj:
- Usuń znaczniki <html>, <head>, oraz <body>, tak aby wynik zawierał tylko zawartość między <body> i </body>.
- Określenie miejsc na grafikę: użyj tagu <img> z atrybutem src="image_placeholder.jpg" i alt z dokładnym opisem obrazu.
- Dodaj podpisy pod każdą grafiką.
- Struktura HTML powinna zawierać nagłówki, akapity i obrazy, z zachowaniem odpowiednich tagów.

Treść:
${textContent}
`;

sendToOpenAI(prompt);
