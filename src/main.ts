import "./style.css";

import Phaser from "phaser";

import MainMenu from "./scenes/MainMenu";
import Game from "./scenes/Game";

const config = {
  type: Phaser.AUTO,
  parent: "app",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: true,
    },
  },
  scene: [MainMenu, Game],
};

export default new Phaser.Game(config);
