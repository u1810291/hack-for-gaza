import { BlockchainService } from './BlockChain.service';
import { BlockchainTransaction } from 'models/BlockChainTransaction';
import { AidPoint } from 'models/AidPoint';
import { DangerZone } from 'models/DangerZone';
import { Comment } from 'models/AidPoint';
import { VerificationRecord } from 'models/VerificationRecord';
import { CryptoService } from 'services/crypto/Crypto.service';
import { v4 as uuidv4 } from 'uuid';

export class TransactionService {
  private blockchain: BlockchainService;

  constructor(blockchain: BlockchainService) {
    this.blockchain = blockchain;
  }

  async createAidPointTransaction(aidPoint: AidPoint): Promise<void> {
    const transaction: BlockchainTransaction = {
      id: uuidv4(),
      type: 'add_aid',
      data: aidPoint,
      timestamp: Date.now(),
      signature: '',
      publicKey: (await CryptoService.generateKeyPair()).publicKey,
      previousHash: '',
      hash: '',
    };
    await this.blockchain.addTransaction(transaction);
  }

  async updateAidPointTransaction(aidPoint: AidPoint): Promise<void> {
    const transaction: BlockchainTransaction = {
      id: uuidv4(),
      type: 'update_aid',
      data: aidPoint,
      timestamp: Date.now(),
      signature: '',
      publicKey: (await CryptoService.generateKeyPair()).publicKey,
      previousHash: '',
      hash: '',
    };
    await this.blockchain.addTransaction(transaction);
  }

  async createDangerZoneTransaction(dangerZone: DangerZone): Promise<void> {
    const transaction: BlockchainTransaction = {
      id: uuidv4(),
      type: 'add_danger',
      data: dangerZone,
      timestamp: Date.now(),
      signature: '',
      publicKey: (await CryptoService.generateKeyPair()).publicKey,
      previousHash: '',
      hash: '',
    };
    await this.blockchain.addTransaction(transaction);
  }

  async addCommentTransaction(comment: Comment, aidPointId: string): Promise<void> {
    const transaction: BlockchainTransaction = {
      id: uuidv4(),
      type: 'comment',
      data: { ...comment, entityId: aidPointId },
      timestamp: Date.now(),
      signature: '',
      publicKey: (await CryptoService.generateKeyPair()).publicKey,
      previousHash: '',
      hash: '',
    };
    await this.blockchain.addTransaction(transaction);
  }

  async addVerificationTransaction(record: VerificationRecord): Promise<void> {
    const transaction: BlockchainTransaction = {
      id: uuidv4(),
      type: 'verify',
      data: record,
      timestamp: Date.now(),
      signature: '',
      publicKey: (await CryptoService.generateKeyPair()).publicKey,
      previousHash: '',
      hash: '',
    };
    await this.blockchain.addTransaction(transaction);
  }
}