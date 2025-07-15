import { AidPoint, Comment } from './AidPoint';
import { DangerZone } from './DangerZone';
import { VerificationRecord } from './VerificationRecord';

export interface BlockchainTransaction {
  id: string;
  type: 'add_aid' | 'update_aid' | 'add_danger' | 'update_danger' | 'comment' | 'verify';
  data: AidPoint | DangerZone | Comment | VerificationRecord;
  timestamp: number;
  signature: string;
  publicKey: string;
  previousHash: string;
  hash: string;
}
