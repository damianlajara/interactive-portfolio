import { Boot } from './states/Boot';
import { Preloader } from './states/Preloader';
import { MainMenu } from './states/MainMenu';
import { Game } from './states/Game';

export class MainGame extends Phaser.Game {
    constructor() {
        //	100% of the browser window - see Boot.js for additional configuration
        super("100%", "100%", Phaser.AUTO, 'portfolio_game');

        //	Add the States your game has.
        //	You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
        this.state.add('Boot', Boot);
        this.state.add('Preloader', Preloader);
        this.state.add('MainMenu', MainMenu);
        this.state.add('Game', Game);

        //	Now start the Boot state.
        this.state.start('Boot');
    }
}