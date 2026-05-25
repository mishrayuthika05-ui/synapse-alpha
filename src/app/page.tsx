"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Zap, ArrowRight, Brain, Network, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[140px] animate-pulse-subtle" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[140px] animate-pulse-subtle" />

      <main className="max-w-4xl w-full text-center space-y-12 relative z-10">
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 premium-out">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/30">
              <Zap className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter">
            SYNAPSE <span className="text-primary italic">ALPHA</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            The futuristic cognitive environment for the hyper-focused student. AI-driven trajectories for maximum academic velocity.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-4 delay-500 duration-1000 fill-mode-backwards">
          <Button 
            size="lg" 
            onClick={() => router.push('/dashboard')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 h-14 rounded-full text-lg shadow-2xl shadow-primary/20 group"
          >
            Enter System <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" size="lg" className="h-14 px-10 rounded-full text-lg border-border hover:bg-secondary">
            View Protocol
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 animate-in fade-in delay-700 duration-1000 fill-mode-backwards">
          {[
            { icon: Brain, label: "Cognitive Architect", desc: "AI-driven study trajectories" },
            { icon: Network, label: "Knowledge Web", desc: "Interactive concept mapping" },
            { icon: FileText, label: "Synthesis Engine", desc: "Autonomous lecture summaries" },
          ].map((feature, i) => (
            <div key={i} className="space-y-3 p-6 rounded-3xl border border-border/40 bg-card/40 backdrop-blur-sm">
              <feature.icon className="w-8 h-8 text-accent mx-auto" />
              <h3 className="font-headline font-bold text-lg">{feature.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-24 text-[10px] uppercase tracking-[0.4em] font-medium text-muted-foreground/40 animate-in fade-in delay-1000 duration-1000">
        Synapse Alpha // V1.0.4 Cognitive Node // All Systems Operational
      </footer>
    </div>
  )
}
