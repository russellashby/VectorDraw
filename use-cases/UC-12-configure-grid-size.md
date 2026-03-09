# UC-12: Configure Grid Size

| Field | Value |
|---|---|
| **Use Case** | UC-12: Configure Grid Size |
| **Scope** | Vector Graphics Editor |
| **Level** | Subfunction |
| **Primary Actor** | Game Artist |
| **Precondition** | None |
| **Postcondition (Success)** | Grid is redrawn with new dimensions; cell size recalculated; existing vertices are preserved |
| **Postcondition (Failure)** | Grid size is unchanged |
| **Trigger** | Actor changes the Grid Size input (4–128, step 2) |

## Main Success Scenario

1. Actor changes the grid size value.
2. System updates `gridSize`, recalculates `cellSize` and canvas layout via `resize()`.
3. System redraws the grid and all existing vertices/lines at the new scale.
