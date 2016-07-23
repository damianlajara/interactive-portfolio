
BasicGame.MainMenu = function (game) {

	this.bg;
	this.cursors;
	this.player;
	// this.spriteTopLeft;
	// this.spriteTopRight;
	// this.spriteBottomLeft;
	// this.spriteBottomRight;

};

BasicGame.MainMenu.prototype = {

	create: function () {

        this.bg = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
		this.player = this.game.add.sprite(90, 500, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		this.player.scale.setTo(0.18, 0.18);
		this.player.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 4, true);
		this.player.animations.add('walk', [27, 29, 31, 33, 34, 35, 36, 37, 39, 38], 8, true);
		this.player.animations.add('run', [18, 21, 22, 23, 24, 25, 26, 28, 30 , 32], 8, true);
		this.player.animations.add('jump', [10, 11, 14, 12, 13, 15, 16, 17, 19 , 20], 8, true);



		this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.enableBody = true;
		this.player.body.allowGravity=true;
		this.player.body.drag.set(100);
		this.player.body.maxVelocity.set(500);
		this.player.body.collideWorldBounds = true;

		this.player.body.width -= 32;
		this.player.body.height -= 32;

		this.game.camera.follow(this.player);
        // this.spriteTopLeft = this.add.sprite(0, 0, 'tetris3');
        //
        // this.spriteTopRight = this.add.sprite(this.game.width, 0, 'tetris1');
        // this.spriteTopRight.anchor.set(1, 0);
        //
        // this.spriteBottomLeft = this.add.sprite(0, this.game.height, 'tetris2');
        // this.spriteBottomLeft.anchor.set(0, 1);
        //
        // this.spriteBottomRight = this.add.sprite(this.game.width, this.game.height, 'tetris3');
        // this.spriteBottomRight.anchor.set(1, 1);
        //
        // this.spriteMiddle = this.add.sprite(0, 0, 'hotdog');
		this.cursors = this.game.input.keyboard.createCursorKeys();

	},

	update: function () {

		//	Do some nice funky main menu effect here
		if (this.cursors.left.isDown) {

			this.player.body.acceleration.x = -300;
			this.player.animations.play('run');

		} else if (this.cursors.up.isDown) {

			this.player.body.acceleration.y = -300;
			this.player.animations.play('jump');

		} else if (this.cursors.right.isDown) {

			this.player.body.acceleration.x = 300;
			this.player.animations.play('walk');

		} else {

			this.player.body.acceleration.x = 0;
			this.player.body.acceleration.y = 0;
			this.player.animations.play('idle');
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
