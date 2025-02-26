import { entrypoint } from "@langchain/langgraph";
import { content, ATSScore, interviewSuggestions, suggestion } from "../tasks";
 
// Define Task Mapping
const taskMap = {
  contentAnalysis: content,
  atsAnalysis: ATSScore,
  interviewSuggestion: interviewSuggestions,
  suggestions: suggestion,
};

// Build workflow
const workflow = entrypoint("resumeAnalysisWorkflow", async (input: { 
  resumeText: string, 
  jobDescription: string, 
  atsAnalysis: string, 
  contentAnalysis: string, 
  interviewSuggestion: string 
  suggestions: string
}) => {
  
  const { resumeText, jobDescription, ...flags } = input;

  // Dynamically filter and execute only the selected tasks
  const selectedTasks = Object.entries(flags)
    .filter(([_, isEnabled]) => isEnabled==="true") // Keep only `true` values
    .map(([key]) => ({ key, task: taskMap[key] }));

  console.log(selectedTasks, Object.entries(flags));
  if (!selectedTasks.length) return {}; // No tasks selected → return empty object

  const results = await Promise.all(
    selectedTasks.map(({ task }) => task({ resumeText, jobDescription }))
  );

  return selectedTasks.reduce((acc, { key }, index) => {
    acc[key] = results[index];
    return acc;
  }, {} as Record<string, any>);
});

// Invoke
export const agent = async (
  resumeText: string, 
  jobDescription: string, 
  atsAnalysis: string, 
  contentAnalysis: string, 
  interviewSuggestion: string,
  suggestions: string
) => {
  const stream = await workflow.stream(
    { resumeText, jobDescription, atsAnalysis, contentAnalysis, interviewSuggestion , suggestions},
    { streamMode: "updates" }
  );

  let results: Record<string, any> = {};

  for await (const step of stream) {
    if (step["resumeAnalysisWorkflow"]) {
      results = { ...step.resumeAnalysisWorkflow };
    }
    console.log("--------------------------------");
    console.log(step);
    console.log("--------------------------------");
  }
  return results;
};
