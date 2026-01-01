import { getLlama, LlamaChatSession, resolveModelFile } from "node-llama-cpp";
import path from "path";
import { fileURLToPath } from "url";
import functions from "./functions/index";

const MOODEL_URI =
  process.env.MOODEL_URL ||
  "https://huggingface.co/joshnader/Meta-Llama-3.1-8B-Instruct-Q4_K_M-GGUF";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modelsDirectory = path.join(__dirname, "models");

const modelPath = await resolveModelFile(MOODEL_URI, modelsDirectory);
const llama = await getLlama();
const model = await llama.loadModel({ modelPath });
const context = await model.createContext();
const contextSequence = context.getSequence();
const session = new LlamaChatSession({
  contextSequence,
});

await session.prompt(q1, { functions });
let q1 = "Hi tell me some news about T-rex dinosaurs.";
console.log("User: " + q1);

const a1 = await session.prompt(q1, { functions });
console.log("AI: " + a1);

console.log("evaluated tokens", contextSequence.tokenMeter.usedInputTokens);
console.log("generated tokens", contextSequence.tokenMeter.usedOutputTokens);
