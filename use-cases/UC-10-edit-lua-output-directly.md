# UC-10: Edit Lua Output Directly

| Field | Value |
|---|---|
| **Use Case** | UC-10: Edit Lua Output Directly |
| **Scope** | Vector Graphics Editor |
| **Level** | User goal |
| **Primary Actor** | Game Artist |
| **Precondition** | Editor is loaded |
| **Postcondition (Success)** | Canvas vertices are replaced by the parsed Lua values; mirrors are disabled; polygon is auto-closed if ≥3 vertices |
| **Postcondition (Failure)** | Textarea shows parse error; canvas is unchanged |
| **Trigger** | Actor clicks into the Lua textarea and types |

## Main Success Scenario

1. Actor focuses the Lua textarea; system suspends automatic Lua output updates.
2. Actor edits the text (types or pastes Lua table data).
3. On each keystroke, system attempts to parse the text via `parseLuaTable`.
4. Parse succeeds: system converts scaled values back to grid coordinates (dividing by scale factor), replaces the vertex array, disables mirrors, auto-closes if ≥3 vertices, and redraws the canvas.
5. Actor clicks away (blur): system resumes normal Lua output generation.

## Extensions

- **3a.** Parse fails (odd number count, no numbers, empty): System highlights the textarea border in red (parse-error class); canvas is not updated.
- **Input formats accepted:** `vertices = { ... }`, `{ ... }`, or bare comma-separated numbers.
