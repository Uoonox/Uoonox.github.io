const speakText = (text) => {
    let speech = new SpeechSynthesisUtterance();
    speech.text = text;
    let englishVoices = speechSynthesis.getVoices().filter(voice => voice.lang.startsWith('en'));
    speech.voice = englishVoices[3];
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.lang = 'en';
    speech.onstart = function() {
        console.log("Speech started");
    };
    speech.onend = function() {
        console.log("Speech ended");
    };
    speech.onerror = function(event) {
        console.error("Speech error:", event.error);
    };
    speech.onpause = function() {
        console.log("Speech paused");
    };
    
    speechSynthesis.speak(speech);
};
