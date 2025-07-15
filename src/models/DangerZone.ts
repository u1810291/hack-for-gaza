export interface DangerZone {
  id: string;
  latitude: number;
  longitude: number;
  radius: number;
  type: 'evacuation' | 'bombing' | 'drone' | 'airstrike';
  description: string;
  timestamp: number;
  verificationStatus: 'verified' | 'pending' | 'unverified';
}