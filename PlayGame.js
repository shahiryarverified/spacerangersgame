class PlayGame extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    init(){

    }
    preload(){

    }
    create(){
        const {width, height} = this.scale;
        this.playerSpeed = 5;
        this.pause = false;

        this.background = this.add.tileSprite(0, 0, width, height, "background");
        this.background.setOrigin(0, 0);

        this.smallEnemy = this.physics.add.sprite(width/2-50, -40, "smallEnemy");
        this.smallEnemy.setScale(height>450? height * 0.00025: width * 0.00025)
        
        this.player = this.physics.add.sprite(width/2, height/2+height/3, "player");
        this.player.setScale(height>450? height * 0.00025: width * 0.00025)
        this.player.setOrigin(0.5,-0.5);
        this.player.setCollideWorldBounds(true);
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        // this.obstacle1 = this.add.sprite(width/2, height/2+150, "obstacle1");
        // this.obstacle1.setScale(0.25)
        
        // this.obstacle2 = this.add.sprite(width/2, height/2-150, "obstacle2");
        // this.obstacle2.setScale(0.25)
        
        this.spacebar = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
            );
        this.esc = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ESC
            );
        
        
        this.projectiles = this.add.group();

        this.explosion = this.add.sprite(width/2, height/2, "explosion");
        
        // Physics Mechanics for Fire and Small Enemy
        this.physics.add.overlap(this.projectiles,
            this.smallEnemy,
            this.hitsmallEnemy,
            null,
            this);

        // Physics Mechanics for Player and Small Enemy
        this.physics.add.overlap(this.player,
            this.smallEnemy,
            this.hitPlayer,
            null, this);

        // Create shooting joystick
        this.shootJoyStick = this.plugins.get('rexvirtualjoystickplugin').add(this.scene, {
        x: this.cameras.main.width - 100,
        y: this.cameras.main.height - 125,
        radius: 40,
        forceMin: 0,
        base: this.add.circle(0, 0, width>500? 60:30, 0x888888, 0.5).setDepth(100).setAlpha(0.25),
        thumb: this.add.image(0, 0, 'vjoy_cap').setDisplaySize(width>500?60:30, width>500?60:30).setDepth(100).setAlpha(0.5),
            }).on('update', () => {}, this);

        // Creating the movement Joystick
        this.movementJoyStick = this.plugins.get('rexvirtualjoystickplugin').add(this.scene, {
        x: 100,
        y: this.cameras.main.height - 125,
        radius: 40,
        forceMin: 0,
        base: this.add.circle(0, 0, width>500? 60:30, 0x888888).setDepth(100).setAlpha(0.25),
        thumb: this.add.image(0, 0, 'vjoy_base').setDisplaySize(width>500?80:40, width>500?80:40).setDepth(100).setAlpha(0.5),
        }).on('update', () => {}, this);

        this.score = 0;
        this.highScore = +window.localStorage.getItem("highScore") || 0;
        this.lives = 3;
        console.log(+window.localStorage.getItem("highScore"));
        
        this.add.text(20, 20, "Space Rangers",
        {
            font: "25px sans sarif",
            fill: "yellow"
        });
        
        this.pauseBtn = this.add.text(width-20, 20, "Pause",
        {
            font: "25px sans sarif",
            fill: "yellow",
            backgroundColor: '#090',
            padding: {x:5, y:5},
        }).setOrigin(1, 0);

        this.pauseBtn.setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.pauseGame(this))
        .on('pointerover', () => this.pauseBtn.setStyle({ fill: '#f39c12' }))
        .on('pointerout', () => this.pauseBtn.setStyle({ fill: '#FFF' }))

        this.HISCORE = this.add.text(20, 50, "Hi Score : "+this.highScore,
        {
            font: "25px sans sarif",
            fill: "yellow"
        });
        
        this.SCORE = this.add.text(20, 80, "Your Score : "+this.score,
        {
            font: "25px sans sarif",
            fill: "yellow"
        });
        
        this.LIVES = this.add.text(20, 110, "Lives : "+this.lives,
        {
            font: "25px sans sarif",
            fill: "yellow"
        });

    }

    update(){

        // Update the data
        this.SCORE.setText("Your Score : "+this.score);
        this.HISCORE.setText("Hi Score : "+this.highScore);
        this.LIVES.setText("Lives : "+this.lives);

        // Switch to Game Over Scene
        if(this.lives == 0)
        {
            // Update the High Score
            window.localStorage.setItem("highScore", this.highScore);
            this.scene.pause();
            this.scene.launch("gameOver");
        }

        // To keep the enemy moving with the speed of 0.75
        this.movesmallEnemy(this.smallEnemy, 0.75);
        
        // To keep the background moving
        this.background.tilePositionY -= 0.5;

        // Using Keyboard Keys for movement LEFT & RIGHT
        if(this.cursorKeys.left.isDown){
            this.player.x -= this.playerSpeed;
            this.player.setTexture("player_left");
        }else if(this.cursorKeys.right.isDown){
            this.player.x += this.playerSpeed;
            this.player.setTexture("player_right");
        }else{
            this.player.setTexture("player");
        }

        // Using Keyboard Keys for movement UP & DOWN
        if(this.cursorKeys.up.isDown){
            this.player.y -= this.playerSpeed;
        }else if(this.cursorKeys.down.isDown){
            this.player.y += this.playerSpeed;
        }

        // For shooting fire
        if(this.cursorKeys.space.isDown){
            if(this.player.active){
                this.shoot();
            }
        }

        if (this.shootJoyStick.force) {

            // Fire bullet according to joystick
            if (this.shootJoyStick.force >= this.shootJoyStick.radius) {
                var fire = new Fire(this);    
            }
        }

        // Creating a relation between joystick and player movement
        if (this.movementJoyStick.force) {

        // Calculate speed based on joystick force
        let speedMultiplier = (this.movementJoyStick.force < this.movementJoyStick.radius) ? 
        this.movementJoyStick.force / this.movementJoyStick.radius : 1
        let speed = 200 * speedMultiplier
    
        // Move player according to movement of joystick
        this.player.setVelocityX(speed * 
            Math.cos(
                Math.PI * this.movementJoyStick.angle / 180))
        this.player.setVelocityY(speed * 
            Math.sin(
                Math.PI * this.movementJoyStick.angle / 180))
        } else {
        // Stop the player from moving
        this.player.setVelocityX(0)
        this.player.setVelocityY(0)
        }
        
        
        // For pausing the game
        if(Phaser.Input.Keyboard.JustDown(this.esc))
        {   if(this.scene.isActive())
                {
                    this.pauseGame(this);
                }
        }
        
        // For Updating the State of each fire shot
        for (var i=0; i<this.projectiles.getChildren().length; i++)
        {
            var fire = this.projectiles.getChildren()[i];
            fire.update();
        }

    }

    destroyThis(pointer, gameObject){
        gameObject.setTexture("explosion");
        gameObject.setScale(1);
        gameObject.play("explosion_anim");
    }

    movesmallEnemy(enemy, speed){
        enemy.y += speed;
        if(enemy.y - 60 > this.scale.height){
            this.resetsmallEnemy(enemy, speed);
        }
    }

    resetsmallEnemy(enemy){
        enemy.y = -60;
        var randomX = Phaser.Math.Between(20, this.scale.width-20);
        enemy.x = randomX;
    }

    resetPlayer(){
        const {width, height} = this.scale;
        var x = width/2;
        var y = height;
        this.player.enableBody(true, x, y, true, true);
        this.player.alpha = 0.5;
        
        var tween = this.tweens.add({
            targets: this.player,
            y: height - 64,
            ease: 'Power1',
            duration: 1500,
            repeat:0,
            onComplete: function(){
                this.player.alpha = 1;
            },
            callbackScope: this
        })
    }

    shoot(){
        var fire = new Fire(this);
    }

    hitsmallEnemy(projectile, smallEnemy){
        var explosion = new Explosion(
            this,
            smallEnemy.x,
            smallEnemy.y
            );
        projectile.destroy();
        this.score += 10;
        if(this.score>this.highScore)
        {
            this.highScore=this.score;
        }
        this.resetsmallEnemy(smallEnemy);
    }

    hitPlayer(player, smallEnemy){
        this.resetsmallEnemy(smallEnemy);
        if(this.player.alpha < 1)
        {
            return;
        }
        if(this.lives > 0)
        {
            this.lives -= 1;
        }
        var explosion = new Explosion(this, player.x, player.y+60);
        player.disableBody(true, true);
        this.time.addEvent({
            delay:1000,
            callback: this.resetPlayer,
            callbackScope: this,
            loop:false
        });
    }

    pauseGame(thisScene){
        thisScene.scene.pause();
        thisScene.scene.launch("pauseGame");
    }

}
