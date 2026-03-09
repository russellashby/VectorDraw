# UC-6: Close / Open Polygon

| Field | Value |
|---|---|
| **Use Case** | UC-6: Close / Open Polygon |
| **Scope** | Vector Graphics Editor |
| **Level** | User goal |
| **Primary Actor** | Game Artist |
| **Precondition** | At least 3 vertices exist (for closing) |
| **Postcondition (Success)** | Polygon closed state is toggled; canvas draws closing line segment |
| **Postcondition (Failure)** | State is unchanged |
| **Trigger** | Actor clicks "Close Polygon" button or presses 'c' |

## Main Success Scenario

1. Actor triggers close.
2. System verifies at least 3 vertices exist.
3. System toggles the `closed` flag.
4. Canvas redraws with the closing segment (first vertex to last vertex) visible or hidden.
5. Button label toggles between "Close Polygon" and "Open Polygon."

## Extensions

- **2a.** Fewer than 3 vertices: System ignores the request.
