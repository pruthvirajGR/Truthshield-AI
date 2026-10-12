import React from 'react';
import {
  ShieldAlert,
  PhoneCall,
  Globe,
  FileText,
  ScanEye,
  AlertTriangle,
  Award,
  GraduationCap,
} from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-50">
      {/* Top emergency hotline bar for Karnataka / National cyber safety */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-amber-950/80 border-b border-red-900/40 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-red-300 font-medium">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>
              {lang === 'kn'
                ? 'ಕರ್ನಾಟಕ ಸೈಬರ್ ಪೊಲೀಸ್ ತುರ್ತು ಸಹಾಯವಾಣಿ: 1930 (ಉಚಿತ 24x7) | cybercrime.gov.in'
                : 'Karnataka Cyber Crime Emergency Tipline: 1930 (Toll-Free 24x7) | cybercrime.gov.in'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:1930"
              className="inline-flex items-center gap-1.5 bg-red-600/90 hover:bg-red-500 text-white px-2.5 py-0.5 rounded font-semibold text-[11px] transition"
            >
              <PhoneCall className="w-3 h-3" />
              <span>{lang === 'kn' ? '1930 ಗೆ ಕರೆ ಮಾಡಿ' : 'Call 1930 Now'}</span>
            </a>
            <div className="flex items-center gap-1 bg-slate-800/80 rounded border border-slate-700/60 p-0.5">
              <Globe className="w-3 h-3 text-slate-400 ml-1" />
              <button
                onClick={() => setLang('en')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${
                  lang === 'en'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('kn')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${
                  lang === 'kn'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ಕನ್ನಡ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-red-500 to-indigo-600 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-300 via-amber-100 to-white bg-clip-text text-transparent">
                  {getTranslation(lang, 'appTitle')}
                </h1>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 uppercase tracking-wider">
                  KSP Cyber Defense
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {getTranslation(lang, 'appTagline')}
              </p>
            </div>
          </div>

          {/* Navigation tabs */}
          <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'scanner'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <ScanEye className="w-3.5 h-3.5" />
              <span>{getTranslation(lang, 'tabScanner')}</span>
            </button>

            <button
              onClick={() => setActiveTab('digital-arrest')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'digital-arrest'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/25'
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>{getTranslation(lang, 'tabDigitalArrest')}</span>
            </button>

            <button
              onClick={() => setActiveTab('evidence-lockbox')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'evidence-lockbox'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>{getTranslation(lang, 'tabEvidence')}</span>
            </button>

            <button
              onClick={() => setActiveTab('awareness')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'awareness'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
              <span>{getTranslation(lang, 'tabAwareness')}</span>
            </button>

            <button
              onClick={() => setActiveTab('proposal')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'proposal'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/25'
                  : 'bg-amber-950/40 text-amber-300 hover:bg-amber-900/40 border border-amber-800/40'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{getTranslation(lang, 'tabProposal')}</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
