import { ChatOpenAI } from "@langchain/openai";

export const llm = new ChatOpenAI({
    modelName: process.env.OLLAMA_MODEL,
    apiKey: process.env.OLLAMA_API_KEY,
    configuration: {
        baseURL: process.env.OLLAMA_BASE_URL || "https://api.openai.com/v1",
    },
});