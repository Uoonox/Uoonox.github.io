let ttsEnabled = false;
const speechSynthesis = window.speechSynthesis || window.webkitSpeechSynthesis;

function displayMessage(message, className) {
    const chatLog = document.getElementById("chatLog");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${className}`;
    messageDiv.innerHTML = message;
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
    
    function sendFirstMessage() {
        let storedLog = JSON.parse(localStorage.getItem('chatLog'));
        document.title = `Uoonox - ${char}`;

        if (storedLog && storedLog.length > 0) {
            storedLog.forEach(logEntry => {
                const messages = logEntry.split('\n\n').filter(message => message.trim() !== '');
                messages.forEach(message => {
                    let messageType;
                    let formattedMessage;
                    if (message.includes(`${user}:`)) {
                        messageType = "user-message";
                        formattedMessage = message.replace(`${user}:\n`, '');
                    } else if (message.includes(`${char}:`)) {
                        messageType = "ai-message";
                        formattedMessage = message.replace(`${char}:\n`, '');
                    }
                    if (formattedMessage) {
                        formattedMessage = formattedMessage.replace(/\n/g, '<br>');
                        displayMessage(formattedMessage, messageType);
                    }
                });
            });
        } else {
            let formattedFirstMsg = firstmsg.replace(/\n/g, '<br>');
            displayMessage(formattedFirstMsg, "ai-message");
        }
    }

    sendFirstMessage();
});

document.getElementById('memoryDeleteButton').addEventListener('click', () => {
    localStorage.removeItem('chatLog');
    location.reload();
});

