
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { SessionReplayCoverageModalHeader } from "@/components/SessionReplayCoverageModalHeader";
import { SessionReplayCoverageDescription } from "@/components/SessionReplayCoverageDescription";
import { SessionReplayCoverageChart } from "@/components/SessionReplayCoverageChart";

interface SessionReplayCoverageModalProps {
  open: boolean;
  onClose: () => void;
}

export function SessionReplayCoverageModal({ open, onClose }: SessionReplayCoverageModalProps) {
  const [isCrossProjectView, setIsCrossProjectView] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle asChild>
            <SessionReplayCoverageModalHeader isCrossProjectView={isCrossProjectView} />
          </DialogTitle>
        </DialogHeader>

        {/* Description */}
        <SessionReplayCoverageDescription isCrossProjectView={isCrossProjectView} />

        {/* Toggle */}
        <div className="flex justify-end items-center gap-3 mt-4">
          <label htmlFor="cross-project-toggle" className="text-sm font-medium">
            Cross-project view
          </label>
          <Switch
            id="cross-project-toggle"
            checked={isCrossProjectView}
            onCheckedChange={setIsCrossProjectView}
          />
        </div>

        {/* Chart */}
        <SessionReplayCoverageChart isCrossProjectView={isCrossProjectView} />
      </DialogContent>
    </Dialog>
  );
}
