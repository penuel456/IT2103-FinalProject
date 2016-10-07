function tweenTint(object, startColor, endColor, time){
    var colorBlend = {step: 0};
    var colorTween = game.add.tween(colorBlend).to({step: 50}, time);
    colorTween.onUpdateCallback(function() {
        object.tint = Phaser.Color.interpolateColor(startColor, endColor, 50, colorBlend.step); 
    });
        
    object.tint = startColor;
    colorTween.start();
}

function startBattle(player, enemy) {
    if(enemy.alive){
        player.body.moves = false;
        if(game.physics.arcade.distanceBetween(player, enemy) < 30){
            enemy.body.moves = false;
        }
            
        atkBtn.visible = true;
		spAtkBtn.visible = true;
        fleeBtn.visible = true;
        UIAtkBtn.visible = true;
		UISpAtkBtn.visible = true;
        UIFleeBtn.visible = true;
            
        if(atkKey.isDown){
            command = 1;
        }else if(healKey.isDown){
            command = 2;
        }else if(fleeKey.isDown){
            command = 3;
        }else if(spAtkKey.isDown){
			command = 4;
		}
            
        // Player's turn
        if(game.time.now > nextTurn && playerTurn == 1 && command != 0){
            nextTurn = game.time.now + 1000;
            if(command == 1){
                if(game.rnd.integerInRange(0, 100) < 20){
                    battleDialogue.reset();
                    battleDialogue.lifespan = 1000;
                    battleDialogue.text = 'You missed!';
                }else {
                    tweenTint(enemy, 0xff0000, 0xFFFFFF, 500);
                    damageReceived = game.rnd.integerInRange(player.dmg, player.dmg + 2);
                    enemy.damage(playerDamage[level]);
                    battleDialogue.reset();
                    battleDialogue.lifespan = 1000;
                    battleDialogue.text = 'Enemy took '+player.dmg+' damage';
                }
                playerTurn = 0;
            }else if(command == 2){
                if(heal != 0 && player.health != playerHPMax[level]){
                    if(player.health + (playerHPMax[level] / 2) >= playerHPMax[level]){
						player.health = playerHPMax[level];
					}else {
						player.heal(playerHPMax[level] / 2);
					}
					
					//player.health = playerHPMax[level];
                    heal--;
                    playerTurn = 0;
					command = 0;
                    
                    battleDialogue.reset();
                    battleDialogue.lifespan = 1000;
                    battleDialogue.text = 'Healed!';
                }else {
                    battleDialogue.reset();
                    battleDialogue.lifespan = 1000;
                    battleDialogue.text = 'Health full!';
                }
                
            }else if(command == 3){
                if(game.rnd.integerInRange(0, 100) >= 20){
                    enemy.alive = false;
					enemy.kill();
                    verifyKill = 0;
                    
                    gainedEXP =  game.rnd.integerInRange(enemy.exp / 1.5, (enemy.exp + 15) / 1.5);
                    
					// Lose EXP for Fleeing
                    playerEXP -= gainedEXP;
                    battleDialogue.reset();
                    battleDialogue.lifespan = 2000;
                    battleDialogue.text = 'You escaped! Lost '+gainedEXP+' EXP';
                    
                    // Level down if EXP reached less than 0
					if(playerEXP < 0){
                        levelDown();
                    }
                }else {
                    battleDialogue.reset();
                    battleDialogue.lifespan = 1000;
                    battleDialogue.text = 'Failed to escape!';
                }
                playerTurn = 0;
            }else if(command == 4){
				if(playerSP >= 2){
					if(game.rnd.integerInRange(0, 100) < 40){
                    	battleDialogue.reset();
                    	battleDialogue.lifespan = 1000;
                    	battleDialogue.text = 'You missed!';
                	}else {
                    	tweenTint(enemy, 0xff0000, 0xFFFFFF, 500);
                    	damageReceived = game.rnd.integerInRange(player.dmg, player.dmg + 2) * 2;
                    	enemy.damage(damageReceived);
                    	battleDialogue.reset();
                    	battleDialogue.lifespan = 1000;
                    	battleDialogue.text = 'Great hit! Enemy took '+damageReceived+' damage.';
                	}
					playerSP -= 2;
					playerTurn = 0;
				}else {
					battleDialogue.reset();
                    battleDialogue.lifespan = 1000;
                    battleDialogue.text = 'You need more SP!';
				}	
			}
		}
            command = 0;
       
            
        // Enemy's turn
        if(game.time.now > nextTurn && playerTurn == 0){
            nextTurn = game.time.now + 1000;
            if(game.rnd.integerInRange(0, 100) >= 20){
                game.camera.shake(0.006, 200);
                damageReceived = game.rnd.integerInRange(enemy.dmg, enemy.dmg + 1);
                player.damage(damageReceived);
                
                battleDialogue.reset();
                battleDialogue.lifespan = 1000;
                battleDialogue.text = 'You received '+damageReceived+' damage';
            }else {
                battleDialogue.reset();
                battleDialogue.lifespan = 1000;
                battleDialogue.text = "Enemy attack missed!";
            }
            playerTurn = 1;
            command = 0;
        }
    }
        
    if(enemy.health <= 0){
        verifyKill = 1;
    }
        
    if(!enemy.alive){
        atkBtn.visible = false;
		spAtkBtn.visible = false;
        fleeBtn.visible = false;
        UIAtkBtn.visible = false;
		UISpAtkBtn.visible = false;
        UIFleeBtn.visible = false;
            
        player.body.moves = true;
        enemy.body.moves = true;
            
        playerTurn = 1;
        command = 0;
        nextTurn = 0;
            
        if(verifyKill != 0){
            if(level < 9){
                gainedEXP =  game.rnd.integerInRange(enemy.exp, enemy.exp + 15);
                playerEXP += gainedEXP;
                
                battleDialogue.reset();
                battleDialogue.lifespan = 3000;
                battleDialogue.text = 'You gained '+gainedEXP+' EXP!';
            }else {
                battleDialogue.reset();
                battleDialogue.lifespan = 100000;
                battleDialogue.text = 'You reached the level cap! Gained 0 EXP';
            }
			saveGame();
        }
        
        if(playerEXP >= expTable[level]){
            levelUp();
        }
    }
        
    if(player.health <= 0){
        player.alive = false;
        player.health = 0;
        player.kill();
		
		gainedEXP =  game.rnd.integerInRange(enemy.exp / 1.2, (enemy.exp + 15) / 1.2);
                    
		// Lose EXP for Dying
        playerEXP -= gainedEXP;
		if(playerEXP < 0){
			levelDown();
		}
		saveGame();
        game.paused = true;    
        battleDialogue.reset();
        battleDialogue.lifespan = 2000;
        battleDialogue.text = "YOU DIED! Logging you out in 3 seconds...";
		
		setTimeout(function() {
			window.location.replace("logout.php");
		}, 3000);
		
    }
}
