export class MainMenu extends Phaser.State {
    create() {
        let background = this.add.sprite(0, 0, 'background');
        let me = this.add.sprite(this.game.world.centerX - 25, this.game.world.centerY - 240, 'me_semiround');

        let textStyle = {font: '45px Arial', alight: 'center', stroke: 'green', strokeThickness: 3, fill: 'white'};

        let title = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, "Welcome to Damian's Interactive Portfolio", textStyle);
        title.anchor.set(0.5);

        textStyle.font = '36px Arial';

        let instructions = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 10, 'Press "enter" to start', textStyle);
        instructions.anchor.set(0.5);

        let controlMessage = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 70, 'use arrow keys to move', textStyle);

        controlMessage.anchor.set(0.5);

        let muteMessage = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 155, '"SPACEBAR" to jump.', textStyle);
        muteMessage.anchor.set(0.5);

        let sKey = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        sKey.onDown.addOnce( () => this.state.start('Game'), this);
    }
}
