
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.bg;
    this.cursors;
    this.player;
    this.jumpButton;
    this.jumpTimer = 0;
    this.jumpCount = 0;
    this.map;
    this.groundLayer;
    this.playerSize = 0.10;
    this.treasures;
    this.seaCollision

};

BasicGame.Game.prototype = {

    create: function () {
        this.bg = this.add.tileSprite(0, 0, this.game.world.width * 4, this.game.world.height, 'background');

        this.map = this.game.add.tilemap('base_level');
        this.map.addTilesetImage('small_tiles');
        this.map.addTilesetImage('all_tiles');
        this.map.addTilesetImage('crate');
        this.map.addTilesetImage('chest');
        this.map.createLayer('trees');
        this.groundLayer = this.map.createLayer('ground');
        // console.log("Ground Layer: ", this.groundLayer);
        this.groundLayer.debug = true;
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
        this.game.physics.arcade.setBoundsToWorld();
        this.game.world.setBounds(0, 0, this.game.world.width, this.game.world.height);

        this.player.enableBody = true;
        this.player.body.allowGravity=true;
        this.player.body.drag.set(30);
        this.player.body.maxVelocity.set(500);
        this.player.body.width = 50;
        this.player.body.height = 60;

        // Until I figure out how to set collision with polylines from Tiled, use this hack where I create a static null
        // Sprite, from which I can check overlaps with
        this.seaCollision = this.game.add.sprite(0, 0, null);
        this.game.physics.enable(this.seaCollision, Phaser.Physics.ARCADE);
        this.seaCollision.enableBody = true;
        this.seaCollision.body.allowGravity=false;
        this.seaCollision.body.immovable = true;
        this.seaCollision.body.moves = false;
        this.seaCollision.body.setSize(this.game.world.width, 210, 0, this.game.world.height - 216); // set the size of the rectangle

        this.game.camera.follow(this.player);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        var fullScreen = this.game.input.keyboard.addKey(Phaser.KeyCode.F);
        fullScreen.onDown.add(this.fullScreen, this);

    },

    update: function () {
        this.game.world.wrap(this.player, 0, false, true, false);
        this.game.physics.arcade.collide(this.player, this.groundLayer);
        this.game.physics.arcade.collide(this.treasures, this.groundLayer);
        this.game.physics.arcade.overlap(this.player, this.treasures, this.displayTreasure, null, this);
        this.game.physics.arcade.overlap(this.seaCollision, this.player, this.sea_player_collision, null, this);
        this.move_player();
    },

    fullScreen: function() {
        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
        } else {
            this.game.scale.startFullScreen(false);
        }
    },

    displayTreasure: function(player, treasure) {
        console.log(treasure.name);
        player.animations.play('attack');
    },

    disableCursors: function() {
        this.cursors.left.enabled = false;
        this.cursors.down.enabled = false;
        this.cursors.up.enabled = false;
        this.cursors.right.enabled = false;
    },

    enableCursors: function() {
        this.cursors.left.enabled = true;
        this.cursors.down.enabled = true;
        this.cursors.up.enabled = true;
        this.cursors.right.enabled = true;
    },

    // Alias method
    resetCursors: function() {
      this.enableCursors();
    },

    sea_player_collision: function(sea, player) {
        console.log("Player fell into the sea!");
        this.disableCursors();
        player.animations.play('dead');
        player.body.velocity.y = -330;

        // Wait about a second for the animation to finish then reset the player's position
        player.game.time.events.add(1200, function() {
            player.reset(90, 500);
            player.animations.play('idle');
            this.resetCursors();
        }, this);
    },

    move_player: function() {
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
            } else if ((!this.player.body.onFloor()) && this.game.time.now > this.jumpTimer && this.jumpCount < 2) {
                this.player.animations.play('jump');
                this.player.body.velocity.y = -310;
                this.jumpCount += 1;
            }
        }
    },

    resize: function (width, height) {

        //	If the game container is resized this function will be called automatically.
        //	You can use it to align sprites that should be fixed in place and other responsive display things.

        this.bg.width = this.game.world.width;
        this.bg.height = height;
    },

    render: function() {

        this.game.debug.body(this.player);
        this.game.debug.body(this.seaCollision);
        this.game.debug.body(this.groundLayer);
        this.game.debug.text('Game Width:' + this.game.width, 33, 118);
        this.game.debug.text('Ground Layer Width:' + this.groundLayer.width, 33, 136);
        this.game.debug.text('Game World Width:' + this.game.world.width, 33, 156);
        this.game.debug.inputInfo(32, 32);
    }

};
