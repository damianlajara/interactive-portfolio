
BasicGame.MainMenu = function (game) {

	this.bg;
	this.cursors;
	this.player;
	this.jumpButton;
	this.jumpTimer = 0;
	this.map;
	this.groundLayer;
	this.playerSize = 0.10;

};

BasicGame.MainMenu.prototype = {

	create: function () {
        this.bg = this.add.tileSprite(0, 0, this.game.world.width * 4, this.game.height, 'background');
		this.map = this.game.add.tilemap('base_level');
		this.map.addTilesetImage('small_tiles');
		this.map.addTilesetImage('chest');
		this.map.addTilesetImage('all_tiles');
		this.map.createLayer('trees');
		this.groundLayer = this.map.createLayer('ground');
		this.groundLayer.debug = true;
		this.groundLayer.resizeWorld();

		this.map.setCollisionBetween(0, 700, true, 'ground');
		this.player = this.game.add.sprite(90, 500, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		this.player.scale.setTo(this.playerSize, this.playerSize);
		this.player.animations.add('idle', [ 1, 5, 7, 8, 2, 9, 14, 15, 3, 16 ], 4, true);
		this.player.animations.add('walk', [ 31, 32, 33, 13, 20, 35, 36, 37, 39, 38 ], 8, true);
		this.player.animations.add('run',  [ 18, 0, 12, 26, 28, 29, 30, 6, 27 , 34 ], 8, true);
		this.player.animations.add('jump', [ 10, 17, 21, 22, 23, 24, 4, 11, 25 , 19 ], 8, false);


		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 500;

		this.player.enableBody = true;
		this.player.body.allowGravity=true;
		this.player.body.drag.set(30);
		this.player.body.maxVelocity.set(500);
		// this.player.body.collideWorldBounds = true;
		this.player.body.width = 50;
		this.player.body.height = 60;

		this.game.camera.follow(this.player);
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	},

	update: function () {
		this.game.physics.arcade.collide(this.player, this.groundLayer);
		this.move_player();
		this.game.world.wrap(this.player, 0, false, true, false);
	},

	move_player: function() {
		// Implement Running Functionality
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

		if (this.jumpButton.isDown && this.player.body.onFloor() && this.game.time.now > this.jumpTimer) {
				this.player.animations.play('jump');
				this.player.body.velocity.y = -390;
				this.jumpTimer = this.game.time.now + 750;
		}
	},

	resize: function (width, height) {

		//	If the game container is resized this function will be called automatically.
		//	You can use it to align sprites that should be fixed in place and other responsive display things.

		this.bg.width = this.game.world.width;
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
		this.game.debug.body(this.groundLayer);
		this.game.debug.text('Game Width:' + this.game.width, 33, 118);
		this.game.debug.text('Ground Layer Width:' + this.groundLayer.width, 33, 136);
		this.game.debug.text('Game World Width:' + this.game.world.width, 33, 156);
		this.game.debug.inputInfo(32, 32);
	}

};





// this.player.body.velocity.x = 0;
//
// if (this.cursors.left.isDown)
// {
// 	this.player.body.acceleration.x = -50;
// 	this.player.body.velocity.x = -150;
//
//
// 	if (this.facing != 'left')
// 	{
// 		this.player.animations.play('left');
// 		this.facing = 'left';
// 	}
// }
// else if (this.cursors.right.isDown)
// {
// 	this.player.body.acceleration.x = 150;
// 	this.player.body.velocity.x = 150;
//
// 	if (this.facing != 'right')
// 	{
// 		this.player.animations.play('right');
// 		this.facing = 'right';
// 	}
// }
// else
// {
// 	if (this.facing != 'idle')
// 	{
// 		this.player.animations.stop();
//
// 		if (this.facing == 'left')
// 		{
// 			this.player.frame = 0;
// 		}
// 		else
// 		{
// 			this.player.frame = 5;
// 		}
//
// 		this.facing = 'idle';
// 	}
// }
//
// if (this.jumpButton.isDown && this.player.body.onFloor() && this.game.time.now > this.jumpTimer)
// {
// 	this.player.body.velocity.y = -250;
// 	this.jumpTimer = game.time.now + 750;
// }