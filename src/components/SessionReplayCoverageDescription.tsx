
interface SessionReplayCoverageDescriptionProps {
  isCrossProjectView: boolean;
}

export function SessionReplayCoverageDescription({ isCrossProjectView }: SessionReplayCoverageDescriptionProps) {
  return (
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
            Use the chart below to understand how each project contributes to your overall replay quota usage over time.
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
  );
}
