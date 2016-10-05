var style = { 
            font: "19px Consolas", 
            fill: '#ffffff', 
            backgroundColor: 'rgba(153, 204, 255,0.50)'
            };
var buttonStyle = {
    		font: '20px Segoe UI', 
    		fill: '#ffffff'
			};

var layer, player, cursors, enemy, background, walls;

// Groups
var enemyGroup;
var enemyGroupStrong;
var enemyGroupStrongest;
var bossGroup;

// Boolean variables for battle state
var battleState = 0;
var verifyKill = 0;
var playerTurn = 1;
var nextTurn = 0;
var command = 0;

// Attack, heal, and flee keys
var atkKey;
var fleeKey;
var healKey;

// Attack, heal, and flee button
var atkBtn; 
var healBtn;
var fleeBtn;
var logoutBtn;

// Text inside the button
var UIAtkBtn;
var UIHealBtn;
var UIFleeBtn;
    
// The EXP table. Level cap is level + 1.
var expTable = [100, 200, 400, 500, 600, 800, 1000, 1200, 1500, 2000];
    
var playerHPMax = [20, 25, 30, 40, 50, 60, 80, 100, 120, 150];
var playerDamage = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
var heal = 10;
    
// Player parameters. TEMPORARY
var playerHP = 10;
    
// Enemy parameters
var damageReceived;
var gainedEXP;
    
// Displaying player's HP, EXP, and level as UI
var UIUsername;
var UIplayerHP;
var UIplayerEXP;
var UILevel;
var UIlevelUp;