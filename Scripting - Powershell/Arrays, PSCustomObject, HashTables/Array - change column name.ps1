# How to Change column name of an array
  $myArray | % { 
      $_ | Add-Member "NewColumnName" -NotePropertyValue $_.RegistrationState
      $_.PSObject.Properties.Remove("OldColumnName")
  }
