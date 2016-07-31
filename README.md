# Welcome to my interactive Portfolio

## Overview
Here, you can roam freely around this wrapping world and search for various treasures.
The treasures are of course representations of some of my projects on [Github](https://github.com/damianlajara).

## Gameplay
You start off in the Main Menu. The Main menu consists of some in-game instructions. You can press 'f' to go full screen, use the keypads to move around and of course you can also press 'space' to make the character jump.
Did I mention that you can double jump also? Double jumping just makes everything that much more fun, so of course it had to be part of the game.

#### Cool Animations
When you approach a treasure, you will automatically start attacking it! I just thought this would be cool (and simpler), instead of maybe trying to make the player open the treasure chest. When you overlap with a treasure, it should display the project that corresponds with that specific treasure from Github. You can also click on the cover image to take you to the actual project page where you can see more info.

#### Game Boundaries
If you reach either end of the map, it will wrap around and you will appear on the opposite end. You can of course jump off bounds towards the y direction. I left the game this way because it's pretty interesting to try to estimate where you will fall back into the world. Now as for the -y direction, a.k.a the bottom portion of the map, it is filled with water. This sea part of the game is like lava! You do not want to fall into the sea and die. You can of course try it and end up seeing what happens :D

## Prerequisites
* Make sure to have [Node](https://nodejs.org/en/) installed on your machine.
* Make sure you have [Gulp](http://gulpjs.com/) installed globally. If not, you can install it with `npm install gulp -g`

## Installing
* Download, clone or fork this repo.
* `cd` into the root of this directory.
* Run `npm install` to install all the dependencies.
* Run `npm run-script play` and visit [localhost:5000](localhost:5000).
* You can also run `gulp` which will use browser-sync to serve the files. Visit [localhost:3000](localhost:3000) to see the debugging effects of this beast.
* Bam! That's it! Hope you like it.

## Live Version
If you do not want to deal with the installation steps, you can always visit the official live site [here](https://interactive-phaser-portfolio.herokuapp.com/).

## Credits
I got these awesome free assets from [Gameart2D](http://www.gameart2d.com/).

You can find the Character Sprites [here](http://www.gameart2d.com/the-knight-free-sprites.html).

You can find the Game Tile-Sets [here](http://www.gameart2d.com/free-platformer-game-tileset.html).
