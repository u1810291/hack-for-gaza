import BluetoothSerial from 'react-native-bluetooth-serial';
import { BlockchainTransaction } from 'models/BlockChainTransaction';
import { BlockchainService } from 'services/blockchain/BlockChain.service';

// Declare module to suppress TypeScript errors
declare module 'react-native-bluetooth-serial';

export class BluetoothSync {
  private blockchain: BlockchainService;

  constructor(blockchain: BlockchainService) {
    this.blockchain = blockchain;
  }

  async initialize(): Promise<void> {
    try {
      // Type assertion to bypass TypeScript error
      const bluetooth = BluetoothSerial as any;
      await bluetooth.requestEnable();
      await bluetooth.enable();
    } catch (error) {
      console.error('Bluetooth initialization failed:', error);
    }
  }

  async discoverDevices(): Promise<string[]> {
    try {
      const bluetooth = BluetoothSerial as any;
      const unpaired = await bluetooth.discoverUnpairedDevices();
      return unpaired.map((device: any) => device.id);
    } catch (error) {
      console.error('Device discovery failed:', error);
      return [];
    }
  }

  async syncWithDevice(deviceId: string, transactions: BlockchainTransaction[]): Promise<void> {
    try {
      const bluetooth = BluetoothSerial as any;
      await bluetooth.connect(deviceId);
      const data = JSON.stringify(transactions);
      await bluetooth.write(data);
      const receivedData = await bluetooth.read();
      const receivedTransactions: BlockchainTransaction[] = JSON.parse(receivedData);
      for (const tx of receivedTransactions) {
        await this.blockchain.addTransaction(tx);
      }
      await bluetooth.disconnect();
    } catch (error) {
      console.error('Bluetooth sync failed:', error);
    }
  }
}