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

Function GetTextOnly(Text As String) As String
    With CreateObject("VBScript.RegExp")
        .Global = True
        .Pattern = "[0-9]"
        
        GetTextOnly = .Replace(Text, "")
    End With
End Function

```

4.

# Excel How To
1. Get numbers only from a string:  In the cell, `=GetNumbersOnly(A2)`
2. Get text characters only from a string:  In the cell, `=GetTextOnly(A2)`
