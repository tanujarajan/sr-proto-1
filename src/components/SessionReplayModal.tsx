import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize, X } from "lucide-react";
import { SessionReplay } from "@/types/session-replay";
import { useState } from "react";

interface SessionReplayModalProps {
  replay: SessionReplay;
  onClose: () => void;
}

export function SessionReplayModal({ replay, onClose }: SessionReplayModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration] = useState(replay.sessionLength);

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-6xl h-[80vh] p-0">
        <div className="flex h-full">
          {/* Main Video Area */}
          <div className="flex-1 flex flex-col bg-black">
            {/* Video Player */}
            <div className="flex-1 relative bg-gray-900 flex items-center justify-center">
              {/* Placeholder for video - showing static image */}
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <p className="text-lg font-medium">Session Replay</p>
                  <p className="text-sm text-gray-400">{replay.userEmail}</p>
                </div>
              </div>
              
              {/* Close button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Video Controls */}
            <div className="bg-black p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <SkipForward className="w-4 h-4" />
                  </Button>
                  
                  <span className="text-sm">
                    {currentTime} / {duration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-700 h-1 rounded-full mt-3">
                <div className="bg-blue-600 h-1 rounded-full w-1/4"></div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-background border-l border-border flex flex-col">
            <DialogHeader className="p-4 border-b border-border">
              <DialogTitle className="text-lg">Session Details</DialogTitle>
            </DialogHeader>
            
            <div className="flex-1 p-4 overflow-auto">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">User Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Email:</span>
                      <span className="text-sm font-medium text-blue-600">{replay.userEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Location:</span>
                      <span className="text-sm">{replay.countryFlag} {replay.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Session Length:</span>
                      <span className="text-sm">{replay.sessionLength}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Session Timeline</h3>
                  <div className="space-y-2">
                    <div className="text-sm p-2 bg-muted rounded">
                      <span className="text-blue-600">0:00</span> - Page loaded
                    </div>
                    <div className="text-sm p-2 bg-muted rounded">
                      <span className="text-blue-600">0:15</span> - Button clicked
                    </div>
                    <div className="text-sm p-2 bg-muted rounded">
                      <span className="text-blue-600">1:30</span> - Form submitted
                    </div>
                    {replay.hasError && (
                      <div className="text-sm p-2 bg-red-50 border border-red-200 rounded">
                        <span className="text-red-600">2:45</span> - JavaScript error
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}