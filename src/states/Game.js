import Phaser from 'phaser';

export class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
    this.jumpTimer = 0;
    this.jumpCount = 0;
    this.playerSize = 0.1;
    this.facing = 'idle';
    this.modals = {};
    this.isOverlappingTreasure = false;
    this.currentTreasure = null;
    this.isDying = false; // Flag to track if player is in death sequence
    this.isWrapping = false; // Flag to track if player is in wrapping animation
    // Safe platform positions (x coordinates where there's solid ground)
    this.safePlatforms = [90, 300, 500, 700, 900, 1100, 1300, 1500];
    this.startPosition = { x: 90, y: 500 }; // Starting position for resets
  }

  create() {
    this.setupWorld();
    this.createTreasures();
    this.createPlayer();
    this.setupCollisions();
    this.setupCamera();
    this.setupInput();
    this.createModals();
    this.setupDebug();

    // Handle resize events
    this.scale.on('resize', this.resize, this);

    // Speed up the idle animation
    this.anims.get('idle').frameRate = 8; // Doubled from 4 to 8
  }

  setupWorld() {
    // Set up background
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.bg = this.add
      .image(width / 2, height / 2, 'background')
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setScale(Math.max(width / 1600, height / 900));

    // Set up tilemap
    this.map = this.make.tilemap({ key: 'base_level' });

    // Add tilesets
    const smallTiles = this.map.addTilesetImage('small_tiles');
    const allTiles = this.map.addTilesetImage('all_tiles');
    const crateSet = this.map.addTilesetImage('crate');
    const chestSet = this.map.addTilesetImage('chest');

    // Create layers
    this.map.createLayer(
      'trees',
      [smallTiles, allTiles, crateSet, chestSet],
      0,
      0,
    );
    this.groundLayer = this.map.createLayer(
      'ground',
      [smallTiles, allTiles, crateSet, chestSet],
      0,
      0,
    );

    // Set collision for ground layer
    this.groundLayer.setCollisionByExclusion([-1]);

    // Get world bounds from tilemap
    this.worldWidth = this.groundLayer.width;
    this.worldHeight = this.groundLayer.height;

    // Set up physics world
    this.physics.world.setBounds(0, 0, this.worldWidth, this.worldHeight);

    // Set up sea collision area
    this.seaCollision = this.add.zone(
      this.worldWidth / 2,
      this.worldHeight - 105,
      this.worldWidth,
      210,
    );
    this.physics.world.enable(this.seaCollision);
    this.seaCollision.body.setAllowGravity(false);
    this.seaCollision.body.setImmovable(true);
  }

  createTreasures() {
    // Create treasures group
    this.treasures = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    // Add treasures from object layer
    const collisionLayer = this.map.getObjectLayer('collision');
    if (collisionLayer && collisionLayer.objects) {
      collisionLayer.objects.forEach((object) => {
        if (object.gid === 6) {
          // Chest object
          const treasure = this.treasures.create(
            object.x + object.width / 2, // Center x position
            object.y - object.height / 2, // Correct y position
            'chest',
          );
          treasure.name = object.name || '';
          treasure.body.allowGravity = false;
          treasure.body.immovable = true;

          // Add a property to track if this treasure's modal is showing
          treasure.modalShowing = false;

          // Add this treasure's x position to safe platforms
          this.safePlatforms.push(treasure.x);
        }
      });
    }

    // Sort safe platforms for easier finding
    this.safePlatforms.sort((a, b) => a - b);
  }

  createPlayer() {
    this.player = this.physics.add.sprite(
      this.startPosition.x,
      this.startPosition.y,
      'player',
    );
    this.player.setOrigin(0.5, 0.5);
    this.player.setScale(this.playerSize);
    this.player.setCollideWorldBounds(false);

    // Adjust collision body size and offset for better collision
    this.player.body.setSize(200, 300);
    this.player.body.setOffset(180, 200);
    this.player.body.setDrag(30, 0);
    this.player.body.setMaxVelocity(500, 500);

    // Listen for animation complete events
    this.player.on('animationcomplete', this.handleAnimationComplete, this);
  }

  handleAnimationComplete(animation) {
    // If the 'dead' animation completes, don't do anything - let the reset timer handle it
    if (animation.key === 'dead') {
      // This prevents the animation from looping
      this.player.anims.stop();
    }
  }

  setupCollisions() {
    // Set up collisions
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.treasures, this.groundLayer);

    // Using a callback for treasure overlap to track when player enters and exits
    this.physics.add.overlap(
      this.player,
      this.treasures,
      this.handleTreasureOverlap,
      null,
      this,
    );

    this.physics.add.overlap(
      this.seaCollision,
      this.player,
      this.sea_player_collision,
      null,
      this,
    );
  }

  setupCamera() {
    // Set up camera to follow player
    this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight);
    this.cameras.main.startFollow(this.player, true);
  }

  setupInput() {
    // Set up input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.jumpButton = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );

    // Fullscreen toggle
    this.input.keyboard.on('keydown-F', () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    });
  }

  setupDebug() {
    // Debug text - only show in development
    if (process.env.NODE_ENV !== 'production') {
      this.debugText = this.add
        .text(10, 10, 'Debug info', {
          fontSize: '16px',
          fill: '#ffffff',
          backgroundColor: '#000000',
          padding: { x: 5, y: 5 },
        })
        .setScrollFactor(0)
        .setDepth(1000);
    }
  }

  update(time) {
    // Handle world wrapping for player (horizontal only)
    this.handleWorldWrapping();

    // Move player (only if not dying and not wrapping)
    if (!this.isDying && !this.isWrapping) {
      this.movePlayer(time);
    }

    // Update debug text if it exists
    this.updateDebugText();

    // Check if player is falling out of bounds (safety check)
    if (this.player.y > this.worldHeight + 300 && !this.isDying) {
      this.resetPlayerToStart();
    }
  }

  handleWorldWrapping() {
    // Only process wrapping if not already in wrapping state
    if (!this.isWrapping) {
      if (this.player.x > this.worldWidth) {
        // Wrapping from right to left - place at left edge
        this.isWrapping = true;
        this.wrapPlayerHorizontally(10); // Place 10px from left edge
      } else if (this.player.x < 0) {
        // Wrapping from left to right - place at right edge
        this.isWrapping = true;
        this.wrapPlayerHorizontally(this.worldWidth - 10); // Place 10px from right edge
      }
    }
  }

  wrapPlayerHorizontally(targetX) {
    // Create a subtle circle effect around player
    const circle = this.add.circle(
      this.player.x,
      this.player.y,
      20, // Starting radius
      0xffffff, // White color
      0.3, // Low alpha for subtlety
    );

    // Animate the circle expanding outward
    this.tweens.add({
      targets: circle,
      radius: 60,
      alpha: 0,
      duration: 200,
      onComplete: () => circle.destroy(),
    });

    // Find ground at the target x position
    const safeY = this.findSafeYPosition(targetX, this.player.y);

    // Teleport the player to edge
    this.player.setPosition(targetX, safeY);

    // Create a subtle entry effect
    const entryCircle = this.add.circle(
      targetX,
      safeY,
      60, // Starting radius
      0xffffff, // White color
      0.2, // Even lower alpha for entry
    );

    // Animate the entry circle contracting
    this.tweens.add({
      targets: entryCircle,
      radius: 20,
      alpha: 0,
      duration: 200,
      onComplete: () => entryCircle.destroy(),
    });

    // Add a short cooldown to prevent rapid wrapping
    this.time.delayedCall(200, () => {
      this.isWrapping = false;
    });
  }

  findSafeYPosition(x, defaultY) {
    // Start from a bit above where we might expect ground
    let startY = defaultY > 200 ? defaultY - 200 : 100;

    // Try to find ground by stepping down
    for (let y = startY; y < this.worldHeight - 200; y += 32) {
      const tile = this.groundLayer.getTileAtWorldXY(x, y);
      if (tile) {
        // Found ground, return a position above it
        return y - 50;
      }
    }

    // If no ground found, use a safe default height
    return 300;
  }

  resetPlayerToStart() {
    // Reset player to starting position
    this.player.setPosition(this.startPosition.x, this.startPosition.y);
    this.player.setVelocity(0, 0);
    this.player.anims.play('idle');
  }

  movePlayer(time) {
    // Reset horizontal velocity
    this.player.setVelocityX(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-150);

      if (this.facing !== 'left') {
        this.facing = 'left';
        this.player.setScale(-this.playerSize, this.playerSize);
        this.player.anims.play('walk', true);
      }
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(150);

      if (this.facing !== 'right') {
        this.facing = 'right';
        this.player.setScale(this.playerSize, this.playerSize);
        this.player.anims.play('walk', true);
      }
    } else {
      if (this.facing !== 'idle') {
        this.player.anims.play('idle', true);

        if (this.facing === 'left') {
          this.player.setScale(-this.playerSize, this.playerSize);
        } else {
          this.player.setScale(this.playerSize, this.playerSize);
        }

        this.facing = 'idle';
      }
    }

    // Handle jumping (only if not dying)
    if (this.jumpButton.isDown && !this.isDying) {
      if (this.player.body.onFloor() && time > this.jumpTimer) {
        this.jumpCount = 0;
        this.player.anims.play('jump');
        this.player.setVelocityY(-290);
        this.jumpTimer = time + 350;
        this.jumpCount += 1;
      } else if (
        !this.player.body.onFloor() &&
        time > this.jumpTimer &&
        this.jumpCount < 2
      ) {
        this.player.anims.play('jump');
        this.player.setVelocityY(-310);
        this.jumpTimer = time + 350;
        this.jumpCount += 1;
      }
    }
  }

  handleTreasureOverlap(player, treasure) {
    // Set this treasure as current overlapping treasure
    this.isOverlappingTreasure = true;
    this.currentTreasure = treasure;

    // Play attack animation and show modal if it has a name
    player.anims.play('attack', true);

    if (treasure.name && treasure.name !== '') {
      this.showModal(treasure.name);
      treasure.modalShowing = true;
    }

    // Set up a process to check when player exits the treasure area
    this.events.once('postupdate', this.checkTreasureExit, this);
  }

  checkTreasureExit() {
    if (this.currentTreasure) {
      // Check if player is still overlapping with the treasure
      const bounds1 = this.player.getBounds();
      const bounds2 = this.currentTreasure.getBounds();

      const isOverlapping = Phaser.Geom.Rectangle.Overlaps(bounds1, bounds2);

      if (!isOverlapping && this.currentTreasure.modalShowing) {
        // Hide the modal when player moves away
        this.hideModal(this.currentTreasure.name);
        this.currentTreasure.modalShowing = false;
        this.isOverlappingTreasure = false;
        this.currentTreasure = null;
      } else {
        // Still overlapping, check again next frame
        this.events.once('postupdate', this.checkTreasureExit, this);
      }
    }
  }

  sea_player_collision(sea, player) {
    // Don't process multiple collisions if already dying
    if (this.isDying) return;

    // Set the dying flag
    this.isDying = true;

    // Disable input
    this.disableCursors();

    // Play death animation once
    player.anims.play('dead');
    player.setVelocityY(-330);

    // Reset player after delay - teleport to start position
    this.time.delayedCall(1200, () => {
      player.setPosition(this.startPosition.x, this.startPosition.y);
      player.setVelocity(0, 0);
      player.anims.play('idle');
      this.enableCursors();

      // Reset dying flag
      this.isDying = false;
    });
  }

  disableCursors() {
    this.cursors.left.enabled = false;
    this.cursors.right.enabled = false;
    this.cursors.up.enabled = false;
    this.cursors.down.enabled = false;
    this.jumpButton.enabled = false;
  }

  enableCursors() {
    this.cursors.left.enabled = true;
    this.cursors.right.enabled = true;
    this.cursors.up.enabled = true;
    this.cursors.down.enabled = true;
    this.jumpButton.enabled = true;
  }

  createModals() {
    // Get screen dimensions
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Project data - match with treasure names in Tiled
    const projectData = {
      'Ruby Adventure': {
        title: 'Ruby Adventure',
        description:
          'An interactive CLI game that can be thought of as a hybrid between a board game and a text-based RPG game where the player can fight monsters, unlock treasures and shop around for various weapons, armor and items.',
        image: 'ruby_adventure_cover',
        url: 'http://www.damianlajara.com/projects/3',
      },
      // Add more projects as needed
    };

    Object.keys(projectData).forEach((projectKey) => {
      const project = projectData[projectKey];

      // Create modal container
      const modal = this.add.container(width / 2, height / 2);
      modal.setDepth(1000);
      modal.visible = false;

      // Add modal background
      const bg = this.add.rectangle(0, 0, width, height, 0x000000, 0.7);

      // Add project title
      const title = this.add
        .text(0, -240, project.title, {
          fontSize: '42px',
          fill: '#FFFFFF',
          stroke: '#CC0000',
          strokeThickness: 6,
          cssClass: 'modal-title',
        })
        .setOrigin(0.5);

      const image = this.add.image(0, -80, project.image).setScale(0.5);
      image.setData('cssClass', 'modal-image');
      image.setInteractive({ useHandCursor: true });
      image.on('pointerdown', () => {
        window.open(project.url, project.title);
      });

      const desc = this.add
        .text(0, 160, this.wrapText(project.description, width * 0.8), {
          fontSize: '32px',
          fill: '#FFFFFF',
          align: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: { x: 15, y: 15 }, // Increased padding for better spacing
          wordWrap: { width: width * 0.8 }, // Explicit wordWrap setting at 60% of screen width
        })
        .setOrigin(0.5);

      // Add all elements to container - ORDER MATTERS FOR Z-INDEX
      modal.add([bg, image, desc, title]);

      // Store modal
      this.modals[projectKey] = modal;
    });
  }

  showModal(type) {
    if (this.modals[type]) {
      this.modals[type].visible = true;
    }
  }

  hideModal(type) {
    if (this.modals[type]) {
      this.modals[type].visible = false;
    }
  }

  hideAllModals() {
    Object.keys(this.modals).forEach((key) => {
      if (this.modals[key]) {
        this.modals[key].visible = false;
      }
    });

    // Also reset modal state on all treasures
    this.treasures.getChildren().forEach((treasure) => {
      treasure.modalShowing = false;
    });
  }

  wrapText(text, width = 800, fontSize = 32) {
    const words = text.split(' ');
    let wrappedText = '';
    let line = '';

    words.forEach((word) => {
      const testLine = line + word + ' ';
      if (testLine.length * (fontSize / 2) > width) {
        wrappedText += line + '\n';
        line = word + ' ';
      } else {
        line = testLine;
      }
    });

    wrappedText += line;
    return wrappedText;
  }

  updateDebugText() {
    if (this.debugText) {
      this.debugText.setText(
        [
          `Player: x=${Math.floor(this.player.x)}, y=${Math.floor(
            this.player.y,
          )}`,
          `Velocity: x=${Math.floor(
            this.player.body.velocity.x,
          )}, y=${Math.floor(this.player.body.velocity.y)}`,
          `On Floor: ${this.player.body.onFloor()}`,
          `Animation: ${
            this.player.anims.currentAnim
              ? this.player.anims.currentAnim.key
              : 'none'
          }`,
          `Dying: ${this.isDying}`,
          `Wrapping: ${this.isWrapping}`,
          `Overlapping Treasure: ${this.isOverlappingTreasure}`,
          this.currentTreasure
            ? `Current Treasure: ${this.currentTreasure.name}, Modal: ${this.currentTreasure.modalShowing}`
            : 'No Current Treasure',
        ].join('\n'),
      );
    }
  }

  resize(gameSize) {
    const width = gameSize.width;
    const height = gameSize.height;

    // Update background scale and position
    if (this.bg) {
      this.bg.setPosition(width / 2, height / 2);
      this.bg.setScale(Math.max(width / 1600, height / 900));
    }

    // Update modal positions and sizes
    Object.values(this.modals).forEach((modal) => {
      modal.setPosition(width / 2, height / 2);

      // Update modal background
      if (modal.list[0]) {
        modal.list[0].width = width;
        modal.list[0].height = height;
      }
    });
  }
}
