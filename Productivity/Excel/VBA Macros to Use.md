To add VBA code:
1. `ALT + F11` to open VBA Editor
2. `Insert` then `Module`
3. Copy/paste

```vb
Function GetNumbersOnly(S As String) As Double
    For Each V In Split(S)
        GetNumbersOnly = GetNumbersOnly + Val(V)
    Next
End Function
```

4. In the cell, reference it by name: `=GetNumbersOnly(A2)`

# Excel How To
1. Get numbers only from a string (see example above)
2. Get text characters only from a string
