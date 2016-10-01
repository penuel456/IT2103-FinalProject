<?php
	include("sql_connector.php");

	$result = mysqli_query($db, "SELECT * FROM user WHERE id=".$_POST['id']);

	$data = mysqli_fetch_row($result);
	
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<script type="text/javascript" src='js/phaser.min.js'></script>
    <script type='text/javascript' src='js/preloadState.js'></script>
    <script type='text/javascript' src='js/variablesPHP.js'></script>
    <script type='text/javascript' src='js/generateSprite.js'></script>
    <script type='text/javascript' src='js/UI.js'></script>
    <script type='text/javascript' src='js/battleState.js'></script>
	<script type="text/javascript" src='js/jquery.min.js'></script>
    
	<title>It's Slimy</title>
	<style>
		body {
			/*margin-left: 25%;
			margin-top: 12%; */
			background-color: #2f283a;
		}
	</style>
</head>
<body>

<div>
<script type="text/javascript">
	// Creates a new game. Think of it as a main function.
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});
	
	
	// 1: username, 2:pwd, 3:level, 4:currentEXP 
	var playerEXP = <?php echo $data[4]; ?>;
	var level = <?php echo $data[3]; ?>;
    
    function create(){		
		// Load CSV map. Pixel size is 16x16
		
		map = game.add.tilemap('map', 16, 16);
	
    	//  Now add in the tileset
    	map.addTilesetImage('tiles');

    	map.setCollision(164);
    
    	//  Create our layer
    	layer = map.createLayer(0);
    	
    	// Zooms the map
    	layer.setScale(4);
    	layer.resizeWorld();
        
        // Add the background
		background = game.add.sprite(0, 0, 'background');
		background.scale.setTo(0.5);	
        
        // Generate sprites and the UI
        generatePlayer();
        generateEnemy();
        generateUI();

		// Physics and camera
		game.physics.enable(player, Phaser.Physics.ARCADE);
		game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

		// Sets arrow keys as controls.
		cursors = game.input.keyboard.createCursorKeys();
        
        // Attack keyboard press
        atkKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        
        // Heal keyboard press
        healKey =  game.input.keyboard.addKey(Phaser.Keyboard.S);
        
        // Flee keyboard press
        fleeKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

	}
    
	function update(){
		game.physics.arcade.collide(player, layer);
        game.physics.arcade.collide(enemyGroup, layer);
        
        game.physics.arcade.overlap(player, enemyGroup, startBattle, null, this);
        game.physics.arcade.overlap(player, enemyGroupStrong, startBattle, null, this);
        game.physics.arcade.overlap(player, enemyGroupStrongest, startBattle, null, this);
        game.physics.arcade.overlap(player, bossGroup, startBattle, null, this);
        
		player.body.velocity.set(0);
        enemy.animations.play('idle');

        playerMovementHandler();
        enemyMovementHandler(enemy);
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.S)&& heal != 0 && player.health != playerHPMax[level]){
            player.health = playerHPMax[level];
            heal--;
        }
        
        UIplayerEXP.text = 'EXP: '+playerEXP+'/'+expTable[level];
        UIplayerHP.text = 'HP: '+player.health+'/'+player.maxHealth;
        UIHealBtn.text = "S: Heal - "+heal;
        UILevel.text = 'Level: '+(level+1);
	}
    
    function playerMovementHandler() {
        if(cursors.left.isDown){
        	player.body.velocity.x = -300;
        	player.play('left');
       	}else if(cursors.right.isDown){
        	player.body.velocity.x = 300;
        	player.play('right');
        }else if(cursors.up.isDown){
        	player.body.velocity.y = -300;
        	player.play('left');
   		}else if(cursors.down.isDown){
        	player.body.velocity.y = 300;
        	player.play('right');
    	}else {
    		player.animations.stop();
    	}
    }
    
    function enemyMovementHandler(enemy) {
        enemyGroup.forEachAlive(function(enemy){
            if(Phaser.Math.distance(player.x, player.y, enemy.x, enemy.y) <= 200){
                game.physics.arcade.moveToObject(enemy, player, 100);
            }
        });
        
        enemyGroupStrong.forEachAlive(function(enemy){
            if(Phaser.Math.distance(player.x, player.y, enemy.x, enemy.y) <= 200){
                game.physics.arcade.moveToObject(enemy, player, 100);
            }
        });
        
        enemyGroupStrongest.forEachAlive(function(enemy){
            if(Phaser.Math.distance(player.x, player.y, enemy.x, enemy.y) <= 200){
                game.physics.arcade.moveToObject(enemy, player, 100);
            }
        });
        
        bossGroup.forEachAlive(function(enemy){
            if(Phaser.Math.distance(player.x, player.y, enemy.x, enemy.y) <= 100){
                game.physics.arcade.moveToObject(enemy, player, 100);
            }
        });
    }
    
    function levelUp() {
        
        playerEXP = 0;
        level++;
        heal += 2;
        
        player.health = playerHPMax[level];
        player.maxHealth = playerHPMax[level];
        player.dmg += game.rnd.integerInRange(2, 3);
        
        UIlevelUp.visible = true;
        UIlevelUp.reset();
        UIlevelUp.lifespan = 3000;    
        
        UIlevelUp.text = "LEVEL UP! HP increased to "+playerHPMax[level]+" and attack increased to "+player.dmg+". \nYou're currently at level "+(level+1)+".";
    }
    
    // A penalty when the player escapes with less than 0      EXP
    function levelDown() {
        if(level != 0){
            level--;
            playerEXP = expTable[level] / 1.2;
            
            // Decreasing parameters
            player.maxHealth = playerHPMax[level];
            player.health = playerHPMax[level];
            player.dmg = playerDamage[level];
        }
    }
    
    function render(){
        //game.debug.cameraInfo(game.camera, 32, 32);
        //game.debug.spriteCoords(player);
    }
	
	function saveGame() {
		// Ajax request
		$.post('saveGame.php', {
			level: level,
			exp: playerEXP
		});
	}

</script>
</div>

</body>
</html>