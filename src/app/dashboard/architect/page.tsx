"use client"

import * as React from "react"
import { cognitiveStudyArchitect, type CognitiveStudyArchitectOutput } from "@/ai/flows/cognitive-study-architect-flow"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BrainCircuit, Sparkles, Plus, Trash2, Loader2, Clock, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

export default function ArchitectPage() {
  const [loading, setLoading] = React.useState(false)
  const [plan, setPlan] = React.useState<CognitiveStudyArchitectOutput | null>(null)
  
  const [availableHours, setAvailableHours] = React.useState(4)
  const [learningStyle, setLearningStyle] = React.useState("visual and hands-on")
  const [areas, setAreas] = React.useState<string[]>(["Linear Algebra", "Neurobiology"])
  const [newArea, setNewArea] = React.useState("")

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const result = await cognitiveStudyArchitect({
        recentGrades: [
          { subject: "Mathematics", grade: 82 },
          { subject: "Cognitive Science", grade: 75 }
        ],
        upcomingDeadlines: [
          { subject: "Mathematics", task: "Midterm Exam", dueDate: new Date(Date.now() + 86400000 * 3).toISOString() }
        ],
        timeAvailableHours: availableHours,
        learningStylePreferences: learningStyle,
        areasToImprove: areas
      })
      setPlan(result)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Architect Synchronization Failed",
        description: "An error occurred while communicating with the neural cloud."
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
          <BrainCircuit className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-headline font-bold">Cognitive Study Architect</h1>
          <p className="text-muted-foreground font-light">Generate optimal learning trajectories based on performance metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card className="glass-panel border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Input Parameters</CardTitle>
            <CardDescription>Calibrate the AI with your current state</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground">Available Bandwidth (Hours)</Label>
              <Input 
                type="number" 
                value={availableHours} 
                onChange={(e) => setAvailableHours(Number(e.target.value))}
                className="bg-background/40 border-border/50 focus:border-primary/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground">Learning Modulation</Label>
              <Input 
                placeholder="e.g. Visual, Audio-heavy..." 
                value={learningStyle}
                onChange={(e) => setLearningStyle(e.target.value)}
                className="bg-background/40 border-border/50 focus:border-primary/50"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground">Improvement Nodes</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Add topic..." 
                  value={newArea}
                  onChange={(e) => setNewArea(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (setAreas([...areas, newArea]), setNewArea(""))}
                  className="bg-background/40 border-border/50 focus:border-primary/50 h-9"
                />
                <Button size="sm" variant="secondary" onClick={() => { if(newArea) setAreas([...areas, newArea]); setNewArea(""); }}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {areas.map((a, i) => (
                  <div key={i} className="px-3 py-1.5 rounded-full bg-secondary border border-border flex items-center gap-2 group text-xs font-medium">
                    {a}
                    <button onClick={() => setAreas(areas.filter((_, idx) => idx !== i))}>
                      <Trash2 className="w-3 h-3 text-muted-foreground group-hover:text-destructive transition-colors" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xl shadow-primary/10"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
              Synthesize Study Plan
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {!plan && !loading && (
            <div className="h-64 rounded-xl border-2 border-dashed border-border/40 flex flex-col items-center justify-center p-8 text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Clock className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Enter your parameters and initiate the synthesis process to generate your personalized trajectory.</p>
            </div>
          )}

          {loading && (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 rounded-xl bg-secondary/50 border border-border/50" />
              ))}
            </div>
          )}

          {plan && !loading && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 premium-out">
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-primary pl-1">Generated Trajectory</h3>
              <div className="space-y-4">
                {plan.dailyPlan.map((item, i) => (
                  <Card key={i} className="border border-primary/20 bg-primary/[0.02] hover:bg-primary/[0.04] transition-all">
                    <CardContent className="p-4 flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                        <span className="text-xs font-bold text-primary">{item.durationMinutes}m</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">{item.subject}</span>
                          <span className="text-muted-foreground/30">•</span>
                          <span className="text-xs font-semibold text-primary">{item.topic}</span>
                        </div>
                        <h4 className="text-sm font-semibold">{item.activity}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1 italic">{item.reasoning}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="p-5 rounded-xl bg-accent/5 border border-accent/20 space-y-3">
                <div className="flex items-center gap-2 text-accent">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Architect Recommendations</span>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed font-light whitespace-pre-line">
                  {plan.recommendations}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
