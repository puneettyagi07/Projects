const textArea = document.querySelector('.liveTextArea');
const charNumDisplay = document.querySelector('.charNum');
const wordNumDisplay = document.querySelector('.wordNum');
const charParagraph = document.querySelector('.char');

const passwordInput = document.querySelector('.password');
const indicatorDisplay = document.querySelector('.indicator');
const indicatorMessageDisplay = document.querySelector('.indicatorMessage');

// *** WIDGET 1: LIVE TEXT ANALYZER ***
textArea.addEventListener('input', () => {
    const text = textArea.value;
    const charCount = text.length;

    let wordCount = 0;
    let inWord = false;

    for (let i = 0; i < text.length; i++) {
        if (text[i] !== " " && text[i] !== "\n") {
            if (inWord === false) {
                wordCount++;
                inWord = true;
            }
        } else {
            inWord = false;
        }
    }

    charNumDisplay.textContent = charCount;
    wordNumDisplay.textContent = wordCount;

    if (charCount > 280) {
        charParagraph.style.color = '#ef4444';
    } else {
        charParagraph.style.color = 'gray';
    }
});

// --- WIDGET 2: REAL-TIME PASSWORD STRENGTH CHECKER ---
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;

    if (password.length === 0) {
        indicatorMessageDisplay.textContent = 'Enter a password';
        indicatorMessageDisplay.style.color = 'gray';
        indicatorDisplay.style.width = '0%';
        indicatorDisplay.style.backgroundColor = 'transparent';
        return;
    }

    let hasNumber = false;
    let hasSpecial = false;
    const specialChars = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/";

    for (let i = 0; i < password.length; i++) {
        let char = password[i];

        if (char >= '0' && char <= '9') {
            hasNumber = true;
        }

        if (specialChars.includes(char)) {
            hasSpecial = true;
        }
    }

    let score = 0;
    if (password.length > 5) score++;
    if (password.length >= 8) score++;
    if (hasNumber === true) score++;
    if (hasSpecial === true) score++;

    if (score <= 2) {
        indicatorMessageDisplay.textContent = 'Weak';
        indicatorMessageDisplay.style.color = 'red';
        indicatorDisplay.style.width = '33%';
        indicatorDisplay.style.backgroundColor = 'red';
    } else if (score === 3) {
        indicatorMessageDisplay.textContent = 'Moderate';
        indicatorMessageDisplay.style.color = 'orange';
        indicatorDisplay.style.width = '66%';
        indicatorDisplay.style.backgroundColor = 'orange';
    } else {
        indicatorMessageDisplay.textContent = 'Strong!';
        indicatorMessageDisplay.style.color = 'green';
        indicatorDisplay.style.width = '100%';
        indicatorDisplay.style.backgroundColor = 'green';
    }
});

// --- TOGGLE PASSWORD EYE ICON LOGIC ---

const togglePasswordBtn = document.querySelector('.togglePasswordBtn');

// SVG Icon Strings
const eyeOpenSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;

const eyeClosedSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

togglePasswordBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordBtn.innerHTML = eyeOpenSVG;
    } else {
        passwordInput.type = 'password';
        togglePasswordBtn.innerHTML = eyeClosedSVG;
    }
});