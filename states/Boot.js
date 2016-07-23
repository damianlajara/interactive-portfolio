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
        this.game.load.spritesheet('player', '/assets/sprites/player/player.png', 587, 707, 40);

        // Load all the Game Assets
        this.game.load.tilemap('tilemap', '/assets/base_level.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('background', '/assets/images/bg/background.png');

        this.game.load.image('tile1', '/assets/images/1.png');
        this.game.load.image('tile2', '/assets/images/2.png');
        this.game.load.image('tile3', '/assets/images/3.png');
        this.game.load.image('tile4', '/assets/images/4.png');
        this.game.load.image('tile5', '/assets/images/5.png');
        this.game.load.image('tile6', '/assets/images/6.png');
        this.game.load.image('tile7', '/assets/images/7.png');
        this.game.load.image('tile8', '/assets/images/8.png');
        this.game.load.image('tile9', '/assets/images/9.png');
        this.game.load.image('tile10', '/assets/images/10.png');
        this.game.load.image('tile11', '/assets/images/11.png');
        this.game.load.image('tile12', '/assets/images/12.png');
        this.game.load.image('tile13', '/assets/images/13.png');
        this.game.load.image('tile14', '/assets/images/14.png');
        this.game.load.image('tile15', '/assets/images/15.png');
        this.game.load.image('tile16', '/assets/images/16.png');
        this.game.load.image('tile17', '/assets/images/17.png');
        this.game.load.image('tile18', '/assets/images/18.png');
        this.game.load.image('bush1', '/assets/images/Bush1.png');
        this.game.load.image('bush2', '/assets/images/Bush2.png');
        this.game.load.image('sign1', '/assets/images/Sign_1.png');
        this.game.load.image('sign2', '/assets/images/Sign_2.png');

        this.game.load.image('rock', '/assets/tile_sets/rock.png');
        this.game.load.image('level_tiles', '/assets/tile_sets/level_tiles.png');
        this.game.load.image('small_tiles', '/assets/tile_sets/small_tiles.png');
        this.game.load.image('bushes', '/assets/tile_sets/bushes.png');
        this.game.load.image('tree1', '/assets/tile_sets/tree1.png');
        this.game.load.image('tree2', '/assets/tile_sets/tree2.png');
        this.game.load.image('signs', '/assets/tile_sets/signs.png');
        this.game.load.image('treebark', '/assets/tile_sets/treebark.png');
        this.game.load.image('crates', '/assets/tile_sets/crates.png');
        this.game.load.image('chest', '/assets/tile_sets/chest.png');

    },

    create: function () {

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preloader');

    }

};
