# 🔍 AI Fake News Detector

https://Vaishnavi22Thakur.github.io/AI-Fake-News-Detector

A **React + Node.js web app** that analyzes news text to detect whether it is **real, fake, or suspicious** using AI-driven heuristics. Perfect for quickly checking the credibility of news articles and posts.

---

## 🌟 Features

- Detects **fake, real, or suspicious news** based on content analysis.  
- Highlights **clickbait phrases, sensational language, and conspiracies**.  
- Provides a **confidence score** for each verdict.  
- **Interactive UI** built with React & Framer Motion.  
- Multi-language support: **English and Hindi**.  
- Tracks analytics in a **Stats Panel**.  
- Live backend analysis with **Express + Node.js**.  

---

## 🖥️ Demo

Check it out here: [AI Fake News Detector Live](https://Vaishnavi22Thakur.github.io/AI-Fake-News-Detector)  

---

## 🚀 Deployment

- **Frontend:** GitHub Pages ([Live Demo](https://Vaishnavi22Thakur.github.io/AI-Fake-News-Detector))  
- **Backend:** Hosted on [Render](https://ai-fake-news-detector-r4cz.onrender.com)  
- Environment variable used in frontend:

```javascript
const API_URL = 'https://ai-fake-news-detector-r4cz.onrender.com';
```

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Framer Motion, Recharts, i18next  
- **Backend:** Node.js, Express, CORS  
- **Deployment:** GitHub Pages (frontend), Render (backend)  

---

## 📝 How It Works

1. User inputs news text or optional URL.  
2. Backend analyzes text for **fake/real signals**:
   - Fake indicators: clickbait phrases, ALL-CAPS, conspiracies, etc.  
   - Real indicators: credible sources, statistics, detailed content.  
3. Returns **verdict, confidence score, and explanation**.  
4. Frontend displays results with **Traffic Light UI** and explanation panel.

---

## 💡 Future Improvements

- AI/ML model for more accurate fake news detection.  
- Browser extension integration.  
- Real-time news feed scanning.  

---

## 📂 Repository Structure

```
AI-Fake-News-Detector/
│
├─ server/           # Backend (Express)
│   └─ server.js
│
├─ src/              # Frontend (React)
│   ├─ components/
│   ├─ context/
│   ├─ i18n/
│   ├─ App.jsx
│   └─ main.jsx
│
├─ package.json
├─ vite.config.js
└─ README.md
```

---

## 🤝 Contribution

Contributions are welcome!  
Feel free to **fork the repo**, create a **branch**, and submit a **pull request**.

---

## 📄 License

MIT License © Vaishnavi Thakur