class GameOver extends Phaser.Scene {
    constructor(){
        super("gameOver");
    }
    
    create(){
        const {width, height} = this.scale;

        this.background = this.add.graphics({x:0, y:0});
        this.background.fillStyle('0x000000', 0.3);
        this.background.fillRect(0, 0, width, height);
        this.background.setDepth(2)
        this.background.alpha = 0.75;

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.enter = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        );
        
        this.gameOverText = this.add.text(width/2, height/2, "Game Over!\nHit 'Enter' to play again.",
        {
            font: "25px sans sarif",
            fill: "yellow"
        }).setOrigin(0.5, 0.5);
        this.restartBtn = this.add.text(width/2, height/2+60, "Restart",
        {
            font: "25px sans sarif",
            fill: "yellow",
            backgroundColor: '#090',
            padding: {x:5, y:5},
        }).setOrigin(0.5, 0.5);

        this.restartBtn.setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.restartGame(this))
        .on('pointerover', () => this.restartBtn.setStyle({ fill: '#f39c12' }))
        .on('pointerout', () => this.restartBtn.setStyle({ fill: '#FFF' }))

    }
    update(){
        this.background.tilePositionY -= 0.5;
      
        if(Phaser.Input.Keyboard.JustDown(this.enter))
        {   
            this.restartGame(this);
        }
    }
    
    restartGame(thisScene){
        thisScene.scene.stop();
        thisScene.scene.start("playGame");
    }
}
