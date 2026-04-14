const { Mistral } = require("@mistralai/mistralai");

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

const generateQA = async (topic, num = 20) => {
  try {
    if (!process.env.MISTRAL_API_KEY) {
      console.error("❌ MISTRAL_API_KEY not configured");
      return [];
    }

    if (!topic || num < 1) {
      console.error(`❌ Invalid parameters: topic=${topic}, num=${num}`);
      return [];
    }

    const prompt = `
Generate ${num} interview questions on ${topic}.

Each question must have:
- question (string)
- answer (string)

Return ONLY a JSON array like:
[{"question": "...?", "answer": "..."}]

Do not include markdown, explanations, or any text outside the JSON array.
`;

    console.log(`🤖 Calling Mistral API for topic: ${topic}, count: ${num}`);

    const response = await client.chat.complete({
      model: "mistral-small-latest",
      messages: [{ role: "user", content: prompt }],
    });

    if (!response?.choices?.[0]?.message?.content) {
      console.error("❌ Empty response from Mistral API");
      return [];
    }

    let text = response.choices[0].message.content.trim();

    // Clean markdown code blocks
    text = text.replace(/```json|```/g, "").trim();

    // Find JSON array boundaries
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");

    if (start === -1 || end === -1) {
      console.error("❌ No JSON array found in response:", text.substring(0, 100));
      return [];
    }

    const jsonString = text.substring(start, end + 1);
    const parsed = JSON.parse(jsonString);

    // Validate parsed data
    if (!Array.isArray(parsed)) {
      console.error("❌ Parsed JSON is not an array");
      return [];
    }

    // Validate each item has question and answer
    const validated = parsed.filter(item => 
      item.question && 
      typeof item.question === 'string' && 
      item.question.trim().length > 0 &&
      item.answer && 
      typeof item.answer === 'string' && 
      item.answer.trim().length > 0
    );

    console.log(`✅ Successfully generated ${validated.length} Q&A pairs`);
    return validated;

  } catch (error) {
    console.error("❌ AI Generation Error:", {
      message: error.message,
      topic,
      num
    });
    return [];
  }
};

module.exports = generateQA;