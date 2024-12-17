import { convertPDFToImages } from "../services/conversion.service.js";
import { downloadPDFAsStream } from "../services/download.service.js";

export async function handlePDFConversion(req, res) {
  const { download_link: downloadLink } = req.query;
  const filename = req.query.filename || "image";

  if (!downloadLink) {
    return res.status(400).json({ error: "Download link is required" });
  }

  try {
    const stream = await downloadPDFAsStream(downloadLink);
    const images = await convertPDFToImages(stream);

    const isMultipleImages = images.length > 1;

    if (!isMultipleImages) {
      const imageBuffer = images[0];
      res.setHeader("Content-Type", "image/jpg");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}.jpg"`,
      );
      res.send(imageBuffer);
      return;
    }

    const archiver = require("archiver");
    const archive = archiver("zip");
    const zip = new Buffer.from([]);
    archive.append(images.map((img) => img));
    archive.finalize();

    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}.zip"`,
    );
    res.send(zip);
  } catch (error) {
    console.error("Error processing PDF:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
