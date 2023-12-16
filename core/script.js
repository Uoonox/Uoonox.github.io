let ttsEnabled = true;
let matrixEnabled = true;

const speechSynthesis = window.speechSynthesis || window.webkitSpeechSynthesis;

function displayMessage(message, className) {
    const chatLog = document.getElementById("chatLog");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${className}`;
    messageDiv.innerHTML = addLineBreaks(message);
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

document.addEventListener("DOMContentLoaded", function () {
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");

    userInput.addEventListener("keypress", function (event) {
        if (event.which === 13) {
            sendMessage();
        }
    });
    userInput.focus();

    sendButton.addEventListener("click", sendMessage);

    function sendMessage() {
        const userInput = document.getElementById("userInput");
        const message = userInput.value.trim();

        if (message !== "") {
            displayMessage(message, "user-message");
            run(message);
            userInput.value = "";
        }
    }
});
