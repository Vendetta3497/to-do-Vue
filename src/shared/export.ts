import { encryptAES } from './crypto';

export function exportData(data: object, password: string) {
   const encrypted = encryptAES(data, password);
   const blob = new Blob([encrypted], { type: 'text/plain;charset=utf-8' });
   const link = document.createElement('a');
   link.href = URL.createObjectURL(blob);
   link.download = 'todo_encrypted.txt';
   link.click();
   setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}
