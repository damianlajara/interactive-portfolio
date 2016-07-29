
BasicGame.MainMenu = function (game) {

};

BasicGame.MainMenu.prototype = {

    create: function() {

        var background = this.add.sprite(0, 0, 'background');
        var me = this.add.sprite(this.game.world.centerX - 25, this.game.world.centerY - 240, 'me_semiround');

        var textStyle = {font: '45px Arial', alight: 'center', stroke: 'green', strokeThickness: 3, fill: 'white'};

        var title = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, "Welcome to Damian's Interactive Portfolio", textStyle);
        title.anchor.set(0.5);

        textStyle.font = '36px Arial';

        var instructions = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 10, 'Press "enter" to start', textStyle);
        instructions.anchor.set(0.5);

        var controlMessage = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 70, 'use arrow keys to move', textStyle);

        controlMessage.anchor.set(0.5);

        var muteMessage = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 155, '"SPACEBAR" to jump.', textStyle);
        muteMessage.anchor.set(0.5);

        var sKey = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);

        sKey.onDown.addOnce(this.startGame, this);
    },

    startGame: function() {
        this.state.start('Game')
    }

};
