import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
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
      color: "hsl(var(--chart-1))",
    },
    remainingSessions: {
      label: "User Sessions", 
      color: "hsl(var(--chart-2))",
    },
  };

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
                content={
                  <ChartTooltipContent 
                    formatter={(value, name) => [
                      `${Math.round(Number(value) / 1000000 * 10) / 10}M`,
                      chartConfig[name as keyof typeof chartConfig]?.label || name
                    ]}
                  />
                }
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
            </BarChart>
          </ChartContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
}