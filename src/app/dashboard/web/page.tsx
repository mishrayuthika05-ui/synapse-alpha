"use client"

import * as React from "react"
import { Network, ZoomIn, ZoomOut, Maximize2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const nodes = [
  { id: 1, label: "Quantum Mechanics", x: 400, y: 300, size: 80, connections: [2, 3, 5], color: "stroke-primary" },
  { id: 2, label: "Schrodinger's Equation", x: 250, y: 200, size: 40, connections: [1], color: "stroke-accent" },
  { id: 3, label: "Wave Function", x: 550, y: 180, size: 50, connections: [1, 4], color: "stroke-accent" },
  { id: 4, label: "Linear Algebra", x: 700, y: 250, size: 35, connections: [3], color: "stroke-muted-foreground" },
  { id: 5, label: "Entanglement", x: 450, y: 500, size: 45, connections: [1], color: "stroke-accent" },
]

export default function KnowledgeWebPage() {
  const [activeNode, setActiveNode] = React.useState<number | null>(null)

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <Network className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-headline font-bold">Knowledge Web</h1>
            <p className="text-muted-foreground font-light">Interactive semantic mapping of your academic universe.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-1 bg-secondary/50 rounded-lg border border-border">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded"><ZoomIn className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded"><ZoomOut className="w-4 h-4" /></Button>
          <div className="w-px h-4 bg-border mx-1" />
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded"><Maximize2 className="w-4 h-4" /></Button>
        </div>
      </div>

      <div className="flex-1 bg-card/20 rounded-3xl border border-border/40 relative overflow-hidden group cursor-grab active:cursor-grabbing">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(134,118,249,0.03)_0%,transparent_70%)]" />
        
        {/* SVG Graph Component */}
        <svg className="w-full h-full" viewBox="0 0 1000 700">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Lines */}
          {nodes.map((node) => 
            node.connections.map(targetId => {
              const target = nodes.find(n => n.id === targetId)
              if (!target) return null
              return (
                <line 
                  key={`${node.id}-${targetId}`}
                  x1={node.x} y1={node.y}
                  x2={target.x} y2={target.y}
                  className={`stroke-border/30 stroke-[1px] transition-all duration-700 premium-out ${activeNode === node.id || activeNode === targetId ? 'stroke-primary/40 stroke-2' : ''}`}
                />
              )
            })
          )}

          {/* Nodes */}
          {nodes.map((node) => (
            <g 
              key={node.id} 
              className="cursor-pointer group/node"
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              <circle 
                cx={node.x} cy={node.y} 
                r={node.size / 2} 
                className={`fill-background stroke-[2px] transition-all duration-500 premium-out ${node.color} ${activeNode === node.id ? 'r-[+4] shadow-lg scale-110' : ''}`}
                filter={activeNode === node.id ? "url(#glow)" : ""}
              />
              <text 
                x={node.x} y={node.y + (node.size / 2) + 20}
                className={`text-[12px] font-headline font-medium fill-muted-foreground transition-all duration-300 text-center select-none ${activeNode === node.id ? 'fill-foreground scale-105 font-bold' : ''}`}
                textAnchor="middle"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend/Info Overlay */}
        <div className="absolute bottom-8 left-8 p-6 glass-panel rounded-2xl max-w-[280px] space-y-4 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] uppercase font-bold tracking-widest">Active Node Metadata</span>
          </div>
          {activeNode ? (
            <div className="space-y-2">
              <h3 className="text-lg font-headline font-semibold">{nodes.find(n => n.id === activeNode)?.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">This concept has <span className="text-foreground font-medium">{nodes.find(n => n.id === activeNode)?.connections.length} semantic connections</span> within your current Physics architecture.</p>
              <Button size="sm" className="w-full text-[10px] h-8 mt-2">Deep Dive Exploration</Button>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Hover over a knowledge node to reveal semantic associations and cognitive hierarchies.</p>
          )}
        </div>
      </div>
    </div>
  )
}
