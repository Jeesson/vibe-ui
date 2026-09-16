# Vibe UI

**Vibe UI** is a component library for **Vue 3** built for vibe coding: 50+ components with an interactive playground documentation. Dark/light themes, Tailwind CSS 4, TypeScript, Vite.

🔗 Demo: https://vibe-ui.pages.dev/
📦 npm: `@jeesson/vibe-ui`

## Original Source

This project is based on the original source:

> **Jeesson/vibe-ui** — https://github.com/Jeesson/vibe-ui

When using, copying, and distributing the code, you must keep the attribution to the original source. The terms of attribution and revenue sharing are described in the [LICENSE](./LICENSE) file.

## Installation

```bash
bun add @jeesson/vibe-ui
# or
npm install @jeesson/vibe-ui
```

The peer dependency `vue ^3.4.0` is required.

### Setup

```ts
import { createApp } from "vue";
import VibeUI from "@jeesson/vibe-ui";
import "@jeesson/vibe-ui/style.css";
import App from "./App.vue";

createApp(App).use(VibeUI).mount("#app");
```

## Development

| Command                    | Purpose                                              |
| -------------------------- | ---------------------------------------------------- |
| `bun run dev`              | Start the playground documentation (Vite dev server) |
| `bun run build`            | Build the library (ESM + CJS + types)                |
| `bun run build:playground` | Build the static documentation site                  |
| `bun run preview`          | Preview the built documentation                      |

[Bun](https://bun.sh) is required.

## Structure

```
src/
├── components/   # library components
├── playground/   # documentation site
└── index.ts      # public API
```

## Security

Please report vulnerabilities following the instructions in [SECURITY.md](./SECURITY.md) (the **Security → Advisories → Report a vulnerability** tab on GitHub). Please do not disclose vulnerabilities in public issues.

## License

This project is distributed under the license described in [LICENSE](./LICENSE), with mandatory attribution to the original source and 50/50 revenue sharing.
