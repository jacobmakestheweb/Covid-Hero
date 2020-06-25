var player; 
var gameOver = false;
var tp;
var covid;
var covids;

class mainScene 
{
        
      preload () 
      {
        // INIT SPRITES
        this.load.image('store', 'https://cdn.glitch.com/4c491429-c9d4-4b86-b1cd-8c2836ece7fc%2Fdastore.jpg?v=1593062087265');
        this.load.image('player','phasertutuno/covidhero.png ');
        this.load.image('covid','https://cdn.glitch.com/4c491429-c9d4-4b86-b1cd-8c2836ece7fc%2FCOVID.png?v=1593062025204');
        this.load.image('coin', 'https://cdn.glitch.com/4c491429-c9d4-4b86-b1cd-8c2836ece7fc%2FTP.png?v=1593062067938');
      };

      
      create ()
      {
      this.add.image(400, 300, 'store');
       // CREATE SPRITES 
       player = this.player = this.physics.add.sprite(100,100, 'player');
       tp = this.coin = this.physics.add.sprite(300,250, 'coin');
       // SCORE
       this.score = 0;
       let style = { font: '20px Arial', fill: '#fff' };
       this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);

       // INIT KB ARROW CONTROLS
       this.arrow = this.input.keyboard.createCursorKeys();
       // COVID KILL
       covids = this.physics.add.group();
       this.physics.add.collider(player, covids, hitCovid, null, this);
      };


      update()
      {

        this.moveCovids()

        //CALL COLLISION LOGIC
        if (this.physics.overlap(this.player, this.coin))
        {
          this.hit();
        }
        if (this.physics.overlap(this.player, this.covid))
        {
          this.hitCovid();
        }

        // HORIZONTAL CONTROLS
        if (this.arrow.right.isDown)
        {
          this.player.x += 3;
        }
        else if (this.arrow.left.isDown) 
        {
          this.player.x -= 3;
        }

        // VERTICAL CONTROLS
        if (this.arrow.down.isDown)
        {
          this.player.y += 3;
        }
        else if (this.arrow.up.isDown)
        {
          this.player.y -= 3;
        }
        
      }; 

      moveCovids()
      {  
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      }; 

      // COLLECT LOGIC
      hit()
      {
        this.coin.x = Phaser.Math.Between(100, 600);
        this.coin.y = Phaser.Math.Between(100, 300);
        this.score += 10;
        this.scoreText.setText('score: ' + this.score)
        
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var covid = covids.create(x, 16, 'covid');
          covid.setBounce(1);
          covid.setCollideWorldBounds(true);
          covid.setVelocity(Phaser.Math.Between(-200, 200), 20);


          //PLAYER GROW
          this.tweens.add
          ({
            targets: this.player,
            duration: 200,
            scaleX: 1.2,
            scaleY: 1.2,
            yoyo: true,
          });
      }; 
};

    var hitCovid = function()
    {
      this.physics.pause();
      player.setTint(0xff0000);
      //player.anims.play('turn');
      gameOver = true;
    };

    new Phaser.Game
     ({
        width: 699,
        height:300,
        backgroundColor:'000000',
        scene: mainScene,
        physics: {default:'arcade'},
        parent: 'game',
      });
  
