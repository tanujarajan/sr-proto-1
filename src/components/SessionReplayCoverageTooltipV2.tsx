
import { useState } from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { SessionReplayCoverageModal } from "@/components/SessionReplayCoverageModal";

export function SessionReplayCoverageTooltipV2() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  // Data values based on the current dummy data
  const replaysCaptured = 1000000; // 1M
  const totalSessions = 10000000; // 10M
  const monthlyQuota = 2000000; // 2M
  const projectSampleRate = 20; // 20%
  const coveragePercentage = (replaysCaptured / totalSessions) * 100; // 10%
  const quotaUsagePercentage = (replaysCaptured / monthlyQuota) * 100; // 50%

  return (
    <TooltipProvider>
      <div className="px-6 py-3 flex justify-end">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleClick}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <span>Session Replay Coverage: 10%</span>
              <Info className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="w-80 p-4">
            <div className="space-y-3">
              {/* Header */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  Session Replay Coverage
                </h3>
                <p className="text-xs text-muted-foreground">
                  Jun 1, 2025 - Jun 30, 2025
                </p>
              </div>

              {/* Coverage Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    Sessions captured for replay
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    {coveragePercentage.toFixed(0)}%
                  </span>
                </div>
                <Progress value={coveragePercentage} color="#3879fe" className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{(replaysCaptured / 1000000).toFixed(1)}M captured</span>
                  <span>{(totalSessions / 1000000).toFixed(0)}M sessions this month</span>
                </div>
              </div>

              {/* Usage Metrics */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    Monthly quota usage
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    {quotaUsagePercentage.toFixed(0)}%
                  </span>
                </div>
                <Progress value={quotaUsagePercentage} color="#3879fe" className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{(replaysCaptured / 1000000).toFixed(1)}M used</span>
                  <span>{(monthlyQuota / 1000000).toFixed(0)}M quota</span>
                </div>
              </div>

              {/* Project Sample Rate - Simplified */}
              <div className="pt-2 border-t border-border text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Project sample rate:</span>
                  <span className="font-medium text-foreground">{projectSampleRate}%</span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground pt-1">
                Click to view detailed coverage analytics
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <SessionReplayCoverageModal 
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </TooltipProvider>
  );
}
