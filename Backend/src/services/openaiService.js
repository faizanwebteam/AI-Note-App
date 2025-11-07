import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateSummary = async (text) => {
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `Summarize this note:\n${text}` }],
  });
  return res.choices[0].message.content.trim();
};

export const improveNote = async (text) => {
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `Improve clarity and grammar:\n${text}` }],
  });
  return res.choices[0].message.content.trim();
};

export const generateTags = async (text) => {
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `Generate 5 relevant tags (comma separated) for:\n${text}` }],
  });
  return res.choices[0].message.content.split(",").map((t) => t.trim());
};
