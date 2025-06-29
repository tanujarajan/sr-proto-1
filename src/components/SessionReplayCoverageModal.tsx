
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from "recharts";
import { Switch } from "@/components/ui/switch";
import { generateSessionCoverageData, generateCrossProjectData } from "@/utils/sessionCoverageData";
import { useState } from "react";

interface SessionReplayCoverageModalProps {
  open: boolean;
  onClose: () => void;
}

export function SessionReplayCoverageModal({ open, onClose }: SessionReplayCoverageModalProps) {
  const [isCrossProjectView, setIsCrossProjectView] = useState(false);
  
  const singleProjectData = generateSessionCoverageData();
  const crossProjectData = generateCrossProjectData();
  
  const singleProjectConfig = {
    capturedReplays: {
      label: "Replays Captured",
      color: "hsl(217, 91%, 60%)", // Blue
    },
    remainingSessions: {
      label: "User Sessions", 
      color: "#93bd31", // Green
    },
  };

  const crossProjectConfig = {
    webProdReplays: {
      label: "Web-Prod Replays",
      color: "hsl(217, 91%, 60%)", // Blue
    },
    webDevReplays: {
      label: "Web-Dev Replays", 
      color: "hsl(25, 95%, 53%)", // Orange
    },
    appProdReplays: {
      label: "App-Prod Replays",
      color: "hsl(262, 83%, 58%)", // Purple
    },
    webProdSessions: {
      label: "Web-Prod Sessions",
      color: "#93bd31", // Green
    },
    webDevSessions: {
      label: "Web-Dev Sessions",
      color: "#7db928", // Lighter green
    },
    appProdSessions: {
      label: "App-Prod Sessions",
      color: "#a3c940", // Even lighter green
    },
  };

  const chartConfig = isCrossProjectView ? crossProjectConfig : singleProjectConfig;
  const chartData = isCrossProjectView ? crossProjectData : singleProjectData;

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
              {isCrossProjectView 
                ? "Cross-Project View - 2M Monthly Quota Usage"
                : "10% of 10M Sessions This Month"
              }
            </h2>
          </div>
        </DialogHeader>

        {/* Description */}
        <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          {isCrossProjectView ? (
            <>
              <p>
                <span className="font-semibold text-foreground">Cross-project replay coverage</span> showing how each project contributes to your <span className="font-semibold text-foreground">2M monthly quota</span>.
              </p>
              <p>
                Projects: <span className="font-semibold text-foreground">Web-Prod (current), Web-Dev, App-Prod</span>
              </p>
              <p>
                <span className="font-semibold text-foreground">Monthly replay quota: 2M.</span>
              </p>
              <p>
                Use the chart below to understand how each project contributes to your overall replay quota usage and session volume over time.
              </p>
            </>
          ) : (
            <>
              <p>
                <span className="font-semibold text-foreground">1M sessions captured</span> for replay this month out of <span className="font-semibold text-foreground">10 million total user sessions for current project</span>.
              </p>
              <p>
                <span className="font-semibold text-foreground">Monthly replay quota: 2M.</span>
              </p>
              <p>
                <span className="font-semibold text-foreground">Project sample rate: 20%.</span>
              </p>
              <p>
                Use the chart below to understand how much of overall user session activity is being captured for replay over time.
              </p>
            </>
          )}
        </div>

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
                        {isCrossProjectView ? (
                          <>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-sm bg-[#93bd31]"></div>
                                <span className="text-muted-foreground">Web-Prod Sessions</span>
                              </div>
                              <span className="font-mono font-medium">
                                {Math.round(data.webProdSessions / 1000000 * 10) / 10}M
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-sm bg-[#7db928]"></div>
                                <span className="text-muted-foreground">Web-Dev Sessions</span>
                              </div>
                              <span className="font-mono font-medium">
                                {Math.round(data.webDevSessions / 1000000 * 10) / 10}M
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-sm bg-[#a3c940]"></div>
                                <span className="text-muted-foreground">App-Prod Sessions</span>
                              </div>
                              <span className="font-mono font-medium">
                                {Math.round(data.appProdSessions / 1000000 * 10) / 10}M
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-sm bg-[hsl(217,91%,60%)]"></div>
                                <span className="text-muted-foreground">Web-Prod Replays</span>
                              </div>
                              <span className="font-mono font-medium">
                                {Math.round(data.webProdReplays / 1000000 * 10) / 10}M
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-sm bg-[hsl(25,95%,53%)]"></div>
                                <span className="text-muted-foreground">Web-Dev Replays</span>
                              </div>
                              <span className="font-mono font-medium">
                                {Math.round(data.webDevReplays / 1000000 * 10) / 10}M
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-sm bg-[hsl(262,83%,58%)]"></div>
                                <span className="text-muted-foreground">App-Prod Replays</span>
                              </div>
                              <span className="font-mono font-medium">
                                {Math.round(data.appProdReplays / 1000000 * 10) / 10}M
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-sm bg-muted"></div>
                                <span className="text-muted-foreground">Total Quota Used</span>
                              </div>
                              <span className="font-mono font-medium">
                                {Math.round(data.totalReplays / 1000000 * 10) / 10}M of 2M ({data.quotaUsed}%)
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
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
                          </>
                        )}
                      </div>
                    </div>
                  );
                }}
              />
              <ChartLegend content={<ChartLegendContent />} />
              
              {/* Conditional rendering based on view mode */}
              {isCrossProjectView ? (
                <>
                  {/* Cross-project view: Multiple project bars for both sessions and replays */}
                  <Bar dataKey="webProdSessions" stackId="sessions" fill="var(--color-webProdSessions)" />
                  <Bar dataKey="webDevSessions" stackId="sessions" fill="var(--color-webDevSessions)" />
                  <Bar dataKey="appProdSessions" stackId="sessions" fill="var(--color-appProdSessions)" />
                  <Bar dataKey="webProdReplays" stackId="sessions" fill="var(--color-webProdReplays)" />
                  <Bar dataKey="webDevReplays" stackId="sessions" fill="var(--color-webDevReplays)" />
                  <Bar dataKey="appProdReplays" stackId="sessions" fill="var(--color-appProdReplays)" />
                </>
              ) : (
                <>
                  {/* Single project view: Original two bars */}
                  <Bar dataKey="capturedReplays" stackId="sessions" fill="var(--color-capturedReplays)" />
                  <Bar dataKey="remainingSessions" stackId="sessions" fill="var(--color-remainingSessions)" />
                </>
              )}
              
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
