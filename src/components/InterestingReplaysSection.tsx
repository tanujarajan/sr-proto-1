import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Smartphone, AlertTriangle, UserPlus, TrendingUp } from "lucide-react";
import { SessionReplay } from "@/types/session-replay";

interface InterestingReplaysSectionProps {
  onReplaySelect: (replay: SessionReplay) => void;
}

const interestingReplays = [
  {
    id: "1",
    title: "High Engagement",
    subtitle: "Session with 15+ events",
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-50",
    count: "3 replays",
  },
  {
    id: "2", 
    title: "Mobile Users",
    subtitle: "iOS and Android sessions",
    icon: Smartphone,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    count: "12 replays",
  },
  {
    id: "3",
    title: "Error Sessions",
    subtitle: "Sessions with JS errors",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    count: "5 replays",
  },
  {
    id: "4",
    title: "New Users",
    subtitle: "First-time visitors",
    icon: UserPlus,
    color: "text-purple-600", 
    bgColor: "bg-purple-50",
    count: "8 replays",
  },
];

export function InterestingReplaysSection({ onReplaySelect }: InterestingReplaysSectionProps) {
  const handleCardClick = (replayData: typeof interestingReplays[0]) => {
    // Create a mock replay for the selected interesting replay
    const mockReplay: SessionReplay = {
      id: `interesting-${replayData.id}`,
      timestamp: new Date(),
      userEmail: "user@example.com",
      sessionLength: "5m 30s",
      country: "United States",
      countryFlag: "🇺🇸",
      hasError: replayData.title === "Error Sessions",
    };
    onReplaySelect(mockReplay);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Interesting Replays</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {interestingReplays.map((replay) => (
          <Card 
            key={replay.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleCardClick(replay)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${replay.bgColor}`}>
                  <replay.icon className={`w-5 h-5 ${replay.color}`} />
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(replay);
                  }}
                >
                  <Play className="w-4 h-4" />
                </Button>
              </div>
              <h3 className="font-medium text-sm mb-1">{replay.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{replay.subtitle}</p>
              <p className="text-xs font-medium text-blue-600">{replay.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}