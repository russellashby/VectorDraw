# Vector Graphics Editor

A browser-based tool for creating vector polygon graphics for games (like Asteroids). Users plot vertices on a grid and export as Lua flat arrays.

## Project Structure

- `index.html` — Single-page app (HTML/CSS/JS), loads `vector.js` via script tag
- `vector.js` — Pure logic module shared between app and tests. Exports via `module.exports` for Node, global functions for browser
- `tests.js` — Node-based test suite for all pure logic

## Running Tests

```
node tests.js
```

All tests must pass before considering work complete. Run tests after every change to `vector.js` or logic in `index.html`.

## Architecture

- No build tools, no frameworks, no dependencies
- Pure functions live in `vector.js` — keep them pure (no DOM, no global state)
- `index.html` uses wrapper functions (`_gridToCanvas`, `_canvasToGrid`, `_getEffectiveVertices`) that bind app state to shared pure functions
- Coordinate system: (0,0) at grid center, snap-to-grid only

## Key Functions (vector.js)

- `gridToCanvas(gx, gy, originX, originY, cellSize)` — grid coords to canvas pixels
- `canvasToGrid(cx, cy, originX, originY, cellSize, gridSize)` — canvas pixels to snapped grid coords
- `rotatePoint(x, y, angleDeg)` — rotate point around origin
- `getEffectiveVertices(vertices, mirrorX, mirrorY)` — apply mirror modes, returns new arrays (no mutation)
- `parseLuaTable(text)` — parse Lua flat array to vertex pairs, returns null on invalid input
- `generateLuaOutput(vertices, scaleFactor)` — generate Lua flat array string

## Conventions

- Lua output format: flat array `vertices = { x1, y1, x2, y2, ... }`
- New pure logic goes in `vector.js` with corresponding tests in `tests.js`
- DOM/canvas code stays in `index.html`
