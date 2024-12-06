const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const firebaseAdmin = require('firebase-admin');
const path = require('path');

const serviceAccount = require('./serviceAccountKey.json');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});

const db = firebaseAdmin.firestore(); 
const app = express();

app.use(bodyParser.json());

let processedInputs = new Set();

app.post('/chat', async (req, res) => {
    const userInput = req.body.input;

    if (!userInput) {
        return res.status(400).json({ error: 'Input text is required' });
    }

    if (processedInputs.has(userInput)) {
        return res.json({ response: "You already asked this question. Please try something else." });
    }
    processedInputs.add(userInput);

    try {
        const response = await axios.post('https://chatbot-api-image-333011856334.asia-southeast2.run.app/generate', { input: userInput });
        const generatedResponse = response.data.response;

        await db.collection('chatHistory').add({
            input: userInput,
            response: generatedResponse
        });

        res.json({ response: generatedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
