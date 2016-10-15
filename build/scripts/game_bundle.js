(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _main = require('./main');

// console.log("starting game!");
new _main.MainGame(); // console.log("importing game");

},{"./main":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MainGame = undefined;

var _Boot = require('./states/Boot');

var _Preloader = require('./states/Preloader');

var _MainMenu = require('./states/MainMenu');

var _Game = require('./states/Game');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainGame = exports.MainGame = function (_Phaser$Game) {
    _inherits(MainGame, _Phaser$Game);

    function MainGame() {
        _classCallCheck(this, MainGame);

        //	Add the States your game has.
        //	You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
        var _this = _possibleConstructorReturn(this, (MainGame.__proto__ || Object.getPrototypeOf(MainGame)).call(this, "100%", "100%", Phaser.AUTO, 'portfolio_game'));
        //	100% of the browser window - see Boot.js for additional configuration


        _this.state.add('Boot', _Boot.Boot);
        _this.state.add('Preloader', _Preloader.Preloader);
        _this.state.add('MainMenu', _MainMenu.MainMenu);
        _this.state.add('Game', _Game.Game);

        //	Now start the Boot state.
        _this.state.start('Boot');
        return _this;
    }

    return MainGame;
}(Phaser.Game);

},{"./states/Boot":3,"./states/Game":4,"./states/MainMenu":5,"./states/Preloader":6}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Boot = exports.Boot = function (_Phaser$State) {
    _inherits(Boot, _Phaser$State);

    function Boot() {
        _classCallCheck(this, Boot);

        return _possibleConstructorReturn(this, (Boot.__proto__ || Object.getPrototypeOf(Boot)).apply(this, arguments));
    }

    _createClass(Boot, [{
        key: 'init',
        value: function init() {
            //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
            this.input.maxPointers = 1;

            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;

            //  This tells the game to resize the renderer to match the game dimensions (i.e. 100% browser width / height)
            this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        }
    }, {
        key: 'preload',
        value: function preload() {
            //  Here we load the assets required for our preloader (in this case a background and a loading bar)
            // this.load.image('preloaderBackground', 'images/preloader_background.jpg');
            // this.load.image('preloaderBar', 'images/preloadr_bar.png');

            var textStyle = { font: '45px Arial', alight: 'center', stroke: 'blue', fill: 'blue' };

            this.game.add.text(80, 150, 'loading...', textStyle);
            this.game.load.atlas('player', '../assets/sprites/player/full_player.png', 'assets/sprites/player/full_player.json');
            // this.game.load.spritesheet('player', '/assets/sprites/player/player.png', 587, 707, 40);

            // Load all the Game Assets
            this.game.load.tilemap('base_level', '../assets/base_level.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('background', '../assets/images/bg/background.png');
            this.game.load.image('me_semiround', '../assets/images/me_semiround.png');

            this.game.load.image('small_tiles', '../assets/tile_sets/small_tiles.png');
            this.game.load.image('chest', '../assets/tile_sets/chest.png');
            this.game.load.image('crate', '../assets/tile_sets/crate.png');
            this.game.load.image('all_tiles', '../assets/tile_sets/ground_tiles.png');

            this.game.load.image('ruby_adventure_cover', '../assets/images/covers/ruby-adventure.png');
        }
    }, {
        key: 'create',
        value: function create() {

            //  By this point the preloader assets have loaded to the cache, we've set the game settings
            //  So now let's start the real preloader going
            this.state.start('Preloader');
        }
    }]);

    return Boot;
}(Phaser.State);

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = exports.Game = function (_Phaser$State) {
    _inherits(Game, _Phaser$State);

    function Game() {
        _classCallCheck(this, Game);

        return _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).apply(this, arguments));
    }

    _createClass(Game, [{
        key: 'create',
        value: function create() {
            this.jumpTimer = 0;
            this.jumpCount = 0;
            this.playerSize = 0.10;

            // Get the largest width and height values
            var tileSpriteWidth = Math.max(this.game.cache.getImage('background').width, this.game.world.width);
            var tileSpriteHeight = Math.max(this.game.cache.getImage('background').height, this.game.world.height);
            this.bg = this.add.tileSprite(0, 0, tileSpriteWidth, tileSpriteHeight, 'background');

            this.map = this.game.add.tilemap('base_level');
            this.map.addTilesetImage('small_tiles');
            this.map.addTilesetImage('all_tiles');
            this.map.addTilesetImage('crate');
            this.map.addTilesetImage('chest');
            this.map.createLayer('trees');
            this.groundLayer = this.map.createLayer('ground');
            // this.groundLayer.debug = true;
            this.groundLayer.resizeWorld();

            this.map.setCollisionBetween(0, 1033, true, 'ground');

            // Create the treasures group
            this.treasures = this.game.add.group();
            this.treasures.enableBody = true;

            // Display Treasures
            this.map.createFromObjects('collision', 6, 'chest', false, true, false, this.treasures);

            this.player = this.game.add.sprite(90, 500, 'player');
            this.player.anchor.setTo(0.5, 0.5);
            this.player.scale.setTo(this.playerSize, this.playerSize);

            // Used https://www.leshylabs.com/apps/sstool/ to generate Atlas Map
            this.player.animations.add('walk', Phaser.Animation.generateFrameNames('Walk', 1, 10), 8, true);
            this.player.animations.add('run', Phaser.Animation.generateFrameNames('Run', 1, 10), 8, true);
            this.player.animations.add('idle', Phaser.Animation.generateFrameNames('Idle', 1, 10), 4, true);
            this.player.animations.add('attack', Phaser.Animation.generateFrameNames('Attack', 1, 10), 12, false);
            this.player.animations.add('jump', Phaser.Animation.generateFrameNames('Jump', 1, 10), 8, false);
            this.player.animations.add('dead', Phaser.Animation.generateFrameNames('Dead', 1, 10), 8, false);

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 500;

            this.player.enableBody = true;
            this.player.body.allowGravity = true;
            this.player.body.drag.set(30);
            this.player.body.maxVelocity.set(500);
            this.player.body.width = 50;
            this.player.body.height = 60;

            // Until I figure out how to set collision with polylines from Tiled, use this hack where I create a static null
            // Sprite, from which I can check overlaps with
            this.seaCollision = this.game.add.sprite(0, 0, null);
            this.game.physics.enable(this.seaCollision, Phaser.Physics.ARCADE);
            this.seaCollision.enableBody = true;
            this.seaCollision.body.allowGravity = false;
            this.seaCollision.body.immovable = true;
            this.seaCollision.body.moves = false;
            this.seaCollision.body.setSize(this.game.world.width, 210, 0, this.game.world.height - 216); // set the size of the rectangle

            this.game.camera.follow(this.player);
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            var fullScreen = this.game.input.keyboard.addKey(Phaser.KeyCode.F);
            fullScreen.onDown.add(this.fullScreen, this);

            // initiate the modal class
            this.reg = {};
            this.reg.modal = new gameModal(this.game);
            this.createModals();
        }
    }, {
        key: 'update',
        value: function update() {
            this.game.world.wrap(this.player, 0, false, true, false);
            this.game.physics.arcade.collide(this.player, this.groundLayer);
            this.game.physics.arcade.collide(this.treasures, this.groundLayer);
            var overlap = this.game.physics.arcade.overlap(this.player, this.treasures, this.displayTreasure, null, this);
            if (!overlap) {
                this.hideVisibleModals();
            }
            this.game.physics.arcade.overlap(this.seaCollision, this.player, this.sea_player_collision, null, this);
            this.move_player();
        }

        // Create a custom modal for every project

    }, {
        key: 'createModals',
        value: function createModals() {
            var rubyAdventureOffsetY = -(this.game.height / 4) + this.game.cache.getImage('ruby_adventure_cover').height / 4;
            this.reg.modal.createModal({
                type: "Ruby Adventure",
                includeBackground: true,
                modalCloseOnInput: true,
                itemsArr: [{
                    type: "text",
                    content: 'Ruby Adventure',
                    fontSize: 42,
                    color: "0xFFFFFF",
                    stroke: "0xCC0000",
                    strokeThickness: 6,
                    offsetY: rubyAdventureOffsetY + 180
                }, {
                    type: "text",
                    content: this.wrapText('An interactive CLI game that can be thought of as a hybrid between a board game and a text-based RPG game where the player can fight monsters, unlock treasures and shop around for various weapons, armor and items.'),
                    fontSize: 32,
                    color: "0xFFFFFF",
                    offsetY: rubyAdventureOffsetY + 320
                }, {
                    type: "image",
                    content: "ruby_adventure_cover",
                    offsetY: rubyAdventureOffsetY,
                    contentScale: 0.5,
                    callback: function callback() {
                        window.open("http://www.damianlajara.com/projects/3", 'Ruby Adventure Project');
                    }
                }]
            });
        }

        // Wraps the text once it reaches a specified width.

    }, {
        key: 'wrapText',
        value: function wrapText(text) {
            var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.game.world.width;
            var fontSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 32;

            var regExp = new RegExp("([\\w\\s,-]{" + width / fontSize + ",}?\\w)\\s?\\b", "g");
            return text.replace(regExp, "$1\n");
        }

        // Show the modal on the screen

    }, {
        key: 'showModal',
        value: function showModal(type) {
            this.reg.modal.showModal(type);
        }

        // Since these are usually called in collision callbacks, we have no way of knowing the name of the modal
        // Therefore find all 'visible' modals, which would only be one at a time, and hide it

    }, {
        key: 'hideVisibleModals',
        value: function hideVisibleModals() {
            var modals = this.game.modals;
            var visibleModals = Object.keys(modals).map(function (key) {
                var modal = modals[key];
                if (modal.alive && modal.visible == true) {
                    return key.toString();
                } else {
                    return null;
                }
            }, this).filter(function (name) {
                return name != null;
            });
            visibleModals.forEach(function (visibleModal) {
                this.hideModal(visibleModal);
            }, this);
        }

        // Hide the modal

    }, {
        key: 'hideModal',
        value: function hideModal(type) {
            this.reg.modal.hideModal(type);
        }
    }, {
        key: 'fullScreen',
        value: function fullScreen() {
            if (this.game.scale.isFullScreen) {
                this.game.scale.stopFullScreen();
            } else {
                this.game.scale.startFullScreen(false);
            }
        }
    }, {
        key: 'displayTreasure',
        value: function displayTreasure(player, treasure) {
            player.animations.play('attack');
            if (treasure.name != '') {
                this.showModal(treasure.name);
            }
        }
    }, {
        key: 'disableCursors',
        value: function disableCursors() {
            this.cursors.left.enabled = false;
            this.cursors.down.enabled = false;
            this.cursors.up.enabled = false;
            this.cursors.right.enabled = false;
        }
    }, {
        key: 'enableCursors',
        value: function enableCursors() {
            this.cursors.left.enabled = true;
            this.cursors.down.enabled = true;
            this.cursors.up.enabled = true;
            this.cursors.right.enabled = true;
        }

        // Alias method

    }, {
        key: 'resetCursors',
        value: function resetCursors() {
            this.enableCursors();
        }
    }, {
        key: 'sea_player_collision',
        value: function sea_player_collision(sea, player) {
            console.log("Player fell into the sea!");
            this.disableCursors();
            player.animations.play('dead');
            player.body.velocity.y = -330;

            // Wait about a second for the animation to finish then reset the player's position
            player.game.time.events.add(1200, function () {
                player.reset(90, 500);
                player.animations.play('idle');
                this.resetCursors();
            }, this);
        }
    }, {
        key: 'move_player',
        value: function move_player() {
            // TODO: Implement Running Functionality
            this.player.body.velocity.x = 0;

            if (this.cursors.left.isDown) {
                this.player.body.acceleration.x = -50;
                this.player.body.velocity.x = -150;

                if (this.facing != 'left') {
                    this.facing = 'left';
                    this.player.scale.setTo(-this.playerSize, this.playerSize);
                    this.player.animations.play('walk');
                }
            } else if (this.cursors.right.isDown) {
                this.player.body.acceleration.x = 150;
                this.player.body.velocity.x = 150;

                if (this.facing != 'right') {
                    this.facing = 'right';
                    this.player.scale.setTo(this.playerSize, this.playerSize);
                    this.player.animations.play('walk');
                }
            } else {
                if (this.facing != 'idle') {
                    this.player.animations.play('idle');

                    if (this.facing == 'left') {
                        this.player.scale.setTo(-this.playerSize, this.playerSize);
                    } else {
                        this.player.scale.setTo(this.playerSize, this.playerSize);
                    }
                    this.facing = 'idle';
                }
            }

            if (this.jumpButton.isDown) {
                if (this.player.body.onFloor() && this.game.time.now > this.jumpTimer) {
                    this.jumpCount = 0; // Reset count every time we touch the floor
                    this.player.animations.play('jump');
                    this.player.body.velocity.y = -290;
                    this.jumpTimer = this.game.time.now + 350;
                    this.jumpCount += 1;
                } else if (!this.player.body.onFloor() && this.game.time.now > this.jumpTimer && this.jumpCount < 2) {
                    this.player.animations.play('jump');
                    this.player.body.velocity.y = -310;
                    this.jumpCount += 1;
                }
            }
        }
    }, {
        key: 'resize',
        value: function resize(width, height) {
            //	If the game container is resized this function will be called automatically.
            //	You can use it to align sprites that should be fixed in place and other responsive display things.
            this.bg.width = this.game.world.width;
            this.bg.height = this.game.world.height;
        }
    }, {
        key: 'render',
        value: function render() {
            // DEBUG INFO
            // this.game.debug.body(this.player);
            // this.game.debug.body(this.seaCollision);
            // this.game.debug.body(this.groundLayer);

            // this.game.debug.inputInfo(32, 32);
            // this.game.debug.text('Game Width:' + this.game.width, 33, 118);
            // this.game.debug.text('Game World Width:' + this.game.world.width, 33, 136);
            // this.game.debug.text('Window Width:' + document.body.offsetWidth, 33, 156);
            // this.game.debug.text('Ground Layer Width:' + this.groundLayer.width, 33, 176);
            //
            // this.game.debug.text('Game Height:' + this.game.height, 33, 196);
            // this.game.debug.text('Game World Height:' + this.game.world.height, 33, 216);
            // this.game.debug.text('Window Height:' + document.body.offsetHeight, 33, 236);
            // this.game.debug.text('Ground Layer Height:' + this.groundLayer.height, 33, 256);
        }
    }]);

    return Game;
}(Phaser.State);

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainMenu = exports.MainMenu = function (_Phaser$State) {
    _inherits(MainMenu, _Phaser$State);

    function MainMenu() {
        _classCallCheck(this, MainMenu);

        return _possibleConstructorReturn(this, (MainMenu.__proto__ || Object.getPrototypeOf(MainMenu)).apply(this, arguments));
    }

    _createClass(MainMenu, [{
        key: 'create',
        value: function create() {
            var _this2 = this;

            var background = this.add.sprite(0, 0, 'background');
            var me = this.add.sprite(this.game.world.centerX - 25, this.game.world.centerY - 240, 'me_semiround');

            var textStyle = { font: '45px Arial', alight: 'center', stroke: 'green', strokeThickness: 3, fill: 'white' };

            var title = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, "Welcome to Damian's Interactive Portfolio", textStyle);
            title.anchor.set(0.5);

            textStyle.font = '36px Arial';

            var instructions = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 10, 'Press "enter" to start', textStyle);
            instructions.anchor.set(0.5);

            var controlMessage = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 70, 'use arrow keys to move', textStyle);

            controlMessage.anchor.set(0.5);

            var muteMessage = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 155, '"SPACEBAR" to jump.', textStyle);
            muteMessage.anchor.set(0.5);

            var sKey = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
            sKey.onDown.addOnce(function () {
                return _this2.state.start('Game');
            }, this);
        }
    }]);

    return MainMenu;
}(Phaser.State);

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Preloader = exports.Preloader = function (_Phaser$State) {
  _inherits(Preloader, _Phaser$State);

  function Preloader() {
    _classCallCheck(this, Preloader);

    return _possibleConstructorReturn(this, (Preloader.__proto__ || Object.getPrototypeOf(Preloader)).apply(this, arguments));
  }

  _createClass(Preloader, [{
    key: 'preload',
    value: function preload() {

      // //	These are the assets we loaded in Boot.js
      // //	A nice sparkly background and a loading progress bar
      //
      // this.background = this.add.sprite(0, 0, 'preloaderBackground');
      // this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');
      //
      // //	This sets the preloadBar sprite as a loader sprite.
      // //	What that does is automatically crop the sprite from 0 to full-width
      // //	as the files below are loaded in.
      //
      // this.load.setPreloadSprite(this.preloadBar);
      //
      // //	Here we load the rest of the assets our game needs.
      // //	You can find all of these assets in the Phaser Examples repository
      //
      // this.load.image('tetris1', 'assets/sprites/tetrisblock1.png');
      // this.load.image('tetris2', 'assets/sprites/tetrisblock2.png');
      // this.load.image('tetris3', 'assets/sprites/tetrisblock3.png');
      // this.load.image('hotdog', 'assets/sprites/hotdog.png');
      // this.load.image('starfield', 'assets/skies/deep-space.jpg');
    }
  }, {
    key: 'create',
    value: function create() {
      this.state.start('MainMenu');
    }
  }]);

  return Preloader;
}(Phaser.State);

},{}]},{},[1])
//# sourceMappingURL=game_bundle.js.map
