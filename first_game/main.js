//GAME
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv');

var spacefield;
var background_x;

//MAIN STATE (array of functions)
var mainState = {
    preload: function() {
        // Preload the image so we can use it in the game, ID en LOCATIE gebruikt
        game.load.image('_mountains', 'assets/_mountains.jpg');
    },
    create: function() {
        //Add the image to the screen , COORDINATEN en ID gebruikt
        spacefield = game.add.tileSprite(0, 0, 800, 600, '_mountains');
        background_x = 4;
    },
    //update will happen every frame -> bv een bewegend karakter
    update: function() {
        //update the current y position of the image every frame
        spacefield.tilePosition.x += background_x;

    }
}
game.state.add('mainState', mainState);
game.state.start('mainState');
