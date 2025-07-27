import CryptoJS from 'crypto-js';

/**
 * @param data
 * @param password
 * @returns
 */
export function encryptAES(data: object, password: string): string {
   const json = JSON.stringify(data);
   return CryptoJS.AES.encrypt(json, password).toString();
}

/**
 * @param cipherText
 * @param password
 * @returns
 */
export function decryptAES(cipherText: string, password: string): object | null {
   try {
      const bytes = CryptoJS.AES.decrypt(cipherText, password);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
   } catch (error) {
      console.error('Ошибка при расшифровке AES:', error);
      return null;
   }
}
