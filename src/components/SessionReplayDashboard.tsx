
import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SessionReplayTable } from "@/components/SessionReplayTable";
import { FilterBar } from "@/components/FilterBar";
import { SessionReplayCoverageTooltip } from "@/components/SessionReplayCoverageTooltip";
import { SessionReplayCoverageTooltipV2 } from "@/components/SessionReplayCoverageTooltipV2";
import { SessionReplay } from "@/types/session-replay";

interface SessionReplayDashboardProps {
  onReplaySelect: (replay: SessionReplay) => void;
  useV2Tooltip?: boolean;
}

export function SessionReplayDashboard({ onReplaySelect, useV2Tooltip = false }: SessionReplayDashboardProps) {
  const [showLiveReplays, setShowLiveReplays] = useState(true);
  
  console.log("SessionReplayDashboard rendered - toggle should NOT be in header");

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border bg-background">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-2xl font-semibold">Session Replay</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Session Replay Table with integrated Filter Bar */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full flex flex-col">
              {/* Filter Bar - directly above table */}
              <div className="px-6 pt-3 pb-7 border-b border-border bg-background">
                <FilterBar />
              </div>
              
              {/* Session Replay Coverage Tooltip - V1 or V2 */}
              {useV2Tooltip ? <SessionReplayCoverageTooltipV2 /> : <SessionReplayCoverageTooltip />}
              
              <SessionReplayTable
                showLiveReplays={showLiveReplays}
                onReplaySelect={onReplaySelect}
                onShowLiveReplaysChange={setShowLiveReplays}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
