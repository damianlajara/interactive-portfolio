import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  jumpTimer: number = 0;
  jumpCount: number = 0;
  playerSize: number = 0.1;
  player?: Phaser.Physics.Arcade.Sprite;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  facing: "left" | "right" = "right";

  constructor() {
    super({
      key: "Game",
    });
  }

  preload() {
    this.load.atlas(
      "player",
      "../assets/sprites/player/full_player.png",
      "../assets/sprites/player/full_player.json"
    );
    // this.game.load.spritesheet('player', '/assets/sprites/player/player.png', 587, 707, 40);

    // Load all the Game Assets
    this.load.tilemapTiledJSON("base_level", "../assets/base_level.json");
    this.load.image("background", "../assets/images/bg/background.png");
    this.load.image("me_semiround", "../assets/images/me_semiround.png");

    this.load.image("small_tiles", "../assets/tile_sets/small_tiles.png");
    this.load.image("chest", "../assets/tile_sets/chest.png");
    this.load.image("crate", "../assets/tile_sets/crate.png");
    this.load.image("all_tiles", "../assets/tile_sets/ground_tiles.png");

    this.load.image(
      "ruby_adventure_cover",
      "../assets/images/covers/ruby-adventure.png"
    );
  }

  create() {
    this.physics.world.setBounds(0, 0, 800, 560);
    this.player = this.physics.add
      .sprite(90, 500, "player")
      .setOrigin(1, 1)
      .setBounce(0.1, 0.2)
      .setCollideWorldBounds(true)
      .setMaxVelocity(500)
      .setDrag(30)
      .setBodySize(50, 60)
      .setScale(0.1);

    this.cursors = this?.input?.keyboard?.createCursorKeys();

    this._createAnimations();
  }

  update() {
    this._move_player();
  }

  _createAnimations() {
    // Used https://www.leshylabs.com/apps/sstool/ to generate Atlas Map
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNames("player", {
        prefix: "Walk",
        start: 1,
        end: 10,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNames("player", {
        prefix: "Run",
        start: 1,
        end: 10,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNames("player", {
        prefix: "Idle",
        start: 1,
        end: 10,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNames("player", {
        prefix: "Attack",
        start: 1,
        end: 10,
      }),
      frameRate: 8,
      repeat: 0,
    });

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNames("player", {
        prefix: "Jump",
        start: 1,
        end: 10,
      }),
      frameRate: 8,
      repeat: 0,
    });

    this.anims.create({
      key: "dead",
      frames: this.anims.generateFrameNames("player", {
        prefix: "Dead",
        start: 1,
        end: 10,
      }),
      frameRate: 8,
      repeat: 0,
    });
  }

  _move_player() {
    const { left, right, space } = this.cursors || {};
    this.player?.setVelocityX(0);
    if (left?.isDown) {
      this._moveLeft();
    } else if (right?.isDown) {
      this._moveRight();
    } else if (space?.isDown) {
      this._jump();
    } else {
      this.player?.anims.play("idle", true);
      this.player?.setAccelerationX(0);
      this.player?.setVelocityX(0);
    }
  }

  _moveRight() {
    if (this.facing !== "right") {
      this.facing = "right";
      this.player?.toggleFlipX();
    }
    this.player?.anims.play("walk", true);
    this.player?.setAccelerationX(50);
    this.player?.setVelocityX(150);
    // Allow user to jump while moving
    if (this.cursors?.space?.isDown) this._jump();
  }

  _moveLeft() {
    if (this.facing !== "left") {
      this.facing = "left";
      this.player?.toggleFlipX();
    }
    this.player?.anims.play("walk", true);
    this.player?.setAccelerationX(-50);
    this.player?.setVelocityX(-150);
    // Allow user to jump while moving
    if (this.cursors?.space?.isDown) this._jump();
  }

  _jump() {
    if (this.player?.body?.blocked.down && this.time.now > this.jumpTimer) {
      this.jumpCount = 0; // Reset count every time we touch the floor
      this.player?.anims.play("jump");
      this.player?.setVelocityY(-290);
      this.jumpTimer = this.time.now + 350;
      this.jumpCount += 1;
    } else if (
      !this.player?.body?.blocked.down &&
      this.time.now > this.jumpTimer &&
      this.jumpCount < 2
    ) {
      this.player?.anims.play("jump");
      this.player?.setVelocityY(-310);
      this.jumpCount += 1;
    }
  }
}
