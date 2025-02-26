import { task } from "@langchain/langgraph";
import { llm } from "../llm-model/ollama";


export const ATSScore = task("generateATSScore", async ({ resumeText, jobDescription }) => {
  const msg = await llm.invoke(`You are an ATS optimization expert. Analyze the resume for **ATS compatibility** only if it is a resume. Do not include any explanations, comments, or additional information beyond the ATS score.

### **Step 1: Resume Validation**
- If the document lacks standard resume sections ("Work Experience," "Education," etc.), return: "This document does not appear to be a resume, and I cannot provide an ATS score."

### **Step 2: ATS Evaluation Criteria**
Evaluate the resume based on the following criteria:
- **Keyword Optimization (20 points):** Does the resume contain relevant job-related keywords from the job description?
- **Formatting (20 points):** Is the structure ATS-friendly (no tables, headers, footers, or images)?
- **Section Organization (20 points):** Are key sections well-defined and ATS-parsable?
- **Quantifiable Achievements (20 points):** Are numbers or measurable outcomes used?
- **Grammar & Spelling (10 points):** Are there any errors?
- **Relevance (10 points):** Is the content aligned with job description expectations?

### **Step 3: Structured Output**
Return ONLY the ATS score in the following format:
📌 **ATS Score**: [Score out of 100]

Here is the resume content:
${resumeText}

Job Description (if provided):
${jobDescription}`);
  return msg.content;
});