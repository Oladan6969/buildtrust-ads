// ElevenLabs VO generator — Google Ad
// Voice: George (JBFqnCBsd6RMkjVDRZzb) — Warm, Captivating Storyteller
// Run: node scripts/generate-vo.js

const https = require("https");
const fs = require("fs");
const path = require("path");

const API_KEY = "a638f17f481a1873a8499a4efdbde52cb3ad2958cbff601994d65663aea34580";
const VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"; // George — British male
const MODEL = "eleven_multilingual_v2";
const OUT_DIR = path.join(__dirname, "../public/audio");

const VOICE_SETTINGS = {
  stability: 0.52,
  similarity_boost: 0.78,
  style: 0.22,
  use_speaker_boost: true,
};

// Timed to scene cuts (see GoogleAd.tsx)
// Scene 1:  0s–4s    Scene 2: 4s–12s   Scene 3: 12s–21s
// Scene 4: 21s–29s   Scene 5: 29s–38s  Scene 6: 38s–45s
const CLIPS = [
  {
    file: "vo1.mp3",
    scene: "Scene 1 — Logo Reveal (0s–4s)",
    text: "Google. The world, organized.",
  },
  {
    file: "vo2.mp3",
    scene: "Scene 2 — Search (4s–12s)",
    text: "Search anything. Get instant answers — powered by AI.",
  },
  {
    file: "vo3.mp3",
    scene: "Scene 3 — Gemini (12s–21s)",
    text: "Meet Gemini. Google's most capable AI — it understands context, generates ideas, writes code, and reasons beyond limits.",
  },
  {
    file: "vo4.mp3",
    scene: "Scene 4 — Ecosystem (21s–29s)",
    text: "One ecosystem. Search, Maps, YouTube, Gmail — everything connected, working together for you.",
  },
  {
    file: "vo5.mp3",
    scene: "Scene 5 — Statements (29s–38s)",
    text: "Search everything. Discover anything. Create the future.",
  },
  {
    file: "vo6.mp3",
    scene: "Scene 6 — CTA (38s–45s)",
    text: "Try Google Gemini. The future starts at gemini dot google dot com.",
  },
];

function generateClip(clip) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      text: clip.text,
      model_id: MODEL,
      voice_settings: VOICE_SETTINGS,
    });

    const options = {
      hostname: "api.elevenlabs.io",
      path: `/v1/text-to-speech/${VOICE_ID}`,
      method: "POST",
      headers: {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
        Accept: "audio/mpeg",
      },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let errData = "";
        res.on("data", (c) => (errData += c));
        res.on("end", () =>
          reject(new Error(`HTTP ${res.statusCode}: ${errData}`))
        );
        return;
      }

      const outPath = path.join(OUT_DIR, clip.file);
      const fileStream = fs.createWriteStream(outPath);
      res.pipe(fileStream);
      fileStream.on("finish", () => {
        const bytes = fs.statSync(outPath).size;
        console.log(`  ✓  ${clip.file}  (${(bytes / 1024).toFixed(0)} KB)`);
        resolve();
      });
      fileStream.on("error", reject);
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log("\n═══════════════════════════════════════════════");
  console.log("  Google Ad — ElevenLabs VO Generator");
  console.log(`  Voice: George (${VOICE_ID})`);
  console.log("═══════════════════════════════════════════════\n");

  for (const clip of CLIPS) {
    process.stdout.write(`  Generating ${clip.file}  [${clip.scene}]...\n`);
    try {
      await generateClip(clip);
    } catch (err) {
      console.error(`  ✗  ${clip.file} failed:`, err.message);
      process.exit(1);
    }
    // Small pause to respect rate limits
    await new Promise((r) => setTimeout(r, 800));
  }

  console.log("\n═══════════════════════════════════════════════");
  console.log("  All 6 clips saved to public/audio/");
  console.log("  Uncomment the <Audio> VO tags in GoogleAd.tsx");
  console.log("  then run: npm start");
  console.log("═══════════════════════════════════════════════\n");
}

main();
