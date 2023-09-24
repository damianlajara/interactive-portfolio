import Phaser from "phaser";

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super({
      key: "MainMenu",
    });
  }

  create() {
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;

    this.add.sprite(0, 0, "background");
    this.add.sprite(screenCenterX - 25, screenCenterY - 240, "me_semiround");

    const textStyle = {
      font: "36px Arial",
      alight: "center",
      strokeThickness: 1,
      fill: "white",
    };

    const title = this.add.text(
      screenCenterX,
      screenCenterY - 100,
      "Welcome to Damian's Interactive Portfolio",
      textStyle
    );
    title.setOrigin(0.5);

    textStyle.font = "36px Arial";

    const instructions = this.add.text(
      screenCenterX,
      screenCenterY - 10,
      'Press "enter" to start',
      textStyle
    );
    instructions.setOrigin(0.5);

    const controlMessage = this.add.text(
      screenCenterX,
      screenCenterY + 70,
      "use arrow keys to move",
      textStyle
    );

    controlMessage.setOrigin(0.5);

    const muteMessage = this.add.text(
      screenCenterX,
      screenCenterY + 155,
      '"SPACEBAR" to jump.',
      textStyle
    );
    muteMessage.setOrigin(0.5);

    const enter = this?.input?.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    enter?.on(
      "down",
      () => {
        this.scene.start("Game");
      },
      this
    );
  }
}
