# UC-1: Place Vertex on Grid

| Field | Value |
|---|---|
| **Use Case** | UC-1: Place Vertex on Grid |
| **Scope** | Vector Graphics Editor |
| **Level** | User goal |
| **Primary Actor** | Game Artist |
| **Stakeholders** | Game Artist — wants to define polygon shapes quickly and precisely |
| **Precondition** | Editor is loaded; polygon is not closed |
| **Postcondition (Success)** | A new vertex is added at the snapped grid position; canvas, vertex list, and Lua output are updated |
| **Postcondition (Failure)** | No vertex is added; state is unchanged |
| **Trigger** | Actor clicks on an empty grid cell on the canvas |

## Main Success Scenario

1. Actor moves mouse over the canvas.
2. System displays a hover indicator (circle) at the nearest snapped grid point and a dashed preview line from the last placed vertex.
3. System shows the current grid coordinates (scaled) in the top-left corner.
4. Actor clicks the grid cell.
5. System snaps the click position to the nearest grid intersection.
6. System appends the vertex to the vertex list.
7. System redraws the canvas showing the new vertex (numbered), connecting lines, and updated Lua output.

## Extensions

- **4a.** Click lands on or near an existing vertex (within 10px): System does not add a duplicate vertex.
- **4b.** Polygon is closed: System ignores the click; no vertex is added.
- **5a.** Click is beyond grid bounds: System clamps coordinates to the grid boundary (±gridSize/2).
