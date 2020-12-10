// This should be a interesting introduction for middle-schoolers to the idea of DNA as a means of storing and transferring information.
// The DNA Writer code uses a simple look-up table where each letter in the English alphabet is assigned a unique three letter nucleotide code. The three letters are chosen from the letters of the DNA bases – AGCT – similar to the way codons are organized in mRNA. Any unknown characters or punctuation are ignored.
import "./styles.css";
import { distance } from "./vector";
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.font = "50px Orbitron, sans-serif";
ctx.fillStyle = "#04fb08";
ctx.fillText("DNA PEN", 10, 50);
// Ready to use the font in a canvas context
// });

let isDrawing = false;
let x = 0;
let y = 0;
let last_x = 0;
let last_y = 0;
// let state = 1;

var button = document.getElementById("testing");
button.addEventListener("click", backgroundClicked);

var emptyString = "";
var index = 0;

var DNAdata = {
  A: "ACT",
  B: "CAT",
  C: "TCA",
  D: "TAC",
  E: "CTA",
  F: "GCT",
  G: "GTC",
  H: "CGT",
  I: "CTG",
  J: "TGC",
  K: "TCG",
  L: "ATC",
  M: "ACA",
  N: "CTC",
  O: "TGT",
  P: "GAG",
  Q: "TAT",
  R: "CAC",
  S: "TGA",
  T: "TAG",
  U: "GAT",
  V: "GTA",
  W: "ATG",
  X: "AGT",
  Y: "GAC",
  Z: "GCA",
  a: "ACT",
  b: "CAT",
  c: "TCA",
  d: "TAC",
  e: "CTA",
  f: "GCT",
  g: "GTC",
  h: "CGT",
  i: "CTG",
  j: "TGC",
  k: "TCG",
  l: "ATC",
  m: "ACA",
  n: "CTC",
  o: "TGT",
  p: "GAG",
  q: "TAT",
  r: "CAC",
  s: "TGA",
  t: "TAG",
  u: "GAT",
  v: "GTA",
  w: "ATG",
  x: "AGT",
  y: "GAC",
  z: "GCA"
};

//Try it
function backgroundClicked() {
  var text = document.getElementById("myText").value;
  var chars = text.split("");
  var togetherString = "";
  for (var i = 0; i < chars.length; i++) {
    togetherString = togetherString + DNAdata[chars[i]];
    console.log(i);
  }
  emptyString = togetherString;
}
function paintStart(x, y) {
  isDrawing = true;
  last_x = x;
  last_y = y;
  ctx.beginPath();
  ctx.font = `${Math.floor(12 + Math.random() * 30)}px 'Orbitron', sans-serif`;
  ctx.fillStyle = "#04fb08";
  // ctx.shadowColor = "#0f9a02";
  // ctx.shadowBlur = 20;
  ctx.fillText(emptyString[index], x, y);
  ctx.stroke();
  console.log(emptyString.length);
  last_moon_x = x;
  last_moon_y = y;
  last_moon_x_b = x;
  last_moon_y_b = y;
}

var distance_stamp = 0;
var distance_accumulator = 0;

// painting alphabet
function paintMove2(x, y) {
  let distance_traveled = distance({ x, y }, { x: last_x, y: last_y });
  distance_stamp += distance_traveled;

  if (distance_stamp > 30) {
    ctx.beginPath();
    ctx.font = `${Math.floor(12 + Math.random() * 10)}px Arial`;
    ctx.font = `${Math.floor(
      12 + Math.random() * 30
    )}px 'Orbitron', sans-serif`;
    ctx.fillStyle = "#04fb08";
    let h_letters = 120;
    let s_letters = Math.floor(Math.random() * 100);
    let l_letters = Math.floor(Math.random() * 100);
    let color_letters =
      "hsl(" + h_letters + ", " + s_letters + "%, " + l_letters + "%)";
    ctx.fillStyle = color_letters;
    // ctx.shadowColor = "#0f9a02";
    // ctx.shadowBlur = 20;
    ctx.fillText(emptyString[index], x, y);
    index++;
    if (index === emptyString.length) {
      index = 0;
    }
    distance_stamp = 0;
    ctx.stroke();
  }
}

var last_moon_x = 0;
var last_moon_y = 0;
var last_moon_x_b = 0;
var last_moon_y_b = 0;

function paintMoveDNA(x, y) {
  let distance_traveled = distance({ x, y }, { x: last_x, y: last_y });
  distance_accumulator += distance_traveled;

  //first DNA strand
  let angle = distance_accumulator / 40;
  let radius = 20;
  let moon_x = x + Math.sin(angle) * radius;
  let moon_y = y + Math.cos(angle) * radius;
  // 20 is radius, how close to pen
  ctx.strokeStyle = "#DC143C";
  ctx.fillStyle = "#DC143C";
  ctx.beginPath();
  let thickness = 4;
  ctx.lineWidth = thickness;
  ctx.moveTo(last_moon_x, last_moon_y);
  ctx.lineTo(moon_x, moon_y);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(moon_x, moon_y, thickness / 2, 0, Math.PI * 2);
  ctx.fill();

  //second DNA strand
  angle += 2;
  let moon_x_b = x + Math.sin(angle) * radius; //using the distance formula from above
  let moon_y_b = y + Math.cos(angle) * radius;

  ctx.beginPath();
  ctx.moveTo(last_moon_x_b, last_moon_y_b);
  ctx.lineTo(moon_x_b, moon_y_b);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "blue";
  ctx.stroke();

  //ladder between DNA strands
  ctx.beginPath();
  ctx.moveTo(moon_x, moon_y);
  ctx.lineTo(moon_x_b, moon_y_b);
  ctx.lineWidth = 1;
  let h_ladders = Math.floor(Math.random() * 360);
  let s_ladders = 90;
  let l_ladders = 60;
  let color_ladders =
    "hsl(" + h_ladders + ", " + s_ladders + "%, " + l_ladders + "%)";
  ctx.strokeStyle = color_ladders;
  ctx.stroke();
  last_x = x;
  last_y = y;
  last_moon_x = moon_x;
  last_moon_y = moon_y;
  last_moon_x_b = moon_x_b;
  last_moon_y_b = moon_y_b;
}

//Paint End
function paintEnd(x, y) {
  isDrawing = false;
}

//--MOUSE EVENTS--//
// mouse down
canvas.addEventListener("mousedown", (e) => {
  x = e.clientX;
  y = e.clientY;
  paintStart(x, y);
});

//mouse move
canvas.addEventListener("mousemove", (e) => {
  if (isDrawing === true) {
    x = e.clientX;
    y = e.clientY;
    paintMove2(x, y);
    paintMoveDNA(x, y);
  }
});

//mouse up
canvas.addEventListener("mouseup", (e) => {
  x = e.clientX;
  y = e.clientY;
  paintEnd(x, y);
});

//if mouse out
canvas.addEventListener("mouseout", (e) => {
  isDrawing = false;
});

// -- TOUCH EVENTS -- //
// touch start
canvas.addEventListener("touchstart", (e) => {
  let touches = Array.from(e.touches);
  let touch = touches[0];
  x = touch.clientX;
  y = touch.clientY;
  paintStart(x, y);
});

//touch move
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();

  let touches = Array.from(e.touches);
  let touch = touches[0];
  if (isDrawing === true) {
    x = touch.clientX;
    y = touch.clientY;
    paintMove2(x, y);
    paintMoveDNA(x, y);
  }
});

//touch end
canvas.addEventListener("touchend", (e) => {
  x = last_x;
  y = last_y;
  paintEnd(x, y);
});
