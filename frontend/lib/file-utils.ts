import { Buffer } from "buffer"

export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type
  const arrayBuffer = await file.arrayBuffer()

  if (fileType === "application/pdf") {
    const pdf = await import("pdf-parse")
    const data = await pdf.default(Buffer.from(arrayBuffer))
    return data.text
  } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const mammoth = await import("mammoth")
    const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer })
    return result.value
  } else {
    throw new Error("Unsupported file type")
  }
}

