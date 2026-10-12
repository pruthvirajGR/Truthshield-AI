import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  PhoneCall,
  FileText,
  Eye,
  EyeOff,
  Sparkles,
  Users,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Cpu,
  Info,
  ChevronDown,
  ChevronUp,
  Share2,
  Volume2,
  VolumeX,
  MessageCircle,
} from 'lucide-react';
import { ForensicReport, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface CitizenResultsDisplayProps {
  report: ForensicReport;
  lang: Language;
  onGenerateFIR: () => void;
  onReset: () => void;
}

export const CitizenResultsDisplay: React.FC<CitizenResultsDisplayProps> = ({
  report,
  lang,
  onGenerateFIR,
  onReset,
}) => {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Stop speech if component unmounts
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Voice playback is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${theme.title}. ${
      lang === 'kn' ? theme.topAdviceKn : theme.topAdviceEn
    }. ${lang === 'kn' ? theme.elderSummaryKn : theme.elderSummaryEn}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.lang = lang === 'kn' ? 'kn-IN' : 'en-IN';

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const shareToWhatsApp = () => {
    const text = `🚨 *TruthShield AI Safety Alert* 🚨\n\n*Verdict:* ${report.riskLevel} (${report.confidenceScore}% confidence)\n*Analysis:* ${report.verdictTitle}\n\n*Action Advice:* ${
      lang === 'kn' ? theme.topAdviceKn : theme.topAdviceEn
    }\n\n⚠️ *Remember:* Indian Police / CBI NEVER arrest people on WhatsApp video calls!\n📞 *Helpline:* Call 1930 immediately.`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Friendly theme configuration based on the 3-tier outcome
  const getTheme = () => {
    switch (report.riskLevel) {
      case 'SUSPICIOUS':
        return {
          headerBg: 'bg-gradient-to-r from-red-950 via-slate-900 to-red-950 border-red-500/60',
          badgeBg: 'bg-red-500 text-white',
          badgeText: lang === 'kn' ? '⚠️ ಅಪಾಯ: ನಕಲಿ / ವಂಚನೆಯ ಹೆಚ್ಚಿನ ಸಂಭವ' : 'HIGH CHANCE OF FAKE OR SCAM',
          title: lang === 'kn' ? 'ಎಚ್ಚರಿಕೆ: ಇದು ನಕಲಿ ಅಥವಾ ಮಾರ್ಪಡಿಸಿದ ಮಾಧ್ಯಮವಾಗಿರಬಹುದು' : 'Warning: High Likelihood of Fake Media or Impersonation',
          icon: <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />,
          statusColor: 'text-red-400',
          elderSummaryEn:
            'Do not worry. This video or photo has clear signs of being computer-made or a fake costume. Real Indian police NEVER arrest people over WhatsApp or ask for money.',
          elderSummaryKn:
            'ಹೆದರಬೇಡಿ. ಈ ವೀಡಿಯೊ ಅಥವಾ ಫೋಟೋ ಕಂಪ್ಯೂಟರ್‌ನಿಂದ ಸೃಷ್ಟಿಸಿದ ನಕಲಿ ವೇಷವಾಗಿದೆ. ನಿಜವಾದ ಪೊಲೀಸರು ಎಂದಿಗೂ ವಾಟ್ಸಾಪ್ ಕರೆಯಲ್ಲಿ ಬಂಧಿಸುವುದಿಲ್ಲ ಅಥವಾ ಹಣ ಕೇಳುವುದಿಲ್ಲ.',
          topAdviceEn: 'DO NOT SEND ANY MONEY. Disconnect the call immediately and block the caller.',
          topAdviceKn: 'ಯಾವುದೇ ಹಣ ಕಳುಹಿಸಬೇಡಿ. ಕರೆಯನ್ನು ತಕ್ಷಣ ಕಟ್ ಮಾಡಿ ಮತ್ತು ನಂಬರ್ ಬ್ಲಾಕ್ ಮಾಡಿ.',
        };
      case 'LOW_RISK':
        return {
          headerBg: 'bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-emerald-500/60',
          badgeBg: 'bg-emerald-500 text-slate-950 font-bold',
          badgeText: lang === 'kn' ? '✓ ನೈಜ / ಸುರಕ್ಷಿತ' : 'LIKELY GENUINE & SAFE',
          title: lang === 'kn' ? 'ಸ್ಪಷ್ಟ ನಕಲಿ ಕುರುಹುಗಳು ಕಂಡುಬಂದಿಲ್ಲ' : 'Looks Natural: No Obvious AI Manipulation Found',
          icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
          statusColor: 'text-emerald-400',
          elderSummaryEn:
            'This photo looks like a genuine camera picture with natural lighting and no computer face-swapping detected.',
          elderSummaryKn:
            'ಈ ಫೋಟೋ ನೈಜ ಕ್ಯಾಮೆರಾ ಚಿತ್ರದಂತೆ ಕಾಣುತ್ತದೆ. ಇದರಲ್ಲಿ ಯಾವುದೇ ಕಂಪ್ಯೂಟರ್ ಮುಖ ಬದಲಾವಣೆ ಕಂಡುಬಂದಿಲ್ಲ.',
          topAdviceEn: 'Always remain cautious with strangers, but this media shows no obvious digital tampering.',
          topAdviceKn: 'ಅಪರಿಚಿತರೊಂದಿಗೆ ಜಾಗರೂಕರಾಗಿರಿ, ಆದರೆ ಈ ಮಾಧ್ಯಮದಲ್ಲಿ ಯಾವುದೇ ಸ್ಪಷ್ಟ ತಿದ್ದುವಿಕೆ ಕಂಡುಬಂದಿಲ್ಲ.',
        };
      case 'INCONCLUSIVE':
      default:
        return {
          headerBg: 'bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-amber-500/60',
          badgeBg: 'bg-amber-500 text-slate-950 font-bold',
          badgeText: lang === 'kn' ? '? ಅನಿಶ್ಚಿತ / ಮಸುಕಾದ ಮಾಧ್ಯಮ' : 'UNCLEAR / NEEDS BETTER QUALITY',
          title: lang === 'kn' ? 'ಖಚಿತವಾಗಿ ಹೇಳಲು ಸಾಧ್ಯವಿಲ್ಲ (ಮಾಧ್ಯಮ ಮಸುಕಾಗಿದೆ)' : 'Inconclusive: Media is Too Blurry to Be Sure',
          icon: <HelpCircle className="w-8 h-8 text-amber-400" />,
          statusColor: 'text-amber-400',
          elderSummaryEn:
            'The picture is too blurry or low quality from social media compression. We cannot give a 100% guarantee, so please do not rush to any decision.',
          elderSummaryKn:
            'ಫೋಟೋ ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಬಂದ ಕಾರಣ ಮಸುಕಾಗಿದೆ. ನಿಖರ ತೀರ್ಮಾನಕ್ಕೆ ಬರುವ ಮುನ್ನ ಎಚ್ಚರಿಕೆಯಿಂದ ಪರಿಶೀಲಿಸಿ.',
          topAdviceEn: 'Ask for in-person verification or obtain an uncompressed original file before deciding.',
          topAdviceKn: 'ಯಾವುದೇ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳುವ ಮೊದಲು ನೇರವಾಗಿ ಪರಿಶೀಲಿಸಿ.',
        };
    }
  };

  const theme = getTheme();

  // Convert technical breakdown into plain everyday English
  const getPlainLanguageClues = () => {
    const clues: Array<{ label: string; text: string; status: 'warning' | 'clean' | 'critical' }> = [];
    const b = report.forensicBreakdown;

    if (b.impersonationScamCues?.score > 50) {
      clues.push({
        label: lang === 'kn' ? 'ಪೊಲೀಸ್ ವೇಷ & ಬೆದರಿಕೆ' : 'Police Impersonation & Scam Rules',
        text:
          lang === 'kn'
            ? 'ಕರೆ ಮಾಡಿದವರು ಪೊಲೀಸ್ ಹೆಸರಿನಲ್ಲಿ ಬೆದರಿಸುತ್ತಿದ್ದಾರೆ. ನಿಜವಾದ ಭಾರತೀಯ ಪೊಲೀಸರು ಎಂದಿಗೂ ವೀಡಿಯೊ ಕರೆಯಲ್ಲಿ ಬಂಧಿಸುವುದಿಲ್ಲ.'
            : 'The caller displays badges or threatens arrest over a video call. Indian Police NEVER conduct arrests over WhatsApp or Skype.',
        status: 'critical',
      });
    }

    if (b.facialArtifacts?.score > 50) {
      clues.push({
        label: lang === 'kn' ? 'ಮುಖ ಮತ್ತು ಚರ್ಮ' : 'Face & Skin Appearance',
        text:
          lang === 'kn'
            ? 'ಮುಖದ ಚರ್ಮವು ಅತಿಯಾಗಿ ಮೃದುವಾಗಿದ್ದು, ನಕಲಿ ಕಂಪ್ಯೂಟರ್ ಮುಖದಂತೆ ಕಾಣುತ್ತಿದೆ.'
            : 'The face appears unnaturally smooth with blurring around the jawline, typical of AI face-swapping filters.',
        status: 'critical',
      });
    } else {
      clues.push({
        label: lang === 'kn' ? 'ಮುಖದ ಸಮಗ್ರತೆ' : 'Face & Facial Features',
        text:
          lang === 'kn'
            ? 'ಮುಖದಲ್ಲಿ ಯಾವುದೇ ಕೃತಕ ತಿದ್ದುವಿಕೆಯ ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿಲ್ಲ.'
            : 'Natural facial proportions and consistent features observed.',
        status: 'clean',
      });
    }

    if (b.lightingAndShadows?.score > 50) {
      clues.push({
        label: lang === 'kn' ? 'ಬೆಳಕು ಮತ್ತು ನೆರಳು' : 'Lighting & Shadows',
        text:
          lang === 'kn'
            ? 'ಮುಖದ ಮೇಲಿನ ಬೆಳಕು ಮತ್ತು ಹಿನ್ನೆಲೆಯ ನೆರಳು ಪರಸ್ಪರ ಹೊಂದಾಣಿಕೆಯಾಗುತ್ತಿಲ್ಲ.'
            : 'The direction of light hitting the face does not match the shadows in the room.',
        status: 'warning',
      });
    } else {
      clues.push({
        label: lang === 'kn' ? 'ಬೆಳಕಿನ ಸಮತೋಲನ' : 'Lighting Balance',
        text:
          lang === 'kn'
            ? 'ಕೋಣೆಯ ಬೆಳಕು ಮತ್ತು ನೆರಳು ನೈಸರ್ಗಿಕವಾಗಿದೆ.'
            : 'Consistent natural room illumination detected across the subject.',
        status: 'clean',
      });
    }

    if (b.backgroundAndEdges?.score > 50) {
      clues.push({
        label: lang === 'kn' ? 'ಹಿನ್ನೆಲೆ (ಬ್ಯಾಕ್‌ಗ್ರೌಂಡ್)' : 'Background & Edges',
        text:
          lang === 'kn'
            ? 'ವ್ಯಕ್ತಿಯ ಹಿಂಭಾಗದಲ್ಲಿ ನಕಲಿ ಪೊಲೀಸ್ ಸ್ಟೇಷನ್ ಫೋಟೋವನ್ನು ಕೃತಕವಾಗಿ ಅಂಟಿಸಿದಂತೆ ಕಾಣುತ್ತಿದೆ.'
            : 'Haloing and cut-out artifacts detected around the shoulders, indicating a fake virtual background.',
        status: 'warning',
      });
    }

    return clues;
  };

  const plainClues = getPlainLanguageClues();

  const handleShare = () => {
    const summary = `TruthShield AI Verdict: ${report.riskLevel} (${report.confidenceScore}% confidence) for ${report.fileName}. SHA-256: ${report.sha256Hash}. Never pay money on fake video calls.`;
    navigator.clipboard.writeText(summary);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* 1. Main Outcome Card (Big, Clear, Reassuring) */}
      <div className={`p-6 sm:p-8 rounded-3xl border-2 ${theme.headerBg} shadow-2xl space-y-4`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-700/60 shadow">
              {theme.icon}
            </div>
            <div>
              <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${theme.badgeBg}`}>
                {theme.badgeText}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5 leading-tight">
                {theme.title}
              </h2>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-700/80 px-4 py-2.5 rounded-2xl text-right self-stretch sm:self-auto">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
              Detection Confidence
            </span>
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-2xl font-black text-white">{report.confidenceScore}%</span>
              <span className="text-[10px] text-slate-400">match</span>
            </div>
          </div>
        </div>

        {/* Clear Immediate Advice Banner */}
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              {lang === 'kn' ? 'ತಕ್ಷಣ ಮಾಡಬೇಕಾದ ಕ್ರಮ:' : 'Immediate Action for You:'}
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-100">
              {lang === 'kn' ? theme.topAdviceKn : theme.topAdviceEn}
            </p>
          </div>
        </div>

        {/* Quick Accessibility & Sharing Toolbar */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={toggleSpeech}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
              isSpeaking
                ? 'bg-amber-400 text-slate-950 animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            <span>
              {isSpeaking
                ? lang === 'kn'
                  ? 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ'
                  : 'Stop Voice Playback'
                : lang === 'kn'
                ? '🔊 ಧ್ವನಿಯಲ್ಲಿ ಆಲಿಸಿ (Read Out Loud)'
                : '🔊 Read Out Loud (Voice Advice)'}
            </span>
          </button>

          <button
            type="button"
            onClick={shareToWhatsApp}
            className="px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>
              {lang === 'kn' ? 'ಕುಟುಂಬದವರಿಗೆ ವಾಟ್ಸಾಪ್ ಎಚ್ಚರಿಕೆ ಕಳುಹಿಸಿ' : 'Send Warning to Family on WhatsApp'}
            </span>
          </button>
        </div>

        {/* AI Model Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Model Used: <strong>{report.modelName || 'Google Gemini 3.8 Flash (Multimodal)'}</strong></span>
          </div>
          <div className="font-mono text-[10px] text-slate-500 truncate max-w-xs">
            SHA-256: {report.sha256Hash?.substring(0, 16)}...
          </div>
        </div>
      </div>

      {/* 2. Plain-Language "What We Found" Clues Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div>
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>
              {lang === 'kn'
                ? 'ನಾವು ಕಂಡುಕೊಂಡ ಪ್ರಮುಖ ಸಾಕ್ಷ್ಯಗಳು (ಸರಳ ವಿವರಣೆ)'
                : 'What We Found (Explained Simply, Without Jargon)'}
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'kn'
              ? 'ಕಂಪ್ಯೂಟರ್ ತಂತ್ರಜ್ಞಾನದ ಭಾಷೆಯ ಬದಲಿಗೆ ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ಅರ್ಥವಾಗುವ ಸರಳ ವಿವರಣೆ:'
              : 'Here is what our forensic system noticed in plain, everyday language:'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {plainClues.map((clue, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                clue.status === 'critical'
                  ? 'bg-red-950/25 border-red-500/40'
                  : clue.status === 'warning'
                  ? 'bg-amber-950/25 border-amber-500/40'
                  : 'bg-emerald-950/25 border-emerald-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-200">{clue.label}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                    clue.status === 'critical'
                      ? 'bg-red-500/20 text-red-300'
                      : clue.status === 'warning'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}
                >
                  {clue.status === 'clean' ? 'Normal ✓' : 'Suspicious ⚠️'}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">{clue.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. "Explain to an Elder / Family Member" Quote Card */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900 to-indigo-950/40 border border-indigo-500/40 rounded-3xl p-6 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-indigo-300 font-extrabold text-sm">
          <Users className="w-4 h-4 text-indigo-400" />
          <span>
            {lang === 'kn'
              ? 'ಹಿರಿಯರಿಗೆ / ಕುಟುಂಬದವರಿಗೆ ವಿವರಿಸಲು 1-ವಾಕ್ಯದ ಸಾರಾಂಶ:'
              : 'One Sentence to Read to an Elder or Family Member Who is Worried:'}
          </span>
        </div>
        <blockquote className="bg-slate-950/80 border-l-4 border-indigo-400 p-4 rounded-r-2xl text-xs sm:text-sm text-slate-200 italic font-serif leading-relaxed">
          "{lang === 'kn' ? theme.elderSummaryKn : theme.elderSummaryEn}"
        </blockquote>
      </div>

      {/* 4. Three Big Next-Step Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <a
          href="tel:1930"
          className="p-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs flex flex-col items-center justify-center gap-1.5 transition shadow-lg shadow-red-600/20 text-center"
        >
          <PhoneCall className="w-5 h-5" />
          <span>Call 1930 Cyber Tipline (Free)</span>
          <span className="text-[10px] text-red-200 font-normal">Immediate Karnataka Police Help</span>
        </a>

        <button
          onClick={onGenerateFIR}
          className="p-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex flex-col items-center justify-center gap-1.5 transition shadow-lg text-center"
        >
          <FileText className="w-5 h-5" />
          <span>Save Police FIR Evidence Dossier</span>
          <span className="text-[10px] text-indigo-200 font-normal">Court-ready SHA-256 PDF report</span>
        </button>

        <button
          onClick={onReset}
          className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs flex flex-col items-center justify-center gap-1.5 transition border border-slate-700 text-center"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Scan Another Photo or Video</span>
          <span className="text-[10px] text-slate-400 font-normal">Start a new verification</span>
        </button>
      </div>

      {/* 5. Collapsible Technical / Police Forensics Drawer */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          className="w-full p-4 flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 transition bg-slate-900/50"
        >
          <span className="font-bold flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-400" />
            <span>Are you a Police Officer or Technical Specialist? View Full Forensics Data</span>
          </span>
          {showTechnicalDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showTechnicalDetails && (
          <div className="p-5 border-t border-slate-800 space-y-4 text-xs font-mono text-slate-300">
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>Target File: <strong>{report.fileName}</strong></div>
              <div>File Size: <strong>{(report.fileSize / 1024).toFixed(1)} KB</strong></div>
              <div className="col-span-2 break-all">
                SHA-256 Hash: <strong className="text-amber-400">{report.sha256Hash}</strong>
              </div>
              <div className="col-span-2">
                Analyzed Timestamp: <strong>{report.analyzedAt}</strong>
              </div>
            </div>

            <div className="space-y-1.5 border-t border-slate-800/80 pt-3">
              <span className="font-bold text-slate-400 block font-sans">Applicable Legal Acts:</span>
              <ul className="list-disc list-inside text-[11px] text-slate-400 font-sans space-y-1">
                <li>Information Technology Act 2000, Section 66D (Cheating by personation)</li>
                <li>Bharatiya Nyaya Sanhita 2023, Section 318(4) (Fraudulent inducement)</li>
                <li>Bharatiya Nyaya Sanhita 2023, Section 308 (Extortion under intimidation)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
