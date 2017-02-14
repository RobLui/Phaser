// If you make use of this template setup file or any of the other files in this template project, please link my github profile @RobLui.

// Init the game
var game = new Phaser.Game(1200, 400);

// Create the state that will contain the whole game
var mainState = {
    // Preload the assets (.png, .wav, ..)
    preload: function() {
        // Load the cube sprite
        game.load.image('cube', 'assets/cube_2.png');
    },

    // The game objects and the game itself is created here
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    // Update runs 60 frames/sec
    update: function() {
        if (game.input.activePointer.isDown) {
            mouseclick();
        }
    }
};

function mouseclick() {
    console.log("works");
    var pos_y = game.input.y;
    var pos_x = game.input.x;
    var cube = game.add.sprite(pos_x, pos_y, 'cube');
    cube.enableBody = true;
    cube.inputEnabled = true;
}
// Add the mainState
game.state.add('main', mainState);
// Start the game
game.state.start('main');
