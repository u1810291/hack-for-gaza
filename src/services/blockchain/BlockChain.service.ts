import { BlockchainTransaction } from 'models/BlockChainTransaction';
import { StorageService } from 'services/storage/Storage.service';
import CryptoJS from 'react-native-crypto-js';
import { CryptoService } from 'services/crypto/Crypto.service';

export class BlockchainService {
  private storage: StorageService;
  private chain: BlockchainTransaction[] = [];
  private readonly genesisBlock: BlockchainTransaction;

  constructor() {
    this.storage = new StorageService();
    this.genesisBlock = {
      id: 'genesis',
      type: 'add_aid',
      data: {} as any,
      timestamp: 0,
      signature: '',
      publicKey: '',
      previousHash: '0',
      hash: this.calculateHash({ id: 'genesis', previousHash: '0' })
    };
  }

  async initialize(): Promise<void> {
    await this.storage.init();
    const chain = await this.storage.getChain();
    this.chain = chain.length ? chain : [this.genesisBlock];
  }

  calculateHash(transaction: Partial<BlockchainTransaction>): string {
    return CryptoJS.SHA256(
      JSON.stringify({
        id: transaction.id,
        type: transaction.type,
        data: transaction.data,
        timestamp: transaction.timestamp,
        previousHash: transaction.previousHash
      })
    ).toString();
  }

  async addTransaction(transaction: BlockchainTransaction): Promise<void> {
    const previousBlock = this.chain[this.chain.length - 1];
    transaction.previousHash = previousBlock.hash;
    transaction.hash = this.calculateHash(transaction);
    transaction.signature = await CryptoService.sign(transaction.hash);
    this.chain.push(transaction);
    await this.storage.saveChain(this.chain);
  }

  async verifyChain(): Promise<boolean> {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];
      if (current.previousHash !== previous.hash) return false;
      if (current.hash !== this.calculateHash(current)) return false;
      if (!(await CryptoService.verify(current.hash, current.signature, current.publicKey))) {
        return false;
      }
    }
    return true;
  }
}