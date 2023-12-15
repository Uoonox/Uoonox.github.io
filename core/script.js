document.addEventListener("DOMContentLoaded", function () {
    const API = "https://discipline-investments-bracelet-ana.trycloudflare.com";
    const URI = `${API}/v1/completions`;
    const log = ["Ai:\nHello.\n"];
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");

    if (userInput) {
        userInput.addEventListener("keypress", function (event) {
            if (event.which === 13) {
                sendMessage();
            }
        });
        userInput.focus();
    } else {
        console.error("Could not find the 'userInput' element.");
    }

    if (sendButton) {
        sendButton.addEventListener("click", sendMessage);
    } else {
        console.error("Could not find the 'sendButton' element.");
    }

    function run(text) {
        const request = {
            prompt: log.join("") + `User:\n${text}\nAi:\n`,
            stop: ["User:"],
            temperature: 0.9,
            top_p: 0.9,
            max_tokens: 250
        };
        
        const xhr = new XMLHttpRequest();
        xhr.open("POST", URI, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const result = response.choices[0].text;
                log.push(`User:\n${text}\nAi:\n${result}\n`);
                displayMessage(result, "ai-message");
            }
        };

        xhr.send(JSON.stringify(request));
    }

    function displayMessage(message, className) {
        const chatLog = document.getElementById("chatLog");
        const messageDiv = document.createElement("div");
        messageDiv.className = "message " + className;
        messageDiv.innerHTML = addLineBreaks(message);
        chatLog.appendChild(messageDiv);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function addLineBreaks(message) {
        message = message.replace(/(\d+\.\s)/g, "<br>$1");
        return message;
    }

    function sendMessage() {
        const userInput = document.getElementById("userInput");
        const message = userInput.value;

        if (message.trim() !== "") {
            displayMessage(message, "user-message");
            run(message);
            userInput.value = "";
        }
    }
});
