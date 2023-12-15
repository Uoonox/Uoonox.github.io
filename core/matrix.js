    const canvas = document.getElementById("matrixRain");
    const ctx = canvas.getContext("2d");

    function setupCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    setupCanvas();

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+[]{}|;:'\",.<>/?`~";
    const matrixArray = matrix.split("");

    const fontSize = 15;
    let columns = canvas.width / fontSize;

    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }

    let resizeTimeout;

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00FF00";
        ctx.font = `${fontSize}px Courier New`;

        const numDrops = drops.length;

        for (let i = 0; i < numDrops; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    function resizeCanvas() {
        setupCanvas();
        columns = canvas.width / fontSize;
        drops.length = 0;
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
        }

        draw();
    }

    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 200);
    }

    function matrixRain() {
        draw();
        requestAnimationFrame(matrixRain);
    }

    window.addEventListener("resize", handleResize);

    matrixRain();
