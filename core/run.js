const API_BASE = config.apikey;
const URI = `${API_BASE}/v1/completions`;
const log = ["Uoonox:\nHi I'm Uoonox, the program with the highest intelligence.\n"];

async function run(text) {
    const request = {
        prompt: `${log.join("")}User:\n${text}\nUoonox:\n`,
        stop: ["User:", "Uoonox:"],
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

        if (ttsEnabled) {
            speakText(result);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

function addLineBreaks(message) {
    return message.replace(/(\d+\.\s)/g, "<br><br>$1");
}
