var game = new Phaser.Game(800, 600);

// Array for different states
var MyGame = {};
MyGame.preloadState = function(game) {};
MyGame.playGameState = function(game) {};

var max_y = 600;
var max_x = 800;
var zero = 0;

// Preload prototype
MyGame.preloadState.prototype = {
    preload: function() {
        this.load.spritesheet('explosion', 'assets/explosion.png', 50, 128, 20);
        this.load.spritesheet('water', 'assets/water.png', 64, 64, 10);
        this.load.audio('drop_s', ['assets/drop.mp3', 'assets/drop.ogg']);
        this.load.audio('bomb_s', ['assets/bomb.mp3', 'assets/bomb.ogg']);
    },
    create: function() {
        this.state.start('playGame');
    }
};
// Playgame prototype
MyGame.playGameState.prototype = {

    create: function() {
        // Add keyboard input W to be recognized to do something in this game
        var buttonW = this.input.keyboard.addKey(Phaser.Keyboard.W);
        // Do something on W down
        buttonW.onDown.add(this.waterRandom, this);

        // Add keyboard input B to be recognized to do something in this game
        var buttonB = this.input.keyboard.addKey(Phaser.Keyboard.B);
        // Do something on B down
        buttonB.onDown.add(this.expRandom, this);
    },
    waterRandom: function() {
        // Random x value
        var randomx = game.rnd.integerInRange(zero, max_x);
        // Random y value
        var randomy = game.rnd.integerInRange(zero, max_y);
        // Add the water sprite to a random location
        var waterAni = this.add.sprite(randomx, randomy, 'water');
        // Set the anchor 50% of the image --- 0 = left, 0,5 = mid, 1 = right
        waterAni.anchor.set(0.5);
        // Add animation to the sprite
        waterAni.animations.add('Ani');
        // Play animation
        waterAni.animations.play('Ani', 10);
        // Play the drop sound
        this.sound.play('drop_s');
    },
    expRandom: function() {
        // Random x value
        var randomx = game.rnd.integerInRange(zero, max_x);
        // Random y value
        var randomy = game.rnd.integerInRange(zero, max_y);
        // Add the explosion sprite to a random location
        var explosionAni = this.add.sprite(randomx, randomy, 'explosion');
        // Set the anchor 50% of the image --- 0 = left, 0,5 = mid, 1 = right
        explosionAni.anchor.set(0.5);
        // Add explosion animation to the sprite
        explosionAni.animations.add('Ani');
        // Play animation
        explosionAni.animations.play('Ani', 10);
        // Play the bomb sound
        this.sound.play('bomb_s');
    }
};
game.state.add('preload', MyGame.preloadState);
game.state.add('playGame', MyGame.playGameState);
game.state.start('preload');
