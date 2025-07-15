import QRCode from 'react-native-qrcode-svg';
import { BlockchainService } from 'services/blockchain/BlockChain.service';
import { BlockchainTransaction } from 'models/BlockChainTransaction';

export class QRSync {
  private blockchain: BlockchainService;

  constructor(blockchain: BlockchainService) {
    this.blockchain = blockchain;
  }

  async generateQRCode(transactions: BlockchainTransaction[]): Promise<string> {
    return JSON.stringify(transactions);
  }

  async processQRCode(qrData: string): Promise<void> {
    const transactions: BlockchainTransaction[] = JSON.parse(qrData);
    for (const tx of transactions) {
      await this.blockchain.addTransaction(tx);
    }
  }
}