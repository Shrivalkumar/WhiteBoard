const canvas = document.querySelector("#whiteBoard");
const ctx = canvas.getContext("2d");

const penSlide = document.querySelector("#pen-width");
const inkColor = document.querySelectorAll(".color-switch");

const penbbutton = document.getElementById("pen");
const eraserbbutton = document.getElementById("eraser");
const pointerbbutton = document.getElementById("pointer");
const eraseAllbbutton = document.getElementById("erase-all");

const undobbutton = document.getElementById("undo");

const highlighter = document.getElementById("highlighter");

let isDrawing = false;
let penWidth = 3;
let selectedcolor = "#000000";
let selectedTool = "pen";

let canvasHistory = [];
let historyStep = -1;
// Defining the characteristics of the pen
window.addEventListener("load", function () {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = penWidth;
  ctx.strokeStyle = selectedcolor;
  saveMoves();
});
const restore = (e) => {
  if (historyStep > 0) {
    historyStep--;
    let canvasPic = new Image();
    canvasPic.src = canvasHistory[historyStep];
    canvasPic.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(canvasPic, 0, 0);
    };
  }
};

//function for saving the moves for undo
const saveMoves = () => {
  if (historyStep < canvasHistory.length - 1) {
    canvasHistory = canvasHistory.slice(0, historyStep + 1);
  }
  canvasHistory.push(canvas.toDataURL());
  historyStep++;
};

const startDraw = (e) => {
  isDrawing = true;
  ctx.beginPath();
  ctx.lineWidth = penWidth;
  ctx.moveTo(e.offsetX, e.offsetY); // Path of the pen to be traced
};

const drawing = (e) => {
  if (!isDrawing) {
    return;
  }
  if (selectedTool === "pen") {
    ctx.globalCompositeOperation = "source-over"; // Default way for the pen to draw
    ctx.strokeStyle = selectedcolor;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (selectedTool === "eraser") {
    ctx.globalCompositeOperation = "destination-out"; // Eraser mode
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.stroke();
  } else if (selectedTool === "pointer") {
    isDrawing = false;
  } else if (selectedTool === "highlighter") {
    ctx.globalCompositeOperation = "multiply"; // Highlighter mode
    ctx.strokeStyle = selectedcolor;
    ctx.lineWidth = 25;
    ctx.globalAlpha = 0.13;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
};

//undo button
undobbutton.addEventListener("click", restore);

highlighter.addEventListener("click", function () {
  isDrawing = false;
  selectedTool = "highlighter";
  ctx.globalCompositeOperation = "multiply";
  ctx.strokeStyle = selectedcolor;
  ctx.lineWidth = 25;
  ctx.globalAlpha = 0.13;
  ctx.lineTo(e.offsetX, e.offsetY);
});

eraseAllbbutton.addEventListener("click", function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

pointerbbutton.addEventListener("click", function () {
  isDrawing = false;
  selectedTool = "pointer";
});

eraserbbutton.addEventListener("click", function () {
    ctx.globalCompositeOperation = "destination-out";
  isDrawing = false;
  selectedTool = "eraser";
  
});

penbbutton.addEventListener("click", function () {
  isDrawing = true;
  selectedTool = "pen";
  ctx.globalCompositeOperation = "source-over";
});

// Event listener for changing pen width
penSlide.addEventListener("input", () => {
  penWidth = penSlide.value;
  ctx.lineWidth = penWidth;
});

// Event listeners for changing pen color
inkColor.forEach((color) => {
  color.addEventListener("click", () => {
    inkColor.forEach((btn) => btn.classList.remove("selected-color"));
    color.classList.add("selected-color");
    selectedcolor = color.dataset.color;
    ctx.strokeStyle = selectedcolor;
  });
});

// Start drawing
canvas.addEventListener("mousedown", (e) => {
  saveMoves();
  startDraw(e);
});
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", function () {
  isDrawing = false;
  ctx.closePath();
});
