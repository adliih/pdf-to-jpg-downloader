import express from "express";
import { handlePDFConversion } from "../controllers/conversion.controller.js";

const router = express.Router();

router.get("/download-pdf-to-jpg", handlePDFConversion);

export default router;
