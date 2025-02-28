import os
import requests
import base64
from flask import Flask, request, jsonify
from dotenv import load_dotenv

# Load API Key from .env file
load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
COHERE_API_URL = "https://api.cohere.com/v1/classify-image"

app = Flask(__name__)

# Function to send image to Cohere API
def classify_image(image_base64):
    headers = {
        "Authorization": f"Bearer {COHERE_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {"image": image_base64}

    response = requests.post(COHERE_API_URL, headers=headers, json=data)
    
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": response.text}

@app.route("/classify", methods=["POST"])
def classify():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    image_base64 = base64.b64encode(file.read()).decode("utf-8")

    result = classify_image(image_base64)

    # Map category to bin information
    bin_info = {
        "Plastic Bottle": {"bin": "Blue", "description": "Plastic bottles, containers, and bags"},
        "Newspaper": {"bin": "Green", "description": "Paper items like newspapers, magazines, and books"},
        "Glass Jar": {"bin": "Yellow", "description": "Glass bottles and containers"},
        "Aluminum Can": {"bin": "Gray", "description": "Metal items like cans and bottle caps"}
    }

    category = result.get("category", "Unknown")
    confidence = result.get("confidence", 0)
    bin_details = bin_info.get(category, {"bin": "Unknown", "description": "Not categorized"})

    return jsonify({
        "category": category,
        "confidence": confidence,
        "bin": bin_details["bin"],
        "description": bin_details["description"]
    })

if __name__ == "__main__":
    app.run(debug=True)