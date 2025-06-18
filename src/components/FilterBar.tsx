import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DateRangeFilter } from "@/components/DateRangeFilter";

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
      <DateRangeFilter />
      {timePeriods.map((period) => (
        <Button
          key={period.value}
          variant="outline"
          size="sm"
          onClick={() => setActiveTimePeriod(period.value)}
          className={`h-8 px-3 ${
            activeTimePeriod === period.value 
              ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white" 
              : "hover:bg-blue-100 hover:text-blue-900"
          }`}
        >
          {period.label}
        </Button>
      ))}
    </div>
  );
}