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

' Case-sensitive
Function IndexOf(InputText As String, StringToFind As String, StartingCharacter As Double) As Double
    IndexOf = InStr(StartingCharacter, InputText, StringToFind, vbBinaryCompare)
End Function
```

# Excel How To
1. Get numbers only from a string:  In the cell, `=GetNumbersOnly(A2)`
2. Get text characters only from a string:  In the cell, `=GetTextOnly(A2)`
