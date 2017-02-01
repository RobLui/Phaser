// COMMAND FOR RUNNING IT ON A LOCAL MACHINE WHERE THE BROWSER STATES - INSECURE .. BLABLA - WORKS FINE :)
// python -m SimpleHTTPServer 8000

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Create our 'main' state that will contain the game
var mainState = {
    preload: function() { // This function will be executed at the beginning, that's where we load the images and sounds

        // Load the bird sprite
        game.load.image('bird', 'assets/bird.png');

        // Load the pipe sprite
        game.load.image('pipe', 'assets/pipe.png');

        // Load the jump audio
        game.load.audio('jump', 'assets/jump.wav');
    },
    create: function() { // This function is called after the preload function, here we set up the game, display sprites, etc.

        // Change the background color of the game to blue
        game.stage.backgroundColor = '#71c5cf';

        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display the bird at the position x=100 and y=245
        this.bird = game.add.sprite(100, 245, 'bird');

        // Add physics to the bird Needed for: movements, gravity, collisions, etc.
        game.physics.arcade.enable(this.bird);

        // Add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;

        // Move the anchor to the left and downward, makes it look more natural (like a bird)
        this.bird.anchor.setTo(-0.2, 0.5);

        // Call the 'jump' function when the spacekey is hit
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        // Create an empty group
        this.pipes = game.add.group();

        // Add new pipes into the game every 1,5 seconds, done by following method:
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

        // Add score
        this.score = 0;

        // Display scoreText
        this.labelScore = game.add.text(20, 20, "0", {
            font: "30px Arial",
            fill: "#ffffff"
        });
        // Add sound creation
        this.jumpSound = game.add.audio('jump');
    },
    update: function() { // This function is called 60 times per second, it contains the game's logic

        // If the bird overlaps a pipe.. (removed restart game, wich was the first code written here"
        game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);

        // If the bird is out of the screen (too high or too low), call the 'restartGame' function
        if (this.bird.y < 0 || this.bird.y > 490) {
            this.restartGame();
        }

        // Check if the bird's angle is lower than 20 deg
        if (this.bird.angle < 20)
        // if so, up the angle by one
            this.bird.angle += 1;
    },
    hitPipe: function() {
        // If the bird has already hit a pipe, do nothing, it means the bird is already falling off the screen
        if (this.bird.alive == false)
            return;

        // Set the alive property of the bird to false
        this.bird.alive = false;

        // Prevent new pipes from appearing
        game.time.events.remove(this.timer);

        // Go through all the pipes, and stop their movement
        this.pipes.forEach(function(p) {
            p.body.velocity.x = 0;
        }, this);
    },
    jump: function() { // Make the bird jump

        // Check if the bird is dead (if he jumped to something, if he's falling to death already, unable the chance to jump further)
        if (this.bird.alive == false)
            return;

        // Play the sound whenever jumped
        this.jumpSound.play();

        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;

        // Create an animation on the bird
        var animation = game.add.tween(this.bird);

        // A tween makes it possible to alter one or multiple values over a period of time, change the angle of the bird to -20° in 100 milliseconds, start the animation
        game.add.tween(this.bird).to({
            angle: -20
        }, 100).start();
    },
    restartGame: function() { // Restart the game

        // Start the 'main' state, which restarts the game
        game.state.start('main');
    },
    addOnePipe: function(x, y) {
        // Create a pipe at the position x and y
        var pipe = game.add.sprite(x, y, 'pipe');

        // Add the pipe to our previously created group
        this.pipes.add(pipe);

        // Enable physics on the pipe
        game.physics.arcade.enable(pipe);

        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200;

        // Automatically kill the pipe when it's no longer visible
        pipe.checkWorldBounds = true;

        // If it's off the screen, destroy the pipe
        pipe.outOfBoundsKill = true;
    },
    addRowOfPipes: function() {

        // Randomly pick a number between 1 and 5, this will be the hole position
        var hole = Math.floor(Math.random() * 5) + 1;

        // Up the score by one
        this.score += 1;

        // Update the scoreText
        this.labelScore.text = this.score;

        // Add the 6 pipes, with one big hole at position 'hole' and 'hole + 1'
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1)
                this.addOnePipe(400, i * 60 + 10);
    }
};

game.state.add('main', mainState); // Add the 'mainState' and call it 'main'

game.state.start('main'); // Start the state to actually start the game
start('main'); // Start the state to actually start the game
game
