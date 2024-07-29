import CryptoJS from 'crypto-js'

export function generateProductId(length: number): string {
  const randomBytes = CryptoJS.lib.WordArray.random(length)
  const base64String = CryptoJS.enc.Base64.stringify(randomBytes)
  const alphanumericString = base64String.replace(/[^a-zA-Z0-9]/g, '')
  return alphanumericString.substring(0, length)
}
