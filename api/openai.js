const { Configuration, OpenAIApi } = require("openai");

module.exports = async (req, res) => {
  const { prompt } = req.body;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 300,
      temperature: 0.5
    });

    res.status(200).json({ response: completion.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong with OpenAI." });
  }
};
