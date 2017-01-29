//GAME - testing in SAFARI , CHROME plugin on mac anyone???

// 800 & 600 determine how large the canvas size will be
// Phaser.auto determines the render mode -- GameDiv is the dom element where the game gets placed in
// The array at last are the essential functions that are used in the game
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'GameDiv', {
    preload: preload,
    create: create,
    update: update
});
// ------------------------ OMGEVING ------------------------
var platforms;
// ------------------------ MOVEMENT ------------------------
var cursors;
// ------------------------ SCORE ------------------------
var score = 0;
// ------------------------ SCORE TEXT ------------------------
var scoreText;


// Preload loads everything needed in the game before other code is applied where certain stuff is needed like images etc.
function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}
// Create applies once, at the start, and ?if called in actions?
function create() {
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

    // ------------------------ TWO LEDGES ------------------------
    // (zoals in Super Mario Bros fzo, dingen waar je op kan springen)
    // Create two ledges
    var ledge = platforms.create(400, 400, 'ground');

    // This also stops it from falling away when you jump on it
    ledge.body.immovable = true;

    // Put it on a certain position
    ledge = platforms.create(-150, 250, 'ground');

    // This also stops it from falling away when you jump on it
    ledge.body.immovable = true;

    // ------------------------ PLAYER ------------------------
    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    // Enable Physics on the player
    game.physics.arcade.enable(player);

    // Player physics properties
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    // The two animations on the player, walk left & right
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    // ------------------------ STARS ------------------------
    // Add a new group of stars
    stars = game.add.group();
    // Give the stars physics so they can collide with other gameObjects
    stars.enableBody = true;
    // Add 12 stars
    for (var i = 0; i < 12; i++) {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');
        // The greater the gravity is, the faster stars will fall
        star.body.gravity.y = 25;
        // Give each star a small bounce value if it collides -> bounce up
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    scoreText = game.add.text(16, 16, 'score: 0', {
        fontSize: '32px',
        fill: '#000'
    });
}

// Update performs each frame
function update() {

    var hitPlatform = game.physics.arcade.collide(player, platforms);
    cursors = game.input.keyboard.createCursorKeys();

    // Reset the players velocity (movement)
    player.body.velocity.x = 0;

    // ------------------------ MOVE RIGHT & LEFT ------------------------
    // Check if the left arrow key is down
    if (cursors.left.isDown) {
        // Move to the left - The number manages the speed of the action
        player.body.velocity.x = -300;
        // Play the "left" animation
        player.animations.play('left');
    }
    // Check if the right arrow key is down
    else if (cursors.right.isDown) {
        // Move to the right - The number manages the speed of the action
        player.body.velocity.x = 300;
        // Play the "right" animation
        player.animations.play('right');
    }
    // If no key is down at all..
    else {
        // Stand still, if no key is pressed
        player.animations.stop();
        // Amount of frames to be played when standing still
        player.frame = 4;
    }

    // ------------------------ MOVE UP ------------------------
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -300;
    }

    // ------------------------ STARS ------------------------
    // Check for collistion between the player and the platform
    game.physics.arcade.collide(stars, platforms);


    function collectStar(player, star) {
        // Removes the star from the screen
        star.kill();
        //  Add and update the score
        score += 1;
        scoreText.text = 'Score: ' + score;
    }

    // Check for overlapping between the player & stars instead off collision detection - If overlap happens apply function collectStar
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    //--- Check for collision between player & stars
    //--- game.physics.arcade.collide(stars, player);
}


// SIDE INFO!
// Groups -> In groups you can check for collisions between objects
