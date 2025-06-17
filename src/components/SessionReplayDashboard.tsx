import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { SessionReplayTable } from "@/components/SessionReplayTable";
import { InterestingReplaysSection } from "@/components/InterestingReplaysSection";
import { FilterBar } from "@/components/FilterBar";
import { SessionReplay } from "@/types/session-replay";

interface SessionReplayDashboardProps {
  onReplaySelect: (replay: SessionReplay) => void;
}

export function SessionReplayDashboard({ onReplaySelect }: SessionReplayDashboardProps) {
  const [showLiveReplays, setShowLiveReplays] = useState(true);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-2xl font-semibold">Session Replay</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show Live Replays</span>
          <Switch 
            checked={showLiveReplays} 
            onCheckedChange={setShowLiveReplays}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Interesting Replays Section */}
          <div className="p-6 border-b border-border">
            <InterestingReplaysSection onReplaySelect={onReplaySelect} />
          </div>

          {/* Filter Bar */}
          <div className="p-4 border-b border-border">
            <FilterBar />
          </div>

          {/* Session Replay Table */}
          <div className="flex-1 overflow-hidden">
            <SessionReplayTable 
              showLiveReplays={showLiveReplays}
              onReplaySelect={onReplaySelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}