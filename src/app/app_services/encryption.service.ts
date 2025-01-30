import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // ✅ Global Injection
})
export class EncryptionService {
  private secretKey: string = "my-static-key";  // Replace with secure key logic
  private validityDuration = 2 * 60 * 1000;  // ✅ 3 minutes in milliseconds

  encrypt(data: string): string {
    const timestamp = Date.now();  // Current time in milliseconds
    console.log('🔹 Encryption Timestamp:', timestamp);  

    const dataWithTimestamp = `${data}::${timestamp}`;
    const encrypted = CryptoJS.AES.encrypt(dataWithTimestamp, this.secretKey).toString();
    console.log('🔹 Encrypted Data:', encrypted);  

    return encodeURIComponent(encrypted);
}

decrypt(encryptedData: string): string | null {
    try {
        const decodedData = decodeURIComponent(encryptedData);
        console.log('🔹 Decoded Encrypted Data:', decodedData);

        const bytes = CryptoJS.AES.decrypt(decodedData, this.secretKey);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        console.log('🔹 Decrypted String:', decryptedString);

        if (!decryptedString) {
            console.error("🔴 Decryption failed (empty output)");
            return null;
        }

        const [originalData, timestamp] = decryptedString.split('::');

        if (!timestamp || isNaN(Number(timestamp))) {
            console.error("🔴 Invalid timestamp in decrypted data");
            return null;
        }

        const currentTime = Date.now();
        console.log('🔹 Current Time:', currentTime);
        console.log('🔹 Received Timestamp:', Number(timestamp));
        console.log('🔹 Time Difference:', currentTime - Number(timestamp));

        if (currentTime - Number(timestamp) > this.validityDuration) {
            console.warn("🔴 Encrypted URL expired!");
            return null;
        }

        return originalData;
    } catch (error) {
        console.error("🔴 Decryption failed", error);
        return null;
    }
}

}
