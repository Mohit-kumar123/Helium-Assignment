"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import SessionBuilder from "@/components/session/SessionBuilder";
import AnalysisPanel from "@/components/result/AnalysisPanel";
import { AnalyzeResponseDto, EventType } from "@/types";
import { analyzeSession } from "@/services/analysis.service";
import { SAMPLE_SESSIONS } from "@/constants/sample-sessions";
import { ShopperType } from "@/types";

export default function Home() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [analysis, setAnalysis] = useState<AnalyzeResponseDto | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLoadSample = (shopperType: ShopperType) => {
    setEvents(SAMPLE_SESSIONS[shopperType]);
    setAnalysis(null); // Clear previous analysis
  };

  const handleAnalyze = async () => {
    if (events.length === 0) return;

    try {
      setLoading(true);
      const result = await analyzeSession(events);

      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="h-10 w-10 text-violet-600" />

            <h1 className="text-5xl font-bold tracking-tight">
              ShopperSense AI
            </h1>
          </div>

          <p className="mt-4 text-lg text-slate-600">
            AI-powered shopper behavior analysis for ecommerce personalization
          </p>

          <p className="mx-auto mt-2 max-w-3xl text-sm text-slate-500">
            Build a shopper session, analyze customer intent using Gemini AI,
            and receive personalized recommendations to improve conversions.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <SessionBuilder
            events={events}
            setEvents={setEvents}
            onAnalyze={handleAnalyze}
            loading={loading}
            onLoadSample={handleLoadSample}
          />

          <AnalysisPanel analysis={analysis} loading={loading} />
        </div>
      </div>
    </main>
  );
}
