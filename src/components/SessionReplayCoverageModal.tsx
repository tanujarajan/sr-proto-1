import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from "recharts";
import { generateSessionCoverageData } from "@/utils/sessionCoverageData";

interface SessionReplayCoverageModalProps {
  open: boolean;
  onClose: () => void;
}

export function SessionReplayCoverageModal({ open, onClose }: SessionReplayCoverageModalProps) {
  const chartData = generateSessionCoverageData();
  
  const chartConfig = {
    capturedReplays: {
      label: "Replays Captured",
      color: "hsl(217, 91%, 60%)", // Blue
    },
    remainingSessions: {
      label: "User Sessions", 
      color: "#93bd31", // Green
    },
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="space-y-4 pb-1">
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
        <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
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

        {/* Chart */}
        <div className="mt-8">
          <ChartContainer config={chartConfig} className="h-80 w-full">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="month" 
                tickLine={false}
                axisLine={false}
                className="text-xs fill-muted-foreground"
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                className="text-xs fill-muted-foreground"
                tickFormatter={(value) => `${Math.round(value / 1000000)}M`}
              />
              <ChartTooltip 
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  
                  const data = payload[0].payload;
                  
                  return (
                    <div className="rounded-lg border border-border/50 bg-background px-3 py-2 text-xs shadow-xl">
                      <div className="font-medium mb-2">{label}</div>
                      <div className="space-y-1">
                         <div className="flex items-center justify-between gap-4">
                           <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-sm bg-[#93bd31]"></div>
                             <span className="text-muted-foreground">User Sessions</span>
                           </div>
                           <span className="font-mono font-medium">
                             {Math.round(data.totalSessions / 1000000 * 10) / 10}M
                           </span>
                         </div>
                         <div className="flex items-center justify-between gap-4">
                           <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-sm bg-[hsl(217,91%,60%)]"></div>
                             <span className="text-muted-foreground">Replays Captured</span>
                           </div>
                           <span className="font-mono font-medium">
                             {Math.round(data.capturedReplays / 1000000 * 10) / 10}M ({Math.round((data.capturedReplays / data.totalSessions) * 100)}%)
                           </span>
                         </div>
                         <div className="flex items-center justify-between gap-4">
                           <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-sm bg-muted"></div>
                             <span className="text-muted-foreground">Replay Quota Used</span>
                           </div>
                           <span className="font-mono font-medium">
                             {Math.round(data.capturedReplays / 1000000 * 10) / 10}M of 2M ({data.quotaUsed}%)
                           </span>
                         </div>
                      </div>
                    </div>
                  );
                }}
              />
              <ChartLegend content={<ChartLegendContent />} />
              {/* Bottom segment: Replays Captured */}
              <Bar dataKey="capturedReplays" stackId="sessions" fill="var(--color-capturedReplays)" />
              {/* Top segment: User Sessions (remaining sessions) */}
              <Bar 
                dataKey="remainingSessions" 
                stackId="sessions" 
                fill="var(--color-remainingSessions)"
              />
              <ReferenceLine 
                y={2000000} 
                stroke="hsl(var(--muted-foreground))" 
                strokeDasharray="8 8"
                strokeWidth={1}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
}