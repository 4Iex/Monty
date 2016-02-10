# Run this script with either 4 arguements in order: 
# Server Name - DB Name - DBA usr - DBA password
#
# This exports a json file of results named: SERVERNAME_DBNAME.json

$JSON = Get-Content -Raw -Path TESTBOX_testDB.json | ConvertFrom-Json
$json_for_write = @()

if($args[0] -and $args[1]){
	$server_name = $args[0]
	$db_name = $args[1]
	
	if($args[2] -and $args[3]){
		$user = $args[2]
		$password = $args[3]
		$integratedSec=$false
	}
}else{
	#Add local DB information
	$server_name = '@@@@@'
	$db_name = '@@@@@@'
	$integratedSec=$true
}

$file_name = $server_name + "_" + $db_name + ".json"

foreach( $audit in $JSON.results ) { 

	$expected = $audit.expected	
	$title = $audit.title
	$query = $audit.audit
	$audit_result = $false
	
	$SqlConnection = New-Object System.Data.SqlClient.SqlConnection
	$SqlConnection.ConnectionString = "Server=$server_name;Database=$db_name;Integrated Security=$integratedSec;"
	$SqlConnection.Open()
	
	$SqlCmd = New-Object System.Data.SqlClient.SqlCommand
	$SqlCmd.CommandText = $query
	$SqlCmd.Connection = $SqlConnection
	$sql_result= $SqlCmd.ExecuteScalar()
	
	if($sql_result){
		foreach ($i in $sql_result){
			if(!$i.toString().equals($expected)){				
					$audit_result = $true
					break
					}
				}
			}

$json_nested_results += ,@{"title" = "$title"
		"audit" = "$query";
		"expected" = "$expected";
		"result" = "$audit_result".toString()}	

$SqlConnection.Close()
}
$json_for_write = @{"results" = $json_nested_results}
$json_for_write | ConvertTo-Json | Out-File .\$file_name
Write-Output "Wrote $file_name to file."
