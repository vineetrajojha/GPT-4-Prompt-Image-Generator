// server.mjs
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch'; // Import fetch correctly in ES Modules

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));  // Serve frontend files (HTML, CSS, JS)

app.post('/generate-image', async (req, res) => {
    const prompt = req.body.prompt;

    const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: prompt,
            n: 1,
            size: '1024x1024',
        }),
    });

    const data = await response.json();
    const imageUrl = data.data[0].url;

    res.json({ imageUrl });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
