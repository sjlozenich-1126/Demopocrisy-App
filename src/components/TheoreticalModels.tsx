import React, { useState } from 'react';
import {
  STRATIGRAPHIC_LAYERS,
  INSTITUTIONAL_PROCESSING_CYCLE,
  DEFENSE_LOOP_PHASES,
  EPISTEMIC_INVERSION_COMPARISON
} from '../data/forensicAnalysisData';
import { Layers, RefreshCw, SplitSquareVertical, ArrowDown, ChevronRight, ShieldCheck, Database, HardDrive, AlertTriangle } from 'lucide-react';

export const TheoreticalModels: React.FC = () => {
  const [activeModel, setActiveModel] = useState<'stratigraphic' | 'cycle' | 'inversion' | 'defenseLoop'>('stratigraphic');
  const [selectedLayer, setSelectedLayer] = useState<number>(3);
  const [selectedCycleStep, setSelectedCycleStep] = useState<number>(1);

  return (
    <section className="py-8 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-6 border-b border-black/10">
          <div>
            <div className="text-xs font-mono-code text-[#E53935] uppercase font-semibold tracking-wider mb-1">
              MODULE 03 · THEORETICAL & DIAGNOSTIC MODELS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-sans">
              Procedural Hardening & Systemic Frameworks
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans mt-1 max-w-3xl">
              Formal analytical frameworks explaining how early unverified entries convert into permanent legal dogma, how institutions process dissent, and why the system endlessly recycles subjects.
            </p>
          </div>

          {/* Model Switcher Segmented Control */}
          <div className="flex flex-wrap items-center gap-1 bg-neutral-100 p-1 rounded border border-black/5 text-xs font-mono-code">
            <button
              onClick={() => setActiveModel('stratigraphic')}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeModel === 'stratigraphic'
                  ? 'bg-white text-neutral-900 font-semibold shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Stratigraphic Model (6 Layers)
            </button>
            <button
              onClick={() => setActiveModel('cycle')}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeModel === 'cycle'
                  ? 'bg-white text-neutral-900 font-semibold shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              7-Step Processing Cycle
            </button>
            <button
              onClick={() => setActiveModel('inversion')}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeModel === 'inversion'
                  ? 'bg-white text-neutral-900 font-semibold shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Epistemic Inversion Split-Screen
            </button>
            <button
              onClick={() => setActiveModel('defenseLoop')}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeModel === 'defenseLoop'
                  ? 'bg-white text-neutral-900 font-semibold shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              6-Phase Defense Loop
            </button>
          </div>
        </div>

        {/* MODEL 1: Stratigraphic Model Viewer */}
        {activeModel === 'stratigraphic' && (
          <div className="space-y-6">
            <div className="bg-white border border-black/10 rounded-lg p-5 shadow-2xs">
              <h3 className="text-sm font-bold font-mono-code uppercase text-neutral-900 mb-1">
                The Stratigraphic Model of Procedural Hardening
              </h3>
              <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                Legal proceedings are modeled as layered geological strata. Early flawed entries (unfiled complaints, expired protective order flags, data breach context) harden upward into &ldquo;administrative dogma&rdquo; that subsequent judges, evaluators, and prosecutors treat as verified historical fact.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Geological Column (7 cols) */}
              <div className="lg:col-span-7 space-y-2.5">
                <div className="text-[11px] font-mono-code text-neutral-500 uppercase flex items-center justify-between">
                  <span>SURFACE (PRESENT-DAY RECORD)</span>
                  <span>HARDENS UPWARD ▲</span>
                </div>

                {STRATIGRAPHIC_LAYERS.map((layer) => {
                  const isSelected = selectedLayer === layer.layerNumber;
                  return (
                    <div
                      key={layer.layerNumber}
                      onClick={() => setSelectedLayer(layer.layerNumber)}
                      className={`p-4 rounded-lg border transition-all cursor-pointer select-none ${
                        isSelected
                          ? 'bg-white border-[#E53935] ring-2 ring-red-100 shadow-xs'
                          : 'bg-white border-black/10 hover:border-black/25'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono-code mb-1">
                        <span className={`font-bold ${isSelected ? 'text-[#E53935]' : 'text-neutral-900'}`}>
                          LAYER 0{layer.layerNumber} — {layer.name}
                        </span>
                        <span className="text-neutral-500">{layer.epoch}</span>
                      </div>
                      <p className="text-xs text-neutral-700 font-sans line-clamp-2">
                        {layer.content}
                      </p>
                    </div>
                  );
                })}

                <div className="text-[11px] font-mono-code text-neutral-500 uppercase flex items-center justify-between pt-1">
                  <span>BEDROCK (2020 ORIGIN BREACH)</span>
                  <span>INITIAL FRACTURE</span>
                </div>
              </div>

              {/* Layer Inspector (5 cols) */}
              <div className="lg:col-span-5 bg-white border border-black/10 rounded-lg p-5 shadow-2xs space-y-4">
                {(() => {
                  const curr = STRATIGRAPHIC_LAYERS.find(l => l.layerNumber === selectedLayer) || STRATIGRAPHIC_LAYERS[0];
                  return (
                    <>
                      <div className="border-b border-black/10 pb-3">
                        <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 uppercase">
                          STRATUM 0{curr.layerNumber} · {curr.epoch}
                        </span>
                        <h4 className="text-base font-bold font-mono-code text-neutral-900 mt-1">
                          {curr.name}
                        </h4>
                      </div>

                      <div className="space-y-3 text-xs font-sans">
                        <div>
                          <strong className="font-mono-code font-bold text-neutral-900 uppercase block mb-1">
                            Documented Strata Content:
                          </strong>
                          <p className="text-neutral-700 leading-relaxed bg-neutral-50 p-3 rounded border border-black/5">
                            {curr.content}
                          </p>
                        </div>

                        <div>
                          <strong className="font-mono-code font-bold text-[#E53935] uppercase block mb-1">
                            Systemic Hardening Mechanism:
                          </strong>
                          <p className="text-neutral-700 leading-relaxed bg-red-50/40 p-3 rounded border border-red-100">
                            {curr.systemicFunction}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 text-[11px] font-mono-code text-neutral-500">
                        Rule: Each layer hardens the one beneath it. Later actors treat upper strata as verified substrate without examining origin foundations.
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* MODEL 2: 7-Step Cycle of Institutional Processing */}
        {activeModel === 'cycle' && (
          <div className="space-y-6">
            <div className="bg-white border border-black/10 rounded-lg p-5 shadow-2xs">
              <h3 className="text-sm font-bold font-mono-code uppercase text-neutral-900 mb-1">
                The 7-Step Cycle of Institutional Processing (Clarion Sentinel Model)
              </h3>
              <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                Diagnostic lifecycle tracing how municipal and county systems respond when confronted by complex technological and procedural grievances.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-3">
              {INSTITUTIONAL_PROCESSING_CYCLE.map((step) => {
                const isSelected = selectedCycleStep === step.step;
                return (
                  <button
                    key={step.step}
                    onClick={() => setSelectedCycleStep(step.step)}
                    className={`text-left p-4 rounded-lg border transition-all cursor-pointer flex flex-col justify-between h-full ${
                      isSelected
                        ? 'bg-white border-[#E53935] ring-2 ring-red-100 shadow-xs'
                        : 'bg-white border-black/10 hover:border-black/25'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono-code text-[#E53935] font-bold block mb-1">
                        STEP 0{step.step}
                      </span>
                      <h4 className="text-xs font-bold font-mono-code text-neutral-900 leading-tight mb-2">
                        {step.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-neutral-600 font-sans line-clamp-3">
                      {step.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Step Full Detail */}
            <div className="bg-white border border-black/10 rounded-lg p-6 shadow-2xs">
              {(() => {
                const step = INSTITUTIONAL_PROCESSING_CYCLE.find(s => s.step === selectedCycleStep) || INSTITUTIONAL_PROCESSING_CYCLE[0];
                return (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono-code text-[#E53935]">
                      <span className="font-bold">PHASE 0{step.step} OF 07:</span>
                      <span className="text-neutral-900 font-bold uppercase">{step.name}</span>
                    </div>
                    <p className="text-sm text-neutral-800 font-sans leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* MODEL 3: Epistemic Inversion Split-Screen Engine */}
        {activeModel === 'inversion' && (
          <div className="space-y-6">
            <div className="bg-white border border-black/10 rounded-lg p-5 shadow-2xs">
              <h3 className="text-sm font-bold font-mono-code uppercase text-neutral-900 mb-1">
                The Epistemic Inversion Model (Cybernetic / Operating System Dynamic)
              </h3>
              <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                A split-screen comparative analysis exposing how institutional charts and automated alerts are treated as unimpeachable reality, while the defendant&rsquo;s physical hardware, lab data, and logs are treated as psychiatric hallucination.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Institutional Side */}
              <div className="bg-white border border-neutral-300 rounded-lg p-5 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 border-b border-black/10 pb-3">
                  <Database className="w-4 h-4 text-neutral-700" />
                  <div>
                    <h4 className="text-sm font-bold font-mono-code text-neutral-900">
                      {EPISTEMIC_INVERSION_COMPARISON.institutionalSide.title}
                    </h4>
                    <span className="text-[11px] font-mono-code text-neutral-500">
                      Authority: {EPISTEMIC_INVERSION_COMPARISON.institutionalSide.authorityLevel}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs font-sans text-neutral-800">
                  {EPISTEMIC_INVERSION_COMPARISON.institutionalSide.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded border border-black/5">
                      <span className="text-neutral-400 font-mono-code text-[11px] mt-0.5">[{i + 1}]</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-black/5 text-[11px] font-mono-code text-neutral-500">
                  FLOW: Narrative control flows in one unilateral downward direction. Outdegree = 0.
                </div>
              </div>

              {/* Operating Subject Side */}
              <div className="bg-white border border-[#E53935]/40 rounded-lg p-5 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 border-b border-black/10 pb-3">
                  <HardDrive className="w-4 h-4 text-[#E53935]" />
                  <div>
                    <h4 className="text-sm font-bold font-mono-code text-[#E53935]">
                      {EPISTEMIC_INVERSION_COMPARISON.defendantSide.title}
                    </h4>
                    <span className="text-[11px] font-mono-code text-neutral-500">
                      Authority: {EPISTEMIC_INVERSION_COMPARISON.defendantSide.authorityLevel}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs font-sans text-neutral-800">
                  {EPISTEMIC_INVERSION_COMPARISON.defendantSide.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 bg-red-50/30 p-2.5 rounded border border-red-100">
                      <span className="text-[#E53935] font-mono-code text-[11px] mt-0.5">[{i + 1}]</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-black/5 text-[11px] font-mono-code text-neutral-700">
                  RESULT: Defendant&rsquo;s outbound edges are structurally severed. Reality is inverted until counter-archive external pressure intervenes.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODEL 4: 6-Phase Institutional Defense Loop */}
        {activeModel === 'defenseLoop' && (
          <div className="space-y-6">
            <div className="bg-white border border-black/10 rounded-lg p-5 shadow-2xs">
              <h3 className="text-sm font-bold font-mono-code uppercase text-neutral-900 mb-1">
                The 6-Phase Institutional Defense Loop
              </h3>
              <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                Rather than resolving cases through trial, the system cycles subjects through a self-reinforcing loop that protects institutional actors from accountability while generating detention volume.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DEFENSE_LOOP_PHASES.map((phase) => (
                <div key={phase.phase} className="bg-white border border-black/10 rounded-lg p-4 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-code mb-2">
                      <span className="font-bold text-[#E53935]">PHASE 0{phase.phase}</span>
                      <span className="text-neutral-400">CYCLE STEP</span>
                    </div>
                    <h4 className="text-sm font-bold font-mono-code text-neutral-900 mb-2">
                      {phase.title}
                    </h4>
                    <p className="text-xs text-neutral-700 font-sans leading-relaxed">
                      {phase.detail}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-black/5 flex items-center justify-between text-[10px] font-mono-code text-neutral-400">
                    <span>RECURSIVE LOOP</span>
                    <span>→ NEXT PHASE</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
