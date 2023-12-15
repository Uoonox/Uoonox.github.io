document.addEventListener("DOMContentLoaded", function () {
    const API = "https://mt-casting-wednesday-les.trycloudflare.com";
    const URI = `${API}/v1/completions`;
    const log = ["Uoonox:\nHello.\n"];
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");

    userInput.addEventListener("keypress", function (event) {
        if (event.which === 13) {
            sendMessage();
        }
    });
    userInput.focus();

    sendButton.addEventListener("click", sendMessage);

    async function run(text) {
        const request = {
            prompt: log.join("") + `User:\n${text}\nUoonox:\n`,
            stop: ["User:"],
            temperature: 0.9,
            top_p: 0.9,
            max_tokens: 250
        };

        try {
            const response = await fetch(URI, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }

            const result = (await response.json()).choices[0].text;
            log.push(`User:\n${text}\nUoonox:\n${result}\n`);
            displayMessage(result, "ai-message");
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    function displayMessage(message, className) {
        const chatLog = document.getElementById("chatLog");
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${className}`;
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
        const message = userInput.value.trim();

        if (message !== "") {
            displayMessage(message, "user-message");
            run(message);
            userInput.value = "";
        }
    }
});
