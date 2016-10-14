/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
 preload: preload,
 create: create,
 update: update
});
var platforms;
var player;
var cursors;
var stars;
var scoreText
var score = 0;
var right
var left
var scored
var badguy

function preload() {

 game.load.image('sky', 'assets/sky.png');
 game.load.image('ground', 'assets/platform.png');
 game.load.image('star', 'assets/diamond.png');
 game.load.spritesheet('dude', 'assets/dude.png',32,48);
 game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
 
}

function create() {
 game.add.sprite(0, 0, "sky");
 game.add.sprite(200, 500, "star");
 //game.add.sprite(100,100, 'baddie');

 // The platforms group contains the ground and the ledges we can jump on 
 platforms = game.add.group();

 // We will enable physics for any object that is created in this group
 platforms.enableBody = true;

 // Here we create the ground.
 var ground = platforms.create(1, game.world.height - 64, 'ground');

 // This stops it from falling away when you jump on it
 ground.body.immovable = true;

 var ledge = platforms.create(200, 500, 'ground');
 ledge.body.immovable = true;

 // We're going to be ising physics, so enable the Arcade Physics system
 game.physics.startSystem(Phaser.Physics.ARCADE);

 // The player and its settings
 player = game.add.sprite(32, game.world.height - 150, 'dude');

 // We need to enable physics on the player
 game.physics.arcade.enable(player);

 //  Player physics properties. Give the little guy a slight bounce.
 player.body.bounce.y = 0.5;
 player.body.gravity.y = 1000;
 player.body.collideWorldBounds = true;

 // Our two animations, walking left and right.
 player.animations.add('left', [0, 1, 2, 3], 10, true);
 player.animations.add('right', [5, 6, 7, 8], 10, true);

badguy = game.add.sprite(128, 32, 'baddie');
 game.physics.arcade.enable(badguy);
 badguy.body.bounce.y = 0.5;
 badguy.body.gravity.y = 1000;
 badguy.body.collideWorldBounds = true;


 cursors = game.input.keyboard.createCursorKeys();

 // Reset the players velocity (movement)
 player.body.velocity.x = 0;

 if (cursors.left.isDown) {
  // Move to the left
  player.body.velocity.x = -150;

  player.animations.play('left');
 }
 else if (cursors.right.isDown) {
  // Move to the right
  player.body.velocity.x = 150;

  player.animations.play('right');
 }
 else {
  // Stand still
  player.animations.stop();

  player.frame = 4;
 }

 // Allow the player to jump if they are touching the ground.
 if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
  player.body.velocity.y = -350;
 }

 stars = game.add.group();

 stars.enableBody = true;

 // Here we'll create 12 of then evenly spaced apart
 for (var i = 0; i < 12; i++) {
  // Create a star inside of the 'stars' group
  var star = stars.create(i * 70, 0, 'star');

  // Let gravity do its thing
  star.body.gravity.y = 100;

  // This just gives each star a slightly random bounce value
  star.body.bounce.y = 0.7 + Math.random() * 0.2;
 }

 game.physics.arcade.collide(stars, platforms);

 game.physics.arcade.overlap(player, stars, collectStar, null, this);



 scoreText = game.add.text(16, 16, 'score:' + score, {
  fontSize: '32px',
  fill: '#000'
 });


}

function update() {

  // Collide the player and the stars with the platforms
 var hitPlatform = game.physics.arcade.collide(player, platforms);
var hitPlatform = game.physics.arcade.collide(badguy, platforms);
// Reset the players velocity (movement)
player.body.velocity.x = 0;

if (cursors.left.isDown) {
 // Move to the left
 player.body.velocity.x = -150;

 player.animations.play('left');
}
else if (cursors.right.isDown) {
 // Move to the right
 player.body.velocity.x = 150;

 player.animations.play('right');
}
else {
 // Stand still
 player.animations.stop();

 player.frame = 4;
}

// Allow the player to jump if they are touching the ground.
if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
 player.body.velocity.y = -350;
 
 // Reset the players velocity (movement)
player.body.velocity.x = 0;

if (cursors.left.isDown) {
 // Move to the left
 player.body.velocity.x = -150;

 player.animations.play('left');
}
else if (cursors.right.isDown) {
 // Move to the right
 player.body.velocity.x = 150;

 player.animations.play('right');
}
else {
 // Stand still
 player.animations.stop();

 player.frame = 4;
}

// Allow the player to jump if they are touching the ground.
if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
 player.body.velocity.y = -350;
}

}





game.physics.arcade.collide(stars, platforms);

game.physics.arcade.overlap(player, stars, collectStar, null, this);


scoreText.text = "Score: " + score;


}

function collectStar(player, star) {

 // Removes the star from the screem
 star.kill();
score = score + 1;

}