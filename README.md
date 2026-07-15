# Opportunity Brain — AI-Powered Business Opportunity Evaluator

**Score any business idea in 5 minutes. Privacy-first. Runs entirely in your browser. No data leaves your device.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-opportunitybrain.netlify.app-00d4aa?style=flat-square)](https://opportunitybrain.netlify.app)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## Features

- **7-Pillar Scorecard** — Market Demand, Unit Economics, Defensibility, Founder Fit, Timing, Capital Efficiency, Exit Potential
- **23 Red Flag Detector** — Flip-to-reveal 3D cards with detailed risk explanations
- **Comparison Matrix** — Compare up to 5 opportunities side-by-side with auto-ranking
- **Decision History** — Track outcomes and measure your decision accuracy over time
- **AI-Powered Analysis** — Keyword engine runs instantly in-browser. Optional Transformers.js AI model for enhanced analysis.
- **Market Intelligence** — Location-based market trend analysis and saturation detection
- **Privacy-First** — All data stays in your browser. No accounts, no servers, no tracking.
- **PWA** — Installs on mobile and desktop. Works offline.

## Live Demo

[**opportunitybrain.netlify.app**](https://opportunitybrain.netlify.app)

## Case Study

[**Should Elon Musk Have Bought Twitter?**](case-study-twitter.html) — A full 7-pillar analysis of the $44B acquisition. Score: 3.8/10 — AVOID. 11 red flags detected.

## Premium Features

| Product | Price | What You Get |
|---------|-------|-------------|
| **Full Web App Access** | [$29](https://francosmith4.gumroad.com/l/cdaoh) | All features unlocked, unlimited evaluations, comparison matrix, decision history, full 23 red flags |
| **Custom Business Evaluation** | [$197](https://francosmith4.gumroad.com/l/wdpsp) | Personalized 7-pillar report for your specific opportunity. Delivered within 48 hours via email. |
| **PDF Methodology Guide** | [$12.50](https://francosmith4.gumroad.com/l/fbsvbn) | Complete guide with calibration, case studies, and templates |

## Quick Start

1. Open https://opportunitybrain.netlify.app
2. Optionally describe your opportunity in the AI Analyzer
3. Score each of the 7 pillars (1-10)
4. Check red flags
5. Export or save to history

## Self-Hosting

1. Clone this repo
2. Serve the files with any static HTTP server
3. No build step required

```bash
git clone https://github.com/francosmit94-web/opportunity-brain.git
cd opportunity-brain
python3 -m http.server 8080
# Open http://localhost:8080
```

## Tech Stack

- Vanilla HTML/CSS/JS — 0 dependencies, 0 build tools
- ~2,000 lines single-file application
- In-browser keyword analysis engine (no external API calls)
- Optional Transformers.js model for enhanced AI analysis
- PWA with service worker for offline support
- Web standard APIs (localStorage, FileReader, Service Worker)

## License

MIT — free to use, modify, and distribute.

## Support

- [Premium Products](https://francosmith4.gumroad.com/)
- Created by [Aether Inc.](https://aetherwave.io) — Cape Town, South Africa
