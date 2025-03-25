// Variables for voice control
let recognition;
let recognizing = false;

const homeBtn = document.getElementById("homeBtn");
const coursesBtn = document.getElementById("coursesBtn");
const aboutBtn = document.getElementById("aboutBtn");
const contentSection = document.getElementById("content");
const voiceFeedback = document.getElementById("voiceFeedback");
const startVoiceBtn = document.getElementById("startVoiceBtn");

const voiceCommands = {
    "Go to Courses": () => {
        contentSection.innerHTML = "<h2>Courses</h2><p>Browse our wide range of courses!</p>";
        voiceFeedback.textContent = "Navigating to Courses...";
    },
    "Show About": () => {
        contentSection.innerHTML = "<h2>About</h2><p>This is a learning platform where you can explore various topics and improve your skills.</p>";
        voiceFeedback.textContent = "Navigating to About section...";
    },
    "Show Home": () => {
        contentSection.innerHTML = "<h2>Home</h2><p>Click on any of the buttons above to learn more about each section!</p>";
        voiceFeedback.textContent = "Navigating to Home...";
    },
};

// Function to start voice recognition
function startVoiceRecognition() {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
        recognizing = true;
        voiceFeedback.textContent = "Listening for commands...";
    };

    recognition.onend = () => {
        recognizing = false;
        voiceFeedback.textContent = "Voice command listening ended.";
    };

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript;
        voiceFeedback.textContent = `You said: ${command}`;
        if (voiceCommands[command]) {
            voiceCommands[command]();
        } else {
            voiceFeedback.textContent = "Command not recognized. Please try again.";
        }
    };

    recognition.start();
}

// Button click events
homeBtn.addEventListener("click", () => {
    contentSection.innerHTML = "<h2>Home</h2><p>Click on any of the buttons above to learn more about each section!</p>";
});

coursesBtn.addEventListener("click", () => {
    contentSection.innerHTML = "<h2>Courses</h2><p>Browse our wide range of courses!</p>";
});

aboutBtn.addEventListener("click", () => {
    contentSection.innerHTML = "<h2>About</h2><p>This is a learning platform where you can explore various topics and improve your skills.</p>";
});

// Start voice recognition on button click
startVoiceBtn.addEventListener("click", () => {
    if (!recognizing) {
        startVoiceRecognition();
    }
});
