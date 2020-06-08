let tankImage, invadersImages = [];
let tank, bullets = [],
  invaders = [],
  score = 0;

function preload() {
  tankImage = loadImage("images/tank.png");
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      invadersImages.push(loadImage(`images/invader${i + 1}.png`));
    }
  }
}

function setup() {
  createCanvas(400, 600);
  tank = {
    x: width / 2 - tankImage.width / 2,
    y: height - tankImage.height - 5,
    xspeed: 0,
    speed: 5,
    update: () => {
      tank.x += tank.xspeed * tank.speed;
      tank.x = constrain(tank.x, 0, width - tankImage.width);
    }
  };
  const len = 5;
  for (let x = 0; x <= len; x++) {
    invaders.push(new Invader(x * 40, 45, invadersImages[0]));
    for (let y = 0; y <= 5; y++) {
      invaders.push(new Invader(x * 40, y * 20 + 65, invadersImages[y]));
    }
  }
}

function draw() {
  background(0);
  stroke(255);
  fill(255);
  textSize(20);
  text(score, width / 2, 28);
  if (invaders.length == 0) {
    gameDone();
  }
  tank.update();
  image(tankImage, tank.x, tank.y, tankImage.width / 2, tankImage.height / 2);
  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].dir == -1)
      bullets[i].y -= 5;
    rect(bullets[i].x, bullets[i].y, 5, 7);

    for (let j = 0; j < invaders.length; j++) {
      if (invaders[j].collides(bullets[i])) {
        score++;
        invaders.splice(j, 1);
        bullets.splice(i, 1);
        break;
      }
    }
  }

  let randomNum = random(0, 1000);
//   if (randomNum > 138 && randomNum < 352) {
//     console.log("Yes");
//     bullets.push({
//       x: random(0, width),
//       y: invaders[0].y,
//       dir: 1
//     });
    
//   }

  let edge = false;

  for (let i = 0; i < invaders.length; i++) {
    if (invaders[i].y >= height) {
      gameDone();
    }
    invaders[i].update();
    invaders[i].show();
    if (invaders[i].x == width - invaders[i].w || invaders[i].x == 0) {
      edge = true;
    }
  }

  if (edge) {
    for (const invader of invaders) {
      invader.shiftDown();
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    tank.xspeed = -1;
  } else if (keyCode === RIGHT_ARROW) {
    tank.xspeed = 1;
  } else if (key === ' ') {
    bullets.push({
      x: tank.x + tankImage.width / 2 - 20,
      y: tank.y,
      dir: -1
    });
  }
}

function keyReleased() {
  if (key != ' ')
    tank.xspeed = 0;
}

function gameDone() {

  clearInterval(interval)
  tank = null;
  bullets = null;
  background(0);;
  noLoop();
}