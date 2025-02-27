import { task } from "@langchain/langgraph";
import { llm } from "../llm-model/model";

export const suggestion = task("generateReview", async ({ resumeText, jobDescription }) => {
  const msg = await llm.invoke(`You are a professional resume reviewer with expertise in hiring, recruitment, and career coaching. Your task is to provide **clear, actionable feedback** tailored to the job description, if provided.

### **Step 1: Resume Validation**
Check if the document meets these criteria:
1. Does it contain standard resume sections like "Work Experience," "Education," "Skills," or "Certifications"?
2. Does it list job roles, company names, or employment dates?
3. Is it structured professionally rather than as an essay or article?
4. Does it focus on professional experience rather than personal storytelling?

❌ **If the document is NOT a resume**, respond: "This document does not appear to be a resume, and I cannot provide a review."
✅ **If it is a resume**, proceed with the detailed review.

### **Step 2: Content Analysis**
Evaluate the resume based on these key areas:
- **Relevance to Job Description:** Does the resume align with the provided job description? Are key skills and experiences highlighted?
- **Clarity & Readability:** Is the language professional, clear, and concise?
- **Structure & Organization:** Are sections logically arranged and easy to navigate?
- **Content Quality:** Are job descriptions detailed, achievements quantified, and action verbs used effectively?
- **Grammar & Spelling:** Are there any grammatical or spelling mistakes?
- **Formatting & Design:** Is the layout visually professional and consistent?

### **Step 3: Structured Output**
📌 **Overall Rating**: [Score out of 10]  
✅ **Strengths**: [Key strengths]  
⚠ **Areas for Improvement**: [List improvements]  
📢 **Actionable Recommendations**: [2-3 specific suggestions]

Ensure feedback is professional, job-specific (if a job description is provided), and practical.

Here is the resume content:
${resumeText}

Job Description (if provided):
${jobDescription}`);
  return msg.content;
});