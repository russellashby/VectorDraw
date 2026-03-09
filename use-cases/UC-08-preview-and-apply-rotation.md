# UC-8: Preview and Apply Rotation

| Field | Value |
|---|---|
| **Use Case** | UC-8: Preview and Apply Rotation |
| **Scope** | Vector Graphics Editor |
| **Level** | User goal |
| **Primary Actor** | Game Artist |
| **Precondition** | At least one vertex exists |
| **Postcondition (Success)** | All vertices are rotated by the specified angle and snapped to the nearest grid point; rotation controls reset to 0 |
| **Postcondition (Failure)** | Vertices are unchanged; controls remain at current value |
| **Trigger** | Actor sets rotation via slider or number input, then clicks "Apply Rotation" |

## Main Success Scenario

1. Actor sets the rotation angle (0–360 degrees) using either the slider or the number input; both controls stay in sync.
2. System displays the angle value and draws a dashed ghost outline of the rotated shape as a live preview (Lua output is NOT updated).
3. Actor clicks "Apply Rotation."
4. System rotates each vertex by the selected angle using `rotatePoint`, rounds to the nearest integer grid point, and clamps to grid bounds.
5. System resets both the slider and the number input to 0 degrees.
6. System refreshes canvas and Lua output with the new vertex positions.

## Extensions

- **1a.** Actor types a value outside 0–360: System clamps to the nearest bound (0 or 360).
- **1b.** Actor types a non-numeric value: System defaults to 0.
- **1c.** Actor types a decimal value: System truncates to integer.
- **3a.** Rotation is 0 degrees: System does nothing.
- **3b.** No vertices exist: System does nothing.
