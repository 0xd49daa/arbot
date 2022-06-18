import Arweave from 'arweave';
import jwkToPem from 'jwk-to-pem';
import CRYPTO from 'crypto-js';
import {decryptData, encryptData} from './crypto';

export const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: false,
});

export async function getAddress(walletFile: any) {
  return await arweave.wallets.jwkToAddress(walletFile);
}

export async function getBalance(walletFile: any) {
  const address = await getAddress(walletFile);
  const rawBalance = await arweave.wallets.getBalance(address);
  return arweave.ar.winstonToAr(rawBalance);
}

export async function encryptString(walletFile: any, data: string) {
  const privatePem = await jwkToPem(walletFile, {private: true});

  const dataEncryptResult = await encryptData(data, privatePem);
  return await dataEncryptResult.toString();
}

export async function decryptString(walletFile: any, data: string) {
  const privatePem = await jwkToPem(walletFile, {private: true});
  const result = await decryptData(data, privatePem);
  return await result.toString(CRYPTO.enc.Utf8);
}

export async function getTxs() {
  return arweave.transactions.getData(
    'eaUAvulzZPrdh6_cHwUYV473OhvCumqT3K7eWI8tArk'
  );
}

export async function sendData(walletFile: any, data: any) {
  const transaction = await arweave.createTransaction({
    data,
  }, walletFile);

  transaction.addTag('App-Name', 'ar-crypto-storage');
  const txFee = await arweave.ar.winstonToAr(transaction.reward)

}