export interface VerificationRecord {
  id: string;
  entityId: string; // AidPoint or DangerZone ID
  entityType: 'aid' | 'danger';
  factCheckResult: {
    isValid: boolean;
    confidence: number;
    details: string;
  };
  timestamp: number;
}