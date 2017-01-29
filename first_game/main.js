//GAME

// 800 & 600 determine how large the canvas size will be
// Phaser.auto determines the render mode -- GameDiv is the dom element where the game gets placed in
// The array at last are the essential functions that are used in the game
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'GameDiv', {
    preload: preload,
    create: create,
    update: update
});
var spacefield;
var background_x;
var cursors;
var player;

//MAIN STATE (array of functions)
function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

function create() {

    var platforms;

    // Enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Background for the game
    game.add.sprite(0, 0, 'sky');

    // The platforms group contains the ground and the two ledges we can jump on
    platforms = game.add.group();

    // Enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Create the ground
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    // Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    // This stops it from falling away when you jump on it
    ground.body.immovable = true;

    // Create two ledges
    var ledge = platforms.create(400, 400, 'ground');

    // This also stops it from falling away when you jump on it
    ledge.body.immovable = true;

    // Put it on a certain position
    ledge = platforms.create(-150, 250, 'ground');

    // This also stops it from falling away when you jump on it
    ledge.body.immovable = true;
}
//update will happen every frame -> bv een bewegend karakter
function update() {

}
