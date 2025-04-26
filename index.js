// Fichier : index.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const API_TOKEN = '4eHJWPEvgRU8j7Tb1V3rDgzoxYCophaVDaXVZF8XA6xyTgoshEardbu5qVSUMdHNcn2x9QUqixvqmqZ9qRdsLmQh'; // <-- à remplacer

app.post('/webhook', async (req, res) => {
    const message = req.body.messages?.[0];

    if (message && message.type === 'text') {
        const from = message.from; // Le numéro de la personne
        const text = message.text.body; // Le message envoyé

        console.log(`Message reçu de ${from}: ${text}`);

        // Exemple de réponse
        await sendMessage(from, `Salut ! Tu as dit : "${text}". Bien reçu !`);
    }

    res.sendStatus(200);
});

async function sendMessage(to, message) {
    try {
        await axios.post('https://api.1msg.io/v1/messages', {
            to,
            type: 'text',
            text: { body: message }
        }, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Erreur en envoyant la réponse :', error.response?.data || error.message);
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en ligne sur le port ${PORT}`);
});
