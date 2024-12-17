import fs from 'fs/promises';

export async function cleanupTempFiles(filePath) {
  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
  } catch (error) {
    // File doesn't exist or other error occurred
    console.error('Error cleaning up temporary files:', error);
  }
}