# UC-13: Configure Scale Factor

| Field | Value |
|---|---|
| **Use Case** | UC-13: Configure Scale Factor |
| **Scope** | Vector Graphics Editor |
| **Level** | Subfunction |
| **Primary Actor** | Game Artist |
| **Precondition** | None |
| **Postcondition (Success)** | Lua output values and vertex list display are multiplied by the new scale factor; grid positions are unchanged |
| **Postcondition (Failure)** | Scale factor is unchanged |
| **Trigger** | Actor changes the Scale input (1–10, integer step) |

## Main Success Scenario

1. Actor changes the scale factor to an integer value (1–10).
2. System updates `scaleFactor`.
3. Lua output regenerates with scaled coordinate values.
4. Vertex list panel shows scaled coordinate values.
5. Canvas grid positions remain unchanged (scale only affects output).
