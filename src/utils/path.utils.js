import { config } from '../config/app.config.js';

export function generateTempFilePath(extension) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  return `${config.tempDir}/${timestamp}-${random}.${extension}`;
}