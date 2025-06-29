
export interface SessionCoverageData {
  month: string;
  totalSessions: number;
  capturedReplays: number;
  remainingSessions: number;
  quotaUsed: number; // Percentage of 2M quota used
}

export interface CrossProjectData {
  month: string;
  totalSessions: number; // Sum of all projects' sessions
  webProdSessions: number;
  webDevSessions: number;
  appProdSessions: number;
  webProdReplays: number;
  webDevReplays: number;
  appProdReplays: number;
  remainingSessions: number;
  totalReplays: number;
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

export function generateCrossProjectData(): CrossProjectData[] {
  const months = ['Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024'];
  const singleProjectData = generateSessionCoverageData();
  
  return months.map((month, index) => {
    // Get Web-Prod data from single project view to maintain consistency
    const webProdData = singleProjectData[index];
    const webProdSessions = webProdData.totalSessions;
    const webProdReplays = webProdData.capturedReplays;
    
    // Generate Web-Dev sessions (3-5M)
    const webDevSessions = Math.floor(Math.random() * 2000000) + 3000000; // 3M-5M
    
    // Generate App-Prod sessions (2-3M)
    const appProdSessions = Math.floor(Math.random() * 1000000) + 2000000; // 2M-3M
    
    // Total sessions across all projects
    const totalSessions = webProdSessions + webDevSessions + appProdSessions;
    
    // For March, set total replays to exactly 2M
    let totalReplays;
    if (month === 'Mar 2024') {
      totalReplays = 2000000; // Exactly 2M for March
    } else {
      // For other months, total replays between 1.5-1.9M
      totalReplays = Math.floor(Math.random() * 400000) + 1500000; // 1.5M-1.9M
    }
    
    // Web-Dev replays (25-35% of remaining replays after Web-Prod)
    const remainingAfterWebProd = totalReplays - webProdReplays;
    const webDevReplays = Math.floor(remainingAfterWebProd * (0.4 + Math.random() * 0.2));
    
    // App-Prod gets the rest
    const appProdReplays = totalReplays - webProdReplays - webDevReplays;
    
    const quotaUsed = (totalReplays / 2000000) * 100; // 2M quota
    
    return {
      month,
      totalSessions,
      webProdSessions,
      webDevSessions,
      appProdSessions,
      webProdReplays,
      webDevReplays,
      appProdReplays,
      remainingSessions: totalSessions - totalReplays,
      totalReplays,
      quotaUsed: Math.round(quotaUsed * 10) / 10
    };
  });
}
