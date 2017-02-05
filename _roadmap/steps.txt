Basic things needed for each Phaser.io project:
---
***
SETUP
- Include main.js into the project folder
- Include index.html into the folder
- Include phaser.min.js into the project folder <br>
(make sure the phaser framework is put in here)
- Create an assets folder (optional, but good for maintaining overview)
***
BASIC CODE
- Initialize a new game
  - Example: var game = new Phaser.Game(600, 400);
- Add the preload, create, update functions (preferred in the mainState)
  - Example: var mainState = {
      <br>
      preload: function() {},
      <br>
      create: function() {},
      <br>
      update: function() {}
      <br>
  };
- Add & Start the mainState
  - game.state.add('main', mainState);
  <br>
  game.state.start('main');


Alternative:
---
Clone the [_standard](https://github.com/RobLui/Phaser/tree/master/_standard) folder
