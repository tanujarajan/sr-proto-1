import { useState, useEffect } from "react";
import { Play, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SessionReplay } from "@/types/session-replay";
import { generateMockReplays } from "@/utils/mockData";

interface SessionReplayTableProps {
  showLiveReplays: boolean;
  onReplaySelect: (replay: SessionReplay) => void;
  onShowLiveReplaysChange: (checked: boolean) => void;
}

export function SessionReplayTable({ showLiveReplays, onReplaySelect, onShowLiveReplaysChange }: SessionReplayTableProps) {
  const [replays, setReplays] = useState<SessionReplay[]>([]);
  const [loading, setLoading] = useState(false);
  
  console.log("SessionReplayTable rendered - toggle should be in table header, showLiveReplays:", showLiveReplays);

  useEffect(() => {
    // Initial load
    setReplays(generateMockReplays(20));
  }, []);

  const filteredReplays = showLiveReplays 
    ? replays 
    : replays.filter(replay => !replay.isLive);

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setReplays(prev => [...prev, ...generateMockReplays(20)]);
      setLoading(false);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffHours < 1) {
      const minutes = Math.floor(diffHours * 60);
      return `${minutes}m ago`;
    } else if (diffHours < 24) {
      return `Today, ${date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })}`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-border bg-muted/50 text-sm font-medium text-muted-foreground">
        <div className="col-span-2 flex items-center gap-2">
          Time
          <Info className="w-3 h-3" />
        </div>
        <div className="col-span-3 flex items-center gap-2">
          User ID
          <Info className="w-3 h-3" />
        </div>
        <div className="col-span-2 flex items-center gap-2">
          Session Length
          <Info className="w-3 h-3" />
        </div>
        <div className="col-span-2">
          Country
        </div>
        <div className="col-span-3 flex items-center justify-center gap-2 pr-4">
          <span className="text-sm text-muted-foreground">Show Live Replays</span>
          <Switch 
            checked={showLiveReplays} 
            onCheckedChange={onShowLiveReplaysChange}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-auto">
        {filteredReplays.map((replay, index) => (
          <div
            key={replay.id}
            className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={() => onReplaySelect(replay)}
          >
            <div className="col-span-2 flex items-center gap-3">
              <Button
                size="sm"
                variant="ghost"
                className="w-8 h-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={(e) => {
                  e.stopPropagation();
                  onReplaySelect(replay);
                }}
              >
                <Play className="w-4 h-4" />
              </Button>
              <span className="text-sm">
                {formatTime(replay.timestamp)}
              </span>
              {replay.hasError && (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
            </div>
            
            <div className="col-span-3 flex items-center">
              <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                {replay.userEmail}
              </span>
            </div>
            
            <div className="col-span-2 flex items-center">
              <span className="text-sm">
                {replay.sessionLength}
              </span>
            </div>
            
            <div className="col-span-2 flex items-center gap-2">
              <span className="text-sm">{replay.countryFlag}</span>
              <span className="text-sm">{replay.country}</span>
            </div>
            
            <div className="col-span-3"></div>
          </div>
        ))}
        
        {/* Load More Button */}
        <div className="p-6 text-center">
          <Button 
            onClick={loadMore} 
            disabled={loading}
            variant="outline"
            className="w-32"
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      </div>
    </div>
  );
}