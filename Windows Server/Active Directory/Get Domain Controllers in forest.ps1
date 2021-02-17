$DCs = (Get-ADForest).GlobalCatalogs
$DCs

Foreach ($ItemName in Get-Content "$DCs"){
   Write-Host "Do something"
}
