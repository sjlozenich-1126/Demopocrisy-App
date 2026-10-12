import React, { useState, useMemo } from 'react';
import { SNA_NODES, SNA_EDGES } from '../data/forensicAnalysisData';
import { NetworkNode, NetworkEdge } from '../types';
import { Network, Filter, ZoomIn, ZoomOut, RotateCcw, AlertTriangle, ShieldCheck, Compass, Info, X } from 'lucide-react';

interface SystemsNetworkMapProps {
  onSelectCase?: (caseNumber: string) => void;
}

export const SystemsNetworkMap: React.FC<SystemsNetworkMapProps> = ({ onSelectCase }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'bridge' | 'epicenter' | 'harm' | 'asymmetry' | 'rootgap'>('all');
  const [activeNode, setActiveNode] = useState<NetworkNode | null>(SNA_NODES.find(n => n.id === 'spd') || null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Filtered nodes based on topology highlights
  const highlightedNodeIds = useMemo(() => {
    switch (selectedFilter) {
      case 'bridge':
        // SPD + directly connected nodes
        const spdNeighbors = SNA_EDGES.filter(e => e.source === 'spd' || e.target === 'spd').flatMap(e => [e.source, e.target]);
        return new Set(['spd', ...spdNeighbors]);
      case 'epicenter':
        // Case 21-1 + neighbors
        const epicNeighbors = SNA_EDGES.filter(e => e.source === 'case-21-1' || e.target === 'case-21-1').flatMap(e => [e.source, e.target]);
        return new Set(['case-21-1', ...epicNeighbors]);
      case 'harm':
        // Case 658959 + medical pipeline
        const harmNeighbors = SNA_EDGES.filter(e => e.source === 'case-658959' || e.target === 'case-658959').flatMap(e => [e.source, e.target]);
        return new Set(['case-658959', 'harborview', 'apple-health', 'fm-substitution', 'fm-tech-harassment', ...harmNeighbors]);
      case 'asymmetry':
        // All agencies with outDegree === 0
        return new Set(SNA_NODES.filter(n => n.category === 'Agency').map(n => n.id));
      case 'rootgap':
        // Economic root cause + case 664676
        return new Set(['case-664676', 'fm-economic-root', 'rf-economic-decoupling']);
      default:
        return null; // All visible
    }
  }, [selectedFilter]);

  // Coordinate positioning generator for visual layout (Circular / layered forensic grid)
  const nodeCoordinates = useMemo(() => {
    const coords: { [id: string]: { x: number; y: number } } = {};
    const width = 860;
    const height = 540;
    const centerX = width / 2;
    const centerY = height / 2;

    // 1. Cases in an inner ellipse
    const cases = SNA_NODES.filter(n => n.category === 'Case');
    cases.forEach((c, idx) => {
      const angle = (idx / cases.length) * 2 * Math.PI - Math.PI / 2;
      coords[c.id] = {
        x: centerX + Math.cos(angle) * 140,
        y: centerY + Math.sin(angle) * 100
      };
    });

    // 2. SPD placed strategically at center-top bridge
    coords['spd'] = { x: centerX, y: centerY - 45 };

    // 3. Agencies placed on mid-left/top ring
    const agencies = SNA_NODES.filter(n => n.category === 'Agency' && n.id !== 'spd');
    agencies.forEach((a, idx) => {
      const angle = (idx / agencies.length) * 2 * Math.PI + Math.PI / 3;
      coords[a.id] = {
        x: centerX + Math.cos(angle) * 250,
        y: centerY + Math.sin(angle) * 180
      };
    });

    // 4. Failure Modes placed on right quadrant
    const failureModes = SNA_NODES.filter(n => n.category === 'FailureMode');
    failureModes.forEach((fm, idx) => {
      const angle = (idx / failureModes.length) * Math.PI + Math.PI / 2;
      coords[fm.id] = {
        x: centerX + 260 + Math.cos(angle) * 110,
        y: centerY + Math.sin(angle) * 200
      };
    });

    // 5. Reforms placed on bottom/periphery
    const reforms = SNA_NODES.filter(n => n.category === 'Reform');
    reforms.forEach((rf, idx) => {
      const angle = (idx / reforms.length) * Math.PI - Math.PI;
      coords[rf.id] = {
        x: centerX - 260 + Math.cos(angle) * 110,
        y: centerY + Math.sin(angle) * 200
      };
    });

    return coords;
  }, []);

  return (
    <section className="py-8 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-6 border-b border-black/10">
          <div>
            <div className="text-xs font-mono-code text-[#E53935] uppercase font-semibold tracking-wider mb-1">
              MODULE 02 · SOCIAL NETWORK ANALYSIS (SNA)
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-sans">
              Systems Topology & 57-Node Network Map
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans mt-1 max-w-3xl">
              Mathematical exposure of institutional chokepoints and harm vectors across 7 cases, 18 agencies, 19 failure modes, and 10 reforms connected by 80 directional edges.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-code bg-white border border-black/10 px-2.5 py-1 rounded text-neutral-700">
              Clarion Sentinel & Kumu Dataset
            </span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white border border-black/10 rounded-lg p-4 mb-6 shadow-2xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs font-mono-code text-neutral-500 uppercase font-semibold">
              TOPOLOGICAL HIGHLIGHT FILTERS:
            </div>
            <div className="text-xs font-mono-code text-neutral-500">
              Click any node in canvas to inspect centrality metrics
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-mono-code">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer border ${
                selectedFilter === 'all'
                  ? 'bg-neutral-900 border-neutral-900 text-white font-semibold'
                  : 'bg-neutral-50 border-black/10 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              All 57 Nodes (Full Graph)
            </button>

            <button
              onClick={() => {
                setSelectedFilter('bridge');
                setActiveNode(SNA_NODES.find(n => n.id === 'spd') || null);
              }}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer border ${
                selectedFilter === 'bridge'
                  ? 'bg-[#E53935] border-[#E53935] text-white font-semibold'
                  : 'bg-neutral-50 border-black/10 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Structural Bridge: SPD (0.0040 Betweenness)
            </button>

            <button
              onClick={() => {
                setSelectedFilter('epicenter');
                setActiveNode(SNA_NODES.find(n => n.id === 'case-21-1') || null);
              }}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer border ${
                selectedFilter === 'epicenter'
                  ? 'bg-neutral-900 border-neutral-900 text-white font-semibold'
                  : 'bg-neutral-50 border-black/10 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Diagnostic Epicenter: Case 21-1 (0.311 Closeness)
            </button>

            <button
              onClick={() => {
                setSelectedFilter('harm');
                setActiveNode(SNA_NODES.find(n => n.id === 'case-658959') || null);
              }}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer border ${
                selectedFilter === 'harm'
                  ? 'bg-[#E53935] border-[#E53935] text-white font-semibold'
                  : 'bg-neutral-50 border-black/10 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Harm Vector Efficiency: Case 658959 (29.6% Reach)
            </button>

            <button
              onClick={() => setSelectedFilter('asymmetry')}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer border ${
                selectedFilter === 'asymmetry'
                  ? 'bg-neutral-900 border-neutral-900 text-white font-semibold'
                  : 'bg-neutral-50 border-black/10 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Outdegree Asymmetry (Agencies = 0)
            </button>

            <button
              onClick={() => {
                setSelectedFilter('rootgap');
                setActiveNode(SNA_NODES.find(n => n.id === 'fm-economic-root') || null);
              }}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer border ${
                selectedFilter === 'rootgap'
                  ? 'bg-purple-900 border-purple-900 text-white font-semibold'
                  : 'bg-neutral-50 border-black/10 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              The Root Cause Gap (Economic Incentive: 0 Reforms)
            </button>
          </div>
        </div>

        {/* Network Canvas & Inspector 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* SVG Graph View (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-black/10 rounded-lg overflow-hidden shadow-2xs relative">
            {/* Top Toolbar overlay */}
            <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-xs border border-black/10 px-2.5 py-1 rounded text-[11px] font-mono-code text-neutral-700 flex items-center gap-3">
              <span>CANVAS: D3 / Kumu Topology</span>
              <span>ZOOM: {(zoomLevel * 100).toFixed(0)}%</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setZoomLevel(Math.min(zoomLevel + 0.15, 1.6))}
                  className="p-0.5 hover:bg-neutral-200 rounded"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(Math.max(zoomLevel - 0.15, 0.7))}
                  className="p-0.5 hover:bg-neutral-200 rounded"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-0.5 hover:bg-neutral-200 rounded"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Canvas Legend */}
            <div className="absolute bottom-3 left-3 z-10 bg-white/95 backdrop-blur-xs border border-black/10 px-3 py-1.5 rounded text-[10px] font-mono-code text-neutral-700 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full border border-neutral-900 bg-white inline-block" />
                <span>Cases (7)</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-neutral-200 border border-neutral-400 inline-block" />
                <span>Agencies (18)</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-[#E53935] inline-block" />
                <span>Failure Modes (19)</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-sky-100 border border-sky-600 inline-block" />
                <span>Reforms (10)</span>
              </span>
            </div>

            {/* Interactive SVG Surface */}
            <div className="w-full h-[520px] overflow-auto flex items-center justify-center p-2 bg-[#FAF9F6]">
              <svg
                viewBox="0 0 860 540"
                className="w-full h-full select-none"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.15s ease' }}
              >
                {/* Edges */}
                <g className="edges">
                  {SNA_EDGES.map((edge) => {
                    const src = nodeCoordinates[edge.source];
                    const tgt = nodeCoordinates[edge.target];
                    if (!src || !tgt) return null;

                    const isHighlighted = highlightedNodeIds
                      ? highlightedNodeIds.has(edge.source) && highlightedNodeIds.has(edge.target)
                      : true;

                    const isDirectToActive = activeNode
                      ? edge.source === activeNode.id || edge.target === activeNode.id
                      : false;

                    let strokeColor = 'rgba(0,0,0,0.12)';
                    let strokeWidth = 1;

                    if (edge.type === 'Root cause mechanism') {
                      strokeColor = '#7B1FA2';
                      strokeWidth = 2;
                    } else if (edge.type === 'Remedied by') {
                      strokeColor = 'rgba(2, 132, 199, 0.45)';
                    } else if (edge.type === 'Suffers procedural breakdown') {
                      strokeColor = 'rgba(229, 57, 53, 0.5)';
                      strokeWidth = 1.5;
                    }

                    if (isDirectToActive) {
                      strokeColor = '#E53935';
                      strokeWidth = 2.5;
                    } else if (highlightedNodeIds && !isHighlighted) {
                      strokeColor = 'rgba(0,0,0,0.04)';
                      strokeWidth = 0.5;
                    }

                    return (
                      <line
                        key={edge.id}
                        x1={src.x}
                        y1={src.y}
                        x2={tgt.x}
                        y2={tgt.y}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeDasharray={edge.type.includes('breakdown') ? '4 3' : undefined}
                      />
                    );
                  })}
                </g>

                {/* Nodes */}
                <g className="nodes">
                  {SNA_NODES.map((node) => {
                    const pos = nodeCoordinates[node.id];
                    if (!pos) return null;

                    const isDimmed = highlightedNodeIds && !highlightedNodeIds.has(node.id);
                    const isSelected = activeNode?.id === node.id;
                    const isSpdBridge = node.id === 'spd';

                    return (
                      <g
                        key={node.id}
                        transform={`translate(${pos.x}, ${pos.y})`}
                        onClick={() => setActiveNode(node)}
                        className="cursor-pointer transition-opacity"
                        opacity={isDimmed ? 0.22 : 1}
                      >
                        {/* Circle for Case */}
                        {node.shape === 'circle' && (
                          <circle
                            r={node.degree >= 12 ? 15 : 12}
                            fill={isSelected ? '#111827' : '#FFFFFF'}
                            stroke={isSelected ? '#E53935' : '#1e3a8a'}
                            strokeWidth={isSelected ? 3 : 2}
                          />
                        )}

                        {/* Square for Agency */}
                        {node.shape === 'square' && (
                          <rect
                            x={isSpdBridge ? -16 : -11}
                            y={isSpdBridge ? -16 : -11}
                            width={isSpdBridge ? 32 : 22}
                            height={isSpdBridge ? 32 : 22}
                            fill={isSpdBridge ? (isSelected ? '#000' : '#E53935') : isSelected ? '#111827' : '#E5E7EB'}
                            stroke={isSpdBridge ? '#B71C1C' : isSelected ? '#E53935' : '#9CA3AF'}
                            strokeWidth={isSpdBridge ? 2.5 : isSelected ? 2.5 : 1.5}
                            rx={2}
                          />
                        )}

                        {/* Triangle for Failure Mode */}
                        {node.shape === 'triangle' && (
                          <polygon
                            points="0,-13 11,8 -11,8"
                            fill={node.id === 'fm-economic-root' ? '#7B1FA2' : isSelected ? '#B71C1C' : '#FEE2E2'}
                            stroke={isSelected ? '#000' : '#DC2626'}
                            strokeWidth={isSelected ? 2.5 : 1.5}
                          />
                        )}

                        {/* Hexagon for Reform */}
                        {node.shape === 'hexagon' && (
                          <polygon
                            points="0,-11 10,-5 10,6 0,11 -10,6 -10,-5"
                            fill={isSelected ? '#0369A1' : '#E0F2FE'}
                            stroke={isSelected ? '#000' : '#0284C7'}
                            strokeWidth={isSelected ? 2.5 : 1.5}
                          />
                        )}

                        {/* Node Label */}
                        <text
                          y={node.shape === 'square' && isSpdBridge ? 24 : 18}
                          textAnchor="middle"
                          className="font-mono-code text-[9px] font-medium pointer-events-none fill-neutral-900"
                          style={{
                            fontWeight: isSelected || isSpdBridge ? '700' : '500',
                            fill: isSelected ? '#E53935' : isSpdBridge ? '#B71C1C' : '#1F2937'
                          }}
                        >
                          {node.label.length > 20 ? node.label.slice(0, 18) + '…' : node.label}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
          </div>

          {/* Node Inspector Panel (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-black/10 rounded-lg p-5 shadow-2xs space-y-4">
            {activeNode ? (
              <>
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-black/10">
                  <div>
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 uppercase border border-black/5">
                      {activeNode.category} Node
                    </span>
                    <h3 className="text-base font-bold font-mono-code text-neutral-900 mt-1">
                      {activeNode.label}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveNode(null)}
                    className="text-neutral-400 hover:text-neutral-700 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Centrality Metrics Block */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono-code">
                  <div className="p-2.5 bg-neutral-50 rounded border border-black/5">
                    <span className="text-[10px] text-neutral-500 uppercase block">Total Degree</span>
                    <span className="text-base font-bold text-neutral-900">{activeNode.degree}</span>
                  </div>
                  <div className="p-2.5 bg-neutral-50 rounded border border-black/5">
                    <span className="text-[10px] text-neutral-500 uppercase block">Betweenness</span>
                    <span className="text-base font-bold text-[#E53935]">
                      {activeNode.betweenness !== undefined ? activeNode.betweenness.toFixed(4) : '0.0000'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-neutral-50 rounded border border-black/5">
                    <span className="text-[10px] text-neutral-500 uppercase block">Closeness</span>
                    <span className="text-base font-bold text-neutral-900">
                      {activeNode.closeness !== undefined ? activeNode.closeness.toFixed(3) : '0.000'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-neutral-50 rounded border border-black/5">
                    <span className="text-[10px] text-neutral-500 uppercase block">Reach Efficiency</span>
                    <span className="text-base font-bold text-neutral-900">
                      {activeNode.reachEfficiency !== undefined ? activeNode.reachEfficiency.toFixed(3) : '—'}
                    </span>
                  </div>
                </div>

                {/* Description & Diagnostic Insight */}
                <div className="space-y-2">
                  <div className="text-xs font-bold font-mono-code text-neutral-900 uppercase">
                    Diagnostic Role in System Model:
                  </div>
                  <p className="text-xs text-neutral-700 font-sans leading-relaxed bg-neutral-50 p-3 rounded border border-black/5">
                    {activeNode.description}
                  </p>
                </div>

                {/* Connected Edges */}
                <div className="space-y-1.5 pt-2 border-t border-black/10">
                  <div className="text-[11px] font-bold font-mono-code text-neutral-900 uppercase">
                    Connected Relationships ({SNA_EDGES.filter(e => e.source === activeNode.id || e.target === activeNode.id).length}):
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-1 pr-1 text-xs font-mono-code">
                    {SNA_EDGES.filter(e => e.source === activeNode.id || e.target === activeNode.id).map(e => {
                      const otherId = e.source === activeNode.id ? e.target : e.source;
                      const otherNode = SNA_NODES.find(n => n.id === otherId);
                      return (
                        <div key={e.id} className="p-1.5 bg-neutral-100 rounded text-[11px] flex items-center justify-between">
                          <span className="font-semibold text-neutral-800">{otherNode?.label || otherId}</span>
                          <span className="text-neutral-500 text-[10px]">{e.type}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Case Jumper if applicable */}
                {activeNode.category === 'Case' && onSelectCase && (
                  <button
                    onClick={() => onSelectCase(activeNode.label.replace('Case ', ''))}
                    className="w-full py-2 bg-neutral-900 hover:bg-black text-white text-xs font-mono-code font-semibold rounded transition-colors text-center cursor-pointer"
                  >
                    View Full Docket Case Study →
                  </button>
                )}
              </>
            ) : (
              <div className="text-center py-12 text-xs font-mono-code text-neutral-500">
                <Info className="w-6 h-6 mx-auto mb-2 text-neutral-400" />
                Select any node on the graph canvas to inspect structural centrality and diagnostic edges.
              </div>
            )}
          </div>
        </div>

        {/* The 4 Core Structural Findings Banner */}
        <div className="mt-8 bg-white border border-black/10 rounded-lg p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold font-mono-code uppercase text-neutral-900">
            Consolidated Network Findings & Strategic Implications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <div className="p-3.5 bg-neutral-50 rounded border border-black/5">
              <strong className="text-neutral-900 font-mono-code font-bold block mb-1">
                FINDING 1: The Network Has Exactly One Structural Bridge (SPD)
              </strong>
              <p className="text-neutral-700 leading-relaxed">
                SPD is the sole node with meaningful betweenness centrality (0.0040). Prosecutorial, court, and oversight bodies have zero betweenness. All information bottlenecks at the police intake point before judicial review.
              </p>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded border border-black/5">
              <strong className="text-neutral-900 font-mono-code font-bold block mb-1">
                FINDING 2: Cases (Not Agencies) are the True Infrastructure
              </strong>
              <p className="text-neutral-700 leading-relaxed">
                Cases hold the highest degree (up to 15), closeness, and reach. Agencies operate with outdegree = 0 as passive receivers with no internal feedback or self-reforming mechanisms.
              </p>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded border border-black/5">
              <strong className="text-neutral-900 font-mono-code font-bold block mb-1">
                FINDING 3: Competency Pipeline is the Most Efficient Harm Propagator
              </strong>
              <p className="text-neutral-700 leading-relaxed">
                Case 658959 has the highest reach efficiency (0.025), accessing 29.6% of the network with only 11 links via undocumented medical transfers and competency holds.
              </p>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded border border-black/5">
              <strong className="text-neutral-900 font-mono-code font-bold block mb-1">
                FINDING 4: Economic Incentivization of Detention is an Unaddressed Root Cause
              </strong>
              <p className="text-neutral-700 leading-relaxed">
                Case 664676 links to detention data harvested for police-union negotiations and recruitment bonuses ($7.5k-$15k). This root cause has ZERO corresponding reform nodes in existing law.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
