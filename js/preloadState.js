function preload() {
        
    // Tilesheet
    game.load.tilemap('map', 'csv/tilemap_Collision.csv', null, Phaser.Tilemap.CSV);
    game.load.image('tiles', 'img/dungeon_sheet.png');
		
    // Foreground
	game.load.image('background', 'img/tilemap.png');

    game.load.spritesheet('player', 'sprites/spritesheet.png', 87.6, 87.6);
    game.load.image('button', 'img/button.png', 32, 32);
	game.load.spritesheet('logoutBtn', 'img/buttonLogout.png', 107, 58);
   
    game.load.spritesheet('enemy', 'sprites/slimeSpritesheet.png', 32, 32);

}