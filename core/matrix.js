const canvas = document.getElementById("matrixRain");
const ctx = canvas.getContext("2d");
const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+[]{}|;:'\",.<>/?`~";
const matrixArray = matrix.split("");
const fontSize = 15;
const font = `${fontSize}px Courier New`;
const fontColor = "#00FF00";
const bgColor = "rgba(0, 0, 0, 0.05)";
let columns, drops, resizeTimeout;

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
}

function initializeDrops() {
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }
}

function resizeCanvas() {
    setupCanvas();
    initializeDrops();
}

function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 200);
}

function draw() {
    if (!matrixEnabled) return;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = fontColor;
    ctx.font = font;

    for (let i = 0; i < columns; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

window.addEventListener("resize", handleResize);

function matrixRain() {
    draw();
    requestAnimationFrame(matrixRain);
}

window.onload = function () {
    setupCanvas();
    initializeDrops();
    matrixRain();
};
