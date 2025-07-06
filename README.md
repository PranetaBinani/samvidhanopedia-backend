
# Samvidhanopedia — A Platform to Simplify Indian Law Using AI

**Samvidhanopedia** is a platform built with the vision of making Indian constitutional and legal content understandable and accessible to everyone.

The name combines two powerful words:
- **Samvidhan** — meaning "Constitution" in Hindi  
- **Encyclopedia** — a source of structured knowledge

Together, Samvidhanopedia is **“The One-Stop Solution to the Constitution”** — enabling citizens to understand laws, know their rights, and resolve confusion by asking the AI for plain-language explanations of complex legal text.

---

## 1. What Is Samvidhanopedia?

Samvidhanopedia is more than an AI tool — it’s a **public utility platform** to help people understand Indian law without needing a legal background.

Whether a student is studying Indian polity, or someone with a grievance wants to understand their rights, they can:
- **Search keywords** to find relevant Articles or Acts
- **Read the actual legal text**, pulled from a structured database
- **Ask the AI to explain** the law in simple terms
- **Use the platform on any device** — it's fully responsive and user-friendly

All law content is stored in a structured JSON file (`coi.json`) — carefully cleaned, formatted, and partially curated for simplicity and performance. While the Indian Constitution is vast, the current implementation includes **over 200 articles and 200 acts**, with the structure in place for future expansion.

---

## 2. How It Started

This project was originally built as a **team idea for the Hult Prize Unlimited 2025** at my campus.

The theme was **“Empowering people through digital innovation”**, and we chose to focus on **legal accessibility** — something many citizens struggle with in real life.

After the competition, I took the responsibility to clean the data, complete the backend logic, and host the final version. This is the result — a live, working proof-of-concept for a truly public-facing platform.

---

## 3. Key Features

1. **Legal Search**  
   Users can search keywords and instantly get matching Articles or Acts from the Constitution.

2. **Clean Legal Dataset**  
   All laws and articles are stored in a structured format (`coi.json`), allowing fast filtering and dynamic rendering.

3. **AI-Based Explanation**  
   The platform integrates OpenRouter (ChatGPT API layer) to provide simplified, human-friendly explanations of legal text.

4. **Responsive Interface**  
   The design is fully responsive and can be accessed smoothly on desktops and mobile devices.

5. **Simple & Lightweight Stack**  
   Built with HTML, CSS, JavaScript, Node.js, Express, and JSON — no heavy frameworks, ensuring speed and maintainability.

---

## 4. View the Project Live

You can try out the live version of the backend here:

**🔗 [Samvidhanopedia Backend on Render](https://samvidhanopedia.onrender.com)**

> ℹ️ This project is fully hosted on Render 
> 🚀 It may take **30–45 seconds** to load initially due to free-tier cold start. After that, it runs smoothly.  
> 💡 You can use this backend live or connect it to the frontend to experience the full platform.

---

## 5. Tech Stack

- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js + Express.js  
- **Database**: Structured JSON (`coi.json`)  
- **AI Service**: OpenRouter (ChatGPT API wrapper)  
- **Hosting**: Render (used for full deployment)

  
## Future Scope & Why This Project Matters

Samvidhanopedia was built to prove that **legal awareness and technology can go hand-in-hand**.

There’s massive potential to grow this into a fully scaled public platform:

* Add **user accounts**, **bookmarking**, and **feedback on AI accuracy**
* Integrate **regional language translations** for broader access
* Build a **legal chatbot** powered by structured legal data
* Expand the database to cover **IPC, CrPC, landmark judgments**, and more
* Collaborate with legal professionals to ensure correctness and completeness

This is just the beginning. With the right team and support, Samvidhanopedia can become **India’s first open-source legal awareness tool** built by students — for the people.
**Developed by Praneta Binani**
 

