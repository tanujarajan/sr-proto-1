import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DateRangeFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)); // 7 days ago
  const [endDate, setEndDate] = useState<Date | undefined>(new Date()); // Today
  const [activeTab, setActiveTab] = useState<"start" | "end">("start");

  const formatDateRange = () => {
    if (startDate && endDate) {
      const start = format(startDate, "MMM d");
      const end = format(endDate, "MMM d");
      return `${start} - ${end}`;
    }
    return "Select date range";
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (activeTab === "start") {
      setStartDate(date);
      setActiveTab("end");
    } else {
      setEndDate(date);
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 px-3 justify-between font-normal",
            !startDate && !endDate && "text-muted-foreground"
          )}
        >
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span>{formatDateRange()}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          <div className="flex gap-2 mb-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab("start")}
              className={`text-xs ${
                activeTab === "start" 
                  ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white" 
                  : "hover:bg-blue-100 hover:text-blue-900"
              }`}
            >
              Start Date
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab("end")}
              className={`text-xs ${
                activeTab === "end" 
                  ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white" 
                  : "hover:bg-blue-100 hover:text-blue-900"
              }`}
            >
              End Date
            </Button>
          </div>
          <Calendar
            mode="single"
            selected={activeTab === "start" ? startDate : endDate}
            onSelect={handleDateSelect}
            initialFocus
            className="pointer-events-auto"
            classNames={{
              day_selected: "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-blue-100 hover:text-blue-900 inline-flex items-center justify-center rounded-md"
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}