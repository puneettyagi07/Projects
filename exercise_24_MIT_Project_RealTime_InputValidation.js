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

    // Calculate word count ignoring multiple spaces
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

    // Update DOM counts
    charNumDisplay.textContent = charCount;
    wordNumDisplay.textContent = wordCount;

    // Turn character text red if limit exceeds 280 characters
    if (charCount > 280) {
        charParagraph.style.color = '#ef4444';
    } else {
        charParagraph.style.color = 'gray';
    }
});

// --- WIDGET 2: REAL-TIME PASSWORD STRENGTH CHECKER ---
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;

    // Handle empty state
    if (password === '') {
        indicatorMessageDisplay.textContent = 'Enter a password';
        indicatorMessageDisplay.style.color = 'gray';
        indicatorDisplay.style.width = '0%';
        indicatorDisplay.style.backgroundColor = 'transparent';
        return;
    }

    // Evaluate Criteria Score
    let score = 0;
    if (password.length > 5) score++;
    if (password.length >= 8) score++;
    if (/\d/.test(password)) score++;            // Regex: Contains at least one digit
    if (/[^a-zA-Z0-9]/.test(password)) score++;   // Regex: Contains at least one special character

    // Update Strength Indicator Bar & Message based on score
    if (score <= 2) {
        indicatorMessageDisplay.textContent = 'Weak';
        indicatorMessageDisplay.style.color = '#ef4444';
        indicatorDisplay.style.width = '33%';
        indicatorDisplay.style.backgroundColor = '#ef4444';
    } else if (score === 3) {
        indicatorMessageDisplay.textContent = 'Moderate';
        indicatorMessageDisplay.style.color = '#f59e0b';
        indicatorDisplay.style.width = '66%';
        indicatorDisplay.style.backgroundColor = '#f59e0b';
    } else if (score === 4) {
        indicatorMessageDisplay.textContent = 'Strong!';
        indicatorMessageDisplay.style.color = '#22c55e';
        indicatorDisplay.style.width = '100%';
        indicatorDisplay.style.backgroundColor = '#22c55e';
    }
});

