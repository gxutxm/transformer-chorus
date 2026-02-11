---
title: Transformer Chorus
emoji: 🎼
colorFrom: gray
colorTo: black
sdk: docker
app_port: 7860
license: mit
---

# 🎼 Transformer Chorus

**An ensemble of models thinking in harmony to find one answer**

<p align="center">
  <a href="https://huggingface.co/spaces/gautamg/transformer-chorus">
    <img src="https://img.shields.io/badge/🚀_TRY_LIVE_DEMO-blue?style=for-the-badge&labelColor=black" alt="Try Live Demo" />
  </a>
</p>

<p align="center">
  <a href="https://huggingface.co/spaces/gautamg/transformer-chorus"><strong>👉 huggingface.co/spaces/gautamg/transformer-chorus</strong></a>
</p>

---

[![Python](https://img.shields.io/badge/Python-3.10-blue?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.1-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)](https://pytorch.org)
[![Hugging Face](https://img.shields.io/badge/🤗_Transformers-4.36-yellow?style=flat-square)](https://huggingface.co)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## Overview

Transformer Chorus combines **6 state-of-the-art transformer models** to predict masked words through ensemble voting. Rather than relying on a single model's prediction, it uses **Borda count** — a ranked voting algorithm — to mathematically derive consensus from diverse model architectures.

---

## The Ensemble

| Model | Type | Parameters |
|-------|------|------------|
| BERT | Bidirectional Encoder | 110M |
| RoBERTa | Optimized BERT | 125M |
| XLNet | Permutation LM | 110M |
| XLM-RoBERTa | Multilingual | 125M |
| ELECTRA | Discriminative | 110M |
| BART | Encoder-Decoder | 140M |

Each model brings different inductive biases — BERT excels at bidirectional context, XLNet captures long-range dependencies, XLM-RoBERTa adds multilingual knowledge, and BART contributes generative capabilities.

---

## How Borda Count Works

```
Input: "The cat sat on the ___"

Step 1: Each model ranks its top predictions
        BERT:    floor(1), bed(2), couch(3), ground(4), ...
        RoBERTa: floor(1), ground(2), bed(3), mat(4), ...
        XLNet:   bed(1), floor(2), couch(3), ground(4), ...
        ...

Step 2: Assign points (1st=10pts, 2nd=9pts, 3rd=8pts, ...)

Step 3: Sum across all models
        floor:  10+10+9+10+8+10 = 57 pts  ← Winner
        bed:    9+8+10+9+10+9  = 55 pts
        ground: 7+9+7+8+9+8    = 48 pts

Output: "floor" (57 pts, 6/6 model agreement)
```

The Borda count method ensures that a word ranked consistently high across multiple models wins over a word ranked #1 by one model but ignored by others.

---

## Quick Start

### Run Locally

```bash
git clone https://github.com/gxutxm/transformer-chorus.git
cd transformer-chorus
pip install -r requirements.txt
python app.py
```
Open `http://localhost:7860`

### Run with Docker

```bash
docker build -t transformer-chorus .
docker run -p 7860:7860 transformer-chorus
```

---

## Project Structure

```
transformer-chorus/
├── app.py              # Flask routes and API endpoints
├── main.py             # Model loading, prediction, Borda count logic
├── templates/
│   └── index.html      # UI with dark/light theme
├── static/js/
│   └── app.js          # Frontend interactions
├── Dockerfile          # Container configuration
└── requirements.txt    # Dependencies
```

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Backend | Flask |
| ML | PyTorch, Hugging Face Transformers |
| Frontend | Vanilla JS, CSS Variables |
| Deployment | Docker, Hugging Face Spaces |

---

## Inspiration

Inspired by [Andrej Karpathy's LLM Council](https://github.com/karpathy/llm-council), where multiple LLMs deliberate to reach consensus. This project adapts that concept using:

- **Local models** instead of API-based LLMs
- **Mathematical voting** instead of verbal deliberation  
- **Masked token prediction** as the evaluation task

---

## Author

**Gautam G** — [GitHub](https://github.com/gxutxm) · [LinkedIn](https://linkedin.com/in/gautamgovindarasan)

---

## License

MIT