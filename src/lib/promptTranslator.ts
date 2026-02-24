export function toGptPrompt(input: string) {
  return `You are an expert assistant. Respond with structured bullet points.\nTask: ${input}\nOutput format: Arabic first, then English.`;
}

export function toGeminiClaudePrompt(input: string) {
  return `Role: Strategic AI copilot\nInstruction: ${input}\nConstraints: concise, actionable, include alternatives and risks.`;
}
