import { SessionReplay } from "@/types/session-replay";

const countries = [
  { name: "United States", flag: "🇺🇸" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "France", flag: "🇫🇷" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "Norway", flag: "🇳🇴" },
  { name: "Denmark", flag: "🇩🇰" },
  { name: "Finland", flag: "🇫🇮" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "New Zealand", flag: "🇳🇿" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "Argentina", flag: "🇦🇷" },
  { name: "India", flag: "🇮🇳" },
  { name: "China", flag: "🇨🇳" },
  { name: "Israel", flag: "🇮🇱" },
  { name: "Ireland", flag: "🇮🇪" },
  { name: "Portugal", flag: "🇵🇹" },
];

const emailDomains = [
  "gmail.com",
  "leadtech.com", 
  "roomex.com",
  "fanduel.com",
  "picturewealth.com",
  "kcd.co.kr",
  "raoncorp.com",
  "nc43tech.com",
  "aiby.com",
  "team.skin.club",
  "groupby.biz",
  "verv.com",
  "hotmail.com",
  "yahoo.com",
  "outlook.com",
  "company.com",
  "startup.io",
  "tech.co",
];

const firstNames = [
  "John", "Jane", "Michael", "Sarah", "David", "Emily", "James", "Lisa",
  "Robert", "Jennifer", "William", "Amanda", "Richard", "Jessica", "Charles",
  "Ashley", "Joseph", "Brittany", "Christopher", "Samantha", "Daniel", "Rachel",
  "Matthew", "Lauren", "Anthony", "Megan", "Mark", "Nicole", "Donald", "Stephanie",
  "Luis", "Maria", "Carlos", "Ana", "Pedro", "Carmen", "Jose", "Sofia",
  "Antonio", "Isabella", "Francisco", "Elena", "Manuel", "Lucia", "Diego", "Valeria",
  "Alex", "Kate", "Ben", "Emma", "Chris", "Olivia", "Tom", "Grace",
];

const lastNames = [
  "smith", "johnson", "williams", "brown", "jones", "garcia", "miller", "davis",
  "rodriguez", "martinez", "hernandez", "lopez", "gonzalez", "wilson", "anderson",
  "thomas", "taylor", "moore", "jackson", "martin", "lee", "perez", "thompson",
  "white", "harris", "sanchez", "clark", "ramirez", "lewis", "robinson",
  "dramos", "czerwinski", "myers", "tripathy", "ladutko", "urizar", "pablo",
  "fedorova", "accountrnd", "ludmyla", "hello_world", "ramos", "konrad", "matthew",
  "shilpi", "dora", "mueller", "schmidt", "weber", "meyer", "wagner",
];

function generateRandomEmail(): string {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)].toLowerCase();
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)].toLowerCase();
  const domain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
  
  const separator = Math.random() > 0.5 ? "." : "";
  const number = Math.random() > 0.7 ? Math.floor(Math.random() * 99) : "";
  
  return `${firstName}${separator}${lastName}${number}@${domain}`;
}

function generateSessionLength(): string {
  const totalSeconds = Math.floor(Math.random() * 3600); // 0-60 minutes
  
  if (totalSeconds < 60) {
    return `${totalSeconds}s`;
  }
  
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  if (minutes < 60) {
    return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

function generateTimestamp(): Date {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 7); // Last 7 days
  const hoursAgo = Math.floor(Math.random() * 24);
  const minutesAgo = Math.floor(Math.random() * 60);
  
  const timestamp = new Date(now);
  timestamp.setDate(timestamp.getDate() - daysAgo);
  timestamp.setHours(timestamp.getHours() - hoursAgo);
  timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);
  
  return timestamp;
}

function generateSessionId(): string {
  return Math.floor(Math.random() * 900000000000 + 100000000000).toString();
}

export function generateMockReplays(count: number): SessionReplay[] {
  return Array.from({ length: count }, () => {
    const country = countries[Math.floor(Math.random() * countries.length)];
    
    return {
      id: generateSessionId(),
      timestamp: generateTimestamp(),
      userEmail: generateRandomEmail(),
      sessionLength: generateSessionLength(),
      country: country.name,
      countryFlag: country.flag,
      hasError: Math.random() > 0.85, // 15% chance of error
      isLive: Math.random() > 0.7, // 30% chance of being live
    };
  });
}