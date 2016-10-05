<?php
	require("sql_connector.php");
	$login = true;
	if(isset($_POST['username']) && isset($_POST['password'])){
		$username = $_POST['username'];
		$password = md5($_POST['password']);
		
	
		$qry = mysqli_query($sql,
		"SELECT * FROM users WHERE username = '".$username."'AND 
		password = '".$password."'");
		
		$user = mysqli_fetch_row($qry);

		if($qry){
			$x = mysqli_num_rows($qry);
			if($x == 1){
				session_start();
				$_SESSION['username'] = $user[1];
				$_SESSION['level'] = $user[3];
				$_SESSION['exp'] = $user[4];
				$_SESSION['id'] = $user[0];
				header("location:dungeon.php");
			}else{
				$login = false;
			}
		}
	}
?>
<html>
<head>
	<link rel = 'stylesheet' href ='css/bootstrap.min.css'>
	<title>It's Slimy | Login</title>
</head>
<style>
 	body{
 		padding-top: 12%;
		/*background-color: #2f283a;*/
		background: url("img/map.png");
	}
	
	@font-face {
    	font-family: Emulogic;
    	src: url(fonts/emulogic.ttf);
	}
	
	h1, h2 {
		font-family: "Emulogic";
		color: ghostwhite;
	}
	
	a, button, .alert {
		font-family: "Emulogic";
	}
	
	input {
		font-family: "Segoe UI";
	}
	
	#title {
		margin-top: -80px;
	}
	
	.panel {
		margin-top: 50px;
		margin-bottom: 10px;
	}
</style>
<body>
	<h1 id='title' class='text-center'>IT'S SLIMY</h1>
	<div class = 'col-sm-4 col-sm-offset-4'>
		<div class ='panel panel-info'>
			<div class = 'panel-heading'>
				<h2 class='panel-title'>Log in: GRIND TO WIN</h2>
			</div>
			<div class = 'panel-body'>
			<form method ='POST' action="index.php" autocomplete ='OFF'>
				<input name='username' type ='text' placeholder='Username' class ='form-control' required>
				<br>
				<input name='password'type ='password' placeholder='Password' class = 'form-control' required>
				<br>
				<span><a href ='addUser.php'>Register</a>
				<button class = 'btn btn-info pull-right'>Log in</button>
				</span>
			</form>
			</div>
		</div>
	</div>
	<div class = 'col-sm-4 col-sm-offset-4'>
		<?php
			if(isset($login) && $login == false){
		?>
		<div class = 'alert alert-danger'>
			Login Failed
		</div>
		<?php
			}
		?>
		</div>
</body>
</html>