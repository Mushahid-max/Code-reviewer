// const { GoogleGenerativeAI } = require("@google/generative-ai");


// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
// const model = genAI.GoogleGenerativeAI({model:"gemini-2.0-flash"});

// const prompt ='Explain how Ai works';

// const result = await model.generate.genAIContent(prompt);
// console.log(result.response.text());

// async function generateContent(prompt) {
//     const result =await model.generateContent(prompt);
//     return result.response.text();
// }
// module.exports =generateContent



require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

// Function to generate content using Gemini
async function generateContent(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",
systemInstruction:`You are an expert code reviewer.

Your job is to:
- Analyze the given code carefully.
- Highlight **bad coding practices** with simple, beginner-friendly explanations.
- Appreciate **good parts** of the code with short, attractive praise.
- Use clear formatting like bullet points (•), numbered tips (1. 2. 3.), or sections (✅ Good, ❌ Needs Fix).
- If needed, show improved code snippets.
- Keep the tone helpful, not harsh — like a friendly mentor.
- Focus on:
  • Readability
  • Logic clarity
  • Clean syntax
  • Performance and security
  • Naming conventions
  • Unused code or unnecessary conditions

Example format:
✅ **Good**:
• Uses clean and meaningful variable names.
• Code is DRY and readable.

❌ **Needs Improvement**:
• Avoid nested conditions — it reduces readability.
• Missing error handling in async function.

Keep your answers short, clear, and visually structured.`
   });

  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  return text;
}

module.exports = generateContent;

