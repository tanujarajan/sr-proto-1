export interface SessionCoverageData {
  month: string;
  totalSessions: number;
  capturedReplays: number;
  remainingSessions: number;
  quotaUsed: number; // Percentage of 2M quota used
}

export function generateSessionCoverageData(): SessionCoverageData[] {
  const months = ['Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024'];
  
  return months.map(month => {
    // Generate total sessions between 8M-12M
    const totalSessions = Math.floor(Math.random() * 4000000) + 8000000;
    
    // Captured replays is ~10% of total sessions
    const capturedReplays = Math.floor(totalSessions * (0.08 + Math.random() * 0.04)); // 8-12% variation
    
    const quotaUsed = (capturedReplays / 2000000) * 100; // 2M quota
    
    return {
      month,
      totalSessions,
      capturedReplays,
      remainingSessions: totalSessions - capturedReplays,
      quotaUsed: Math.round(quotaUsed * 10) / 10 // Round to 1 decimal
    };
  });
}