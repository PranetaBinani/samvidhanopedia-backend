const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors()); // Add this above your routes

// Get API key from .env file or prompt user
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_KEY) {
  console.log(`
  ⚠️  OPENROUTER_API_KEY not found in .env file
  🔑 Get your free key at: https://openrouter.ai/keys
  📝 Create a .env file with: OPENROUTER_API_KEY=your_key_here
  `);
  process.exit(1);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/chat', async (req, res) => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [{ role: 'user', content: req.body.message }]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'samvidhanopedia-law-ai'
        }
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    console.error('🔴 ERROR:', err.response?.data || err.message);
    res.status(500).json({ error: 'API request failed', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
  ✅ Samvidhanopedia AI Assistant Running!
  🌐 Open in browser: http://localhost:${PORT}
  🔑 Using API key: ${OPENROUTER_KEY.slice(0, 8)}...${OPENROUTER_KEY.slice(-5)}
  
  ⚠️  Keep this terminal running to use the application
  `);
});