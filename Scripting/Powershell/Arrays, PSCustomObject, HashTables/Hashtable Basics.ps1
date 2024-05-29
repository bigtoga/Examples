# Create, use
$hash = $null
$hash = @{}

$proc = get-process | Sort-Object -Property name -Unique
 
foreach ($p in $proc){
    $hash.add($p.name,$p.id)
}

$hash

##################################
# Update
$myHash = @{}
$myHash["a"] = 1
$myHash["b"] = 2
$myHash["c"] = 3

foreach($key in $($myHash.keys)){
    $myHash[$key] = 5
}

###################################
# Remove
$myHash.Remove("a")
