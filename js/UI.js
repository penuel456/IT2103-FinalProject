function generateUI() {
    
// Battle dialogues
battleDialogue = game.add.text(0, 0, 'Hello', style);

// Level, HP, and EXP text
UIUsername = game.add.text(0, 0, username, style);
UILevel = game.add.text(0, 0, '', style);
UIplayerHP = game.add.text(0, 0, 'HP: '+playerHP+'/'+playerHPMax[level], style);
UIplayerEXP = game.add.text(0, 0, 'EXP: '+playerEXP+'/'+expTable[level], style);
UIlevelUp = game.add.text(game.camera.width / 2, game.camera.height / 3.7, '', style);
        
// Adding the Attack, Heal, and Flee buttons
atkBtn = game.add.sprite(0, 0, 'button');
healBtn = game.add.sprite(0, 0, 'button');
fleeBtn = game.add.sprite(0, 0, 'button');
logoutBtn = game.add.button(0, 0, 'logoutBtn', logout, this);
        
// Attack, Heal, and Flee button text
UIAtkBtn = game.add.text(0, 0, 'A: Attack', buttonStyle);
UIHealBtn = game.add.text(0, 0, 'S: Heal - '+heal, buttonStyle);
UIFleeBtn = game.add.text(0, 0, 'D: Flee', buttonStyle);
        
// Locking the UI to the camera
UIUsername.fixedToCamera = true;
UILevel.fixedToCamera = true;
UIplayerHP.fixedToCamera = true;
UIplayerEXP.fixedToCamera = true;
UIlevelUp.fixedToCamera = true;
battleDialogue.fixedToCamera = true;
logoutBtn.fixedToCamera = true;
UIlevelUp.anchor.setTo(0.5, 0.5);
        
// Locking the button background
atkBtn.fixedToCamera = true;
healBtn.fixedToCamera = true;
fleeBtn.fixedToCamera = true;
        
// Locking the button texts
UIAtkBtn.fixedToCamera = true; 
UIHealBtn.fixedToCamera = true; 
UIFleeBtn.fixedToCamera = true;
        
// Positioning the UI
UIUsername.cameraOffset.setTo(30, 33);
UILevel.cameraOffset.setTo(30, 67);
UIplayerHP.cameraOffset.setTo(30, 100);
UIplayerEXP.cameraOffset.setTo(650, 100);
battleDialogue.cameraOffset.setTo(30, 450);
battleDialogue.visible = false;
UIlevelUp.visible = false;
        
// Positioning the buttons
atkBtn.cameraOffset.setTo(30, 500);
healBtn.cameraOffset.setTo(290, 500);
fleeBtn.cameraOffset.setTo(560, 500);
logoutBtn.cameraOffset.setTo(660, 33);
atkBtn.visible = false;
fleeBtn.visible = false;
        
// Positioning the button text
UIAtkBtn.cameraOffset.setTo(90, 517);
UIHealBtn.cameraOffset.setTo(340, 517);
UIFleeBtn.cameraOffset.setTo(630, 517);
UIAtkBtn.visible = false;
UIFleeBtn.visible = false;
    
}