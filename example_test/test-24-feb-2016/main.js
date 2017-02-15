var game = new Phaser.Game(800, 600);

// Array for different states
var MyGame = {};
MyGame.preloadState = function(game) {};
MyGame.playGameState = function(game) {};
MyGame.splashState = function(game) {};

// PRELOAD prototype
MyGame.preloadState.prototype = {
    preload: function() {
        game.load.spritesheet('pacman', 'assets/pacman.png', 32, 32, 5);
        game.load.spritesheet('ghost', 'assets/pacman.png', 32, 32, 5);
        this.load.image('play', 'assets/play.png');
        this.load.audio('eat_sound', ['assets/eat_sound.mp3', 'assets/eat_sound.ogg']);
        this.load.audio('start_sound', ['assets/start_sound.mp3', 'assets/start_sound.ogg']);
    },
    create: function() {
        this.state.start('splash');
    }
};

// SPLASH prototype
MyGame.splashState.prototype = {
    create: function() {
        var button = this.add.sprite(game.world.centerX, game.world.centerY, 'play');
        button.anchor.set(0.5);
        button.inputEnabled = true;
        button.events.onInputDown.add(this.up, this);
    },
    up: function() {
        music = this.sound.play('start_sound');
        this.state.start('playGame');
    }
};

// PLAY GAME prototype
MyGame.playGameState.prototype = {
    create: function() {
        var pacman = this.add.sprite(game.world.centerX, game.world.centerY, 'pacman');
        var ghost = this.add.sprite(game.world.centerX + 100, game.world.centerY, 'ghost');

        ghost.anchor.set(0.5);
        pacman.anchor.set(0.5);

        var ani = pacman.animations.add('pacmanAnimation', [0, 1, 2]);
        var ani2 = ghost.animations.add('ghostAnimation', [3, 4]);

        pacman.animations.play('pacmanAnimation', 10, true, true);
        ghost.animations.play('ghostAnimation', 10, true, true);

        this.sound.play('eat_sound');

        var eat = this.sound.play('eat_sound');
        eat.loopFull();
    }
};
// Add all different kind of gameStates
game.state.add('preload', MyGame.preloadState);
game.state.add('splash', MyGame.splashState);
game.state.add('playGame', MyGame.playGameState);

// Start the preload state
game.state.start('preload');
