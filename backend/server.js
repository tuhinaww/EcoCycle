const express = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Cohere API key
const COHERE_API_KEY = 'your_cohere_api_key';

// Endpoint to handle image upload and classification
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        // Here you would typically process the image (e.g., using a model or API)
        // For simplicity, let's assume we have a function that returns the waste type
        const wasteType = await classifyWaste(req.file.path);

        // Use Cohere API to get recommendations
        const response = await axios.post('https://api.cohere.ai/v1/classify', {
            model: 'large',
            inputs: [wasteType],
            examples: [
                { text: 'E-Waste', label: 'E-Waste' },
                { text: 'Bio', label: 'Bio' },
                { text: 'Recyclable', label: 'Recyclable' },
                { text: 'Non Recyclable', label: 'Non Recyclable' }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${COHERE_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const classification = response.data.classifications[0].prediction;

        // Determine bin color and action based on classification
        const binColor = getBinColor(classification);
        const action = getAction(classification);

        // Send response back to frontend
        res.json({
            wasteType: classification,
            binColor: binColor,
            action: action
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing image');
    }
});

// Function to classify waste (mock implementation)
async function classifyWaste(imagePath) {
    // In a real scenario, you would use an image classification model here
    return 'E-Waste'; // Mock response
}

// Function to determine bin color
function getBinColor(wasteType) {
    switch (wasteType) {
        case 'E-Waste': return 'grey';
        case 'Bio': return 'green';
        case 'Recyclable': return 'blue';
        case 'Non Recyclable': return 'yellow';
        default: return 'grey';
    }
}

// Function to determine action
function getAction(wasteType) {
    switch (wasteType) {
        case 'E-Waste': return 'list on marketplace / donate to organization';
        case 'Bio': return 'throw';
        case 'Recyclable': return 'recycle';
        case 'Non Recyclable': return 'throw';
        default: return 'throw';
    }
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});