const FPS = 30
const FRICTION = 2
const SHIP_SIZE = 20
const SHIP_THRUST = 25
const TURN_SPEED = 360

/** @type {HTMLCanvasElement} */
var canv = document.getElementById("gameCanvas")
canv.width = window.innerWidth
canv.height = window.innerHeight
var ctx = canv.getContext("2d")
let ship = new Image()
let laser = new Image()
let about = new Image()
let projects = new Image()

// set up the spaceship object
ship = {
  x: canv.width / 2,
  y: canv.height / 2,
  r: SHIP_SIZE / 2,
  a: (90 / 180) * Math.PI, // convert to radians
  left: false,
  right: false,
  thrusting: false,
  backwards: false,
  firing: false,
  thrust: {
    x: 0,
    y: 0,
  },
}

// laser = {
//   y: ship.thrust.y,
//   x: ship.thrust.x,
//   thrust: {
//     x: 0,
//     y: 0,
//   },
// }

about = {
  x: canv.width / 2 - 10,
  y: canv.height,
}

// set up event handlers
document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)

// set up the game loop
setInterval(update, 1000 / FPS)

function keyDown(/** @type {KeyboardEvent} */ ev) {
  switch (ev.keyCode) {
    case 37: // left arrow (rotate ship left)
      ship.left = true
      break
    case 38: // up arrow (thrust the ship forward)
      ship.thrusting = true
      break
    case 39: // right arrow (rotate ship right)
      ship.right = true
      break
    case 40:
      ship.backwards = true
      break
    case 32:
      ship.firing = true
      break
  }
}

function keyUp(/** @type {KeyboardEvent} */ ev) {
  switch (ev.keyCode) {
    case 37: // left arrow (stop rotating left)
      ship.left = false
      break
    case 38: // up arrow (stop thrusting)
      ship.thrusting = false
      break
    case 39: // right arrow (stop rotating right)
      ship.right = false
      break
    case 40:
      ship.backwards = false
      break
    case 32:
      ship.firing = false
      break
  }
}

// function drawLaser() {
//   console.log("fire")

//   laserShoot()
// }

// function laserShoot() {
//   laser.thrust.y += SHIP_THRUST
// }

function update() {
  // draw space

  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canv.width, canv.height)

  // thrust the ship
  if (ship.thrusting) {
    ship.thrust.y = 0
    ship.thrust.y -= SHIP_THRUST
    console.log(ship.x)
    console.log(canv.x)

    // if (ship.firing) {
    // }
  } else if (ship.backwards) {
    // if (ship.firing) {
    //   drawLaser()
    // }
    ship.thrust.y = 0
    ship.thrust.y += SHIP_THRUST
  } else {
    // if (ship.firing) {
    //   drawLaser()
    // }
    ship.thrust.y /= 1.2
    if (Math.abs(ship.thrust.y) < 2) {
      ship.thrust.y = 0
    }
  }

  if (ship.left) {
    ship.thrust.x = 0
    ship.thrust.x -= SHIP_THRUST
  } else if (ship.right) {
    ship.thrust.x = 0
    ship.thrust.x += SHIP_THRUST
  } else {
    ship.thrust.x /= 1.2
    if (Math.abs(ship.thrust.x) < 2) {
      ship.thrust.x = 0
    }
  }

  if (ship.x <= canv.width / 2 - 10 && ship.y <= 50) {
    console.log("open")
    window.open("./projects.html", "_top")
  }

  if (ship.x >= canv.width / 2 + 10 && ship.y <= 50) {
    console.log("open")
    window.open("./about.html", "_top")
  }

  canv.addEventListener("click", (e) => {
    let { x, y } = getCursorPosition(canv, e)

    if (x <= canv.width / 2 - 20 && y <= 100) {
      window.open("./projects.html", "_top")
    } else if (x >= canv.width / 2 + 20 && y <= 100) {
      window.open("./about.html", "_top")
    }

    function getCursorPosition(canv, e) {
      let x = e.clientX
      let y = e.clientY
      return { x, y }
    }
  })

  // if (ship.firing) {
  //   drawLaser()
  // }

  // ctx.strokeStyle = "yellow"
  // ctx.lineWidth = SHIP_SIZE / 2
  // ctx.beginPath()
  // ctx.moveTo(ship.x, ship.y)
  // ctx.lineTo(ship.x, ship.y + 50)
  // ctx.closePath()
  // ctx.stroke()

  ctx.strokeStyle = "gold"
  ctx.lineWidth = SHIP_SIZE
  ctx.beginPath()
  ctx.moveTo(ship.x, ship.y)
  ctx.lineTo(ship.x, ship.y + 100)

  ctx.closePath()
  ctx.stroke()

  ship.x += ship.thrust.x
  ship.y += ship.thrust.y

  if (ship.x < 0 - ship.r) {
    ship.x = canv.width + ship.r
  } else if (ship.x > canv.width + ship.r) {
    ship.x = 0 - ship.r
  }
  if (ship.y < 0 - ship.r) {
    ship.y = canv.height + ship.r
  } else if (ship.y > canv.height + ship.r) {
    ship.y = 0 - ship.r
  }

  ctx.fillStyle = "red"
  ctx.font = "18px Quantico"
  ctx.fillText("Fly or Click", canv.width / 3 / 6, 30)

  ctx.fillStyle = "red"
  ctx.font = "18px Quantico"
  ctx.fillText("Here For", canv.width / 3 / 6, 50)

  ctx.fillStyle = "red"
  ctx.font = "18px Quantico"
  ctx.fillText("For Projects", canv.width / 3 / 6, 70)

  ctx.strokeStyle = "red"
  ctx.lineWidth = 5
  ctx.beginPath()
  ctx.moveTo(canv.width / 2 - 20, 0)
  ctx.lineTo(canv.width / 2 - 20, 100)
  ctx.closePath()
  ctx.stroke()

  ctx.strokeStyle = "red"
  ctx.lineWidth = 5
  ctx.beginPath()
  ctx.moveTo(canv.width / 2 - 20, 100)
  ctx.lineTo(0 - 20, 100)

  ctx.closePath()
  ctx.stroke()

  ctx.fillStyle = "red"
  ctx.font = "18px Quantico"
  ctx.fillText("Fly or Click", canv.width / 1.5, 30)

  ctx.fillStyle = "red"
  ctx.font = "18px Quantico"
  ctx.fillText("Here For", canv.width / 1.5, 50)

  ctx.fillStyle = "red"
  ctx.font = "18px Quantico"
  ctx.fillText("About Me", canv.width / 1.5, 70)

  ctx.strokeStyle = "red"
  ctx.lineWidth = 5
  ctx.beginPath()
  ctx.moveTo(canv.width / 2 + 20, 0)
  ctx.lineTo(canv.width / 2 + 20, 100)
  ctx.closePath()
  ctx.stroke()

  ctx.strokeStyle = "red"
  ctx.lineWidth = 5
  ctx.beginPath()
  ctx.moveTo(canv.width / 2 + 20, 100)
  ctx.lineTo(canv.width, 100)
  ctx.closePath()
  ctx.stroke()

  ctx.fillStyle = "red"
  ctx.font = "18px Quantico"
  ctx.fillText("use arrow keys to fly", canv.width / 3, canv.height - 20)
}
