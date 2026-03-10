# Vector Graphics Editor

A browser-based tool for creating vector polygon graphics for games like Asteroids. Plot vertices on a snap-to-grid canvas and export as Lua flat arrays — ready to drop into LOVE2D or any Lua-based game engine.

## Features

- **Click-to-place vertices** on a configurable grid with snap-to-grid precision
- **Drag vertices** to reposition them after placement
- **Mirror modes** — reflect shapes across the X axis, Y axis, or both for symmetrical designs
- **Rotation** — live preview with slider or typed input, then apply to snap vertices to the grid
- **Translate** — move the entire polygon with arrow keys
- **Close/open polygon** — toggle the closing segment between first and last vertex
- **Undo and clear** — remove the last vertex or start over
- **Editable Lua output** — edit the Lua code directly and see changes reflected on the canvas
- **Scale factor** — multiply output coordinates by an integer scale (1–10)
- **Copy to clipboard** — one-click copy of the Lua table

## Getting Started

No build tools, no frameworks, no dependencies. Just open the file in a browser:

```
open index.html
```

Or serve it locally with any static file server.

## Lua Output Format

The editor exports vertices as a Lua flat array:

```lua
vertices = {
  0, -4,
  3, 2,
  -3, 2,
}
```

Paste this directly into your game code.

## Running Tests

Pure logic is extracted into `vector.js` with a Node-based test suite:

```
node tests.js
```

## Project Structure

```
index.html     — Single-page app (HTML/CSS/JS)
vector.js      — Pure logic module (shared between browser and tests)
tests.js       — Test suite for all pure logic
use-cases/     — Alistair Cockburn fully-dressed use cases (UC-01 through UC-13)
CLAUDE.md      — AI assistant project instructions
```

## Keyboard Shortcuts

| Key | Action |
|---|---|
| Ctrl/Cmd+Z | Undo last vertex |
| Escape | Clear all vertices |
| C | Toggle close/open polygon |
| Arrow keys | Move polygon by 1 grid unit |

## Use Cases

The `use-cases/` directory contains 13 Alistair Cockburn fully-dressed use cases that document every feature's expected behavior. These are maintained alongside the code — any new feature or bug fix includes a corresponding use case review or update.

## Built With

This project was built entirely with [Claude Code](https://claude.com/claude-code).

## License

MIT
