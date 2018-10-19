var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update 
})

let score = 0


function preload () {
    // first word in each category is a key
    // game is their first of saying this
    this.load.image("sky", "assets/darksky.jpg")
    game.load.image("ground", "assets/newground.png")
    game.load.image("bubbles", "assets/littleBubble.png")
    // width, height, for the next 2 numbers
  game.load.spritesheet("boy", "assets/shadowboy1.png",  130, 150)
    //game.load.spritesheet('boy', 'firstsprite.png', 'firstsprite.json')
}

function create () {
    game.physics.startSystem(Phaser.Physics.ARCADE)

    // first number changes weidth, second changes height
    game.scale.setGameSize(1000, 550);

    this.boy = game.add.sprite(game.world.centerX, game.world.centerY, "boy");

    game.add.sprite(0, 0, "sky")

    //screen doesn't display anything when I comment this out
    platforms = game.add.group()

    platforms.enableBody = true

    //sets the height of the bottom platform

    let ground = platforms.create(0, game.world.height - 50, "ground")
    
    //this one will move
    platforms.create(500, game.world.height - 100, "ground")

    // increases size of bottom platform (ground)
    ground.scale.setTo(6)

    ground.body.immovable = true

    //moves the platforms

    //first number moves left / right.  second number movies up / down
    let ledge = platforms.create(100, 400, "ground")
    ledge.body.immovable = true
    
    // ledge = platforms.create(-75, 350, 'ground')
    // ledge.body.immovable = true

    // furthest platform
    ledge = platforms.create(800, 400, "ground")
    ledge.body.immovable = true

    //top platform
    ledge = platforms.create(400, 200, "ground")
    ledge.body.immovable = true
    // turn this on to block the sprite to make me win
    //ledge = platforms.create(700, 600, 'ground')
   // ledge.body.immovable = true

    // this is the height of where the sprite initially starts at
    // first number is location and second number is height
    player = game.add.sprite(0, 300, "boy") 
    
    game.physics.arcade.enable(player)
    player.body.bounce.y = 0.0
    // the lower the number the higher the character jumps
    player.body.gravity.y = 350
    player.body.collideWorldBounds = true

    //considering that i changed up my sprite, i won't need these animations.  Basically, the numbers in the bracket are the numbers of sprites on the sprite sheet. So it will cycle through those numbers.  I only have one sprite so therefore i don't need to include the animations
    //player.animations.add('left', [0, 1], 10, true)
    //player.animations.add('right', [2, 3], 10, true)

    bubbles = game.add.group()
    bubbles.enableBody = true

    // number of rings is what's after i
    for (var i = 0; i < 10; i++) {
        // the first number is how spaced out the boxes will be
        // the higher the second number, the lower the drop start point
        let bubble = bubbles.create (i * 90, 100, "bubbles")
        //speed of the drop
        bubble.body.gravity.y = 100
        
        bubble.body.bounce.y = 0.3 + Math.random() * 0.2
    }

    // first number is the horizontal position of where the score will be placed
    // second number is the vertical position of where the score will be placed
    scoreText = game.add.text(500, 16, '', { fontSize: '16px', fill: '#000'})
    cursors = game.input.keyboard.createCursorKeys()

}

function update () {

    // this will naturally move the sprite to the right
    player.body.velocity.x = 0

    // this makes it so that the sprite is able to make contact with platform or ring
    game.physics.arcade.collide(player, platforms)
    game.physics.arcade.collide(bubbles, platforms)
    game.physics.arcade.overlap(player, bubbles, collectBubbles, null, this)

    if (cursors.left.isDown) {
        player.body.velocity.x = -150

        player.animations.play("left")
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150

        // this pauses the game whenever you press the right arrow
      //  player.animations.play('right')
    } else {
        player.animations.stop()
    }
        if (cursors.up.isDown && player.body.touching.down) {
            player.body.velocity.y = -400
        }
        if (score === 100) {
            alert ("Winner Winner Vegan Dinner!")
            score = 0
        }
     }

    

function collectBubbles (player, bubble) {
    bubble.kill()

    score += 10
    scoreText.text = "Score: " + score
}

