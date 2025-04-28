import Phaser from 'phaser';
import { Boot } from './states/Boot';
import { Game } from './states/Game';
import { MainMenu } from './states/MainMenu';
import { Preloader } from './states/Preloader';

export class MainGame {
  constructor() {
    const config = {
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'portfolio_game',
        width: 1600,
        height: 900,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 500 },
          debug: false,
        },
      },
      scene: [Boot, Preloader, MainMenu, Game],
    };

    const game = new Phaser.Game(config);

    // Dispatch an event when the game is ready
    game.events.once('ready', () => {
      window.dispatchEvent(new Event('phaser-ready'));
    });

    return game;
  }
}
