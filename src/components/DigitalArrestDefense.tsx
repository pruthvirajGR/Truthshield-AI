import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  PhoneCall,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Building2,
  Lock,
  ArrowRight,
  ExternalLink,
  Flame,
  Clock,
  Landmark,
} from 'lucide-react';
import { Language } from '../types';

interface DigitalArrestDefenseProps {
  lang: Language;
  onOpenScannerWithSample: () => void;
}

export const DigitalArrestDefense: React.FC<DigitalArrestDefenseProps> = ({
  lang,
  onOpenScannerWithSample,
}) => {
  // Interactive Scam Screener
  const [answers, setAnswers] = useState<Record<number, boolean>>({});

  const questions = [
    {
      id: 1,
      en: 'Is the caller wearing a police / CBI / customs uniform on a WhatsApp or Skype video call?',
      kn: 'ಕರೆ ಮಾಡಿದ ವ್ಯಕ್ತಿಯು ವಾಟ್ಸಾಪ್ ಅಥವಾ ಸ್ಕೈಪ್ ವೀಡಿಯೊ ಕರೆಯಲ್ಲಿ ಪೊಲೀಸ್ ಅಥವಾ ಸಿಬಿಐ ಸಮವಸ್ತ್ರ ಧರಿಸಿದ್ದಾರೆಯೇ?',
    },
    {
      id: 2,
      en: 'Did they claim a FedEx / DHL parcel with drugs or illegal items was shipped in your name?',
      kn: 'ನಿಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ಡ್ರಗ್ಸ್ ಅಥವಾ ಅಕ್ರಮ ವಸ್ತುಗಳ ಪಾರ್ಸೆಲ್ ಸಿಕ್ಕಿದೆ ಎಂದು ಹೇಳಿದ್ದಾರೆಯೇ?',
    },
    {
      id: 3,
      en: 'Did they warn you not to disconnect the call or tell anyone ("You are under Digital Arrest")?',
      kn: 'ಕರೆಯನ್ನು ಕಟ್ ಮಾಡಬಾರದು ಅಥವಾ ಯಾರಿಗೂ ಹೇಳಬಾರದು ಎಂದು ಬೆದರಿಸಿದ್ದಾರೆಯೇ ("ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್")?',
    },
    {
      id: 4,
      en: 'Are they demanding you transfer money to a "Secret Verification / RBI Clearing Account"?',
      kn: 'ಪರಿಶೀಲನೆಗಾಗಿ "ಆರ್‌ಬಿಐ ಅಥವಾ ಸರ್ಕಾರದ ಖಾತೆ"ಗೆ ಹಣ ವರ್ಗಾಯಿಸಲು ಕೇಳುತ್ತಿದ್ದಾರೆಯೇ?',
    },
    {
      id: 5,
      en: 'Did they send a PDF "Supreme Court / CBI Arrest Warrant" or official stamp via WhatsApp?',
      kn: 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಸುಪ್ರೀಂ ಕೋರ್ಟ್ ಅಥವಾ ಸಿಬಿಐ ಅರೆಸ್ಟ್ ವಾರಂಟ್ ಅಥವಾ ನೋಟಿಸ್ ಕಳುಹಿಸಿದ್ದಾರೆಯೇ?',
    },
  ];

  const handleToggle = (id: number, val: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const yesCount = Object.values(answers).filter(Boolean).length;
  const isHighAlert = yesCount >= 2;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Banner: Crucial Public Safety Truth */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-950 border-2 border-red-600/70 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
              <Flame className="w-3.5 h-3.5" />
              <span>
                {lang === 'kn' ? 'ತುರ್ತು ಸಾರ್ವಜನಿಕ ಎಚ್ಚರಿಕೆ' : 'CRITICAL PUBLIC SAFETY ADVISORY'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {lang === 'kn'
                ? '"ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್" ಎಂಬ ಕಾನೂನು ಭಾರತದಲ್ಲಿ ಇಲ್ಲವೇ ಇಲ್ಲ!'
                : 'There is NO SUCH THING as "Digital Arrest" Under Indian Law!'}
            </h2>

            <p className="text-sm text-red-200 leading-relaxed">
              {lang === 'kn'
                ? 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್, ಸಿಬಿಐ, ಕಸ್ಟಮ್ಸ್ ಅಥವಾ ಇಡಿ ಎಂದಿಗೂ ವೀಡಿಯೊ ಕರೆ ಮೂಲಕ ಯಾರನ್ನೂ ಬಂಧಿಸುವುದಿಲ್ಲ. ಯಾರಾದರೂ ವೀಡಿಯೊ ಕರೆಯಲ್ಲಿ ಬಂಧಿಸುತ್ತೇನೆ ಎಂದು ಬೆದರಿಸಿ ಹಣ ಕೇಳಿದರೆ, ಆ ಕರೆಯನ್ನು ತಕ್ಷಣ ಕಟ್ ಮಾಡಿ 1930 ಗೆ ಕರೆ ಮಾಡಿ.'
                : 'No Indian law enforcement agency (Karnataka State Police, CBI, ED, NIA, or Mumbai Police) will EVER arrest someone, conduct an interrogation, or freeze assets over a WhatsApp, Skype, or Telegram video call. Any video call demanding funds is 100% an extortion scam.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
            <a
              href="tel:1930"
              className="py-3 px-5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-red-600/30 text-center"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{lang === 'kn' ? '1930 ತುರ್ತು ಕರೆ' : 'Emergency Call 1930'}</span>
            </a>
            <button
              onClick={onOpenScannerWithSample}
              className="py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition shadow-lg text-center"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{lang === 'kn' ? 'ನಕಲಿ ಕರೆಯ ಫ್ರೇಮ್ ತಪಾಸಣೆ' : 'Scan Fake Call Sample'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive 60-Second Scam Screener */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <span>
              {lang === 'kn'
                ? 'ನೀವು ವಂಚನೆಗೊಳಗಾಗುತ್ತಿದ್ದೀರಾ? 60-ಸೆಕೆಂಡ್ ತಪಾಸಣೆ'
                : 'Are You Being Scammed Right Now? (60-Second Self-Screening)'}
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'kn'
              ? 'ಕೆಳಗಿನ ಪ್ರಶ್ನೆಗಳಿಗೆ "ಹೌದು" ಅಥವಾ "ಇಲ್ಲ" ಎಂದು ಉತ್ತರಿಸಿ'
              : 'Answer these questions based on the call you received:'}
          </p>
        </div>

        <div className="space-y-3">
          {questions.map((q) => {
            const currentAnswer = answers[q.id];
            return (
              <div
                key={q.id}
                className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <p className="text-xs sm:text-sm text-slate-200 font-medium">
                  {lang === 'kn' ? q.kn : q.en}
                </p>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleToggle(q.id, true)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      currentAnswer === true
                        ? 'bg-red-600 text-white shadow'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{lang === 'kn' ? 'ಹೌದು (Yes)' : 'YES'}</span>
                  </button>
                  <button
                    onClick={() => handleToggle(q.id, false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      currentAnswer === false
                        ? 'bg-emerald-600 text-white shadow'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>{lang === 'kn' ? 'ಇಲ್ಲ (No)' : 'NO'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Screener Result Box */}
        {Object.keys(answers).length > 0 && (
          <div
            className={`p-5 rounded-2xl border transition-all ${
              isHighAlert
                ? 'bg-red-950/70 border-red-500 text-red-200'
                : 'bg-slate-950 border-slate-700 text-slate-300'
            }`}
          >
            {isHighAlert ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-extrabold text-base">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span>
                    {lang === 'kn'
                      ? '⚠️ ತೀವ್ರ ಎಚ್ಚರಿಕೆ: ಇದು 100% ನಕಲಿ ಸೈಬರ್ ವಂಚನೆ!'
                      : '⚠️ CRITICAL ALERT: THIS IS A 100% FRAUDULENT EXTORTION SCAM!'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
                  {lang === 'kn'
                    ? 'ನೀವು ಗುರುತಿಸಿದ ಲಕ್ಷಣಗಳು "ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್" ಮಾಫಿಯಾದ ಲಕ್ಷಣಗಳಾಗಿವೆ. 1 ಪೈಸೆಯನ್ನೂ ಯಾರ ಖಾತೆಗೂ ಕಳುಹಿಸಬೇಡಿ. ಕರೆಯನ್ನು ತಕ್ಷಣ ಕಟ್ ಮಾಡಿ. ನಿಮ್ಮ ಕುಟುಂಬದವರಿಗೆ ತಿಳಿಸಿ ಮತ್ತು ತಕ್ಷಣ 1930 ಗೆ ಕರೆ ಮಾಡಿ.'
                    : 'The signs you checked are textbook markers of the transnational "Digital Arrest" criminal syndicate. DO NOT transfer any funds. Disconnect the video call immediately. You are in NO danger of physical arrest.'}
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href="tel:1930"
                    className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-4 py-2 rounded-lg inline-flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Dial 1930 Karnataka Tipline</span>
                  </a>
                  <a
                    href="https://cybercrime.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-4 py-2 rounded-lg inline-flex items-center gap-1.5"
                  >
                    <span>Visit cybercrime.gov.in</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400">
                Continue answering the questions above or upload any recorded frame to TruthShield AI
                for forensic verification.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Real Indian Police vs Fake Video Call Police: Comparative Anatomy */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-400" />
            <span>
              {lang === 'kn'
                ? 'ನೈಜ ಪೊಲೀಸ್ ಕ್ರಮ vs ನಕಲಿ ವೀಡಿಯೊ ಕರೆ ಪೊಲೀಸ್'
                : 'Real Indian Police Procedure vs Fake Video Call Scammers'}
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Understanding lawful police protocol protects you against digital intimidation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Fake Police Column */}
          <div className="bg-red-950/20 border border-red-900/50 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>Fake "Digital Arrest" Scammers</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>Calls via WhatsApp, Skype, or Telegram video call from strange numbers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>Uses generic khaki shirts with plastic badges or misaligned stars.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>Shows fake banners like "CBI Cyber Cell", often with spelling mistakes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>Demands you isolate in a room and never disconnect the camera.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>Demands money transfer to an "RBI verification / security clearing account".</span>
              </li>
            </ul>
          </div>

          {/* Real Police Column */}
          <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Lawful Indian Police Procedure (KSP / CBI)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Issues written physical notice under Section 41A CrPC / BNSS.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Requires you to visit the local police station in person with legal counsel.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>NEVER conducts an arrest or criminal trial over a mobile video call.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>NEVER asks citizens to transfer money to private or "clearance" bank accounts.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Bail or court fines are ONLY paid directly to a judicial court cashier with receipts.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* The "Golden Hour" Protocol: If You Already Sent Money */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-extrabold text-base">
          <Clock className="w-5 h-5" />
          <span>The "Golden Hour" Protocol: What To Do If You Already Transferred Money</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          If you or someone you know was coerced into transferring money, the first <strong>2 to 3 hours</strong> are critical.
          The Karnataka Cyber Crime Police and RBI have an active inter-bank lien mechanism to freeze funds before scammers cash out:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-amber-400 font-extrabold text-sm">Step 1: Call 1930</span>
            <p className="text-[11px] text-slate-400">
              Call immediately from your mobile. Operators log the transaction into the Citizen Financial Cyber Fraud Reporting System (CFCFRMS).
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-amber-400 font-extrabold text-sm">Step 2: Provide Bank Details</span>
            <p className="text-[11px] text-slate-400">
              State your Account Number, UTR / Transaction ID, and the scammer's beneficiary Account / UPI ID.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-amber-400 font-extrabold text-sm">Step 3: Account Lien Freeze</span>
            <p className="text-[11px] text-slate-400">
              Police systems immediately alert the recipient bank's nodal officer to freeze the funds before ATM withdrawal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
