$hash = $null
$hash = @{}

$proc = get-process | Sort-Object -Property name -Unique
 
foreach ($p in $proc){
    $hash.add($p.name,$p.id)
}

$hash
