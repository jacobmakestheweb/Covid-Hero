var player; 
var gameOver = false;
var tp;
var covid;
var covids;
var keyInputs;
var leftKey;
var rightKey;
var upKey;
var downKey;


class mainScene {

      preload () {
       // INIT SPRITES
        this.load.image('store', 'assets/grocerybg.png');
        this.load.spritesheet('player', 'assets/covid-hero.png', {
          frameWidth: 32,
          frameHeight: 32
        });
        this.load.spritesheet('covid','assets/covidspritesheet.png', {
          frameWidth: 32,
          frameHeight: 32
        });
        this.load.image('coin', 'assets/covidtp.png');
      };

      create () {
      // BG IMAGE (LOL)
      this.add.image(400, 300, 'store');
       // PLAYER ANIMATIONS
       this.anims.create({
          key: "idle",
          frameRate: 12,
          frames: this.anims.generateFrameNumbers("player", {start: 0, end:5}),
          repeat: -1
       });
        this.anims.create({
          key: "up",
          frameRate: 12,
          frames: this.anims.generateFrameNumbers("player", {start: 24, end: 30}),
          repeat: -1
        });
        this.anims.create({
          key: "down",
          frameRate: 12,
          frames: this.anims.generateFrameNumbers("player", {start: 18, end: 23}),
          repeat: -1
        });
        this.anims.create({
          key: "left",
          frameRate: 12,
          frames: this.anims.generateFrameNumbers("player", {start: 12, end: 17}),
          repeat: -1
        });
        this.anims.create({
          key: "right",
          frameRate: 12,
          frames: this.anims.generateFrameNumbers("player", {start: 6, end: 11}),
          repeat: -1
        });
       // COVID ANIMS
        this.anims.create({
          key: "blink",
          frameRate: 4,
          frames: this.anims.generateFrameNumbers("covid", {start: 0 , end: 3}),
          repeat: -1
        });

       // CREATE SPRITES 
       player = this.player = this.physics.add.sprite(100,100, 'player');
       player.setScale(2);
       player.anims.play("idle"); // init idle anim
       tp = this.coin = this.physics.add.sprite(300,250, 'coin');
       // SCORE
       this.score = 0;
       let style = { font: '20px Arial', fill: '#fff' };
       this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
       // INIT KB ARROW CONTROLS
       // COVID KILL
       covids = this.physics.add.group();
       this.physics.add.collider(player, covids, hitCovid, null, this);
       // HANDLE KB INPUTS
       keyInputs = this.input.keyboard.createCursorKeys();

       leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
       rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
       upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
       downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      };


      update() {
        this.moveCovids()
        //CALL COLLISION LOGIC
        if (this.physics.overlap(this.player, this.coin)) {
          this.hit();
        }
        if (this.physics.overlap(this.player, this.covid)) {
          this.hitCovid();
        }
        // CONTROLS
          if(keyInputs.left.isDown){
             player.x = player.x - 4;
             player.anims.play("left", true);
            }
          if(keyInputs.right.isDown){
             player.x = player.x + 4;
             player.anims.play("right", true);
            }
          if(keyInputs.up.isDown){
             player.y = player.y - 4;
             player.anims.play("up", true);
            }
          if(keyInputs.down.isDown){
             player.y = player.y + 4;
             player.anims.play("down", true);
          } 
          if(Phaser.Input.Keyboard.JustUp(leftKey)){
            setTimeout(function(){
				    	player.anims.play("idle");
            }, 500);
				  }
          if(Phaser.Input.Keyboard.JustUp(rightKey)){
            setTimeout(function(){
				    	player.anims.play("idle");
            }, 500);
				  }
          if(Phaser.Input.Keyboard.JustUp(upKey)){
            setTimeout(function(){
				    	player.anims.play("idle");
            }, 500);
				  }
          if(Phaser.Input.Keyboard.JustUp(downKey)){
            setTimeout(function(){
				    	player.anims.play("idle");
            }, 500);
				  }
      }; 

      moveCovids() {  
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      }; 
      // COLLECT LOGIC
      hit() {
        this.coin.x = Phaser.Math.Between(100, 600);
        this.coin.y = Phaser.Math.Between(100, 300);
        this.score += 10;
        this.scoreText.setText('score: ' + this.score)
        
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var covid = covids.create(x, 16, 'covid');
          covid.setBounce(1);
          covid.setCollideWorldBounds(true);
          covid.setVelocity(Phaser.Math.Between(-200, 200), 20);
          covid.anims.play("blink");

      //PLAYER GROW
          this.tweens.add ({
            targets: this.player,
            duration: 200,
            scaleX: 1.2,
            scaleY: 1.2,
            yoyo: true,
          });
      }; 
};

    var hitCovid = function() {
      this.physics.pause();
      player.setTint(0xff0000);
      //player.anims.play('turn');
      gameOver = true;
    };

    new Phaser.Game ({
        width: 699,
        height:300,
        backgroundColor:'000000',
        scene: mainScene,
        physics: {default:'arcade'},
        parent: 'game',
        pixelArt: true
      });
  
