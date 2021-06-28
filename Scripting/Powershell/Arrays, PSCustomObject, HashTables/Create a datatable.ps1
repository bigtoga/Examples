$webapps = New-Object System.Data.DataTable "WebApps"
$webapps.Columns.Add("App") | Out-Null;
$webapps.Columns.Add("Setting") | Out-Null;

$webapps.Column["Setting"].DefaultValue = "Test"

$row = $webapps.NewRow();
$row.App = "Test Web App";
$webapps.Rows.Add($row); 



