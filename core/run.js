// Replace variables in a string
function replaceVars(str, char, user) {
    const replacements = {
        "{{char}}": char, 
        "{{user}}": user, 
        "<char>": char, 
        "<user>": user, 
        "{{Char}}": char, 
        "{{User}}": user, 
        "<Char>": char, 
        "<User>": user
    };

    Object.entries(replacements).forEach(([old, newStr]) => {
        if (str.includes(old)) {
            str = str.split(old).join(newStr);
        }
    });

    return str;
}

// Format string by removing leading/trailing empty lines and reducing multiple empty lines to one
function formatString(str) {
    str = str.replace(/^\n+|\n+$/g, '');
    return str.replace(/\n\s*\n/g, '\n\n');
}

// Remove the last sentence if it's incomplete
function removeLastSentenceIfInvalid(str) {
    return str.replace(/[^.?!'"“”‘’]\s*[^.?!'"“”‘’]*$/, '');
}

// Calculate the total number of tokens in the log
function calculateTotalTokens() {
    return log.reduce((totalWords, logEntry) => {
        const words = logEntry.split(/\s+/);
        return totalWords + words.length + words.reduce((count, word) => {
            return count + (word.match(/[^A-Za-z0-9]/g) || []).length;
        }, 0);
    }, 0);
}

// Manage memory by removing log entries until total tokens are within the limit
function manageMemory() {
    if (calculateTotalTokens() > MAX_TOKENS_LIMIT) {
        while (calculateTotalTokens() > MAX_TOKENS_LIMIT) {
            const removedEntry = log.shift();
            console.log(`Removed entry due to token limit: ${removedEntry}`);
        }
    }
}

// Main function to run the chat
async function run(text) {
    const request = {
        prompt: `### Instruction:\n${inst}\n\n### ${char}'s Information:\n${charinfo}\n\n### Chat start:\n${log.join("")}${user}:\n${text}\n\n${char}:\n`,
        stop: [`${user}:`, `${char}:`,`###`,`---`],
        temperature: 0.9,
        top_p: 0.9,
        max_tokens: 300
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

        let result = (await response.json()).choices[0].text;
        result = formatString(result);
        result = removeLastSentenceIfInvalid(result);
        log.push(`${user}:\n${text}\n\n${char}:\n${result}\n\n`);
        
        // Save the updated log to localStorage
        localStorage.setItem('chatLog', JSON.stringify(log));
        manageMemory();
        if (ttsEnabled) {
            speakText(result);
        }
        result = result.replace(/\n/g, '<br>');
        displayMessage(result, "ai-message");
    } catch (error) {
        console.error("Error:", error.message);
    }
}


const API_BASE = config.apikey;
const URI = `${API_BASE}/v1/completions`;

const MAX_TOKENS_LIMIT = 5000;

// Initialize user and char
let user = _user;
let char = _char;

// Replace variables in instructions, charinfo, and firstmsg
let inst = replaceVars(_inst, char, user);
let charinfo = replaceVars(_charinfo, char, user);
let firstmsg = replaceVars(_firstmsg, char, user);

// Load the chat log from localStorage or initialize a new one
let log = JSON.parse(localStorage.getItem('chatLog')) || [`${char}:\n${firstmsg}\n\n`];
