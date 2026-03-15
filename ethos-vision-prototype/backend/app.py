import os
import json
import base64
import re
from io import BytesIO
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/analyze": {"origins": "*"}})

def clean_json_response(raw_text):
    """Robustly extract JSON from LLM response."""
    try:
        return json.loads(raw_text)
    except json.JSONDecodeError:
        pass
    match = re.search(r'```json\s*(.*?)\s*```', raw_text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(1))
        except json.JSONDecodeError:
            pass
    match = re.search(r'(\{.*\})', raw_text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(1))
        except json.JSONDecodeError:
            pass
    raise ValueError("Could not parse JSON from the LLM response.")


def get_demo_result():
    """Returns a realistic demo result for presentations when AI is unavailable."""
    import random
    demo_products = [
        {
            "product_name": "Classic Cola Can (330ml)",
            "brand_name": "Coca-Cola",
            "ethos_score": 52,
            "labor_score": 60,
            "carbon_score": 41,
            "news_score": 58,
            "trust_score": 48,
            "summary": "Coca-Cola scores moderately on ethical supply chain practices. While the company has invested in water replenishment programs and renewable energy for 40% of operations, concerns persist around plastic pollution (contributing ~3 million metric tons/year), sugar supply chains with reported labor issues in Brazil and India, and lobbying against public health regulations. The score reflects genuine improvements but significant ongoing issues.",
            "source": "demo"
        },
        {
            "product_name": "Running Sneakers (Air Model)",
            "brand_name": "Nike",
            "ethos_score": 61,
            "labor_score": 55,
            "carbon_score": 72,
            "news_score": 65,
            "trust_score": 52,
            "summary": "Nike has made concrete strides with its 'Move to Zero' initiative, aiming for zero carbon and zero waste. Over 76% of Nike products contain some recycled material. However, persistent issues remain with factory worker wages in Vietnam and Indonesia. Their transparency reporting has improved, but third-party verification of claims remains inconsistent.",
            "source": "demo"
        },
        {
            "product_name": "Milk Chocolate Bar (100g)",
            "brand_name": "Nestlé",
            "ethos_score": 38,
            "labor_score": 28,
            "carbon_score": 45,
            "news_score": 32,
            "trust_score": 47,
            "summary": "Nestlé faces serious ethical scrutiny. Child labor in cocoa supply chains in Ivory Coast and Ghana remains an unresolved issue despite repeated pledges. Water privatization controversies, aggressive infant formula marketing in developing countries, and documented gaps between self-reported sustainability claims and verified practices all weigh heavily on this score.",
            "source": "demo"
        }
    ]
    return random.choice(demo_products)


@app.route('/analyze', methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if not file.content_type.startswith('image/'):
        return jsonify({"error": "File must be an image type (e.g., image/jpeg, image/png)"}), 400

    gemini_key = os.getenv("GEMINI_API_KEY")

    if gemini_key:
        try:
            import google.generativeai as genai
            from PIL import Image

            genai.configure(api_key=gemini_key)
            model = genai.GenerativeModel('gemini-1.5-flash')

            # Load image for Gemini
            image_bytes = file.read()
            image = Image.open(BytesIO(image_bytes))

            prompt = """You are the Ethos-Vision Autonomous Supply Chain Oracle.
Analyze this product image and identify the brand and product.
Then, perform a simulated ethical audit based on your training knowledge.

Return ONLY a valid JSON object (no markdown, no extra text) with these exact keys:
- "product_name": string
- "brand_name": string  
- "ethos_score": integer (0-100, higher is more ethical)
- "labor_score": integer (0-100, labor rights practices)
- "carbon_score": integer (0-100, environmental/carbon footprint)
- "news_score": integer (0-100, media controversies, lower = more controversy)
- "trust_score": integer (0-100, verified certifications and transparency)
- "summary": string (2-4 sentences explaining the overall score and key findings)

If the image is unclear or no product is visible, still return a JSON with reasonable estimates based on a generic product."""

            response = model.generate_content([prompt, image])
            raw_response = response.text

            result = clean_json_response(raw_response)

            return jsonify({
                "product_name": str(result.get("product_name", "Unknown Product")),
                "brand_name": str(result.get("brand_name", "Unknown Brand")),
                "ethos_score": int(result.get("ethos_score", 50)),
                "labor_score": int(result.get("labor_score", 50)),
                "carbon_score": int(result.get("carbon_score", 50)),
                "news_score": int(result.get("news_score", 50)),
                "trust_score": int(result.get("trust_score", 50)),
                "summary": str(result.get("summary", "Analysis complete.")),
                "source": "live"
            })

        except Exception as e:
            print(f"Gemini API error: {e} — falling back to demo mode.")

    # Demo / Fallback Mode
    print("No valid API key or API error — returning demo result.")
    return jsonify(get_demo_result())


if __name__ == '__main__':
    app.run(debug=True, port=5000)
