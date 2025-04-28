import Phaser from 'phaser';

export class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  init() {
    // Initialize input
    this.input.maxPointers = 1;
  }

  preload() {
    // Load basic assets needed for loading screen
    this.load.image('background', 'assets/images/bg/background.png');
  }

  create() {
    // Preload all game assets
    this.load.atlas(
      'player',
      'assets/sprites/player/full_player.png',
      'assets/sprites/player/full_player.json',
    );
    this.load.image('me_semiround', 'assets/images/me_semiround.png');
    this.load.tilemapTiledJSON('base_level', 'assets/base_level.json');
    this.load.image('small_tiles', 'assets/tile_sets/small_tiles.png');
    this.load.image('chest', 'assets/tile_sets/chest.png');
    this.load.image('crate', 'assets/tile_sets/crate.png');
    this.load.image('all_tiles', 'assets/tile_sets/ground_tiles.png');
    this.load.image(
      'ruby_adventure_cover',
      'assets/images/covers/ruby-adventure.png',
    );

    // Start preloader scene when loading completes
    this.load.on('complete', () => {
      this.scene.start('Preloader');
    });

    // Start loading
    this.load.start();
  }
}
