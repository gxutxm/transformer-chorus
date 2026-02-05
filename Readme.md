---
title: Transformer Chorus
emoji: 🎼
colorFrom: purple
colorTo: indigo
sdk: docker
pinned: false
license: mit
---

# 🎼 Transformer Chorus

> An ensemble of models thinking in harmony to find one answer

## What is this?

Six transformer models collaborate to predict the next word in your sentence. Instead of trusting a single model, **Transformer Chorus** aggregates their collective wisdom using **Borda count voting**.

Type a sentence, press `space`, and watch the chorus sing.

## The Models

| Model | Architecture |
|-------|--------------|
| BERT | Bidirectional encoder |
| XLNet | Permutation language model |
| RoBERTa | Optimized BERT |
| XLM-RoBERTa | Multilingual RoBERTa |
| BART | Encoder-decoder |
| ELECTRA | Replaced token detection |

## How It Works

1. **You type** a sentence with a missing word
2. **Each model** independently predicts the top candidates
3. **Borda count scoring** aggregates predictions:
   - 1st place = 10 points
   - 2nd place = 9 points
   - ...and so on
4. **The chorus sings** — the highest-scoring words win

## Example

```
Input: "The cat sat on the ___"

BERT thinks:    floor, bed, couch, sofa, mat
XLNet thinks:   floor, ground, bed, couch, table
RoBERTa thinks: floor, bed, couch, ground, mat
...

Chorus decides: floor (45 pts, 6/6 models agreed)
```

## Run Locally

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/transformer-chorus.git
cd transformer-chorus

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run
python app.py
```

Then open `http://localhost:7860`

## Inspiration

Inspired by [Andrej Karpathy's LLM Council](https://github.com/karpathy/llm-council) — the idea that multiple AI models deliberating together can produce better answers than any single model alone.

While Karpathy's version uses API-based LLMs with peer review, this project explores the same concept using local transformer models with mathematical consensus (Borda count) instead of verbal deliberation.

## Tech Stack

- **Backend:** Flask, PyTorch, Hugging Face Transformers
- **Frontend:** Vanilla JS, CSS Variables (dark/light mode)
- **Ensemble Method:** Borda count voting

## License

MIT