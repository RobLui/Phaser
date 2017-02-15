var game = new Phaser.Game(800, 600);

// Array for different states
var MyGame = {};
MyGame.preloadState = function(game) {};
MyGame.playGameState = function(game) {};

// Preload prototype
MyGame.preloadState.prototype = {
    preload: function() {
        this.load.image('black', 'assets/black.jpg');
        this.load.image('crate', 'assets/crate.png');
        this.load.spritesheet('explosion', 'assets/explosion.png', 128, 128, 20);
    },
    create: function() {
        // start the playGame state once the preload is done
        this.state.start('playGame');
    }
};
// Playgame prototype
MyGame.playGameState.prototype = {
    create: function() {
        var black = this.add.sprite(0, 0, 'black');
        black.anchor.set(0.5);
        black.inputEnabled = true;
        black.events.onInputDown.add(this.addCrate, this);
    },
    addCrate: function() {
        // Assign variables to the mousepointer's position
        var xPos = game.input.mousePointer.x;
        var yPos = game.input.mousePointer.y;
        // Add the crate sprite to the game
        var crate = this.add.sprite(xPos, yPos, 'crate');
        // Set the anchor to the middle of the crate
        crate.anchor.set(0.5);
        // enable physics on the crate - manier 1
        // this.physics.enable(crate, Phaser.Physics.ARCADE);
        // Enable physics on the crate - manier 2
        game.physics.arcade.enable(crate);
        // Add collision detection with the boundaries of the black img
        crate.body.collideWorldBounds = true;
        // Determine the speed of the bounce it sets off with if bouncing on a worldbound
        crate.body.bounce.setTo(1, 1);

        var randomGravity = game.rnd.integerInRange(-300, 300); // Random number for gravity -> bepaalt de richting waarin de crate eerst vliegt
        var random = game.rnd.integerInRange(0, 1); //Choice of random numbers = 0 or 1
        // True (1)
        if (random) {
            // Apply a random number
            crate.body.velocity.y = randomGravity; //up & down
        }
        // False (0)
        else {
            crate.body.velocity.x = randomGravity; //left & right
        }
        // Add the explosion sprite to the game
        var explosion = this.add.sprite(xPos, yPos, 'explosion');
        // Set the anchor to the middle of the explosion
        explosion.anchor.set(0.5);
        // add an animation to the explosion sprite
        explosion.animations.add('explosionAnimation');
        // Loopn through all sprites in the spritesheet (20 in this case)
        explosion.animations.play('explosionAnimation', 20);
    }
};
// Add the preload state
game.state.add('preloadState', MyGame.preloadState);
// Add the playgame state
game.state.add('playGame', MyGame.playGameState);
// start the preload state
game.state.start('preloadState');
