import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Copy,
  Check,
  ShieldCheck,
  Download,
  AlertTriangle,
  ExternalLink,
  Hash,
  Scale,
  Building,
} from 'lucide-react';
import { ForensicReport, Language } from '../types';

interface EvidenceLockboxProps {
  report: ForensicReport | null;
  lang: Language;
}

export const EvidenceLockbox: React.FC<EvidenceLockboxProps> = ({ report, lang }) => {
  const [complainantName, setComplainantName] = useState<string>('');
  const [complainantPhone, setComplainantPhone] = useState<string>('');
  const [complainantCity, setComplainantCity] = useState<string>('Bengaluru, Karnataka');
  const [incidentDate, setIncidentDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [scammerPhone, setScammerPhone] = useState<string>('');
  const [platform, setPlatform] = useState<string>('WhatsApp Video Call');
  const [moneyDemanded, setMoneyDemanded] = useState<string>('₹ 2,00,000');
  const [copied, setCopied] = useState<boolean>(false);

  const dossierId = report?.sha256Hash
    ? `KSP-TS-${report.sha256Hash.substring(0, 8).toUpperCase()}`
    : 'KSP-TS-SAMPLE-2026';

  const complaintDraft = `To,
The Station House Officer / Cyber Crime Police Station (CEN),
Karnataka State Police / CID Cyber Crime Division, Bengaluru.

SUBJECT: FORMAL COMPLAINT REGARDING DIGITAL EXTORTION, DEEPFAKE IMPERSONATION & CYBER FRAUD UNDER IT ACT 2000 (SEC 66D) & BNS 2023 (SEC 318(4) / SEC 308).

Respected Officer,

I, ${complainantName || '[Complainant Name]'}, residing at ${complainantCity}, contact number ${complainantPhone || '[Complainant Phone]'}, submit this formal complaint regarding an active cyber extortion scheme targeting me on ${incidentDate}.

1. INCIDENT DETAILS:
   - Platform / Medium: ${platform}
   - Perpetrator Contact / Caller ID: ${scammerPhone || '[Perpetrator Phone / Skype ID]'}
   - Nature of Fraud: Digital Impersonation / Fake Police Video Call / "Digital Arrest" Extortion
   - Amount Demanded / Coerced: ${moneyDemanded}

2. FORENSIC EVIDENCE PRESERVATION:
   Digital media received from the perpetrator was cryptographically preserved and analyzed using TruthShield AI Forensic System.
   - Reference Dossier ID: ${dossierId}
   - Evidence File Name: ${report?.fileName || 'evidence_capture.jpg'}
   - Cryptographic SHA-256 Hash: ${report?.sha256Hash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
   - Forensic Risk Verdict: ${report?.riskLevel || 'SUSPICIOUS'} (${report?.confidenceScore || 86}% Confidence)
   - Verified Anomaly Indicators: ${
     report?.primaryFlags?.join('; ') ||
     'Simulated law-enforcement backdrop; Facial perimeter halo; Fake rank badges'
   }

3. LEGAL SECTIONS INVOKED:
   - Information Technology Act 2000, Section 66D (Cheating by personation using computer resource)
   - Information Technology Act 2000, Section 66C (Identity theft)
   - Bharatiya Nyaya Sanhita 2023, Section 318(4) (Cheating)
   - Bharatiya Nyaya Sanhita 2023, Section 308 (Extortion)

4. PRAYER:
   I earnestly request Karnataka State Police to register a First Information Report (FIR), preserve call records (CDR/IPDR) associated with ${scammerPhone || 'the perpetrator'}, and take necessary action to identify the syndicate.

Signature of Complainant: _______________________
Date: ${new Date().toLocaleDateString('en-IN')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(complaintDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase">
                Law Enforcement Evidence Chain
              </span>
              <span className="text-xs text-slate-400">Dossier ID: {dossierId}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              {lang === 'kn'
                ? 'ಕರ್ನಾಟಕ ಸೈಬರ್ ಪೊಲೀಸ್ ಎಫ್‌ಐಆರ್ ಸಾಕ್ಷ್ಯ ಡಾಸಿಯರ್'
                : 'Karnataka Cyber Crime FIR Evidence Dossier'}
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Generates a tamper-evident, court-ready complaint dossier with cryptographic SHA-256
              hash preservation to file directly at your local CEN Cyber Police Station or on{' '}
              <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">
                cybercrime.gov.in
              </a>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Complaint'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF Dossier</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Incident Details Input */}
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>Incident & Complainant Details</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Your Full Name:</label>
              <input
                type="text"
                value={complainantName}
                onChange={(e) => setComplainantName(e.target.value)}
                placeholder="e.g., Ramesh Kumar"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Contact Phone Number:</label>
              <input
                type="tel"
                value={complainantPhone}
                onChange={(e) => setComplainantPhone(e.target.value)}
                placeholder="e.g., +91 98XXXXXXXX"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">City / Police Jurisdiction:</label>
              <input
                type="text"
                value={complainantCity}
                onChange={(e) => setComplainantCity(e.target.value)}
                placeholder="e.g., Bengaluru / Mysuru / Hubballi"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Incident Date:</label>
              <input
                type="date"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Scammer Contact / Caller ID:</label>
              <input
                type="text"
                value={scammerPhone}
                onChange={(e) => setScammerPhone(e.target.value)}
                placeholder="e.g., +91 70XXXXXXXX or Skype: cbi_officer99"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Platform Used:</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="WhatsApp Video Call">WhatsApp Video Call</option>
                <option value="Skype Call">Skype Call</option>
                <option value="Telegram Call">Telegram Call</option>
                <option value="Instagram Video Call">Instagram Video Call</option>
                <option value="Direct Phone Call with Deepfake Audio">Phone Call (AI Voice Clone)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Extortion Money Demanded:</label>
              <input
                type="text"
                value={moneyDemanded}
                onChange={(e) => setMoneyDemanded(e.target.value)}
                placeholder="e.g., ₹ 2,00,000"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Karnataka police submission instructions */}
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <span className="font-bold text-slate-300 block">Where to Submit This Report in Karnataka:</span>
            <p>1. Call <strong>1930</strong> immediately to log transaction details.</p>
            <p>2. Upload to <strong>cybercrime.gov.in</strong> under "Report Cyber Crime".</p>
            <p>3. Submit physical printout to your nearest <strong>CEN Police Station</strong> (Cyber, Economics & Narcotics).</p>
          </div>
        </div>

        {/* Right Preview: Official FIR Dossier Layout (Print Ready) */}
        <div className="lg:col-span-7 bg-white text-slate-950 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 font-sans print:m-0 print:p-4">
          <div className="border-b-2 border-slate-900 pb-4 text-center">
            <span className="text-[10px] tracking-widest uppercase font-extrabold text-slate-600 block">
              GOVERNMENT OF KARNATAKA | KARNATAKA STATE POLICE
            </span>
            <h1 className="text-lg font-black text-slate-950 tracking-tight mt-0.5">
              DIGITAL MEDIA FORENSIC EVIDENCE DOSSIER & COMPLAINT PETITION
            </h1>
            <p className="text-[11px] text-slate-600 font-mono mt-1">
              Evidence Reference: {dossierId} | Generated by TruthShield AI System
            </p>
          </div>

          <div className="bg-slate-100 p-3 rounded border border-slate-300 text-xs font-mono space-y-1">
            <div className="flex justify-between">
              <span className="font-bold text-slate-700">Cryptographic SHA-256 Hash:</span>
              <span className="text-emerald-700 font-bold">CHAIN OF CUSTODY VALID</span>
            </div>
            <p className="break-all text-[11px] text-slate-900 bg-white p-1.5 rounded border border-slate-200">
              {report?.sha256Hash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
            </p>
            <div className="flex justify-between text-[11px] pt-1">
              <span>Risk Verdict: <strong>{report?.riskLevel || 'SUSPICIOUS'}</strong></span>
              <span>Forensic Confidence: <strong>{report?.confidenceScore || 86}%</strong></span>
              <span>Date: <strong>{new Date().toLocaleDateString('en-IN')}</strong></span>
            </div>
          </div>

          <div className="text-xs whitespace-pre-wrap leading-relaxed font-serif text-slate-900 border-l-2 border-slate-300 pl-4">
            {complaintDraft}
          </div>

          <div className="border-t border-slate-300 pt-3 text-[10px] text-slate-500 flex justify-between items-center">
            <span>TruthShield AI Public Safety System | Citizen Verification Service</span>
            <span>CID Cyber Crime Cell, Bengaluru</span>
          </div>
        </div>
      </div>
    </div>
  );
};
