import { decryptAES } from './crypto';

/**
 * @param file
 * @param password
 * @returns
 */
export function importData(file: File, password: string): Promise<object | null> {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
         const encryptedText = reader.result as string;
         const decrypted = decryptAES(encryptedText, password);
         resolve(decrypted);
      };

      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
   });
}
