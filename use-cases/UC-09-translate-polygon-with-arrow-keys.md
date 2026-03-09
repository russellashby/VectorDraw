# UC-9: Translate Polygon with Arrow Keys

| Field | Value |
|---|---|
| **Use Case** | UC-9: Translate Polygon with Arrow Keys |
| **Scope** | Vector Graphics Editor |
| **Level** | Subfunction |
| **Primary Actor** | Game Artist |
| **Precondition** | At least one vertex exists; Lua textarea is not focused |
| **Postcondition (Success)** | All vertices are shifted by 1 grid unit in the arrow direction, clamped to grid bounds |
| **Postcondition (Failure)** | Vertices are unchanged |
| **Trigger** | Actor presses an arrow key |

## Main Success Scenario

1. Actor presses an arrow key (Up/Down/Left/Right).
2. System translates all vertices by (±1, 0) or (0, ±1).
3. System clamps each vertex to ±gridSize/2.
4. System refreshes canvas and Lua output.

## Extensions

- **1a.** Lua textarea has focus: Keyboard event is ignored (normal text editing takes precedence).
