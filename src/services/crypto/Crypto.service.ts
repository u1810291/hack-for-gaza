import CryptoJS from 'react-native-crypto-js';

export class CryptoService {
  public static async generateKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
    // Simplified key generation for demo (use libsodium in production)
    const publicKey = CryptoJS.lib.WordArray.random(32).toString();
    const privateKey = CryptoJS.lib.WordArray.random(32).toString();
    return { publicKey, privateKey };
  }

  static async encrypt(data: string): Promise<string> {
    return CryptoJS.AES.encrypt(data, 'secret-key-123').toString();
  }

  static async decrypt(encryptedData: string): Promise<string> {
    const bytes = CryptoJS.AES.decrypt(encryptedData, 'secret-key-123');
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  static async sign(data: string): Promise<string> {
    return CryptoJS.HmacSHA256(data, 'private-key-123').toString();
  }

  static async verify(data: string, signature: string, publicKey: string): Promise<boolean> {
    const computedSignature = CryptoJS.HmacSHA256(data, 'private-key-123').toString();
    return computedSignature === signature;
  }
}