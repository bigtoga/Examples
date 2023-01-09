To add VBA code:
1. `ALT + F11` to open VBA Editor
2. `Insert` then `Module`
3. Copy/paste

```vb
Function GetNumbersOnly(S As String) As Double
    For Each V In Split(S)
        result = result + Val(V)
    Next
End Function
```

4. In the cell, reference it by name: `=GetNumbersOnly(A2)`
