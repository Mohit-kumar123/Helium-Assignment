"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  Plus,
  MousePointerClick,
  Wand2,
  ClipboardList,
  X,
  Loader2,
} from "lucide-react";

import { ShopperType, EventType } from "@/types";

interface SessionBuilderProps {
  events: EventType[];
  setEvents: Dispatch<SetStateAction<EventType[]>>;
  onAnalyze: () => void;
  loading: boolean;
  onLoadSample: (shopperType: ShopperType) => void;
}

export default function SessionBuilder({
  events,
  setEvents,
  onAnalyze,
  loading,
  onLoadSample,
}: SessionBuilderProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventType | "">("");

  const handleAddEvent = () => {
    if (!selectedEvent) return;

    // Prevent consecutive duplicate events
    if (events.length > 0 && events[events.length - 1] === selectedEvent) {
      return;
    }

    setEvents((prev) => [...prev, selectedEvent]);
    setSelectedEvent("");
  };

  const handleRemoveEvent = (index: number) => {
    setEvents((prev) => prev.filter((_, i) => i !== index));
  };

  const eventOptions = Object.values(EventType);
  const hasEvents = events.length > 0;

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Session Builder</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Event Selection */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Plus className="h-4 w-4" />
            Add Event
          </label>
          <div className="flex gap-2">
            <Select
              value={selectedEvent}
              onValueChange={(value) => setSelectedEvent(value as EventType)}
              disabled={loading}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent>
                {eventOptions.map((event) => (
                  <SelectItem key={event} value={event}>
                    {event}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={handleAddEvent}
              disabled={!selectedEvent || loading}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Current Session */}
        <Separator className="my-2" />
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <MousePointerClick className="h-4 w-4" />
            Current Session
          </h3>
          {!hasEvents ? (
            <Card className="bg-muted/30 border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ClipboardList className="mb-3 h-8 w-8 text-muted-foreground/60" />
                <p className="text-sm font-medium">No events added yet</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Select an event above to build a shopper session.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:bg-accent/5"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {index + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium">{event}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveEvent(index)}
                    className="h-8 w-8 p-0"
                    disabled={loading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Samples */}
        <Separator className="my-2" />
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <Wand2 className="h-4 w-4" />
            Quick Samples
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.values(ShopperType).map((sample) => (
              <Button
                key={sample}
                variant="outline"
                className="transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
                onClick={() => onLoadSample(sample)}
                disabled={loading}
              >
                {sample}
              </Button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <Separator className="my-2" />
        <Button
          className="h-10 w-full gap-2"
          size="lg"
          disabled={!hasEvents || loading}
          onClick={onAnalyze}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Analyze Shopper
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
