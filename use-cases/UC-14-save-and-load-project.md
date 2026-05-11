# UC-14: Save and Load Project as JSON

| Field | Value |
|---|---|
| **Use Case** | UC-14: Save and Load Project as JSON |
| **Scope** | Vector Graphics Editor |
| **Level** | User goal |
| **Primary Actor** | Game Artist |
| **Precondition** | Editor is loaded |
| **Postcondition (Success)** | Export: a `.json` file is downloaded with full editor state. Import: editor state is replaced with the loaded file's state |
| **Postcondition (Failure)** | Import: editor state is unchanged; "Invalid file" feedback is shown briefly on the button |
| **Trigger** | Actor clicks "Export JSON" or "Import JSON" |

## Main Success Scenario — Export

1. Actor clicks "Export JSON."
2. System serializes current state via `generateProjectJson` — capturing `gridSize`, `scaleFactor`, `closed`, `mirrorX`, `mirrorY`, and the user-placed `vertices` array (raw grid coordinates, unscaled).
3. System triggers a browser download named `vector-project.json`.
4. Button text changes to "Exported!" for 1.5 seconds, then reverts.

## Main Success Scenario — Import

1. Actor clicks "Import JSON."
2. System opens a native file picker filtered to `.json` files.
3. Actor selects a previously exported project file.
4. System reads the file and parses it via `parseProjectJson`.
5. Parse succeeds: system replaces `vertices`, restores `closed`, `mirrorX`, `mirrorY`, and (when present) `gridSize` and `scaleFactor`. The canvas is re-sized and re-drawn. Rotation preview resets to 0.
6. Button text changes to "Imported!" for 1.5 seconds, then reverts.

## Extensions

- **4a.** Parse fails (malformed JSON, missing/invalid `vertices`): button text changes to "Invalid file" for 1.5 seconds; editor state is unchanged.
- **5a.** Imported `vertices` has fewer than 3 points: `closed` is forced to `false` regardless of the file's `closed` flag.
- **Format:** JSON is the canonical project file format; the Lua textarea (UC-10) and copy action (UC-11) remain the way to extract render-ready output for use in a game.
