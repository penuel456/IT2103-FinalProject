<?php
	include("sql_connector.php");
	$register = true;
	if(isset($_POST['uname']) && isset($_POST['upass'])){
		$register = true;
		$username = $_POST['uname'];
		$password = md5($_POST['upass']);
		
		$res = mysqli_query($sql, "SELECT * FROM users");

		while($row = mysqli_fetch_array($res)){
			if($row[1] == $username){
				$register = false;
			}
		}
		
		if($register != false){
			session_start();
			$_SESSION['username'] = $username;
			$_SESSION['password'] = $password;
			header("location: insertUser.php");
		}
	}
?>

<html>
<head>
	<title>It's Slimy | Register</title>
	<link rel='stylesheet' href='css/bootstrap.min.css'>
	<style>
		body {
			padding-top: 12%;
			background: url("img/map.png");
			background-repeat: no-repeat;
		}
	
		@font-face {
    		font-family: Emulogic;
    		src: url(fonts/emulogic.ttf);
		}
	
		h1, h3 {
			font-family: "Emulogic";
			color: ghostwhite;
		}
		
		button, alert, .alert {
			font-family: "Emulogic";
		}
		
		input {
			font-family: "Segoe UI";
		}
		
		.panel {
			margin-top: 18px;
			margin-bottom: 10px;
		}
		
		
	</style>
</head>
<body>
	<div class='col-md-4 col-sm-offset-4'>
		<div class='panel panel-info'>
			<div class='panel-heading'>
				<h3 class='panel-title'>REGISTER</h3>
			</div>
			<div class='panel-body'>
				<form method='POST' action='addUser.php' enctype='multipart/form-data' autocomplete="off">
					<input name='uname' type='text' class='form-control' placeholder='Username' required><br>
					<input name='upass' type='password' class='form-control' placeholder='Password' required><br>
					<button class='btn btn-info pull-right'>Submit</button>
				</form>
			</div>
		</div>
	</div>
	<div class = 'col-sm-4 col-sm-offset-4'>
		<?php
			if(isset($register) && $register == false){
		?>
		<div class = 'alert alert-danger'>
			Username already taken.
		</div>
		<?php
			}
		?>
		</div>
</body>
</html>
<script src='js/bootstrap.min.js'></script>
<script>
</script>