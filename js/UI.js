function generateUI() {
    
// Battle dialogues
battleDialogue = game.add.text(0, 0, 'Hello', style);

// Level, HP, and EXP text
UILevel = game.add.text(0, 0, '', style);
UIplayerHP = game.add.text(0, 0, 'HP: '+playerHP+'/'+playerHPMax[level], style);
UIplayerEXP = game.add.text(0, 0, 'EXP: '+playerEXP+'/'+expTable[level], style);
UIlevelUp = game.add.text(0, 0, '', style);
        
// Adding the Attack, Heal, and Flee buttons
atkBtn = game.add.sprite(0, 0, 'buttonAtk');
healBtn = game.add.sprite(0, 0, 'buttonHeal');
fleeBtn = game.add.sprite(0, 0, 'buttonFlee');
        
// Attack, Heal, and Flee button text
UIAtkBtn = game.add.text(0, 0, 'A: Attack', {
    font: '20px Arial', 
    fill: '#ffffff'
});
UIHealBtn = game.add.text(0, 0, 'S: Heal - '+heal, {
    font: '20px Arial', 
    fill: '#ffffff'
});
UIFleeBtn = game.add.text(0, 0, 'D: Flee', {
    font: '20px Arial', 
    fill: '#ffffff'
});
        
// Locking the UI to the camera
UILevel.fixedToCamera = true;
UIplayerHP.fixedToCamera = true;
UIplayerEXP.fixedToCamera = true;
UIlevelUp.fixedToCamera = true;
battleDialogue.fixedToCamera = true;
        
// Locking the button background
atkBtn.fixedToCamera = true;
healBtn.fixedToCamera = true;
fleeBtn.fixedToCamera = true;
        
// Locking the button texts
UIAtkBtn.fixedToCamera = true; 
UIHealBtn.fixedToCamera = true; 
UIFleeBtn.fixedToCamera = true;
        
// Positioning the UI
UILevel.cameraOffset.setTo(30, 33);
UIplayerHP.cameraOffset.setTo(30, 62);
UIplayerEXP.cameraOffset.setTo(30, 91);
UIlevelUp.cameraOffset.setTo(200, 50);
battleDialogue.cameraOffset.setTo(30, 450);
battleDialogue.visible = false;
UIlevelUp.visible = false;
        
// Positioning the buttons
atkBtn.cameraOffset.setTo(30, 500);
healBtn.cameraOffset.setTo(290, 500);
fleeBtn.cameraOffset.setTo(560, 500);
atkBtn.visible = false;
fleeBtn.visible = false;
        
// Positioning the button text
UIAtkBtn.cameraOffset.setTo(90, 517);
UIHealBtn.cameraOffset.setTo(340, 517);
UIFleeBtn.cameraOffset.setTo(630, 517);
UIAtkBtn.visible = false;
UIFleeBtn.visible = false;
    
}