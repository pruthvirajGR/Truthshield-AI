import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { Language } from '../types';

interface ScamSpotterGameProps {
  lang: Language;
}

export const ScamSpotterGame: React.FC<ScamSpotterGameProps> = ({ lang }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const questions = [
    {
      id: 1,
      title: 'Scenario: WhatsApp Video Call from "Inspector Sharma"',
      titleKn: 'ಸನ್ನಿವೇಶ: "ಇನ್‌ಸ್ಪೆಕ್ಟರ್ ಶರ್ಮಾ" ಅವರಿಂದ ವಾಟ್ಸಾಪ್ ವೀಡಿಯೊ ಕರೆ',
      description:
        'You receive a video call on WhatsApp from a number starting with +92. The caller is wearing a khaki uniform, sitting in front of a blue "Crime Investigation" banner, and claims your Aadhaar card was used in drug trafficking in Mumbai. He orders you to stay on video call and transfer ₹1.5 Lakhs to a "Clearance Account". What is the REAL truth?',
      descriptionKn:
        'ನಿಮಗೆ ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ವೀಡಿಯೊ ಕರೆ ಬರುತ್ತದೆ. ಕರೆ ಮಾಡಿದ ವ್ಯಕ್ತಿ ಪೊಲೀಸ್ ಸಮವಸ್ತ್ರದಲ್ಲಿದ್ದು, ನಿಮ್ಮ ಆಧಾರ್ ಕಾರ್ಡ್ ಅಕ್ರಮ ಚಟುವಟಿಕೆಗೆ ಬಳಕೆಯಾಗಿದೆ ಎಂದು ಹೇಳಿ ₹1.5 ಲಕ್ಷವನ್ನು ಪರಿಶೀಲನಾ ಖಾತೆಗೆ ಹಾಕುವಂತೆ ಬೆದರಿಸುತ್ತಾರೆ. ನೈಜ ಸತ್ಯವೇನು?',
      options: [
        {
          text: 'This is a genuine police investigation. I must pay immediately to clear my name.',
          textKn: 'ಇದು ನಿಜವಾದ ಪೊಲೀಸ್ ತನಿಖೆ. ಹೆಸರು ಕ್ಲಿಯರ್ ಮಾಡಲು ತಕ್ಷಣ ಹಣ ನೀಡಬೇಕು.',
          isCorrect: false,
          explanation: 'Incorrect! Indian police NEVER arrest or demand bail money over WhatsApp video calls.',
        },
        {
          text: 'This is 100% a fake "Digital Arrest" deepfake/costume scam. Disconnect immediately and call 1930.',
          textKn: 'ಇದು 100% ನಕಲಿ "ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್" ವಂಚನೆ. ಕರೆಯನ್ನು ತಕ್ಷಣ ಕಟ್ ಮಾಡಿ 1930 ಗೆ ಕರೆ ಮಾಡಿ.',
          isCorrect: true,
          explanation: 'Correct! There is NO legal provision for video-call arrest under Indian law. It is purely extortion.',
        },
        {
          text: 'Ask the officer for his employee ID and then transfer half the money.',
          textKn: 'ಅಧಿಕಾರಿಯ ಐಡಿ ಕಾರ್ಡ್ ಕೇಳಿ ಅರ್ಧ ಹಣವನ್ನು ಕಳುಹಿಸುವುದು.',
          isCorrect: false,
          explanation: 'Incorrect! Scammers frequently create fake ID cards using Photoshop within minutes.',
        },
      ],
    },
    {
      id: 2,
      title: 'Scenario: Spotting an AI-Generated Deepfake Face',
      titleKn: 'ಸನ್ನಿವೇಶ: AI ನಿರ್ಮಿತ ನಕಲಿ ಮುಖವನ್ನು ಗುರುತಿಸುವುದು',
      description:
        'A person on a matrimony or social media site sends you photos. You notice their ears have slightly different shapes, the teeth look like a single blended white strip without clear gaps, and background textures blur weirdly near the hair boundary. What does this indicate?',
      descriptionKn:
        'ಮ್ಯಾಟ್ರಿಮೋನಿ ಆ್ಯಪ್‌ನಲ್ಲಿ ಒಬ್ಬರು ಫೋಟೋ ಕಳುಹಿಸಿದ್ದಾರೆ. ಅವರ ಕಿವಿಗಳು ಅಸಮರ್ಪಕವಾಗಿದ್ದು, ಹಲ್ಲುಗಳು ಒಂದೇ ಬಿಳಿ ಗೆರೆಯಂತೆ ಕಾಣಿಸುತ್ತವೆ ಮತ್ತು ಕೂದಲಿನ ಸುತ್ತ ವಿಚಿತ್ರ ಮಸುಕುತನವಿದೆ. ಇದು ಏನನ್ನು ಸೂಚಿಸುತ್ತದೆ?',
      options: [
        {
          text: 'The photo is just taken with an old camera or bad lighting.',
          textKn: 'ಇದು ಕೇವಲ ಹಳೆಯ ಕ್ಯಾಮೆರಾ ಅಥವಾ ಕಳಪೆ ಬೆಳಕಿನ ಫೋಟೋ.',
          isCorrect: false,
          explanation: 'Bad cameras create uniform grain, but not anatomical anomalies like fused teeth or mismatched earlobes.',
        },
        {
          text: 'Classic generative AI synthesis artifacts (StyleGAN/diffusion face generation). High suspicion of a fake profile.',
          textKn: 'ಇವು ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯ (AI) ಪ್ರಮುಖ ದೋಷಗಳು. ಇದು ನಕಲಿ ಪ್ರೊಫೈಲ್ ಆಗಿರುವ ಹೆಚ್ಚಿನ ಸಾಧ್ಯತೆ ಇದೆ.',
          isCorrect: true,
          explanation: 'Correct! Generative models frequently struggle with coherent teeth separation, ear symmetry, and hair boundary blending.',
        },
        {
          text: 'It proves the person is real because AI always makes perfect faces.',
          textKn: 'ಇದು ನೈಜ ವ್ಯಕ್ತಿಯ ಫೋಟೋ ಏಕೆಂದರೆ AI ಯಾವಾಗಲೂ ಪರಿಪೂರ್ಣ ಮುಖಗಳನ್ನು ಮಾಡುತ್ತದೆ.',
          isCorrect: false,
          explanation: 'Incorrect! Generative AI leaves distinct micro-artifacts that forensic algorithms detect.',
        },
      ],
    },
    {
      id: 3,
      title: 'Scenario: AI Voice Clone Distress Call',
      titleKn: 'ಸನ್ನಿವೇಶ: ಕೃತಕ ಧ್ವನಿ (AI Voice Clone) ಮೂಲಕ ತುರ್ತು ಹಣದ ಕರೆ',
      description:
        'You receive a call from an unknown number. The voice sounds EXACTLY like your son or nephew crying, saying: "Uncle, police caught me in an accident! Please UPI ₹50,000 immediately to this lawyer number, don\'t call mom!" What is the safest protocol?',
      descriptionKn:
        'ಅಪರಿಚಿತ ಸಂಖ್ಯೆಯಿಂದ ಕರೆ ಬರುತ್ತದೆ. ನಿಮ್ಮ ಮಗನ ಧ್ವನಿಯಲ್ಲೇ ಅಳುತ್ತಾ "ಅಪ್ಪಾ, ಆಕ್ಸಿಡೆಂಟ್ ಆಗಿದೆ, ಪೊಲೀಸರು ಹಿಡಿದಿದ್ದಾರೆ, ಕೂಡಲೇ ₹50,000 ಕಳುಹಿಸಿ" ಎನ್ನುತ್ತಾರೆ. ನೀವು ಮಾಡಬೇಕಾದ ಸರಿಯಾದ ಕ್ರಮವೇನು?',
      options: [
        {
          text: 'Panic and transfer money immediately because the voice sounded 100% genuine.',
          textKn: 'ಗಾಬರಿಯಾಗಿ ತಕ್ಷಣ ಹಣ ಕಳುಹಿಸುವುದು.',
          isCorrect: false,
          explanation: 'Never transfer in panic! Modern AI can clone anyone\'s voice with just 3 seconds of audio from Instagram or Reels.',
        },
        {
          text: 'Hang up, immediately call your son/nephew directly on their known phone number or call family to verify.',
          textKn: 'ಕರೆಯನ್ನು ಕಟ್ ಮಾಡಿ, ನಿಮ್ಮ ಮಗನ ನೈಜ ಫೋನ್ ನಂಬರ್‌ಗೆ ನೇರವಾಗಿ ಕರೆ ಮಾಡಿ ಸತ್ಯಾಸತ್ಯತೆ ತಿಳಿಯುವುದು.',
          isCorrect: true,
          explanation: 'Correct! The "Direct Callback Protocol" completely neutralizes 99.9% of voice clone kidnappings and accident scams.',
        },
        {
          text: 'Ask the scammer to speak in English instead of Kannada.',
          textKn: 'ವಂಚಕನಿಗೆ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಮಾತನಾಡುವಂತೆ ಹೇಳುವುದು.',
          isCorrect: false,
          explanation: 'Language switch alone does not prevent fund loss.',
        },
      ],
    },
    {
      id: 4,
      title: 'Scenario: Money Transferred in Panic - Golden Hour Action',
      titleKn: 'ಸನ್ನಿವೇಶ: ಗಾಬರಿಯಲ್ಲಿ ಹಣ ಕಳುಹಿಸಿಬಿಟ್ಟರೆ - ಗೋಲ್ಡನ್ ಅವರ್ ಕ್ರಮ',
      description:
        'A family member panicked and transferred ₹80,000 to a cyber fraudster 30 minutes ago. What is the SINGLE most effective step to recover the money?',
      descriptionKn:
        'ಕುಟುಂಬದ ಸದಸ್ಯರೊಬ್ಬರು 30 ನಿಮಿಷಗಳ ಹಿಂದೆ ಗಾಬರಿಯಲ್ಲಿ ಸೈಬರ್ ವಂಚಕರಿಗೆ ₹80,000 ಕಳುಹಿಸಿದ್ದಾರೆ. ಹಣ ಮರಳಿ ಪಡೆಯಲು ತಕ್ಷಣ ಮಾಡಬೇಕಾದ ಅತ್ಯಂತ ಪರಿಣಾಮಕಾರಿ ಕ್ರಮ ಯಾವುದು?',
      options: [
        {
          text: 'Wait until tomorrow morning and visit the local bank branch in person.',
          textKn: 'ನಾಳೆ ಬೆಳಿಗ್ಗೆವರೆಗೆ ಕಾಯ್ದು ಬ್ಯಾಂಕ್ ಶಾಖೆಗೆ ಹೋಗುವುದು.',
          isCorrect: false,
          explanation: 'Too late! Scammers withdraw money from ATMs or mule accounts within 2 hours.',
        },
        {
          text: 'Dial 1930 immediately to freeze the recipient account through CFCFRMS within the Golden Hour.',
          textKn: 'ತಕ್ಷಣವೇ 1930 ಗೆ ಕರೆ ಮಾಡಿ ವಂಚಕನ ಖಾತೆಯನ್ನು "ಗೋಲ್ಡನ್ ಅವರ್"ನಲ್ಲಿ ಫ್ರೀಜ್ ಮಾಡಿಸುವುದು.',
          isCorrect: true,
          explanation: 'Correct! National Cyber Crime Reporting Portal (1930) can place an instant inter-bank lien on the fraudster\'s account.',
        },
        {
          text: 'Post on social media asking for help.',
          textKn: 'ಸಾಮಾಜಿಕ ಜಾಲತಾಣದಲ್ಲಿ ಪೋಸ್ಟ್ ಹಾಕುವುದು.',
          isCorrect: false,
          explanation: 'Social media cannot freeze bank accounts.',
        },
      ],
    },
  ];

  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (currentQ.options[idx].isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-emerald-500/40">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Public Safety Cyber Shield Academy</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              {lang === 'kn'
                ? 'ಡೀಪ್‌ಫೇಕ್ ಮತ್ತು ಸೈಬರ್ ವಂಚನೆ ಗುರುತಿಸುವ ತರಬೇತಿ'
                : 'Interactive Citizen Scam & Deepfake Spotter'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Master real-world defense tactics against fake police video calls, generative headshots, and voice clones.
            </p>
          </div>

          <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Score</span>
            <span className="text-lg font-black text-amber-400">
              {score} / {questions.length}
            </span>
          </div>
        </div>
      </div>

      {!isCompleted ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Scenario {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="font-mono text-amber-400">
              {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-amber-500 h-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          {/* Question Title & Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">
              {lang === 'kn' ? currentQ.titleKn : currentQ.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {lang === 'kn' ? currentQ.descriptionKn : currentQ.description}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let btnClass = 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-700';

              if (isAnswered) {
                if (option.isCorrect) {
                  btnClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                } else if (isSelected) {
                  btnClass = 'bg-red-950/60 border-red-500 text-red-200';
                } else {
                  btnClass = 'bg-slate-950/40 border-slate-800/40 opacity-50 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition flex items-start gap-3 ${btnClass}`}
                >
                  <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <div className="flex-1">
                    <span>{lang === 'kn' ? option.textKn : option.text}</span>
                    {isAnswered && (option.isCorrect || isSelected) && (
                      <p className="mt-2 text-xs text-slate-300 pt-2 border-t border-slate-700/50">
                        {option.explanation}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          {isAnswered && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow"
              >
                <span>
                  {currentQuestionIndex + 1 < questions.length
                    ? 'Next Scenario'
                    : 'View Final Cyber Defense Certificate'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Completion Certificate Screen */
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40 shadow-lg">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-white">
              {lang === 'kn' ? 'ಅಭಿನಂದನೆಗಳು! ತರಬೇತಿ ಪೂರ್ಣಗೊಂಡಿದೆ' : 'Congratulations! Cyber Shield Certified'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              You scored <strong className="text-amber-400">{score}</strong> out of{' '}
              <strong className="text-white">{questions.length}</strong> on simulated digital fraud challenges.
            </p>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-xs text-slate-300 max-w-lg mx-auto text-left space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>3 Golden Rules to Protect Yourself and Family:</span>
            </div>
            <p>1. <strong>Hang Up on Video Police:</strong> Police never conduct video arrests or demand bail via UPI.</p>
            <p>2. <strong>Call Back Directly:</strong> Never transfer money based on a voice call from a hospital or police station without calling your relative on their known phone number.</p>
            <p>3. <strong>Act in the Golden Hour:</strong> If money was sent, call <strong>1930</strong> immediately within 2 hours to freeze accounts.</p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Simulator</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
