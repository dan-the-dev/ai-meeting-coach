# 🧠 AI Meeting Coach (CLI)

A simple command-line app that listens to your meetings (via microphone + system audio) and logs live updates while recording.

Built with **TypeScript**, **Ink**, and **node-record-lpcm16**.

---

## 🚀 Usage

```bash
npm run build
```

or, to build continuously:

```bash
npm run dev
```

then run the command with:

```bash
ai-meeting-coach --type <type>
```

or just remove type param to select interactively:

```bash
ai-meeting-coach
```

🎧 Requirements
 • macOS (with BlackHole 2ch￼ installed)
 • Node.js ≥ 16
 • sox installed via Homebrew

  `brew install blackhole-2ch sox`

## TODOs

- Fix type selection (audio rec doesn't work in that case)
- Make audio rec also rec the Mac audio
- Introduce audio transcription via LLM
- Start sending chunks to another LLM to make him aware of the conversation
- Start getting suggestions
- Calculate summary at the end and save on a file
