function startBattle(player, enemy) {
    if(enemy.alive){
        player.body.moves = false;
        if(game.physics.arcade.distanceBetween(player, enemy) < 30){
            enemy.body.moves = false;
        }
            
        atkBtn.visible = true;
        fleeBtn.visible = true;
        UIAtkBtn.visible = true;
        UIFleeBtn.visible = true;
            
        if(atkKey.isDown){
            command = 1;
        }else if(healKey.isDown){
            command = 2;
        }else if(fleeKey.isDown){
            command = 3;
        }
            
        // Player's turn
        if(game.time.now > nextTurn && playerTurn == 1 && command != 0){
            nextTurn = game.time.now + 1000;
            
            if(command == 1){
                tweenTint(enemy, 0xff0000, 0xFFFFFF, 500);
                damageReceived = game.rnd.integerInRange(player.dmg, player.dmg + 2);
                enemy.damage(playerDamage[level]);
                battleDialogue.reset();
                battleDialogue.lifespan = 1000;
                battleDialogue.text = 'Enemy took '+player.dmg+' damage';
            }else if(command == 2 && heal != 0 && player.health != playerHPMax[level]){
                player.health = playerHPMax[level];
                heal--;
            }else if(command == 3){
                enemy.alive = false;
                verifyKill = 0;
                    
                battleDialogue.reset();
                battleDialogue.lifespan = 1000;
                battleDialogue.text = 'You escaped! Gained 0 EXP';
            }
            playerTurn = 0;
            command = 0;
        }
            
        // Enemy's turn
        if(game.time.now > nextTurn && playerTurn == 0){
            nextTurn = game.time.now + 1000;
            damageReceived = game.rnd.integerInRange(enemy.dmg, enemy.dmg + 1);
            player.damage(damageReceived);
            playerTurn = 1;
            command = 0;
                
            battleDialogue.reset();
            battleDialogue.lifespan = 1000;
            battleDialogue.text = 'You received '+damageReceived+' damage';
        }
    }
        
    if(enemy.health <= 0){
        verifyKill = 1;
    }
        
    if(!enemy.alive){
        enemy.kill();
        atkBtn.visible = false;
        fleeBtn.visible = false;
        UIAtkBtn.visible = false;
        UIFleeBtn.visible = false;
            
        player.body.moves = true;
        enemy.body.moves = true;
            
        playerTurn = 1;
        command = 0;
        nextTurn = 0;
            
        if(verifyKill != 0){
            gainedEXP =  game.rnd.integerInRange(enemy.exp, enemy.exp + 15);
            if(level < 9){
                playerEXP += gainedEXP;
                
                battleDialogue.reset();
                battleDialogue.lifespan = 3000;
                battleDialogue.text = 'You gained '+gainedEXP+' EXP!';
            }else {
                battleDialogue.reset();
                battleDialogue.lifespan = 100000;
                battleDialogue.text = 'You reached the level cap! Gained 0 EXP';
            }            
        }
        
        if(playerEXP >= expTable[level]){
            levelUp();
        }
    }
        
    if(player.health <= 0){
        player.alive = false;
        player.health = 0;
        player.kill();
            
        battleDialogue.reset();
        battleDialogue.lifespan = 100000;
        battleDialogue.text = 'YOU DIED! Refresh page to try again.';
    }
}