# UC-7: Apply Mirror Mode

| Field | Value |
|---|---|
| **Use Case** | UC-7: Apply Mirror Mode |
| **Scope** | Vector Graphics Editor |
| **Level** | User goal |
| **Primary Actor** | Game Artist |
| **Precondition** | At least one vertex exists (for visible effect) |
| **Postcondition (Success)** | Effective vertex set is doubled/quadrupled via axis mirroring; Lua output reflects mirrored vertices |
| **Postcondition (Failure)** | State is unchanged |
| **Trigger** | Actor clicks the Mirror X or Mirror Y toggle |

## Main Success Scenario

1. Actor clicks a mirror toggle (Horizontal X or Vertical Y).
2. System toggles the mirror flag and visually activates/deactivates the toggle.
3. System computes effective vertices by reflecting originals across the selected axis/axes with reversed winding and deduplication of on-axis points.
4. Canvas redraws: original vertices shown as solid dots, mirrored vertices as hollow circles; dashed guide line shown on the mirror axis.
5. Lua output updates to include all effective (mirrored) vertices.

## Extensions

- **1a.** Both mirrors enabled: System produces a 4-quadrant reflection (X, XY, Y quadrants) with deduplication at seams.
