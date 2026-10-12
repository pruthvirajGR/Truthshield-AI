import React, { useState } from 'react';
import { Header } from './components/Header';
import { StepByStepScanner } from './components/StepByStepScanner';
import { DigitalArrestDefense } from './components/DigitalArrestDefense';
import { EvidenceLockbox } from './components/EvidenceLockbox';
import { ScamSpotterGame } from './components/ScamSpotterGame';
import { KarnatakaCyberProposalKit } from './components/KarnatakaCyberProposalKit';
import { ForensicReport, Language } from './types';
import { ShieldAlert, PhoneCall, Building2, ExternalLink } from 'lucide-react';
import { getTranslation } from './utils/translations';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('scanner');
  const [lang, setLang] = useState<Language>('en');
  const [currentReport, setCurrentReport] = useState<ForensicReport | null>(null);

  const handleOpenEvidenceDossier = (report: ForensicReport) => {
    setCurrentReport(report);
    setActiveTab('evidence-lockbox');
  };

  const handleGoToDigitalArrest = () => {
    setActiveTab('digital-arrest');
  };

  const handleOpenScannerWithSample = () => {
    setActiveTab('scanner');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Universal Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'scanner' && (
          <StepByStepScanner
            lang={lang}
            onOpenEvidenceDossier={handleOpenEvidenceDossier}
            onGoToDigitalArrest={handleGoToDigitalArrest}
          />
        )}

        {activeTab === 'digital-arrest' && (
          <DigitalArrestDefense
            lang={lang}
            onOpenScannerWithSample={handleOpenScannerWithSample}
          />
        )}

        {activeTab === 'evidence-lockbox' && (
          <EvidenceLockbox report={currentReport} lang={lang} />
        )}

        {activeTab === 'awareness' && <ScamSpotterGame lang={lang} />}

        {activeTab === 'proposal' && <KarnatakaCyberProposalKit lang={lang} />}
      </main>

      {/* Footer with Karnataka Police & 1930 Tipline Info */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 mt-12 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-sm">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>TruthShield AI — Karnataka Public Safety Initiative</span>
            </div>
            <p className="text-[11px] text-slate-500 max-w-md">
              Dedicated to protecting citizens from deepfake video fraud, "Digital Arrest" extortion,
              and online impersonation. Developed for public defense and law enforcement assistance.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <a
              href="tel:1930"
              className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 font-bold"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>National Cyber Tipline: 1930</span>
            </a>
            <span className="text-slate-700">•</span>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-white transition"
            >
              <span>cybercrime.gov.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-700">•</span>
            <a
              href="https://ksp.karnataka.gov.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-white transition"
            >
              <Building2 className="w-3 h-3 text-indigo-400" />
              <span>Karnataka State Police (KSP)</span>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 pt-4 border-t border-slate-900 text-[10px] text-slate-500 text-center flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>
            LEGAL DISCLAIMER: Deepfake detection outputs are probabilistic investigative aids. They do not constitute formal judicial certification.
          </span>
          <span>
            Zero Permanent Media Retention • Client-Side Cryptographic Hashing
          </span>
        </div>
      </footer>
    </div>
  );
}
