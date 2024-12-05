const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');
const firebaseAdmin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});

const db = firebaseAdmin.firestore(); 
const app = express();

app.use(bodyParser.json());

let processedInputs = new Set();

app.post('/chat', async (req, res) => {
    console.log("Received body:", req.body);  // Log body request

    const userInput = req.body.input;

    if (!userInput) {
        return res.status(400).json({ error: 'Input text is required' });
    }

    if (processedInputs.has(userInput)) {
        return res.json({ response: "You already asked this question. Please try something else." });
    }
    processedInputs.add(userInput);

    const pythonScriptPath = path.join(__dirname, 'model_inference.py');
    const command = `python ${pythonScriptPath} "${userInput}"`;

    exec(command, async (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).json({ error: 'Failed to process input' });
        }

        let response = stdout.trim();
        if (response.toLowerCase().startsWith(userInput.toLowerCase())) {
            response = response.slice(userInput.length).trim();
        }

        console.log("Response generated:", response); 

        try {
            const chatHistoryRef = db.collection('chatHistory').doc();
            await chatHistoryRef.set({
                input: userInput,
                response: response
            });
            console.log("Input and response saved to Firestore.");
        } catch (err) {
            console.error("Error saving to Firestore:", err);
        }

        console.log("Sending response to Postman:", { response: response });

        res.json({ response: response });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
