import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  jumpTimer: number = 0;
  jumpCount: number = 0;
  playerSize: number = 0.1;
  player: Phaser.GameObjects.Sprite;

  preload() {
    var textStyle = {
      font: "45px Arial",
      alight: "center",
      stroke: "blue",
      fill: "blue",
    };

    this.add.text(80, 150, "loading...", textStyle);
    this.load.atlas(
      "player",
      "../assets/sprites/player/full_player.png",
      "assets/sprites/player/full_player.json"
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
    this.player = this.physics.add
      .sprite(90, 500, "player")
      .setOrigin(0.5, 0.5)
      .setBounce(1, 1)
      .setCollideWorldBounds(true)
      .setMaxVelocity(500)
      .setDrag(30)
      .setBodySize(50, 60);

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
}
