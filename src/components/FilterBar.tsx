import { useState } from "react";
import { Button } from "@/components/ui/button";

type TimePeriod = "1d" | "7d" | "30d";

export function FilterBar() {
  const [activeTimePeriod, setActiveTimePeriod] = useState<TimePeriod>("7d");

  const timePeriods: { value: TimePeriod; label: string }[] = [
    { value: "1d", label: "1d" },
    { value: "7d", label: "7d" },
    { value: "30d", label: "30d" },
  ];

  return (
    <div className="flex items-center gap-2">
      {timePeriods.map((period) => (
        <Button
          key={period.value}
          variant={activeTimePeriod === period.value ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTimePeriod(period.value)}
          className="h-8 px-3"
        >
          {period.label}
        </Button>
      ))}
    </div>
  );
}