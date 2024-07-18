class InfoScene extends Phaser.Scene {
    constructor(){
        super("infoScene");
    }

    create(){
        const {width, height} = this.scale;

        this.background = this.add.tileSprite(0, 0, width, height, "background");
        this.background.setOrigin(0, 0);

        this.player = this.physics.add.sprite(width/2, height/2-100, "player");
        this.player.setScale(height>450? height * 0.00025: width * 0.00025)
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(1);
        this.player.setVelocity(400);

        this.foreground = this.add.graphics({x:0, y:0});
        this.foreground.fillStyle('0x000000', 0.3);
        this.foreground.fillRect(0, 0, width, height);
        this.foreground.setDepth(2)
        this.foreground.alpha = 0.75;

        this.cursorKeys = this.input.keyboard.createCursorKeys();
    
        this.enter = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
            );
        
        this.startingText = this.add.text(width/2, height/2-40, "Space Rangers",
        {
            font: "40px sans sarif",
            fill: "yellow"
        }).setOrigin(0.5, 0.5);
        
        this.highScoreText = this.add.text(width/2, height/2, "Hi Score : "+(+window.localStorage.getItem("highScore") || 0),
        {
            font: "25px sans sarif",
            fill: "yellow"
        }).setOrigin(0.5, 0.5);
        
        this.startingText = this.add.text(width/2, height/2+30, "Hit Start/Enter",
        {
            font: "25px sans sarif",
            fill: "yellow"
        }).setOrigin(0.5, 0.5);
        
        this.startBtn = this.add.text(width/2, height/2+70, "Start",
        {
            font: "25px sans sarif",
            fill: "yellow",
            backgroundColor: '#090',
            padding: {x:5, y:5},
        }).setOrigin(0.5, 0.5);

        this.startBtn.setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.startGame(this))
        .on('pointerover', () => this.startBtn.setStyle({ fill: '#f39c12' }))
        .on('pointerout', () => this.startBtn.setStyle({ fill: '#FFF' }))


    }
    update(){
        this.background.tilePositionY -= 0.5;
        this.player.angle +=3;
        if(Phaser.Input.Keyboard.JustDown(this.enter))
        {   
            this.startGame(this);
        }
    }

    startGame(thisScene){
        thisScene.scene.start("playGame");
        thisScene.foreground.alpha = 0;
        thisScene.foreground.destroy();
        thisScene.startingText.destroy();
        thisScene.highScoreText.destroy();
        thisScene.startBtn.destroy();
        thisScene.player.destroy();
    }
    
}
