# UC-3: Remove Individual Vertex

| Field | Value |
|---|---|
| **Use Case** | UC-3: Remove Individual Vertex |
| **Scope** | Vector Graphics Editor |
| **Level** | Subfunction |
| **Primary Actor** | Game Artist |
| **Precondition** | At least one vertex exists |
| **Postcondition (Success)** | The selected vertex is removed; if fewer than 3 vertices remain, the polygon is opened |
| **Postcondition (Failure)** | No vertex is removed; state is unchanged |
| **Trigger** | Actor clicks the "x" button next to a vertex in the vertex list panel |

## Main Success Scenario

1. Actor locates the vertex in the left-panel vertex list.
2. Actor clicks the "x" remove button.
3. System removes the vertex from the array.
4. System refreshes canvas, vertex list, and Lua output.

## Extensions

- **3a.** Removal brings vertex count below 3 while polygon was closed: System automatically opens the polygon.
