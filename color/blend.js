import "./styles.css";
import { pointsAlongLine } from "./vector.js";
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let pen3_button = document.getElementById("pen3");
let pen1_button = document.getElementById("pen1");
let pen2_button = document.getElementById("pen2");

let restore = document.getElementById("undo");

canvas.width = window.innerWidth; //resolution of canvas
canvas.height = window.innerHeight;

let undoStack = [];
pushState();
function pushState() {
  undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height)); //add new element to array
  // console.log(undoStack.length);
  if (undoStack.length > 50) {
    //can only undo 50 times (saves 10 strokes on canvas at a time otherwise too much data - RGB)
    undoStack.shift();
  }
}
restore.addEventListener("click", function () {
  if (undoStack.length > 1) {
    undoStack.pop();
  }
  let lastElement = undoStack[undoStack.length - 1];
  ctx.putImageData(lastElement, 0, 0);
  console.log(undoStack.length);
});

ctx.fillStyle = "#fffaf0"; //hue, saturation, lightness
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "rgba(20, 0, 0, 0.4)";
ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
// ctx.globalCompositeOperation = "overlay";
// ctx.globalCompositeOperation = "exclusion";
let penDown = false;
let last_x = 0;
let last_y = 0;

pen3_button.addEventListener("click", changeBackground);
pen1_button.addEventListener("click", firstPen);
pen2_button.addEventListener("click", secondPen);

function changeBackground() {
  ctx.fillStyle = "hsl(" + 360 * Math.random() + ", 50%, 40%)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

if (document.getElementById("pen3").clicked == true) {
  changeBackground();
  // document.getElementById('pen1').clicked = false;
}
if (document.getElementById("pen1").clicked == true) {
  firstPen();
  // document.getElementById('pen1').clicked = false;
}

if (document.getElementById("pen2").clicked == true) {
  secondPen();
  // document.getElementById('pen1').clicked = false;
}

function firstPen() {
  function paintStart(x, y) {
    penDown = true;
    last_x = x;
    last_y = y;
  }

  function norm_random(size) {
    return (Math.random() - 0.5) * size;
  }

  function paintMove(x, y) {
    ctx.beginPath();
    let thickness = 2;
    ctx.lineWidth = thickness;
    ctx.moveTo(last_x, last_y);
    ctx.stroke();

    let randomness = 0;
    for (var i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(last_x, last_y);
      ctx.quadraticCurveTo(
        10,
        100,
        x + norm_random(randomness),
        y + norm_random(randomness)
      );
      ctx.stroke();
      ctx.fillStyle = `rgba(${Math.random() * 20 * 110}, 100, ${
        Math.random() * 20 * 110
      }, ${Math.random() * 150 * 1})`;
      ctx.fill();
      last_x = x;
      last_y = y;
    }
  }

  function paintEnd(x, y) {
    pushState();
  }

  ctx.globalCompositeOperation = "difference";
  canvas.addEventListener("mousedown", function (evt) {
    let x = evt.clientX;
    let y = evt.clientY;
    paintStart(x, y);
  });

  canvas.addEventListener("touchstart", function (evt) {
    let touches = Array.from(evt.touches); //touch has array of positions(no clientx, y because can do touch with two fingers vs 1 mousedown)
    let touch = touches[0];
    paintStart(touch.clientX, touch.clientY);
  });

  canvas.addEventListener("mousemove", function (evt) {
    if (penDown == false) {
      return;
    }
    let x = evt.clientX;
    let y = evt.clientY;
    paintMove(x, y);
  });

  canvas.addEventListener("touchmove", function (evt) {
    evt.preventDefault(); //don't do normal browser behavior (ex: two finger zoom)

    let touches = Array.from(evt.touches); //touch has array of positions(no clientx, y because can do touch with two fingers vs 1 mousedown)
    let touch = touches[0]; //is touches[0] the first thing you tap with your finger? - unclear have to experiment (pinky, thumb)

    let x = touch.clientX;
    let y = touch.clientY;
    paintMove(x, y);
  });

  //so registers when mouse leaves the canvas
  canvas.addEventListener("mouseout", function (evt) {
    penDown = false;
  });

  canvas.addEventListener("mouseup", function (evt) {
    penDown = false;
    let x = evt.clientX;
    let y = evt.clientY;
    paintEnd(x, y);
  });

  canvas.addEventListener("touchend", function (evt) {
    let x = last_x;
    let y = last_y;
    paintEnd(x, y);
  });
}

function paintStart2(x, y) {
  penDown = true;
  last_x = x;
  last_y = y;
}

function norm_random2(size) {
  return (Math.random() - 0.5) * size;
}

function paintMove2(x, y) {
  ctx.beginPath();
  let thickness = 2;
  ctx.lineWidth = thickness;
  ctx.moveTo(last_x, last_y);
  ctx.stroke();

  let randomness = 0;
  for (var i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.moveTo(last_x, last_y);
    ctx.quadraticCurveTo(
      10,
      100,
      x + norm_random2(randomness),
      y + norm_random2(randomness)
    );
    ctx.stroke();
    ctx.fillStyle = `rgba(${Math.random() * 20 * 110}, 100, ${
      Math.random() * 20 * 110
    }, ${Math.random() * 150 * 1})`;
    ctx.fill();
    last_x = x;
    last_y = y;
  }
}

function paintEnd2(x, y) {
  pushState();
}

function secondPen() {
  ctx.globalCompositeOperation = "overlay";
  canvas.addEventListener("mousedown", function (evt) {
    let x = evt.clientX;
    let y = evt.clientY;
    paintStart2(x, y);
  });

  canvas.addEventListener("touchstart", function (evt) {
    let touches = Array.from(evt.touches); //touch has array of positions(no clientx, y because can do touch with two fingers vs 1 mousedown)
    let touch = touches[0];
    paintStart2(touch.clientX, touch.clientY);
  });

  canvas.addEventListener("mousemove", function (evt) {
    if (penDown == false) {
      return;
    }
    let x = evt.clientX;
    let y = evt.clientY;
    paintMove2(x, y);
  });

  canvas.addEventListener("touchmove", function (evt) {
    evt.preventDefault(); //don't do normal browser behavior (ex: two finger zoom)

    let touches = Array.from(evt.touches); //touch has array of positions(no clientx, y because can do touch with two fingers vs 1 mousedown)
    let touch = touches[0]; //is touches[0] the first thing you tap with your finger? - unclear have to experiment (pinky, thumb)

    let x = touch.clientX;
    let y = touch.clientY;
    paintMove2(x, y);
  });

  //so registers when mouse leaves the canvas
  canvas.addEventListener("mouseout", function (evt) {
    penDown = false;
  });

  canvas.addEventListener("mouseup", function (evt) {
    penDown = false;
    let x = evt.clientX;
    let y = evt.clientY;
    paintEnd2(x, y);
  });

  canvas.addEventListener("touchend", function (evt) {
    let x = last_x;
    let y = last_y;
    paintEnd2(x, y);
  });
}
