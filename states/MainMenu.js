
BasicGame.MainMenu = function (game) {

	this.bg;
	this.cursors;
	this.player;
	this.jumpButton;
	this.jumpTimer = 0;
	this.map;
	this.groundLayer;
	this.playerSize = 0.10;
	this.floors;
	this.treasures;
	this.crates;
	this.playerCollisionGroup;
	this.treasureCollisionGroup;
	this.floorTilesCollisionGroup;

};

BasicGame.MainMenu.prototype = {

	create: function () {
		//  Enable P2
		this.game.physics.startSystem(Phaser.Physics.P2JS);

		//  Turn on impact events for the world, without this we get no collision callbacks
		this.game.physics.p2.setImpactEvents(true);

		this.game.physics.p2.restitution = 0;

		this.game.physics.p2.gravity.y = 500;

		this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.treasureCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.floorTilesCollisionGroup   = this.game.physics.p2.createCollisionGroup();

        this.bg = this.add.tileSprite(0, 0, this.game.world.width * 4, this.game.height, 'background');
		this.map = this.game.add.tilemap('base_level');
		this.map.addTilesetImage('small_tiles');
		this.map.addTilesetImage('chest');
		this.map.addTilesetImage('all_tiles');
		this.map.createLayer('trees');
		this.groundLayer = this.map.createLayer('ground');
		this.groundLayer.debug = true;
		this.groundLayer.resizeWorld();
		console.log(this.map.objects.collision);

		// this.game.physics.p2.convertTilemap(this.map, this.groundLayer);
		this.game.physics.p2.convertCollisionObjects(this.map, "collision", true);

		// this.map.setCollisionBetween(0, 700, true, 'ground');
		this.player = this.game.add.sprite(90, 500, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		this.player.scale.setTo(this.playerSize, this.playerSize);
		this.player.animations.add('idle', [ 1, 5, 7, 8, 2, 9, 14, 15, 3, 16 ], 4, true);
		this.player.animations.add('walk', [ 31, 32, 33, 13, 20, 35, 36, 37, 39, 38 ], 8, true);
		this.player.animations.add('run',  [ 18, 0, 12, 26, 28, 29, 30, 6, 27 , 34 ], 8, true);
		this.player.animations.add('jump', [ 10, 17, 21, 22, 23, 24, 4, 11, 25 , 19 ], 8, false);

		this.game.physics.p2.enable(this.player, true);

		// this.setFloorCollision();


		var collisionareas = [];
		var layer = "collision";
		for (var i = 0, len = this.map.collision[layer].length; i < len; i++)  {
			var object = this.map.collision[layer][i];
			var body = this.game.physics.p2.createBody(object.x, object.y, 0, true,  {} , object.polyline);
			body.properties = object.properties;
			if (body){
				body.debug = true;
				body.setCollisionGroup(this.floorTilesCollisionGroup);
				body.collides(this.playerCollisionGroup);
				collisionareas.push(body);
			}
		}

		// for (i=0; i<collisionareas.length; i++){
		// 	if (collisionareas[i].properties.action == 'ramp'){
		// 		collisionareas[i].onBeginContact.add(jumpOnRamp, this);
		// 	}
		// }
		console.log("COLLISION AREAS: ",collisionareas );



		this.player.body.setCollisionGroup(this.playerCollisionGroup);

		console.log(this.player.body);

		this.player.body.width = 50;
		this.player.body.height = 60;
		this.player.body.fixedRotation = true;

		// Create floors group
		this.floors = this.game.add.group();
		this.floors.enableBody = true;

		// Create the treasures group
		this.treasures = this.game.add.group();
		this.treasures.enableBody = true;

		// Create the crates group
		// this.crates = this.game.add.group();
		// this.crates.enableBody = true;

		// Display objects
		this.map.createFromObjects('collision', 6, 'floor', false, true, false, this.floors);
		this.map.createFromObjects('collision', 6, 'chest', false, true, false, this.treasures);
		// this.map.createFromObjects('collision', 1031, 'crate', false, true, false, this.crates);

		this.player.body.collides(this.treasureCollisionGroup, this.displayTreasure, this);
		this.player.body.collides(this.floorTilesCollisionGroup);

		this.game.camera.follow(this.player);
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	},

	update: function () {
		// this.game.physics.p2.collide(this.player, this.groundLayer);
		// this.game.physics.p2.collide(this.treasures, this.groundLayer);
		// this.game.physics.p2.overlap(this.player, this.treasures, this.displayTreasure, null, this);
		// this.game.physics.arcade.collide(this.crates, this.groundLayer);
		this.move_player();
		this.game.world.wrap(this.player, 0, false, true, false);
	},

	displayTreasure: function(player, treasure) {
		console.log(treasure.name);
	},

	setFloorCollision: function() {
		var tileObjects = this.getFloorTiles();
		for (var i = 0; i < tileObjects.length; i++) {
			var tileBody = tileObjects[i];
			console.log(tileBody);
			// tileBody.setCollisionGroup(this.floorTilesCollisionGroup);
			// tileBody.collides(this.playerCollisionGroup);
		}
	},
	getFloorTiles: function() {
		var filteredTiles = this.map.objects.collision.map(function(tile) {
			if(tile.type == "floor") {
				return tile;
			} else {
				return null;
			}
		});
		var floorTiles = filteredTiles.filter(function(n){ return n != undefined || n != null });
		console.log(floorTiles);
		return floorTiles;
	},

	touchingDown: function(someone) {
		var yAxis = p2.vec2.fromValues(0, 1);
		var result = false;
		for (var i = 0; i < this.game.physics.p2.world.narrowphase.contactEquations.length; i++) {
			var c = this.game.physics.p2.world.narrowphase.contactEquations[i];  // cycles through all the contactEquations until it finds our "someone"
			if (c.bodyA === someone.body.data || c.bodyB === someone.body.data)        {
				var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
				if (c.bodyA === someone.body.data) d *= -1;
				if (d > 0.5) result = true;
			}
		}
		return result;
	},

	move_player: function() {
		// Implement Running Functionality
		this.player.body.velocity.x = 0;

		if (this.cursors.left.isDown) {
			// this.player.body.acceleration.x = -50;
			this.player.body.velocity.x = -150;

			if (this.facing != 'left') {
				this.facing = 'left';
				this.player.scale.setTo(-this.playerSize, this.playerSize);
				this.player.animations.play('walk');
			}
		} else if (this.cursors.right.isDown) {
			// this.player.body.acceleration.x = 150;
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

		if (this.jumpButton.isDown && this.touchingDown(this.player) && this.game.time.now > this.jumpTimer) {
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

