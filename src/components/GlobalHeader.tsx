import React, { useState } from 'react';
import { Menu, X, FileText, Share2, Shield, FolderGit2 } from 'lucide-react';

interface GlobalHeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenCivilAction: () => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenCivilAction
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'vault', label: 'Evidence Vault' },
    { id: 'timeline', label: 'Interactive Timeline' },
    { id: 'network', label: '57-Node Network (SNA)' },
    { id: 'models', label: 'Diagnostic Models' },
    { id: 'reforms', label: 'Reform Matrix' },
    { id: 'investigations', label: 'Investigative Series' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F9F9F9]/95 backdrop-blur-md border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single Text Element with subtle architectural mark) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('overview')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded border border-neutral-800 bg-neutral-900 flex items-center justify-center text-white font-mono-code font-bold text-xs tracking-tighter group-hover:border-[#E53935] transition-colors">
              <span className="text-[#E53935]">D</span>M
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-neutral-900 block leading-tight font-mono-code">
                DEMOPOCRISY
              </span>
              <span className="text-[10px] tracking-wider uppercase text-neutral-600 block font-mono-code">
                Forensic Laboratory & Archive · WA 2021–2026
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single line, no wrapping, clean hover state) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono-code font-medium text-neutral-600">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
                activeTab === item.id
                  ? 'text-[#E53935] border-[#E53935] font-semibold'
                  : 'border-transparent text-neutral-600 hover:text-neutral-950 hover:border-neutral-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action Button */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCivilAction}
            className="px-3.5 py-1.5 text-xs font-mono-code font-medium text-white bg-[#E53935] hover:bg-[#c62828] rounded transition-colors whitespace-nowrap shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>June 2026 Civil Action</span>
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded border border-black/10 text-neutral-700 hover:bg-neutral-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F9F9F9] border-b border-black/10 px-4 py-3 space-y-1 font-mono-code text-xs">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded transition-colors ${
                activeTab === item.id
                  ? 'bg-neutral-200 text-[#E53935] font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-black/10">
            <button
              onClick={() => {
                onOpenCivilAction();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center px-3 py-2 bg-[#E53935] text-white font-medium rounded text-xs"
            >
              View June 2026 Civil Action
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
