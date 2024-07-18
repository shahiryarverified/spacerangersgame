window.onload = function () {
    if(window.innerWidth>1024)
        {
            this.width = 1024;
        }
    else
        {   
            this.width = window.innerWidth;
        }
    this.height = window.innerHeight;
    var config = {
        width: this.width,
        height: window.innerHeight,
        type: Phaser.AUTO,
        backgroundColor:"#000000",
        physics: {
            default: "arcade",
            arcade: {
                debug:false
            }
        },
        input: {
            activePointers: 3,
        },
        autoCenter:true,
        scene: [TitleScreen, PlayGame, PauseGame, GameOver, InfoScene]
    }
    var game = new Phaser.Game(config);
}
window.addEventListener("orientationchange", function(event){
    window.location.reload();
});