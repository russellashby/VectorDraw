# UC-11: Copy Lua Output to Clipboard

| Field | Value |
|---|---|
| **Use Case** | UC-11: Copy Lua Output to Clipboard |
| **Scope** | Vector Graphics Editor |
| **Level** | Subfunction |
| **Primary Actor** | Game Artist |
| **Precondition** | Lua output textarea contains text |
| **Postcondition (Success)** | Lua text is on the system clipboard |
| **Postcondition (Failure)** | Clipboard is unchanged |
| **Trigger** | Actor clicks "Copy Lua" button |

## Main Success Scenario

1. Actor clicks "Copy Lua."
2. System copies the textarea content to the clipboard via `navigator.clipboard.writeText`.
3. Button text changes to "Copied!" for 1.5 seconds, then reverts.
