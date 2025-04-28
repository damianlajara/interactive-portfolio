import Phaser from 'phaser';

export class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  create() {
    // Get screen dimensions
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background
    this.add
      .image(width / 2, height / 2, 'background')
      .setOrigin(0.5)
      .setScale(Math.max(width / 1600, height / 900));

    // Character image
    this.add.image(width / 2 - 25, height / 2 - 240, 'me_semiround');

    // Title style
    const titleStyle = {
      font: '45px Arial',
      align: 'center',
      stroke: 'green',
      strokeThickness: 3,
      fill: 'white',
    };

    // Instruction style
    const instructionStyle = {
      font: '36px Arial',
      align: 'center',
      stroke: 'green',
      strokeThickness: 3,
      fill: 'white',
    };

    // Add title and instructions
    this.add
      .text(
        width / 2,
        height / 2 - 100,
        "Welcome to Damian's Interactive Portfolio",
        titleStyle,
      )
      .setOrigin(0.5);

    this.add
      .text(
        width / 2,
        height / 2 - 10,
        'Press "enter" to start',
        instructionStyle,
      )
      .setOrigin(0.5);

    this.add
      .text(
        width / 2,
        height / 2 + 70,
        'use arrow keys to move',
        instructionStyle,
      )
      .setOrigin(0.5);

    this.add
      .text(
        width / 2,
        height / 2 + 155,
        '"SPACEBAR" to jump.',
        instructionStyle,
      )
      .setOrigin(0.5);

    // Set up keyboard input to start game
    this.input.keyboard.once('keydown-ENTER', () => {
      this.scene.start('Game');
    });

    // Add keyboard input for full screen toggle
    this.input.keyboard.on('keydown-F', () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    });
  }
}
