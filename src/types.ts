export type AntType = 'worker' | 'creative' | 'queen' | 'strategy' | 'reporter' | 'merchant' | 'motion' | 'tiny' | 'oracle' | 'radio' | 'guard' | 'deals' | 'spark' | 'nurse' | 'doctor' | 'teacher' | 'chef' | 'delivery' | 'police' | 'construction' | 'farmer' | 'royal' | 'scribe' | 'historian';
export type Mood = 'calm' | 'excited' | 'panicked' | 'sleepy' | 'commanding' | 'hurried' | 'stressed' | 'tired' | 'hungry' | 'angry' | 'alert' | 'happy' | 'neutral';

export interface Project {
  id: string;
  title: string;
  category: string;
  crumbLevel: number;
  description: string;
  client: string;
  timeline: string;
  role: string;
  tools: string[];
  results: string[];
  quote: {
    text: string;
    author: string;
    authorTitle: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  author: AntType;
  authorName: string;
  date: string;
  readTime: string;
  teaser: string;
  content: string;
  color: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  illustration: string;
}

export interface ColonyWisdom {
  text: string;
}

export interface RejectedConcept {
  id: string;
  title: string;
  causeOfDeath: string;
  mockupType: 'logo' | 'gradient' | 'mascot' | 'campaign' | 'wordmark' | 'rebrand' | 'website';
}

export interface AntScheduleSlot {
  startTime: string;
  endTime: string;
  activity: string;
  location: string;
}
