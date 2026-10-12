import { VideoFrameSample } from '../types';

/**
 * Computes SHA-256 hash in browser using Web Crypto API
 */
export async function computeSHA256(file: File | Blob): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Extracts multiple keyframes from a video file in the browser
 */
export async function extractVideoFrames(
  videoFile: File,
  numFrames: number = 3
): Promise<VideoFrameSample[]> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = URL.createObjectURL(videoFile);
    video.muted = true;
    video.playsInline = true;

    video.onloadedmetadata = async () => {
      const duration = video.duration || 1;
      const interval = duration / (numFrames + 1);
      const frames: VideoFrameSample[] = [];

      for (let i = 1; i <= numFrames; i++) {
        const targetTime = interval * i;
        await new Promise<void>((seekResolve) => {
          video.currentTime = targetTime;
          video.onseeked = () => {
            const canvas = document.createElement('canvas');
            canvas.width = Math.min(video.videoWidth, 800);
            canvas.height = (canvas.width / video.videoWidth) * video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
              frames.push({
                id: i,
                base64: dataUrl,
                timestamp: parseFloat(targetTime.toFixed(2)),
                label: `Keyframe #${i} (${targetTime.toFixed(1)}s)`,
              });
            }
            seekResolve();
          };
        });
      }

      URL.revokeObjectURL(video.src);
      resolve(frames);
    };

    video.onerror = () => {
      resolve([]);
    };
  });
}

/**
 * Generates high-fidelity visual test samples for instant 1-click evaluation:
 * 1. Fake Police Video Call Scam (Digital Arrest)
 * 2. Deepfake Face-Swap Portrait
 * 3. Authentic Smartphone Photo
 */
export function generateSampleDataURI(type: 'fake_police' | 'deepfake_face' | 'authentic'): string {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 480;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  if (type === 'fake_police') {
    // Background: fake police station with blue banner
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 640, 480);

    // Wall texture
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 640, 180);

    // Fake banner
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(40, 20, 560, 50);
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CRIME INVESTIGATION WING - SPECIAL CYBER CELL', 320, 50);

    // Simulated "video call UI" frame
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 620, 460);

    // WhatsApp / Skype call overlay simulation
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(20, 410, 600, 50);
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('⚠️ LIVE VIDEO CALL - "DIGITAL ARREST" SUSPECT INTERROGATION', 35, 440);

    // Uniform silhouette (fake khaki uniform with distorted badge)
    ctx.fillStyle = '#92400e'; // Khaki
    ctx.beginPath();
    ctx.arc(320, 260, 100, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.fillStyle = '#78350f';
    ctx.fillRect(180, 320, 280, 160);

    // Incoherent police badge with artifacting
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(380, 350, 45, 30);
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(382, 352, 41, 10);
    ctx.fillStyle = '#1e1b4b';
    ctx.font = '8px sans-serif';
    ctx.fillText('FAKE', 390, 375);

    // Fake head with glitch halo
    ctx.fillStyle = '#fcd34d';
    ctx.beginPath();
    ctx.arc(320, 230, 60, 0, Math.PI * 2);
    ctx.fill();

    // Eyes with uneven reflection
    ctx.fillStyle = '#1f2937';
    ctx.beginPath();
    ctx.arc(300, 220, 6, 0, Math.PI * 2);
    ctx.arc(340, 220, 7, 0, Math.PI * 2);
    ctx.fill();

    // Artificial edge blur halo
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 6]);
    ctx.strokeRect(230, 150, 180, 220);
    ctx.setLineDash([]);
  } else if (type === 'deepfake_face') {
    // Synthetic portrait with smooth background
    const gradient = ctx.createLinearGradient(0, 0, 640, 480);
    gradient.addColorStop(0, '#312e81');
    gradient.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 640, 480);

    // Face avatar with hyper-smooth skin
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(320, 240, 90, 0, Math.PI * 2);
    ctx.fill();

    // Artificial hair strands with blurred boundary
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.arc(320, 190, 95, Math.PI, Math.PI * 2);
    ctx.fill();

    // Mismatched ear
    ctx.fillStyle = '#fbcfe8';
    ctx.beginPath();
    ctx.arc(225, 245, 18, 0, Math.PI * 2);
    ctx.arc(418, 238, 14, 0, Math.PI * 2); // asymmetric ear
    ctx.fill();

    // Teeth without separations (classic StyleGAN/diffusion artifact)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(295, 275, 50, 12);

    // Label
    ctx.fillStyle = '#e0e7ff';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Synthetic Profile Headshot - High Boundary Smoothing Artifacts', 320, 440);
  } else {
    // Authentic camera capture with noise texture and natural lighting
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(0, 0, 640, 480);

    ctx.fillStyle = '#047857';
    ctx.fillRect(0, 280, 640, 200);

    // Natural subject
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(320, 220, 70, 0, Math.PI * 2);
    ctx.fill();

    // Natural hair
    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.arc(320, 180, 75, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();

    // Timestamp & EXIF banner
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(20, 420, 600, 40);
    ctx.fillStyle = '#10b981';
    ctx.font = '12px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('EXIF: Apple iPhone 15 Pro | ISO 80 | f/1.8 | 1/250s | Natural Sensor Grain', 35, 445);
  }

  return canvas.toDataURL('image/jpeg', 0.9);
}
