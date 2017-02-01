// If you make use of this template setup file or any of the other files in this template project, please link my github profile @RobLui.

// Init the game
var game = new Phaser.Game(1000, 600);

// Create the state that will contain the whole game
var mainState = {
    // Preload the assets (.png, .wav, ..)
    preload: function() {
        // Load the player image
        game.load.image('player', 'assets/player.png');
        // Load the wall image
        game.load.image('wall', 'assets/wall.png');
        //  Load the coin image
        game.load.image('coin', 'assets/coin.png');
        // Load the enemy image
        game.load.image('enemy', 'assets/enemy.png');
    },
    // The game objects and the game itself is created here
    create: function() {
        //-------- SYSTEM CONFIG SETTINGS & AREA --------
        // Set the background color to blue
        game.stage.backgroundColor = '#3598db';
        // Start the Arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Add the physics engine to all game objects
        game.world.enableBody = true;

        //-------- INPUT SETTINGS --------
        // Variable to store the arrow key that is pressed
        this.cursor = game.input.keyboard.createCursorKeys();

        //-------- PLAYER --------
        // Create the player in the middle of the game (location and id used)
        this.player = game.add.sprite(70, 100, 'player');
        // Add gravity to make it fall
        this.player.body.gravity.y = 600;

        //-------- LEVEL SETUP --------
        // Add walls (group of walls..)
        this.walls = game.add.group();
        // Add coins (group of coins..)
        this.coins = game.add.group();
        // Add enemies (group of enemies..)
        this.enemies = game.add.group();
        // Design the level: x = wall, o = coin, ! = lava.
        var level = [
            'xxxxxxxxxxxxxxxxxxxxxx',
            '!         !          x',
            '!                 o  x',
            '!         o          x',
            '!                    x',
            '!     o   !    x     x',
            'xxxxxxxxxxxxxxxx!!!!!x',
        ];
        // Create the level by going through the array
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {

                // Create a WALL and add it to the 'walls' group
                if (level[i][j] == 'x') {
                    var wall = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'wall');
                    this.walls.add(wall);
                    // Set immovable to true, so they won't start falling apart if the player walks on them
                    wall.body.immovable = true;
                }

                // Create a COIN and add it to the 'coins' group
                else if (level[i][j] == 'o') {
                    var coin = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'coin');
                    this.coins.add(coin);
                }

                // Create an ENEMY and add it to the 'enemies' group
                else if (level[i][j] == '!') {
                    var enemy = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'enemy');
                    this.enemies.add(enemy);
                }
            }
        }
    },
    // Update runs 60 frames/sec
    update: function() {
        if (this.cursor.left.isDown) // Move left as long as the key is pressed
            this.player.body.velocity.x = -200;
        else if (this.cursor.right.isDown) // Move right as long as the key is pressed
            this.player.body.velocity.x = 200;
        else // If no key is pressed, no movement is needed
            this.player.body.velocity.x = 0;

        // Make the player jump if he is touching the ground, only enable it when its on the ground
        if (this.spaceKey && this.player.body.touching.down) {
            this.player.body.velocity.y = -250;
        }

        // -------- COLLISION DETECTION --------
        // Make the player and the walls collide
        game.physics.arcade.collide(this.player, this.walls);

        // Call the 'takeCoin' function when the player takes a coin
        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

        // Call the 'restart' function when the player touches the enemy
        game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
    },
    // Remove or "kill" a coin
    takeCoin: function(player, coin) {
        coin.kill();
    },
    // Restart the game
    restart: function() {
        game.state.start('main');
    }
};

// Add the mainState
game.state.add('main', mainState);
// Start the game
game.state.start('main');
