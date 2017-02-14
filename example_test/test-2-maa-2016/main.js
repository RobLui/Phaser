// - Maak een game met deze 2 states: Preload & PlayGame

// - Preload in de Preload State alle afbeeldingen. Start de “PlayGame” state van zodra alles geladen is.

// - Plaats bij elke muisklik een nieuwe krat ("crate.png") op de plaats van muis cursor.

// - Plaats op dezelfde plaats een explosie animatie ("explosion.png").

// - Laat elke nieuwe krat vertrekken in een willekeurige richting met een willekeurige snelheid
// - Zorg ervoor dat de kratten op de rand van de toepassing terugkaatsen. Gebruik hiervoor Arcade Physics.
// - Zorg ervoor dat de kratten - wanneer ze elkaar raken - terugkaatsen.

// Gegevens:
// Elke frame van de animatie van de explosie sprite sheet is 128 x 128 pixels.


// Init the game
var game = new Phaser.Game(600, 400);

// Create the state that will contain the whole game
var mainState = {
    // Preload the assets (.png, .wav, ..)
    preload: function() {
        // Load the crate image
        game.load.image('crate', 'assets/crate.png');
        // Load the explosion sprite
        game.load.spritesheet('explosion', 'assets/explosion.png', 120, 120);
    },
    create: function() { // Create starts if preload is done
        // Start the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Apply gravity in the y direction
        game.physics.arcade.gravity.y = 300;
        //Create a group for crates
        crateGroup = game.add.group();
        // Enable the body on the group of crates
        crateGroup.enableBody = true;
        // Specify wich body type they get
        crateGroup.physicsBodyType = Phaser.Physics.ARCADE;

    },
    update: function() {
        PlayGame();
    }
};


function PlayGame() {
    // Check if there is clicked / if the cursor is being held down
    if (game.input.activePointer.isDown) {
        // Create crate
        var pos_y = game.input.y;
        var pos_x = game.input.x;
        // Add the crate at specific positions (x and y location off the cursor)
        var crate = game.add.sprite(pos_x, pos_y, 'crate');
        // Add the explosion at specific position
        var explosion = game.add.sprite(pos_x, pos_y, 'explosion');
        explosion.animations.add('explosion', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 1, true);
        explosion.play('explosion'); // plays all the frames, at 1 frame per second, looping.
        // enable gravity on the crate
        game.physics.arcade.enable(crate);
        game.physics.arcade.enable(explosion);
        // Give it a spcecific gravity
        crate.body.gravity.y = 200;
        explosion.body.gravity.y = 200;
    }
}
// Preload
game.state.add('main', mainState);

// Start the game
game.state.start('main');
