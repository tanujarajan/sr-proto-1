
import { ChartContainer, ChartTooltip, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ReferenceLine } from "recharts";
import { generateSessionCoverageData, generateCrossProjectData } from "@/utils/sessionCoverageData";

interface SessionReplayCoverageChartProps {
  isCrossProjectView: boolean;
}

export function SessionReplayCoverageChart({ isCrossProjectView }: SessionReplayCoverageChartProps) {
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
      label: "Web-Prod",
      color: "hsl(217, 91%, 60%)", // Blue
    },
    webDevReplays: {
      label: "Web-Dev", 
      color: "hsl(25, 95%, 53%)", // Orange
    },
    appProdReplays: {
      label: "App-Prod",
      color: "hsl(262, 83%, 58%)", // Purple
    },
    remainingSessions: {
      label: "User Sessions", 
      color: "#93bd31", // Green
    },
  };

  const chartConfig = isCrossProjectView ? crossProjectConfig : singleProjectConfig;
  const chartData = isCrossProjectView ? crossProjectData : singleProjectData;

  return (
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
                            <span className="text-muted-foreground">User Sessions</span>
                          </div>
                          <span className="font-mono font-medium">
                            {Math.round(data.totalSessions / 1000000 * 10) / 10}M
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-sm bg-[hsl(217,91%,60%)]"></div>
                            <span className="text-muted-foreground">Web-Prod</span>
                          </div>
                          <span className="font-mono font-medium">
                            {Math.round(data.webProdReplays / 1000000 * 10) / 10}M
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-sm bg-[hsl(25,95%,53%)]"></div>
                            <span className="text-muted-foreground">Web-Dev</span>
                          </div>
                          <span className="font-mono font-medium">
                            {Math.round(data.webDevReplays / 1000000 * 10) / 10}M
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-sm bg-[hsl(262,83%,58%)]"></div>
                            <span className="text-muted-foreground">App-Prod</span>
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
              {/* Cross-project view: Multiple project bars */}
              <Bar dataKey="webProdReplays" stackId="sessions" fill="var(--color-webProdReplays)" />
              <Bar dataKey="webDevReplays" stackId="sessions" fill="var(--color-webDevReplays)" />
              <Bar dataKey="appProdReplays" stackId="sessions" fill="var(--color-appProdReplays)" />
              <Bar dataKey="remainingSessions" stackId="sessions" fill="var(--color-remainingSessions)" />
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
  );
}
