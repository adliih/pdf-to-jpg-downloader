import axios from "axios";
import fs from "fs/promises";

export async function downloadPDFAsStream(url, outputPath) {
  try {
    const response = await axios({
      method: "GET",
      url,
      responseType: "stream",
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to download PDF: ${error.message}`);
  }
}
