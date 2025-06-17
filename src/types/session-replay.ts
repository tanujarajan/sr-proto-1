export interface SessionReplay {
  id: string;
  timestamp: Date;
  userEmail: string;
  sessionLength: string;
  country: string;
  countryFlag: string;
  hasError?: boolean;
  isLive?: boolean;
}