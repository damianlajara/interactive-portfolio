
BasicGame.MainMenu = function (game) {

	this.bg;
	this.cursors;
	this.player;

};

BasicGame.MainMenu.prototype = {

	create: function () {

        this.bg = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
		this.player = this.game.add.sprite(90, 500, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		this.player.scale.setTo(0.18, 0.18);
		this.player.animations.add('idle', [ 1, 5, 7, 8, 2, 9, 14, 15, 3, 16 ], 3, true);
		this.player.animations.add('walk', [ 31, 32, 33, 13, 20, 35, 36, 37, 39, 38 ], 8, true);
		this.player.animations.add('run',  [ 18, 0, 12, 26, 28, 29, 30, 6, 27 , 34 ], 8, true);
		this.player.animations.add('jump', [ 10, 17, 21, 22, 23, 24, 4, 11, 25 , 19 ], 8, true);



		this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.enableBody = true;
		this.player.body.allowGravity=true;
		this.player.body.drag.set(40);
		this.player.body.maxVelocity.set(500);
		this.player.body.collideWorldBounds = true;
		this.player.body.width = 90;
		this.player.body.height = 120;

		this.game.camera.follow(this.player);
		this.cursors = this.game.input.keyboard.createCursorKeys();

	},

	update: function () {

		//	Do some nice funky main menu effect here
		if (this.cursors.left.isDown) {

			this.player.body.acceleration.x = -40;
			this.move_player();
			// this.player.animations.play('run');

		} else if (this.cursors.up.isDown) {

			this.player.body.acceleration.y = -40;
			this.player.animations.play('jump');

		} else if (this.cursors.right.isDown) {

			this.player.body.acceleration.x = 40;
			this.move_player();
			// this.player.animations.play('walk');

		} else {
			this.player.body.acceleration.x = 0;
			this.player.body.acceleration.y = 0;
			this.move_player();
			// this.player.animations.play('idle');
		}

	},

	move_player: function() {
		if(this.player.body.acceleration.x == 0 && this.player.body.acceleration.y == 0) {
			this.player.animations.play('idle');
		} else if (this.player.body.acceleration.y < 200 || (this.player.body.acceleration.x < 200 || this.player.body.acceleration.x > 200)) {
			this.player.animations.play('run');
		} else {
			this.player.animations.play('walk');
		}
	},

	resize: function (width, height) {

		//	If the game container is resized this function will be called automatically.
		//	You can use it to align sprites that should be fixed in place and other responsive display things.

	    this.bg.width = width;
	    this.bg.height = height;

	    // this.spriteMiddle.x = this.game.world.centerX;
	    // this.spriteMiddle.y = this.game.world.centerY;
        //
	    // this.spriteTopRight.x = this.game.width;
	    // this.spriteBottomLeft.y = this.game.height;
        //
	    // this.spriteBottomRight.x = this.game.width;
	    // this.spriteBottomRight.y = this.game.height;

	},

	render: function() {

		this.game.debug.body(this.player);
		this.game.debug.inputInfo(32, 32);
	}

};
