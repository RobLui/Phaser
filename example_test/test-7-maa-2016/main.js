// Init the game
var game = new Phaser.Game(1000, 900);

var arm;

// Create the state that will contain the whole game
var mainState = {
    // Preload the assets (.png, .wav, ..)
    preload: function() {
        game.load.image('arm', 'assets/metronome-arm.png');
        game.load.image('base', 'assets/metronome-base.png');
        game.load.audio('tick_s', ['assets/metronome-tick.mp3', 'metronome-tick.ogg']);
        game.load.spritesheet('button', 'assets/red-button.png', 110, 35, 3);
    },
    create: function() {
        // BASE
        var base = this.add.sprite(game.world.centerX, game.world.centerY, 'base');
        // Set the base anchor to the middle
        base.anchor.set(0.5);
        // Add the arm sprite to the world
        this.arm = this.add.sprite(game.world.centerX, game.world.centerY + 200, 'arm');
        // Set x and y anchor points - Starts or ends on the bottom
        this.arm.anchor.set(0.5, 1);
        // BUTTON
        var button = this.add.sprite(game.world.centerX, game.world.centerY + 300, 'button');
        // Set the anchor of the button in the middle of the button
        button.anchor.set(0.5);
        // Enable input on the button
        button.inputEnabled = true;
        // start the method Starttick();
        button.events.onInputDown.add(this.startTick, this);
    },
    soundX: function() {
        //Play the tick sound
        this.sound.play('tick_s');
    },
    startTick: function() {
        this.add.tween(this.arm)
            .to({
                angle: -25
            }, 200, Phaser.Easing.Linear.None, true);
    },
    update: function() {
        if (this.arm.angle == -25) {
            this.soundX();
            this.add.tween(this.arm)
                .to({
                    angle: 25
                }, 400, Phaser.Easing.Linear.None, true);
        }
        if (this.arm.angle == 25) {
            this.soundX();
            this.add.tween(this.arm)
                .to({
                    angle: -25
                }, 400, Phaser.Easing.Linear.None, true);
        }
    }
};

// Add the mainState
game.state.add('main', mainState);
// Start the game
game.state.start('main');
