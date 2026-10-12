# TruthShield AI - Python & Flask Pre-Trained Model Backend

This directory provides a standalone, production-ready Python & Flask backend for TruthShield AI integrating pre-trained AI models for detecting deepfakes, AI-generated images, and fake police video-call scams.

---

## 1. Pre-Trained Models Supported

1. **Hugging Face Vision Transformer (ViT)**
   - Model ID: `dima806/deepfake_vs_real_image_detection` and `umm-maybe/AI-image-detector`
   - Framework: `transformers` + `torch`
   - What it does: Classifies faces and images into Real vs. AI-Generated based on high-frequency visual features.
   - Setup: Automatically downloaded upon first run via Hugging Face pipeline.

2. **Google Gemini Multimodal AI**
   - SDK: `google-genai` (`pip install google-genai`)
   - What it does: Evaluates complex video-call frames, fake police uniforms, distorted Indian police badges, and high-pressure extortion language.
   - Setup: Set your `GEMINI_API_KEY` in environment.

3. **Lightweight Computer Vision Heuristics**
   - Framework: `Pillow` + `numpy` (or `opencv-python`)
   - What it does: Laplacian variance blur estimation, SHA-256 evidence hashing, and digital arrest scam keyword pattern matching.

---

## 2. Quick Setup & Run (Step-by-Step for Beginners)

### Step 1: Open Terminal in this directory
```bash
cd python_backend
```

### Step 2: Create and activate a Virtual Environment
```bash
# On Linux / macOS:
python3 -m venv venv
source venv/bin/activate

# On Windows:
python -m venv venv
venv\Scripts\activate
```

### Step 3: Install Required Dependencies
```bash
pip install -r requirements.txt
```

*(Note: If you do not have a GPU or want a lightweight setup, PyTorch will run automatically on CPU).*

### Step 4: (Optional) Set your Gemini API Key
```bash
export GEMINI_API_KEY="your_api_key_here"  # Linux / macOS
set GEMINI_API_KEY=your_api_key_here       # Windows
```

### Step 5: Start the Flask Server
```bash
python app.py
```
You will see:
```
=======================================================
  TruthShield AI Python Backend
  Running on: http://127.0.0.1:5000
  Pre-trained Models Ready: ViT, Gemini, and Heuristics
=======================================================
```

---

## 3. How to Call the Model Endpoint from Any Frontend or curl

### Health Check:
```bash
curl http://127.0.0.1:5000/api/health
```

### Analyze an Image:
```bash
curl -X POST http://127.0.0.1:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "mediaBase64": "data:image/jpeg;base64,...",
    "fileName": "test_call.jpg",
    "userContext": "Caller claimed to be CBI Officer demanding UPI transfer",
    "selectedModel": "auto"
  }'
```

### Response Format:
```json
{
  "riskLevel": "SUSPICIOUS",
  "confidenceScore": 88,
  "simpleExplanation": "Warning: This call matches known Digital Arrest scams. The caller uniform and badge show signs of being fake.",
  "whatWeFound": [
    "The badge and uniform do not match authentic Indian Police standards",
    "The caller is demanding money or ordering you not to disconnect",
    "The background appears to be a virtual or fake backdrop"
  ],
  "actionAdvice": "Do not transfer money to anyone online without in-person confirmation.",
  "sha256Hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "modelUsed": "Google Gemini 3.8 Flash (Multimodal Vision)",
  "analyzedAt": "2026-10-09T02:40:00Z"
}
```
