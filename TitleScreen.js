
class TitleScreen extends Phaser.Scene {
    constructor(){
        super("titleScreen");
    }

    init(){

    }
    preload(){

        this.load.image('vjoy_base', 'assets/base.png');
        this.load.image('vjoy_body', 'assets/body.png');
        this.load.image('vjoy_cap', 'assets/cap.png');

        this.load.plugin('rexvirtualjoystickplugin', 'plugins/rexvirtualjoystickplugin.min.js', true)

        this.load.spritesheet("background", "assets/background.png", {
            frameWidth: 1024,
            frameHeight: 1024
        });
        this.load.spritesheet("smallEnemy", "assets/Small Enemy.png", {
            frameWidth: 1024,
            frameHeight: 1024
        })
        this.load.spritesheet("player", "assets/AirShip.png", {
            frameWidth: 1024,
            frameHeight: 1024
        })
        this.load.spritesheet("player_left", "assets/AirShip_Left.png", {
            frameWidth: 1024,
            frameHeight: 1024
        })
        this.load.spritesheet("player_right", "assets/AirShip_Right.png", {
            frameWidth: 1024,
            frameHeight: 1024
        })
        this.load.spritesheet("fire", "assets/Fire.png", {
            frameWidth: 1024,
            frameHeight: 1024
        })
        this.load.spritesheet("obstacle1", "assets/Obstacle_1.png", {
            frameWidth: 1024,
            frameHeight: 1024
        })
        this.load.spritesheet("obstacle2", "assets/Obstacle_2.png", {
            frameWidth: 1024,
            frameHeight: 1024
        })
        this.load.spritesheet("explosion", "assets/explosion.png",{
            frameWidth: 256,
            frameHeight: 256
        });
    }
    create(){
        this.anims.create({
            key:"explosion_anim",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 24,
            repeat:0,
            hideOnComplete: true
        })
        this.add.text(20,20,"Loading game...");
        this.scene.start("infoScene");
    }
    update(){

    }
}
