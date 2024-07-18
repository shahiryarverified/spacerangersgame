class PauseGame extends Phaser.Scene {
    constructor(){
        super("pauseGame");
    }

    create(){
        const {width, height} = this.scale;

        this.background = this.add.graphics({x:0, y:0});
        this.background.fillStyle('0x000000', 0.3);
        this.background.fillRect(0, 0, width, height);
        this.background.setDepth(2)
        this.background.alpha = 0.75;

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        // Just to test the Animation
        // this.bossenemy.setInteractive();
        // this.input.on("gameobjectdown", this.destroyThis, this);

        this.esc = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ESC
            );
        
        this.pauseText = this.add.text(width/2, height/2, "PAUSED",
        {
            font: "25px sans sarif",
            fill: "yellow"
        }).setOrigin(0.5, 0.5);

        this.resumeBtn = this.add.text(width-20, 20, "Resume",
        {
            font: "25px sans sarif",
            fill: "yellow",
            backgroundColor: '#090',
            padding: {x:5, y:5},
        }).setOrigin(1, 0);

        this.resumeBtn.setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.resumeGame(this))
        .on('pointerover', () => this.resumeBtn.setStyle({ fill: '#f39c12' }))
        .on('pointerout', () => this.resumeBtn.setStyle({ fill: '#FFF' }))

        this.quitBtn = this.add.text(width/2, height/2+40, "Quit",
        {
            font: "25px sans sarif",
            fill: "yellow",
            backgroundColor: '#090',
            padding: {x:5, y:5},
        }).setOrigin(0.5, 0.5);

        this.quitBtn.setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.quitGame(this))
        .on('pointerover', () => this.quitBtn.setStyle({ fill: '#f39c12' }))
        .on('pointerout', () => this.quitBtn.setStyle({ fill: '#FFF' }))


    }
    update(){
        this.background.tilePositionY -= 0.5;
      
        if(Phaser.Input.Keyboard.JustDown(this.esc))
        {   
            this.resumeGame(this);
        }
    }

    resumeGame(thisScene){
        thisScene.scene.resume("playGame");
        thisScene.background.alpha = 0;
        thisScene.background.destroy();
        thisScene.pauseText.destroy();
        thisScene.resumeBtn.destroy();
        thisScene.quitBtn.destroy();
    }

    quitGame(thisScene){
        
        thisScene.scene.start("infoScene");
        thisScene.background.alpha = 0;
        thisScene.background.destroy();
        thisScene.pauseText.destroy();
        thisScene.resumeBtn.destroy();
        thisScene.quitBtn.destroy();
    }
}
