
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SessionReplayDashboard } from "@/components/SessionReplayDashboard";
import { SessionReplayModal } from "@/components/SessionReplayModal";
import { SessionReplay } from "@/types/session-replay";

const ReplayStatsV2 = () => {
  const [selectedReplay, setSelectedReplay] = useState<SessionReplay | null>(null);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1">
          <SessionReplayDashboard onReplaySelect={setSelectedReplay} useV2Tooltip={true} />
        </main>
        
        {selectedReplay && (
          <SessionReplayModal 
            replay={selectedReplay} 
            onClose={() => setSelectedReplay(null)} 
          />
        )}
      </div>
    </SidebarProvider>
  );
};

export default ReplayStatsV2;
