import SQLite from 'react-native-sqlite-storage';
import { BlockchainTransaction } from 'models/BlockChainTransaction';
import { CryptoService } from 'services/crypto/Crypto.service';

export class StorageService {
  private db?: SQLite.SQLiteDatabase;

  async init(): Promise<void> {
    this.db = await SQLite.openDatabase({
      name: 'crisisApp.db',
      location: 'default',
      createFromLocation: 1,
    });

    await this.db.executeSql(`
      CREATE TABLE IF NOT EXISTS blockchain (
        id TEXT PRIMARY KEY,
        type TEXT,
        data TEXT,
        timestamp INTEGER,
        signature TEXT,
        publicKey TEXT,
        previousHash TEXT,
        hash TEXT
      )
    `);
  }

  async saveChain(chain: BlockchainTransaction[]): Promise<void> {
    for (const tx of chain) {
      const encryptedData = await CryptoService.encrypt(JSON.stringify(tx.data));
      await this.db?.executeSql(
        `INSERT OR REPLACE INTO blockchain (id, type, data, timestamp, signature, publicKey, previousHash, hash)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          tx.id,
          tx.type,
          encryptedData,
          tx.timestamp,
          tx.signature,
          tx.publicKey,
          tx.previousHash,
          tx.hash,
        ]
      );
    }
  }

  async getChain(): Promise<BlockchainTransaction[]> {
    const [results]: any = await this.db?.executeSql('SELECT * FROM blockchain');
    const chain: BlockchainTransaction[] = [];
    for (let i = 0; i < results.rows.length; i++) {
      const row = results.rows.item(i);
      const data = JSON.parse(await CryptoService.decrypt(row.data));
      chain.push({
        id: row.id,
        type: row.type,
        data,
        timestamp: row.timestamp,
        signature: row.signature,
        publicKey: row.publicKey,
        previousHash: row.previousHash,
        hash: row.hash,
      });
    }
    return chain;
  }
}