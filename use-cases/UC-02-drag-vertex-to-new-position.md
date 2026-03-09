# UC-2: Drag Vertex to New Position

| Field | Value |
|---|---|
| **Use Case** | UC-2: Drag Vertex to New Position |
| **Scope** | Vector Graphics Editor |
| **Level** | User goal |
| **Primary Actor** | Game Artist |
| **Precondition** | At least one vertex exists |
| **Postcondition (Success)** | The dragged vertex is repositioned to a new snapped grid point |
| **Postcondition (Failure)** | Vertex remains at its original position |
| **Trigger** | Actor mousedowns near an existing vertex and drags |

## Main Success Scenario

1. Actor hovers near an existing vertex; cursor changes to "grab."
2. Actor presses mouse button; cursor changes to "grabbing."
3. Actor moves mouse; system continuously updates the vertex position to the nearest snapped grid point and redraws.
4. Actor releases mouse button; vertex stays at new position; Lua output and vertex list update.

## Extensions

- **2a.** Actor clicks on vertex but does not drag (no movement): System treats it as a click, but since the click is near an existing vertex, no new vertex is added.
- **3a.** Actor drags cursor off the canvas: Drag is cancelled; vertex stays at last valid position.
