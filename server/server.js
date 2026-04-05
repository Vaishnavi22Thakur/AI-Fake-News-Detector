import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Backend is running 🚀");
});

app.post('/analyze', (req, res) => {
  const { text } = req.body;

  if (!text || text.trim().length === 0) {
    return res.json({
      verdict: "Real",
      confidence: 0,
      explanation: ["No text provided"],
      suspiciousWords: []
    });
  }

  const lower = text.toLowerCase();

  let fakeScore = 0;
  let realScore = 0;
  let explanation = [];
  let suspiciousWords = [];

  // 🚨 FAKE SIGNALS (strong)
  if (/[A-Z]{5,}/.test(text)) {
    fakeScore += 25;
    explanation.push("Excessive ALL-CAPS detected");
  }

  if (/(breaking|urgent|shocking|you won't believe)/i.test(lower)) {
    fakeScore += 20;
    explanation.push("Uses sensational / clickbait phrases");
    suspiciousWords.push("clickbait");
  }

  if (/(share this|forward this|before it gets deleted)/i.test(lower)) {
    fakeScore += 25;
    explanation.push("Encourages mass sharing (common in fake news)");
  }

  if (/(miracle|100%|guaranteed|instant cure)/i.test(lower)) {
    fakeScore += 25;
    explanation.push("Unrealistic or exaggerated claims");
  }

  if (/(secret|government hiding|they don’t want you to know)/i.test(lower)) {
    fakeScore += 20;
    explanation.push("Conspiracy-style language");
  }

  if (text.length < 60) {
    fakeScore += 10;
    explanation.push("Very short content (low credibility)");
  }

  // ✅ REAL SIGNALS (new improvement)
  if (/(according to|research|study|report)/i.test(lower)) {
    realScore += 25;
    explanation.push("Mentions research or study");
  }

  if (/(university|institute|journal|bbc|reuters)/i.test(lower)) {
    realScore += 25;
    explanation.push("References credible sources");
  }

  if (/\d+%|\d{4}/.test(text)) {
    realScore += 15;
    explanation.push("Includes data/statistics");
  }

  if (text.length > 120) {
    realScore += 10;
    explanation.push("Detailed content");
  }

  // ⚖️ FINAL SCORE
  const finalScore = fakeScore - realScore;

  let verdict = "Real";
  let confidence = Math.abs(finalScore);

  if (finalScore >= 30) {
    verdict = "Fake";
  } else if (finalScore >= 10) {
    verdict = "Suspicious";
  } else {
    verdict = "Real";
  }

  // Ensure minimum explanation points
  if (explanation.length < 3) {
    explanation.push("Content lacks strong credibility indicators");
    explanation.push("No clear trusted sources mentioned");
  }

  res.json({
    verdict,
    confidence: Math.min(confidence, 100),
    explanation,
    suspiciousWords
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});