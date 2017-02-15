var game = new Phaser.Game(800, 600);

var MyGame = {};
// PreloadState
MyGame.preloadState = function(game) {};
// PlayGameState
MyGame.playGameState = function(game) {};

// Preload proto
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
// Playgame proto
MyGame.playGameState.prototype = {
    create: function() {
        var black = this.add.sprite(0, 0, 'black');
        black.anchor.set(0.5);
        black.inputEnabled = true;
        black.events.onInputDown.add(this.addCrate, this);

    },
    addCrate: function() {
        var xPos = game.input.mousePointer.x;
        var yPos = game.input.mousePointer.y;

        var crate = this.add.sprite(xPos, yPos, 'crate');
        game.physics.arcade.enable(crate);

        crate.anchor.set(0.5);
        // enable physics on the crate
        this.physics.enable(crate, Phaser.Physics.ARCADE);
        // Add collision detection with the boundaries of the black img

        crate.body.collideWorldBounds = true;

        crate.body.bounce.setTo(1, 1);

        var randomXY;
        var randomG = game.rnd.integerInRange(-200, 200);
        var randomOnzZerro = game.rnd.integerInRange(0, 1);
        if (randomOnzZerro === 0) {
            crate.body.velocity.y = randomG;
        } else {
            crate.body.velocity.x = randomG;
        }

        var explosion = this.add.sprite(xPos, yPos, 'explosion');
        explosion.anchor.set(0.5);
        explosion.animations.add('explosionAnimation');
        explosion.animations.play('explosionAnimation', 20);
    }
};
// Add the preload state
game.state.add('preloadState', MyGame.preloadState);
// Add the playgame state
game.state.add('playGame', MyGame.playGameState);
// start the preload state
game.state.start('preloadState');
