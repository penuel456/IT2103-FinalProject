<?php
    $db = mysqli_connect("localhost","root","","userdata");

	/* check connection */
	//mysqli function that displays any error#:
	//mysqli_connect_errno()
	
	if(mysqli_connect_errno() != 0){
		echo "Error: ".mysqli_connect_error();
		exit();
	}
      
?>