// Starfield Types
export interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
}

export interface StarfieldProps {
  isWarping: boolean;
}

// Navigation Types
export interface NavProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
}

// Content Types
export interface TimelineItemProps {
  year: string;
  title: string;
  company: string;
  description: string;
  stack: string[];
  delay: number;
}

export interface ProjectCardProps {
  title: string;
  desc: string;
  tags: string[];
}

export interface HomePageProps {
  onNavigate: (route: string) => void;
}

// Blog Types
export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

