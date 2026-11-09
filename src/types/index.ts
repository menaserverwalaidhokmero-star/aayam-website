export type Category = 
  | 'All'
  | 'Spatial Computing'
  | 'Biomimetic Design'
  | 'Analog Acoustics'
  | 'Generative Systems'
  | 'Sustainable Materials';

export interface DiscoveryItem {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  author: string;
  authorRole: string;
  readTime: string;
  date: string;
  imageUrl: string;
  excerpt: string;
  fullStory: string;
  keyTakeaways: string[];
  tags: string[];
  likes: number;
  bookmarked?: boolean;
}

export interface CommunityComment {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  timestamp: string;
}

export interface CommunitySpark {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  role: string;
  timestamp: string;
  title: string;
  content: string;
  category: 'Insight' | 'Critique' | 'Prototype' | 'Resource';
  likes: number;
  userLiked: boolean;
  comments: CommunityComment[];
}

export interface ProjectTask {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  author: string;
  authorAvatar: string;
  coverImage: string;
  summary: string;
  content: string[];
}

export interface UserProfile {
  name: string;
  handle: string;
  title: string;
  bio: string;
  avatarUrl: string;
  location: string;
  website: string;
  theme: 'dark' | 'light';
  accentColor: 'amber' | 'cyan' | 'emerald' | 'violet';
  soundEnabled: boolean;
  reducedMotion: boolean;
}
