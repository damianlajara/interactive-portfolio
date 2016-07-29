var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

    init: function () {

        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        //  This tells the game to resize the renderer to match the game dimensions (i.e. 100% browser width / height)
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

    },

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        // this.load.image('preloaderBackground', 'images/preloader_background.jpg');
        // this.load.image('preloaderBar', 'images/preloadr_bar.png');

        var textStyle = {font: '45px Arial', alight: 'center', stroke: 'blue', fill: 'blue'};

        this.game.add.text(80, 150, 'loading...', textStyle);
        this.game.load.atlas('player', 'assets/sprites/player/full_player.png', 'assets/sprites/player/full_player.json');
        // this.game.load.spritesheet('player', '/assets/sprites/player/player.png', 587, 707, 40);

        // Load all the Game Assets
        this.game.load.tilemap('base_level', '/assets/base_level.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('background', '/assets/images/bg/background.png');

        this.game.load.image('small_tiles', '/assets/tile_sets/small_tiles.png');
        this.game.load.image('chest', '/assets/tile_sets/chest.png');
        this.game.load.image('crate', '/assets/tile_sets/crate.png');
        this.game.load.image('all_tiles', '/assets/tile_sets/ground_tiles.png');

    },

    create: function () {

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preloader');

    }

};
