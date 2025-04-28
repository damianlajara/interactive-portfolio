import Phaser from 'phaser';

export class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }

  create() {
    // Create player animations
    this.createAnimations();

    // Continue to main menu
    this.scene.start('MainMenu');
  }

  createAnimations() {
    // Create all player animations
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('player', {
        prefix: 'Walk',
        start: 1,
        end: 10,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNames('player', {
        prefix: 'Run',
        start: 1,
        end: 10,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('player', {
        prefix: 'Idle',
        start: 1,
        end: 10,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNames('player', {
        prefix: 'Attack',
        start: 1,
        end: 10,
      }),
      frameRate: 12,
      repeat: 0,
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNames('player', {
        prefix: 'Jump',
        start: 1,
        end: 10,
      }),
      frameRate: 8,
      repeat: 0,
    });

    this.anims.create({
      key: 'dead',
      frames: this.anims.generateFrameNames('player', {
        prefix: 'Dead',
        start: 1,
        end: 10,
      }),
      frameRate: 8,
      repeat: 0,
    });
  }
}
