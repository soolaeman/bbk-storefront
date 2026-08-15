# 🧭 BBKitchen — Documentation Navigator

> **One place to navigate the repository documentation.**
>
> This file is the repository-wide documentation navigator. It does not replace `README.md` or any guide/prompt; it only provides the map and redirects.

---

## 🏠 Project

- [README.md — Current Project State](README.md)

## 📊 Progress / History

- [Progress Archive](docs/progress/README.md)
- [Chat 1.1](docs/progress/CHAT-1.1.md)
- [Chat 1.2](docs/progress/CHAT-1.2.md)
- [Chat 1.3](docs/progress/CHAT-1.3.md)
- [Chat 1.4](docs/progress/CHAT-1.4.md)

> New session archives should be added to `docs/progress/` and linked from its `README.md`.

## 📖 Guides

- [Guides Index](docs/guides/README.md)
- [Copy Editing Guide](docs/guides/COPY-EDITING-GUIDE.md)
- [Vibe Coding Copy Guide](docs/guides/VIBE-CODING-COPY-GUIDE.md)

## 🤖 Prompts / AI Workflows

- [End Session Prompt — canonical](docs/prompts/END-SESSION-PROMPT.md)
- [Update Documentation Prompt](docs/prompts/UPDATE-DOCUMENTATION-PROMPT.md)
- [Forensic Extraction Prompt — old chats](docs/prompts/FORENSIC-EXTRACTION-PROMPT.md)

## 🧭 Documentation Rules

```text
README.md
  → current project state

NAVIGATOR.md
  → documentation map / redirects

docs/progress/
  → session history

docs/guides/
  → human / vibe-coder guides

docs/prompts/
  → AI workflow prompts
```

### File rule

Every Markdown file in the repository, except:

- `README.md`
- `NAVIGATOR.md`

should contain a small **Back to NAVIGATOR** link near the top so the documentation can be navigated from any `.md` file.

The repository root `README.md` is intentionally exempt because it is the main project landing page.

## 🔗 Back to Navigator

[🧭 NAVIGATOR.md](NAVIGATOR.md)
