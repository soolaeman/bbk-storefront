# BBKitchen Progress Archive

This folder is the **detailed progress/history layer** for the Next.js migration.

`README.md` at repository root is only the current-state summary and handoff. Detailed session history belongs here.

## Structure

```text
docs/
└── progress/
    ├── CHAT-1.1.md
    ├── CHAT-1.2.md
    ├── CHAT-1.3.md
    ├── CHAT-1.4.md
    └── README.md
```

## Rule

Every migration chat should leave behind a progress record containing:

- date/evidence
- Pareto top changes
- bottlenecks
- root causes
- failed approaches
- architecture decisions
- verification
- Git checkpoint
- next-chat handoff

If a fact is unavailable, write:

`Tidak ditemukan di conversation.`

Do not replace forensic history with a clean-looking summary.

## Relationship to README

```text
Detailed session archive
        ↓
docs/progress/CHAT-X.Y.md
        ↓
Pareto synthesis
        ↓
README.md
        ↓
Current project state + next handoff
```
