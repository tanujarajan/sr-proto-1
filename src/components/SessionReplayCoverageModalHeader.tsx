
interface SessionReplayCoverageModalHeaderProps {
  isCrossProjectView: boolean;
}

export function SessionReplayCoverageModalHeader({ isCrossProjectView }: SessionReplayCoverageModalHeaderProps) {
  return (
    <div className="space-y-4 pb-1">
      <h1 className="text-lg font-semibold tracking-wide text-left text-muted-foreground">
        SESSION REPLAY COVERAGE
      </h1>
      
      {/* Header Metrics */}
      <div className="text-left">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {isCrossProjectView 
            ? "Cross-Project View - 2M Monthly Quota Usage"
            : "10% of 10M Sessions This Month"
          }
        </h2>
      </div>
    </div>
  );
}
