# BBKitchen — End Session Prompt

> **Satu prompt untuk setiap end-session normal.**

Canonical prompt:

[`docs/prompts/END-SESSION-PROMPT.md`](docs/prompts/END-SESSION-PROMPT.md)

Gunakan canonical prompt tersebut di akhir setiap migration chat.

Prompt canonical akan menangani:

- forensic extraction
- repository / vibe-coding drift audit
- `docs/progress/CHAT-X.Y.md`
- `docs/progress/README.md`
- root `README.md`
- audit `docs/guides/`
- audit `docs/prompts/`
- verification
- Git checkpoint
- handoff

Untuk **chat lama / closed chat** yang perlu diekstrak secara forensic, gunakan:

[`docs/prompts/FORENSIC-EXTRACTION-PROMPT.md`](docs/prompts/FORENSIC-EXTRACTION-PROMPT.md)

Tidak ada lagi quick end-session prompt terpisah.

Progress archives:

`docs/progress/CHAT-X.Y.md`
