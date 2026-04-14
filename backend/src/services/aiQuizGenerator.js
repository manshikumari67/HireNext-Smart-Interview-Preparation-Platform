const { Mistral } = require("@mistralai/mistralai");

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

const generateQuiz = async (topic, num = 5) => {
  try {
    const prompt = `
Generate ${num} multiple choice questions on ${topic}.

Each question must have:
- question
- options (4)
- correctAnswer (0-3)

Return ONLY JSON array. No text before or after.
`;

    const response = await client.chat.complete({
      model: "mistral-small-latest",
      messages: [{ role: "user", content: prompt }],
    });

    let text = response.choices[0].message.content;

    console.log("RAW AI RESPONSE:", text); // debug

    // 🔥 STEP 1: clean markdown
    text = text.replace(/```json|```/g, "").trim();

    // 🔥 STEP 2: extract only JSON part
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");

    if (start === -1 || end === -1) {
      throw new Error("Invalid JSON format from AI");
    }

    const jsonString = text.substring(start, end + 1);

    // 🔥 STEP 3: parse safely
    const parsed = JSON.parse(jsonString);

    return parsed;

  } catch (error) {
    console.error("Mistral AI Error:", error.message);
    return [];
  }
};

module.exports = generateQuiz;