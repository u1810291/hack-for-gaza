import BluetoothSerial from 'react-native-bluetooth-serial';
import { BlockchainService } from 'services/blockchain/BlockChain.service';
import { BlockchainTransaction } from 'models/BlockChainTransaction';

export class BluetoothSync {
  private blockchain: BlockchainService;

  constructor(blockchain: BlockchainService) {
    this.blockchain = blockchain;
  }

  async initialize(): Promise<void> {
    try {
      await BluetoothSerial.requestEnable();
      await BluetoothSerial.enable();
    } catch (error) {
      console.error('Bluetooth initialization failed:', error);
    }
  }

  async discoverDevices(): Promise<string[]> {
    try {
      const unpaired = await BluetoothSerial.discoverUnpairedDevices();
      return unpaired.map((device: any) => device.id);
    } catch (error) {
      console.error('Device discovery failed:', error);
      return [];
    }
  }

  async syncWithDevice(deviceId: string, transactions: BlockchainTransaction[]): Promise<void> {
    try {
      await BluetoothSerial.connect(deviceId);
      const data = JSON.stringify(transactions);
      await BluetoothSerial.write(data);
      const receivedData = await BluetoothSerial.read();
      const receivedTransactions: BlockchainTransaction[] = JSON.parse(receivedData);
      for (const tx of receivedTransactions) {
        await this.blockchain.addTransaction(tx);
      }
      await BluetoothSerial.disconnect();
    } catch (error) {
      console.error('Bluetooth sync failed:', error);
    }
  }
}