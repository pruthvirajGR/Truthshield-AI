import React, { useState } from 'react';
import {
  X,
  Terminal,
  Copy,
  Check,
  Cpu,
  BookOpen,
  Code2,
  ExternalLink,
  Download,
} from 'lucide-react';

interface PythonSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PythonSetupModal: React.FC<PythonSetupModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'vit' | 'gemini' | 'flask'>('flask');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  if (!isOpen) return null;

  const vitCode = `# 1. Install dependencies:
# pip install transformers torch pillow

from transformers import pipeline
from PIL import Image

# Load pre-trained Vision Transformer for deepfakes:
pipe = pipeline("image-classification", model="dima806/deepfake_vs_real_image_detection")

# Run prediction:
image = Image.open("suspicious_photo.jpg")
results = pipe(image)
print(results)
# Output: [{'label': 'FAKE', 'score': 0.94}, {'label': 'REAL', 'score': 0.06}]
`;

  const geminiCode = `# 1. Install dependencies:
# pip install google-genai pillow

import os
from google import genai
from PIL import Image

# Initialize Gemini client
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

image = Image.open("fake_police_call.jpg")
response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents=[
        image,
        "Analyze this image for deepfake tampering, fake police uniforms, and 'Digital Arrest' extortion indicators. Return JSON."
    ],
    config={"response_mime_type": "application/json"}
)
print(response.text)
`;

  const flaskSetupGuide = `# Complete Python & Flask Setup Guide for Beginners

# Step 1: Create a new virtual environment
python -m venv venv

# Step 2: Activate it
# On Linux/macOS:
source venv/bin/activate
# On Windows:
venv\\Scripts\\activate

# Step 3: Install dependencies
pip install flask flask-cors pillow transformers torch google-genai

# Step 4: Run the TruthShield AI server
python python_backend/app.py

# Server will be running at http://127.0.0.1:5000/api/analyze
`;

  const getActiveCode = () => {
    if (activeTab === 'vit') return vitCode;
    if (activeTab === 'gemini') return geminiCode;
    return flaskSetupGuide;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">
                Pre-Trained AI Model Integration Guide (Python & Flask)
              </h3>
              <p className="text-xs text-slate-400">
                Setup guide for integrating models into your Flask backend for Karnataka Police.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/60 hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 p-4 border-b border-slate-800 bg-slate-950/40 text-xs">
          <button
            onClick={() => setActiveTab('flask')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeTab === 'flask'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            1. Flask Server Setup Guide
          </button>

          <button
            onClick={() => setActiveTab('gemini')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeTab === 'gemini'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            2. Google Gemini API (Multimodal)
          </button>

          <button
            onClick={() => setActiveTab('vit')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeTab === 'vit'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            3. Hugging Face ViT Model
          </button>
        </div>

        {/* Code Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              {activeTab === 'flask' && 'Complete installation and start command in terminal:'}
              {activeTab === 'gemini' && 'How to call Gemini Multimodal for video call scam inspection:'}
              {activeTab === 'vit' && 'How to use pre-trained Vision Transformer with 1 line of pipeline:'}
            </span>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition border border-slate-700"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
            {getActiveCode()}
          </pre>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs space-y-2 text-slate-300">
            <span className="font-bold text-amber-400 block">📁 Standalone Python Files Already Prepared:</span>
            <p>
              We have pre-created the complete runnable code in this project under:
            </p>
            <ul className="list-disc list-inside font-mono text-[11px] text-slate-400 space-y-1">
              <li><code>/python_backend/app.py</code> (Production Flask app with pre-trained models)</li>
              <li><code>/python_backend/requirements.txt</code> (Dependencies list)</li>
              <li><code>/python_backend/README.md</code> (Complete manual with curl examples)</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
