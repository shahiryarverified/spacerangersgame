class Fire extends Phaser.GameObjects.Sprite{
    constructor(scene){
        var x = Phaser.Math.Between(scene.player.x-20, scene.player.x+20)
        var y = scene.player.y;
        super(scene, x, y, "fire");
        scene.projectiles.add(this);
        scene.add.existing(this);
        
        scene.physics.world.enableBody(this);
        this.setScale(window.innerWidth * 0.00025);
        this.body.velocity.y = -600;
    }
    update(){
        
        if (this.y < this.height/8)
        {
            this.destroy();
        }
    }

}