import { useState } from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SessionReplayCoverageModal } from "@/components/SessionReplayCoverageModal";

export function SessionReplayCoverageTooltip() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

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
          <TooltipContent className="max-w-xs">
            <p>
              Capturing 1M replays from 10M total sessions this month. Using 50% of your 2M replay quota. Click to view full session coverage.
            </p>
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