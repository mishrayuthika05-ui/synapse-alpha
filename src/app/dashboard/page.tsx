"use client"

import * as React from "react"
import { 
  TrendingUp, 
  Clock, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Target
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const deadlines = [
  { id: 1, subject: "Quantum Computing", task: "Algorithm Analysis Paper", daysLeft: 2, status: "Critical", color: "text-red-400" },
  { id: 2, subject: "Bio-Engineering", task: "CRISPR Lab Simulation", daysLeft: 5, status: "Active", color: "text-primary" },
  { id: 3, subject: "Cognitive Psych", task: "Neural Feedback Study", daysLeft: 12, status: "Upcoming", color: "text-muted-foreground" },
]

const recentVelocity = [
  { label: "Study Hours Today", value: "6.5h", trend: "+12%", color: "bg-primary" },
  { label: "Concepts Retained", value: "88%", trend: "+5%", color: "bg-accent" },
  { label: "Architecture Score", value: "920", trend: "+45", color: "bg-green-500" },
]

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-headline font-bold tracking-tight text-foreground/95">
          Welcome back, <span className="text-primary italic">Alpha-1</span>
        </h1>
        <p className="text-muted-foreground text-lg font-light max-w-2xl">
          Systems initialized. Your cognitive load is currently at <span className="text-foreground font-medium">42%</span> capacity. You have <span className="text-primary font-medium">3 high-priority</span> syncs today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
        {recentVelocity.map((stat, i) => (
          <Card key={i} className="glass-panel border-none shadow-none hover:shadow-primary/5 transition-all">
            <CardHeader className="pb-2">
              <CardDescription className="uppercase tracking-[0.1em] text-[10px] font-semibold">{stat.label}</CardDescription>
              <CardTitle className="text-3xl font-headline font-bold flex items-baseline gap-3">
                {stat.value}
                <span className="text-xs font-medium text-green-400 font-body">{stat.trend}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={parseInt(stat.value) || 75} className={`h-1 ${stat.color}/20`} />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Velocity Stream */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-headline font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Live Velocity Stream
            </h2>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary gap-2">
              View All Streams <ArrowRight className="w-3 h-3" />
            </Button>
          </div>

          <div className="space-y-4">
            {deadlines.map((item, index) => (
              <div 
                key={item.id} 
                className="velocity-stream-item p-5 rounded-xl border border-border/40 bg-card/40 flex items-center gap-6 group animate-slide-up"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-full border border-current/20 flex items-center justify-center ${item.color} shrink-0`}>
                  {item.daysLeft < 3 ? <AlertCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.subject}</span>
                    <Badge variant="outline" className={`text-[10px] px-2 py-0 h-4 border-current/30 ${item.color}`}>
                      {item.status}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-medium leading-tight group-hover:text-primary transition-colors">{item.task}</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-headline font-bold">{item.daysLeft}d</div>
                  <div className="text-[10px] uppercase font-semibold text-muted-foreground">Remaining</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cognitive Summary Side Rail */}
        <div className="space-y-6">
          <h2 className="text-xl font-headline font-semibold flex items-center gap-2">
            <Target className="w-5 h-5 text-accent" />
            Focus Node
          </h2>
          
          <Card className="glass-panel border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Current Objective</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/80">Quantum State Vectors</span>
                  <span className="text-primary font-bold">82%</span>
                </div>
                <Progress value={82} className="h-1" />
              </div>
              
              <div className="p-4 rounded-lg bg-accent/5 border border-accent/10 space-y-2">
                <div className="flex items-center gap-2 text-accent">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wide">Next Step</span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed font-light">
                  Complete the tensor product exercise to unlock the <span className="text-accent underline underline-offset-4 decoration-accent/30 font-medium">Entanglement Module</span>.
                </p>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20">
                Continue Sync Session
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-secondary/30 border-dashed border-border/50">
            <CardContent className="p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-background mx-auto flex items-center justify-center border border-border">
                <CalendarIcon className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">Weekly Review</h4>
                <p className="text-xs text-muted-foreground">Your cognitive performance data is ready for synthesis.</p>
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs">Analyze Architecture</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
