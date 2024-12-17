import axios from 'axios';
import fs from 'fs/promises';

export async function downloadPDF(url, outputPath) {
  try {
    const response = await axios({
      method: 'GET',
      url,
      responseType: 'arraybuffer'
    });

    await fs.writeFile(outputPath, response.data);

    console.log(`Downloaded pdf: ${url} into ${outputPath}`)
    return outputPath;
  } catch (error) {
    throw new Error(`Failed to download PDF: ${error.message}`);
  }
}