import { tools } from "../tools";
import { llm } from "./model";

export const model = llm.bindTools(tools);