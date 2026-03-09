# UC-5: Clear All Vertices

| Field | Value |
|---|---|
| **Use Case** | UC-5: Clear All Vertices |
| **Scope** | Vector Graphics Editor |
| **Level** | User goal |
| **Primary Actor** | Game Artist |
| **Precondition** | None |
| **Postcondition (Success)** | All vertices are removed; polygon is opened; editor is reset to initial drawing state |
| **Postcondition (Failure)** | N/A |
| **Trigger** | Actor clicks "Clear" button or presses Escape |

## Main Success Scenario

1. Actor triggers clear.
2. System empties the vertex array.
3. System resets closed state and Close button label.
4. System refreshes canvas (empty grid) and Lua output (placeholder comment).
