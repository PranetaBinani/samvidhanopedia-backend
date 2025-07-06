
  const urlParams = new URLSearchParams(window.location.search);
  const lawId = urlParams.get('id');

  fetch('data/COI.json')
    .then(res => res.json())
    .then(data => {
      const flatData = data.flat(); // Flatten nested array
      const law = flatData.find(item => item.ArtNo === lawId);

      if (law) {
        document.getElementById('law-title').innerText = `${law.ArtNo} - ${law.Name}`;

        // ✅ Compose full law text
        let lawText = '';

        if (law.ArtDesc) {
          lawText = law.ArtDesc;
        } else if (law.Clauses) {
          lawText = law.Clauses.map(c => {
            const subclauses = (c.SubClauses || [])
              .map(s => `(${s.SubClauseNo}) ${s.SubClauseDesc}`)
              .join('\n');
            return `${c.ClauseNo}. ${c.ClauseDesc}\n${subclauses}`;
          }).join('\n\n');
        } else {
          lawText = "No description available.";
        }

        document.getElementById('law-body').innerText = lawText;

        // ✅ Send to ChatGPT backend for explanation
        getAIExplanation(`${law.ArtNo} - ${law.Name}\n${lawText}`);
      } else {
        document.getElementById('law-title').innerText = 'Facing an issue? Let’s check the law';
        document.getElementById('law-body').innerText = '';
        document.getElementById('ai-explanation').innerText = '';
      }
    })
    .catch(err => {
      console.error("Error loading law:", err);
    });

 async function getAIExplanation(lawText) {
  const prompt = `Explain this Indian constitutional law in very simple words,dont answer very lengthy okay try to solve the users problem,give links to file the case if possible and what action can be take by law like how many years of jail or property dispute or how to ovrcome the situation  ,like a teacher ,plain text only, without using any markdown or formatting. Just use normal sentences.\n\n${lawText}`;

  const aiBox = document.getElementById('ai-response');
  aiBox.innerText = 'Thinking..... This may take a minute';

  try {
    const res = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt })
    });

    const data = await res.json();
    const cleaned = (data.reply || 'AI could not provide an explanation.')
      .replace(/[#*_`~>-]/g, '')
      .trim();

    aiBox.innerText = cleaned;
  } catch (err) {
    console.error("AI request failed:", err);
    aiBox.innerText = 'Error fetching AI explanation.';
  }
}


// Toggle edit mode
document.getElementById('edit-btn').addEventListener('click', () => {
  const textarea = document.getElementById('law-body');
  const isEditable = !textarea.hasAttribute('readonly');
  if (isEditable) {
    textarea.setAttribute('readonly', true);
    document.getElementById('edit-btn').innerText = 'Edit';
  } else {
    textarea.removeAttribute('readonly');
    document.getElementById('edit-btn').innerText = 'Save';
  }
});

// Regenerate AI output
document.getElementById('regenerate-btn').addEventListener('click', async () => {
  const message = document.getElementById('law-body').value;
  document.getElementById('ai-response').innerText = 'Thinking... This may take a minute';

  const res = await fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  const cleaned = data.reply.replace(/[#*_`~>-]/g, '').trim();
  document.getElementById('ai-response').innerText = cleaned;
  getAIExplanation(message);
});

// COPY to clipboard
document.getElementById('copy-btn').addEventListener('click', () => {
  const text = document.getElementById('ai-response').innerText;
  navigator.clipboard.writeText(text)
    .then(() => alert('✅ Copied to clipboard!'))
    .catch(() => alert('❌ Failed to copy.'));
});

// SPEAK using browser TTS
  document.getElementById('speak-btn').addEventListener('click', () => {
  const synth = window.speechSynthesis;
  const text = document.getElementById('ai-response').innerText.trim();

  if (!text) {
    alert("Nothing to speak!");
    return;
  }

  if (synth.speaking) {
    synth.cancel();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-IN';
  utterance.pitch = 1;
  utterance.rate = 1;

  // Set voice if available
  const voices = synth.getVoices();
  utterance.voice = voices.find(v => v.lang === 'en-IN') || voices[0];

  synth.speak(utterance);
});


