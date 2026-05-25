"use client"

import * as React from "react"
import { synthesizeLectureNotes } from "@/ai/flows/lecture-synthesis-engine"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Loader2, Wand2, Copy, Trash2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function SynthesisPage() {
  const [input, setInput] = React.useState("")
  const [output, setOutput] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const handleSynthesize = async () => {
    if (!input) return
    setLoading(true)
    try {
      const result = await synthesizeLectureNotes({ lectureNotes: input })
      setOutput(result)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Synthesis Failed",
        description: "The engine was unable to parse the lecture data."
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    toast({
      title: "Copied to Buffer",
      description: "Summary data stored in local clipboard."
    })
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20">
          <FileText className="w-7 h-7 text-accent" />
        </div>
        <div>
          <h1 className="text-3xl font-headline font-bold">Lecture Synthesis Engine</h1>
          <p className="text-muted-foreground font-light">Transform chaotic transcripts into structured cognitive assets.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Source Transcript</span>
            <Button variant="ghost" size="sm" onClick={() => setInput("")} className="h-7 text-[10px] text-muted-foreground hover:text-destructive">
              <Trash2 className="w-3 h-3 mr-1" /> Clear Input
            </Button>
          </div>
          <Textarea 
            placeholder="Paste raw lecture notes, transcripts, or chaotic study thoughts here..." 
            className="flex-1 min-h-[400px] bg-card/40 border-border/50 focus:border-accent/40 resize-none font-light leading-relaxed p-6"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button 
            onClick={handleSynthesize} 
            disabled={loading || !input}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-xl shadow-accent/10 h-12"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Wand2 className="w-5 h-5 mr-2" />}
            Initiate Synthesis
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Structured Output</span>
            {output && (
              <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 text-[10px] text-accent hover:bg-accent/10">
                <Copy className="w-3 h-3 mr-1" /> Copy Summary
              </Button>
            )}
          </div>
          
          <Card className="flex-1 min-h-[400px] glass-panel border-accent/20 overflow-hidden relative">
            {!output && !loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-muted-foreground space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                  <Wand2 className="w-8 h-8 opacity-20" />
                </div>
                <p className="text-sm font-light leading-relaxed">Synthesis output will be displayed here. The engine uses Markdown for clear hierarchies and bullet systems.</p>
              </div>
            )}
            
            {loading && (
              <div className="p-8 space-y-6 animate-pulse">
                <div className="h-8 w-3/4 bg-accent/10 rounded" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-border rounded" />
                  <div className="h-4 w-full bg-border rounded" />
                  <div className="h-4 w-5/6 bg-border rounded" />
                </div>
                <div className="h-8 w-1/2 bg-accent/10 rounded mt-8" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-border rounded" />
                  <div className="h-4 w-5/6 bg-border rounded" />
                </div>
              </div>
            )}

            {output && !loading && (
              <div className="p-8 prose prose-invert prose-sm max-w-none prose-headings:font-headline prose-headings:text-accent prose-p:font-light prose-p:text-foreground/90 overflow-y-auto max-h-[600px] animate-in fade-in duration-500">
                <div className="whitespace-pre-line font-light leading-relaxed text-sm">
                  {output}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
