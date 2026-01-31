// DOM Elements
const [intentionScreen, executionScreen, goalInput, startBtn, goalDisplay, motivationSection, finishBtn] = 
    ['intentionScreen', 'executionScreen', 'goalInput', 'startBtn', 'goalDisplay', 'motivationSection', 'finishBtn']
    .map(id => document.getElementById(id));

let currentGoal = '';

// Navigation
const showScreen = s => {
    intentionScreen.classList.remove('active');
    executionScreen.classList.remove('active');
    s.classList.add('active');
};

const getFallbackMotivation = () => {
    const sets = [
        ['Execute immediately', 'Ignore how you feel', "Don't stop moving"],
        ['Silence your excuses', 'Do the hard work', 'Results matter only'],
        ['Focus is a choice', 'One task at a time', 'Complete the mission'],
        ['Discipline over motivation', 'Action cures fear', 'Just get started'],
        ['No more delays', 'Attack the objective', 'Finish strong today']
    ];
    return sets[Math.floor(Math.random() * sets.length)];
};

const displayMotivation = statements => {
    motivationSection.innerHTML = statements.map((s, i) => 
        `<p class="motivation-item"><span class="motivation-number">${i + 1}.</span> ${s}</p>`
    ).join('');
};

const generateMotivation = async (goal) => {
    try {
        const res = await fetch('/api/motivation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ goal })
        });

        if (!res.ok) throw new Error();

        const data = await res.json();
        return Array.isArray(data.statements) && data.statements.length > 0
            ? data.statements
            : getFallbackMotivation();

    } catch {
        return getFallbackMotivation();
    }
};

const startSession = async () => {
    currentGoal = goalInput.value.trim();
    if (!currentGoal) return;
    
    goalDisplay.textContent = currentGoal;
    showScreen(executionScreen);
    motivationSection.innerHTML = '<p class="loading-text">Preparing your commands...</p>';
    
    displayMotivation(await generateMotivation(currentGoal));
};

// Event Listeners
goalInput.addEventListener('input', () => startBtn.disabled = !goalInput.value.trim());
goalInput.addEventListener('keypress', e => e.key === 'Enter' && goalInput.value.trim() && startSession());
startBtn.addEventListener('click', startSession);
finishBtn.addEventListener('click', () => {
    goalInput.value = '';
    startBtn.disabled = true;
    currentGoal = '';
    showScreen(intentionScreen);
});