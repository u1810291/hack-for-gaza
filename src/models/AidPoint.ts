export interface AidPoint {
  id: string;
  type: 'aid' | 'water' | 'clinic';
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  lastUpdated: number;
  comments: Comment[];
  trustworthiness: number; // 0-100
  verificationStatus: 'verified' | 'pending' | 'unverified';
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  timestamp: number;
  agrees: number;
}