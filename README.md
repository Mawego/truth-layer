# Truth Layer - Real-time AI Video Detection

![logo](extension/icon128.png)

Chrome extension that detects AI-generated vs real videos in real-time on **YouTube, 【entity-Instagram¦canonical_name=Instagram】, 【entity-Facebook¦canonical_name=Facebook】, TikTok** in the browser.

## Demo Results (multi-platform, final version)

- **YouTube real vlog:** ✅ REAL 74% - natural pores, real light (green badge) - see screenshot
- **【entity-Facebook¦canonical_name=Facebook】 Reels real:** ✅ REAL 63% - uncertain, check eyes (green)
- **【entity-Facebook¦canonical_name=Facebook】 Reels AI:** ⚠️ AI 85% - waxy skin, no blink, warp (red)
- Works on 【entity-Instagram¦canonical_name=Instagram】 Reels as well

The score is NOT fixed 87% - it varies per frame using Llama Vision forensic analysis.

## 【entity-Meta¦canonical_name=Meta】 Models Used (via Baseten Partner - Official Alternative)

Because my bank card expired for the $150 【entity-Meta¦canonical_name=Meta】 API credits, I used the official partner alternative **Baseten $100 credits** as allowed by the hackathon rules:

- **Llama 3.2 Vision 11B (Muse Image family)** via Baseten - forensic image analysis: waxy skin, pores, blink, asymmetric ears, background warp
- **Llama Spark** via Baseten - reasoning to generate final explanation
- **SAM 3.1** local - face segmentation before sending to Llama (0$ cost, runs locally)

This satisfies the requirement to use 【entity-Meta¦canonical_name=Meta】 models via official partner.

## Architecture

Browser video frame (320x180 JPEG 0.5 quality) -> SAM 3.1 local segmentation -> Llama 3.2 Vision via Baseten -> Llama Spark reasoning -> Badge color (green REAL <60, red AI >60)

**Click-to-analyze to save credits:** 1 click = 1 API call. Fixed badge avoids burning credits on scroll.

**Multi-platform fix v3:** badge uses `position: fixed` with `getBoundingClientRect()` to avoid YouTube player blocking clicks.

## How to Run

Backend:
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app:app --port 8000 --reload