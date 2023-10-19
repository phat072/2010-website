const countsNeeded = 7;
let counts = 1;

const present = document.querySelector(".present");
present.addEventListener("click", () => {
  counts += 1;
  present.style.setProperty("--count", Math.ceil(counts / 2));
  present.classList.add("animate");
  setTimeout(() => {
    present.classList.remove("animate");
  }, 300);

  if (counts >= countsNeeded) {
    present.classList.add("open");
    setTimeout(() => {
      const gift = document.querySelector(".wiggle-container");
      gift.style.display = "none";
    }, 1000);
    setTimeout(() => {
      document.getElementById("card").classList.add("card-show");
      document.getElementById("card-div").style.zIndex = "1";
    }, 3500);
  }
});

const card = document.getElementById("card");
const cardText = card.querySelector("h4");
const cardDiv = document.createElement("card-div");
// Set the width of the card element to 100% on screens with a width less than or equal to 400px.

const screenWidth = window.innerWidth;
console.log(screenWidth);

if (screenWidth <= 720) {
  // Set the width of the card element to 100% on screens with a width less than or equal to 400px.
  cardDiv.style.justifyContent = "center";
  cardDiv.style.alignItems = "center";
  card.style.width = "70%";
  card.style.marginTop = "70px";
  card.style.marginLeft = "15%";
  cardText.style.fontSize = "60px";
} else if (screenWidth > 720) {
  console.log(screenWidth);
  // Set the width to 350px for larger screens.
  cardDiv.style.position = "absolute";
  cardDiv.style.width = "70%";
  cardDiv.style.height = "70%";
  card.style.marginTop = "10%";
  card.style.marginLeft = "0%%";
  cardText.style.fontSize = "20px";
}

const canvas = document.querySelector("#present_can"); // Sử dụng # để chọn phần tử có id là "present_can"
const ctx = canvas.getContext("2d");

let width;
let height;
let lastNow;
let snowflakes;
let maxSnowflakes = 300;

const rand = (min, max) => min + Math.random() * (max - min);

class Snowflake {
  constructor() {
    this.spawn(true);
  }

  spawn(anyY = false) {
    this.x = rand(0, width);
    this.y = anyY === true ? rand(-50, height + 50) : rand(-50, -10);
    this.xVel = rand(-0.05, 0.05);
    this.yVel = rand(0.02, 0.1);
    this.angle = rand(0, Math.PI * 2);
    this.angleVel = rand(-0.001, 0.001);
    this.size = rand(5, 15);
    this.sizeOsc = rand(0.01, 0.5);
  }

  update(elapsed) {
    const xForce = rand(-0.001, 0.001);

    if (Math.abs(this.xVel + xForce) < 0.075) {
      this.xVel += xForce;
    }

    this.x += this.xVel * elapsed;
    this.y += this.yVel * elapsed;
    this.angle += this.xVel * 0.05 * elapsed;

    if (
      this.y - this.size > height ||
      this.x + this.size < 0 ||
      this.x - this.size > width
    ) {
      this.spawn();
    }

    this.render();
  }

  render() {
    ctx.save();
    const { x, y, size } = this;
    ctx.beginPath();
    ctx.arc(x, y, size * 0.2, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
  }
}

function render(now) {
  requestAnimationFrame(render);

  const elapsed = now - lastNow;
  lastNow = now;

  ctx.clearRect(0, 0, width, height);
  if (snowflakes.length < maxSnowflakes) {
    snowflakes.push(new Snowflake());
  }

  ctx.strokeStyle = "rgba(255, 255, 255, .5)";
  ctx.fillStyle = "rgba(255, 255, 255, .5)";

  snowflakes.forEach((snowflake) => snowflake.update(elapsed, now));
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  maxSnowflakes = Math.max(width / 10, 100);
}

function pause() {
  cancelAnimationFrame(render);
}
function resume() {
  lastNow = performance.now();
  requestAnimationFrame(render);
}

function init() {
  snowflakes = [];
  resize();
  render((lastNow = performance.now()));
}

window.addEventListener("resize", resize);
window.addEventListener("blur", pause);
window.addEventListener("focus", resume);

init();

function loop() {
  stuff.unshift(stuff.pop());

  window.location.hash = stuff.join();

  setTimeout(loop, 250);
}

loop();
