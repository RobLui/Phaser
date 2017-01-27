//GAME
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv');

var spacefield;
var background_x;
var player;
var cursors;

//MAIN STATE (array of functions)
var mainState = {
    preload: function() {
        // Preload the image so we can use it in the game, ID en LOCATIE gebruikt
        game.load.image('_mountains', 'assets/_mountains.jpg');
        game.load.image('_player', 'assets/_player.png');
    },
    create: function() {
        //  -- BACKGROUND --
        //Add the image to the screen , COORDINATEN en ID gebruikt
        spacefield = game.add.tileSprite(0, 0, 800, 600, '_mountains');
        //move the background every frame
        background_x = 4;

        // -- PLAYER --
        //Add the player to specific location bij het begin van het spel
        player = spacefield.add.sprite(game.world.centerX, game.world.centerY + 200, '_player');
        //Add psychics to the player
        game.physics.enable(player, Phaser.Physics.ARCADE);
        //creer the link between the arrows
        cursors = game.input.keyboard.CreateCursorKeys();
    },
    //update will happen every frame -> bv een bewegend karakter
    update: function() {
        //update the current y position of the image every frame
        spacefield.tilePosition.x += background_x;
        player.velocity.x = 0;
        //check op keys pressed
        if (cursors.left.isDown) {
            player.velocity.x = -350;
        }
        if (cursors.right.isDown) {
            player.velocity.x = 350;
        }
    }
};
game.state.add('mainState', mainState);
game.state.start('mainState');
