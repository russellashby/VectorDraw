# UC-4: Undo Last Vertex

| Field | Value |
|---|---|
| **Use Case** | UC-4: Undo Last Vertex |
| **Scope** | Vector Graphics Editor |
| **Level** | Subfunction |
| **Primary Actor** | Game Artist |
| **Precondition** | At least one vertex exists |
| **Postcondition (Success)** | The most recently added vertex is removed |
| **Postcondition (Failure)** | No change to state |
| **Trigger** | Actor clicks "Undo" button or presses Ctrl/Cmd+Z |

## Main Success Scenario

1. Actor triggers undo.
2. System removes the last vertex from the array.
3. If vertex count drops below 3, system opens the polygon and resets the Close button.
4. System refreshes canvas, vertex list, and Lua output.

## Extensions

- **1a.** No vertices exist: System does nothing.
