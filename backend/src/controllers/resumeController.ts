import { Request, Response } from "express";
import fs from "fs";
import pdf from "pdf-parse";
import mammoth from "mammoth";
import { agent } from "../services/aiService";

/**
 * Extracts text from different file types (PDF, DOCX, TXT)
 */
const extractTextFromFile = async (
  filePath: string,
  mimeType: string
): Promise<string> => {
  try {
    const dataBuffer = fs.readFileSync(filePath);

    if (mimeType === "application/pdf") {
      const pdfData = await pdf(dataBuffer);
      return pdfData.text;
    }

    if (
      mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      mimeType === "application/msword"
    ) {
      const result = await mammoth.extractRawText({ buffer: dataBuffer });
      return result.value.trim() || "No text extracted.";
    }

    if (mimeType === "text/plain") {
      return dataBuffer.toString();
    }

    return "";
  } catch (error) {
    console.error("Error extracting text:", error);
    throw new Error("Failed to extract text from file.");
  }
};

/**
 * Resume Upload Controller
 */
export const handleResumeUpload = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const mimeType = req.file.mimetype;
    console.log(`Processing file: ${filePath}, MIME Type: ${mimeType}`);

    const resumeText = await extractTextFromFile(filePath, mimeType);
    const {
      jobDescription,
      contentAnalysis,
      atsAnalysis,
      interviewSuggestions: interviewSuggestion,
      suggestions,
    } = req.body; // Capture Job Description
    if (!resumeText) {
      return res
        .status(400)
        .json({ error: "Unsupported file format or empty text extracted" });
    }

    // Send extracted text to AI for feedback
    const feedback = await agent(
      resumeText, jobDescription, atsAnalysis, contentAnalysis, interviewSuggestion,suggestions 
    );

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    return res.status(200).json({ ...feedback });
  } catch (error) {
    console.error("Error in handleResumeUpload:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
