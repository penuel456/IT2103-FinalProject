function generatePlayer() {
    // Create our player
    player = game.add.sprite(game.world.X = 521, game.world.Y = 336, 'player', 1);
    player.animations.add('left', [6,7,8,9], 10, true);
    player.animations.add('right', [1,2,3,4], 10, true);
    player.scale.setTo(0.5, 0.5);
        
    player.maxHealth = playerHPMax[level];
    player.health = playerHPMax[level];
    player.dmg = playerDamage[level];
    player.alive = true;
}

function generateEnemy() {
    enemyGroup = game.add.group();
    enemyGroup.enableBody = true;
    enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;
    enemyGroup.setAll('checkWorldBounds', true);
    enemyGroup.setAll('outOfBoundsKill', true);
    
    // 1 - 10 : Blue slime
    enemy = enemyGroup.create(184, 386, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroup.create(157, 896, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroup.create(471, 1036, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroup.create(704, 772, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroup.create(1161, 594, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroup.create(871, 154, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroup.create(1527, 154, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroup.create(1898, 172, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroup.create(2308, 184, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroup.create(2308, 471, 'enemy');
    enemy.scale.set(1.5, 1.5);
    
    enemyGroupStrong = game.add.group();
    enemyGroupStrong.enableBody = true;
    enemyGroupStrong.physicsBodyType = Phaser.Physics.ARCADE;
    enemyGroupStrong.setAll('checkWorldBounds', true);
    enemyGroupStrong.setAll('outOfBoundsKill', true);
    
    // 11 - 20 : Green slime
    enemy = enemyGroupStrong.create(2337, 886, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroupStrong.create(2047, 882, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroupStrong.create(1597, 562, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroupStrong.create(1640, 956, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroupStrong.create(1200, 946, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroupStrong.create(1200, 1206, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroupStrong.create(947, 1442, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroupStrong.create(800, 1976, 'enemy');
    enemy.scale.set(1.5, 1.5);
    //enemy = enemyGroupStrong.create(394, 1729, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroupStrong.create(384, 2159, 'enemy');
    enemy.scale.set(1.5, 1.5);
    
    enemyGroupStrongest = game.add.group();
    enemyGroupStrongest.enableBody = true;
    enemyGroupStrongest.physicsBodyType = Phaser.Physics.ARCADE;
    enemyGroupStrongest.setAll('checkWorldBounds', true);
    enemyGroupStrongest.setAll('outOfBoundsKill', true);
    
    // 21 - 25 : Yellow slime
    
    enemy = enemyGroupStrongest.create(1735, 2006, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroupStrongest.create(1110, 2281, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroupStrongest.create(1650, 1316, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroupStrongest.create(2260, 1331, 'enemy');
    enemy.scale.set(1.5, 1.5);
    enemy = enemyGroupStrongest.create(1740, 2281, 'enemy');
    enemy.scale.set(1.5, 1.5);
    
    
    
    // Blue slime paramters    
    enemyGroup.forEachAlive(function(enemy) {
        enemy.maxHealth = 10;
        enemy.health = 10;
        enemy.alive = true;
        enemy.dmg = 2;
        enemy.exp = 30;
    });
    
    // Green slime parameters
    enemyGroupStrong.forEachAlive(function(enemy) {
        enemy.maxHealth = 30;
        enemy.health = 30;
        enemy.alive = true;
        enemy.dmg = 8;
        enemy.exp = 50;
    });
    
    // Yellow slime parameters
    enemyGroupStrongest.forEachAlive(function(enemy) {
        enemy.maxHealth = 50;
        enemy.health = 50;
        enemy.alive = true;
        enemy.dmg = 8;
        enemy.exp = 110;
    });
    
    bossGroup = game.add.group();
    bossGroup.enableBody = true;
    bossGroup.physicsBodyType = Phaser.Physics.ARCADE;
    bossGroup.setAll('checkWorldBounds', true);
    bossGroup.setAll('outOfBoundsKill', true);
    
    enemy = bossGroup.create(2305, 2091, 'enemy');
    enemy.scale.set(2.0, 2.0);
    enemy = bossGroup.create(394, 1729, 'enemy');
    enemy.scale.set(2.0, 2.0);
    
    
    // Boss parameters
    bossGroup.forEachAlive(function(enemy) {
        enemy.maxHealth = 200;
        enemy.health = 200;
        enemy.alive = true;
        enemy.dmg = 15;
        enemy.exp = 1000;
    });
    
    bossGroup.callAll('animations.add', 'animations', 'idle', [4,5], 3, true);
    bossGroup.callAll('play', null, 'idle');
    
    //enemy.animations.add('idle', [0,1], 10);
    enemyGroup.callAll('animations.add', 'animations', 'idle', [0,1], 5, true);
    enemyGroup.callAll('play', null, 'idle');
    
    enemyGroupStrong.callAll('animations.add', 'animations', 'idleStr', [2,3], 5, true);
    enemyGroupStrong.callAll('play', null, 'idleStr');
    
    enemyGroupStrongest.callAll('animations.add', 'animations', 'idleStrest', [6,7], 5, true);
    enemyGroupStrongest.callAll('play', null, 'idleStrest');
        
    //var tween = game.add.tween(enemyGroup).to({x: 20}, 1000, Phaser.Easing.Linear.None, true, 0, 100, true);
                            
}