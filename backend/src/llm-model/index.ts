import { tools } from "../tools";
import { llm } from "./ollama";

export const model = llm.bindTools(tools);