import React, { useMemo } from 'react';

/**
 * ConstellationBackground — Floating sparkles and soft connected star constellation lines.
 * Renders faint golden lines connecting blinking star nodes and drifting 4-pointed stars.
 */
export default function ConstellationBackground() {
  // Coordinates in percentage (%)
  const nodes = useMemo(() => {
    return [
      { id: 1, x: 8, y: 22, size: 5 },
      { id: 2, x: 22, y: 14, size: 7, label: 'Alpha' },
      { id: 3, x: 32, y: 28, size: 5 },
      { id: 4, x: 48, y: 16, size: 9, label: 'Polaris' },
      { id: 5, x: 64, y: 32, size: 5 },
      { id: 6, x: 78, y: 12, size: 7, label: 'Cassiopeia' },
      { id: 7, x: 92, y: 26, size: 5 },
      // Lower row
      { id: 8, x: 12, y: 68, size: 6 },
      { id: 9, x: 28, y: 82, size: 5 },
      { id: 10, x: 44, y: 62, size: 8, label: 'Sirius' },
      { id: 11, x: 58, y: 78, size: 5 },
      { id: 12, x: 74, y: 58, size: 7 },
      { id: 13, x: 88, y: 72, size: 9, label: 'Vega' },
    ];
  }, []);

  const connections = useMemo(() => {
    return [
      [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], // upper path
      [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], // lower path
      [3, 10], [5, 12] // cross connectors
    ];
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Constellation lines */}
        {connections.map(([fromId, toId], i) => {
          const fromNode = nodes.find(n => n.id === fromId);
          const toNode = nodes.find(n => n.id === toId);
          if (!fromNode || !toNode) return null;
          return (
            <line
              key={`line-${i}`}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke="var(--gold-soft)"
              strokeWidth="0.8"
              strokeDasharray="4 4"
              opacity="0.22"
            />
          );
        })}

        {/* Constellation nodes (Stars) */}
        {nodes.map(node => (
          <g 
            key={`node-${node.id}`} 
            style={{ 
              animation: `pulse ${3 + (node.id % 3)}s infinite ease-in-out`, 
              animationDelay: `${node.id * 0.3}s` 
            }}
          >
            {/* Glow backing */}
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size * 1.5}
              fill="var(--gold-soft)"
              opacity="0.1"
            />
            {/* Star center */}
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size / 2}
              fill="#fff"
              stroke="var(--gold)"
              strokeWidth="0.8"
            />
          </g>
        ))}
      </svg>

      {/* Floating Sparkles */}
      <div className="absolute inset-0">
        {[...Array(14)].map((_, i) => {
          const size = 6 + (i % 3) * 3;
          return (
            <span
              key={`sparkle-${i}`}
              className="absolute block"
              style={{
                left: `${(i * 7.5 + 10) % 94}%`,
                top: `${(i * 9 + 20) % 75}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationName: 'fairy-drift',
                animationDuration: `${9 + (i % 4) * 3}s`,
                animationDelay: `${i * 0.4}s`,
                animationIterationCount: 'infinite',
                animationTimingFunction: 'ease-in-out',
                pointerEvents: 'none',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 3px var(--gold-soft))' }}>
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="var(--gold)" opacity="0.6"/>
              </svg>
            </span>
          );
        })}
      </div>
    </div>
  );
}
