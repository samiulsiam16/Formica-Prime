export type AntType = 'worker' | 'creative' | 'queen' | 'strategy' | 'reporter' | 'merchant' | 'motion' | 'tiny';
export type Mood = 'calm' | 'excited' | 'panicked' | 'sleepy' | 'commanding';

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
