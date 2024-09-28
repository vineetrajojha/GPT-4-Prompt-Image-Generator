document.getElementById('generateBtn').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;
    if (!prompt) {
        alert('Please enter a prompt');
        return;
    }

    const response = await fetch('/generate-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    const generatedImage = document.getElementById('generatedImage');
    generatedImage.src = data.imageUrl;
});
