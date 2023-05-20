let stars = []
const spread = 300
let speedSlider

// let canvasWidth, canvasHeight

function generateRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    // const alphabet = "10"
    return alphabet[Math.floor(Math.random() * alphabet.length)]
}

function generateRandomColor() {
    const rc = Math.floor(random() * 3)
    let col = createVector(0, 0, 0)
    // if (rc === 0) {
    //     col = createVector(255, 0, 0)
    // } else if (rc === 1) {
    //     col = createVector(0, 255, 0)
    // } else {
    //     col = createVector(0, 0, 255)
    // }
    col.x = random() * 255
    col.y = random() * 255
    col.z = random() * 255
    return col
}

function setup() {
    // canvasWidth = window.innerWidth
    // canvasHeight = window.innerHeight
    createCanvas(windowWidth, windowHeight)
    speedSlider = createSlider(0, 20, 1, .1)
    const minZ = 10
    const maxZ = windowWidth
    for (let i = 0; i < 500; i++) {
        stars[i] = {
            text: generateRandomLetter(),
            color: generateRandomColor(),
            pos: createVector(
                random(-width * spread, width * spread),
                random(-height * spread, height * spread),
                random(minZ, maxZ)
            )
        }
        stars[i].pz = stars[i].pos.z
    }
}

function draw() {
    background(0, 0, 0)
    translate(width/2, height/2)

    // stroke(0, 204, 255)
    // fill(106, 38, 205)
    // fill(32,194,14)

    for (const star of stars) {
        let d = map(star.pos.z, 0, width, 20, 1)
        let x = star.pos.x / star.pos.z
        let y = star.pos.y / star.pos.z
        let px = star.pos.x / star.pz
        let py = star.pos.y / star.pz
        // textSize(d+10)
        // text(star.text, x, y)
        fill(star.color.x, star.color.y, star.color.z)
        noStroke()
        circle(x, y, d)
        stroke(star.color.x, star.color.y, star.color.z)
        line(x, y, px, py)
        const col = Math.floor(random() * 3)
        // if (col === 0) {
        //     fill(255, 0, 0)
        // } else if (col === 1) {
        //     fill(0, 255, 0)
        // } else {
        //     fill(0, 0, 255)
        // }
        // fill(Math.floor(random()) * 255, Math.floor(random()) * 255, Math.random())
        star.pz = star.pos.z
        star.pos.z -= 10 * speedSlider.value()
        if (star.pos.z < 10) {
            star.pos.x = random(-width * spread, width * spread)
            star.pos.y = random(-height * spread, height * spread)
            star.pos.z = width
            star.pz = width
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}