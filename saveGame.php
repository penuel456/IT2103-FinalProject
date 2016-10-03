<?php
    require("sql_connector.php");

	$userID = $_POST['id'];
	$level = $_POST['level'];
	$exp = $_POST['exp'];
	
	$stmt = "UPDATE users SET 
		level = ".$level.", 
		exp = ".$exp."   
		WHERE user_id = ".$userID;

	$res = mysqli_query($sql, $stmt);
?>