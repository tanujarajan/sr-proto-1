import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SessionReplayCoverageModalProps {
  open: boolean;
  onClose: () => void;
}

export function SessionReplayCoverageModal({ open, onClose }: SessionReplayCoverageModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="space-y-4 pb-6">
          <DialogTitle className="text-lg font-semibold tracking-wide text-left text-muted-foreground">
            SESSION REPLAY COVERAGE
          </DialogTitle>
          
          {/* Header Metrics */}
          <div className="text-left">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              10% of 10M Sessions This Month
            </h2>
          </div>
        </DialogHeader>

        {/* Description */}
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            <span className="font-semibold text-foreground">1M sessions captured</span> for replay this month out of <span className="font-semibold text-foreground">10 million total user sessions</span> across all platforms instrumented with Session Replay.
          </p>
          <p>
            <span className="font-semibold text-foreground">Monthly replay quota: 2M.</span>
          </p>
          <p>
            Use the chart below to understand how much of overall user session activity is being captured for replay over time.
          </p>
        </div>

        {/* Placeholder for chart - will be added in Phase 2 */}
        <div className="mt-8 h-64 bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Chart will be added in Phase 2</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}