// 1. Оновлений масив з "Кібер-девізами"
const signs = [
    { name: 'Aries', motto: 'I Execute' }, { name: 'Taurus', motto: 'I Accumulate' },
    { name: 'Gemini', motto: 'I Multi-task' }, { name: 'Cancer', motto: 'I Feel the Vibe' },
    { name: 'Leo', motto: 'I Lead' }, { name: 'Virgo', motto: 'I Refactor' },
    { name: 'Libra', motto: 'I Balance' }, { name: 'Scorpio', motto: 'I Penetrate' },
    { name: 'Sagittarius', motto: 'I Explore' }, { name: 'Capricorn', motto: 'I Architect' },
    { name: 'Aquarius', motto: 'I Innovate' }, { name: 'Pisces', motto: 'I Dream in Code' }
];

const zodiacElements = {
    'Aries': 'Fire', 'Leo': 'Fire', 'Sagittarius': 'Fire',
    'Taurus': 'Earth', 'Virgo': 'Earth', 'Capricorn': 'Earth',
    'Gemini': 'Air', 'Libra': 'Air', 'Aquarius': 'Air',
    'Cancer': 'Water', 'Scorpio': 'Water', 'Pisces': 'Water'
};

const grid = document.getElementById('zodiacGrid');
const modal = document.getElementById('fortuneModal');
const sign1Sel = document.getElementById('sign1');
const sign2Sel = document.getElementById('sign2');

// Ініціалізація карток і списків
signs.forEach(signObj => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${signObj.name}</h3><span class="sign-motto">"${signObj.motto}"</span>`;
    card.onclick = () => getDailyFortune(signObj.name);
    grid.appendChild(card);

    sign1Sel.add(new Option(signObj.name, signObj.name));
    sign2Sel.add(new Option(signObj.name, signObj.name));
});

// IT-Прикмети
const omens = [
    "Deploying on Friday leads to a weekend of hotfixes.",
    "Spilling coffee on the keyboard brings unexpected hardware upgrades.",
    "An untested code will always fail in production.",
    "Clearing the cache solves 90% of your problems today.",
    "If it works on the first try, you probably missed a critical bug.",
    "A clean desk is a sign of a cluttered hard drive."
];
document.getElementById('omenText').innerText = omens[Math.floor(Math.random() * omens.length)];

// API Прогноз
async function getDailyFortune(sign) {
    const modalText = document.getElementById('fortuneText');
    const modalTitle = document.getElementById('signTitle');
    document.getElementById('luckyAttributes').style.display = "none";
    document.getElementById('saveBtn').innerText = "Save to Archive";
    
    modalTitle.innerText = sign;
    modalText.innerText = "Consulting the stars...";
    modal.style.display = "block";

    try {
        const response = await fetch(`https://sandipbgt.com/theastrologer/api/horoscope/${sign.toLowerCase()}/today/`);
        if (!response.ok) throw new Error('Network issues');
        const data = await response.json();
        
        const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#a855f7', '#ec4899'];
        const colorNames = ['Ruby Red', 'Amber Orange', 'Solar Yellow', 'Emerald Green', 'Neon Cyan', 'Deep Blue', 'Cyber Purple', 'Hot Pink'];
        const colorIndex = Math.floor(Math.random() * colors.length);
        
        document.getElementById('luckyNumbers').innerText = Array.from({length: 3}, () => Math.floor(Math.random() * 99) + 1).join(', ');
        document.getElementById('luckyColorBox').style.backgroundColor = colors[colorIndex];
        document.getElementById('luckyColorName').innerText = colorNames[colorIndex];
        document.getElementById('luckyAttributes').style.display = "flex";
        
        modalText.innerText = data.horoscope;
    } catch (error) {
        modalText.innerText = "The stars are silent. Please check your internet connection.";
    }
}

// Сумісність
function checkCompatibility() {
    const s1 = sign1Sel.value, s2 = sign2Sel.value;
    const el1 = zodiacElements[s1], el2 = zodiacElements[s2];
    let baseScore = (el1 === el2) ? 85 : ((el1 === 'Fire' && el2 === 'Air') || (el1 === 'Air' && el2 === 'Fire') || (el1 === 'Earth' && el2 === 'Water') || (el1 === 'Water' && el2 === 'Earth')) ? 75 : 50;
    const msg = (baseScore === 85) ? `Perfect harmony! Both share ${el1}.` : (baseScore === 75) ? "Great match! Elements complement." : "A challenging but exciting dynamic.";
    document.getElementById('compResult').innerHTML = `Compatibility: <strong>${baseScore + Math.floor(Math.random() * 15)}%</strong> <br> <span style="font-size: 0.9em; color: #94a3b8;">${msg}</span>`;
}

// Cyber Tarot
function drawTarot() {
    const cards = ["The Compiler", "The Infinite Loop", "The Backup", "The 404 Error", "The Stack Overflow", "The Syntax Error", "The Open Source", "The Coffee Cup", "The Deadline"];
    const shuffled = cards.sort(() => 0.5 - Math.random()).slice(0, 3);
    const layout = ["Past (Tech Debt)", "Present (Current Sprint)", "Future (Next Release)"];
    
    let html = "";
    for(let i=0; i<3; i++) {
        html += `<div class="tarot-card"><div class="tarot-title">${layout[i]}</div><div class="tarot-name">${shuffled[i]}</div></div>`;
    }
    document.getElementById('tarotResult').innerHTML = html;
}

// Username Analyzer
function analyzeUsername() {
    const name = document.getElementById('usernameInput').value.trim();
    const result = document.getElementById('analyzerResult');
    if (!name) { result.style.color = "#ef4444"; result.innerText = "Please enter an alias."; return; }
    
    const powers = ["Master of Debugging", "Code Architect", "Bug Hunter", "Database Whisperer", "UI/UX Visionary", "The Prompt Engineer", "Logic Overlord"];
    // Простий хеш для стабільного результату одного й того ж імені
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    
    result.style.color = "#22c55e";
    result.innerText = `Superpower detected: [ ${powers[hash % powers.length]} ]`;
}

// 8-Ball
function getMagicAnswer() {
    const input = document.getElementById('questionInput');
    const display = document.getElementById('magicAnswer');
    if (!input.value.trim()) { display.style.color = "#ef4444"; display.innerText = "Error: Question not found."; return; }
    
    const answers = ["Algorithms say YES.", "Data is unclear. Recalculate later.", "System confirms: Absolutely.", "Access denied.", "Probability is high (99.9%).", "Warning: Outcome doubtful.", "Insufficient data."];
    display.style.color = "#94a3b8"; display.innerText = "Processing data...";
    setTimeout(() => { display.style.color = "#c084fc"; display.innerText = answers[Math.floor(Math.random() * answers.length)]; }, 1000);
}

// Архів та Share
function saveToArchive() {
    const text = document.getElementById('fortuneText').innerText;
    if (text.includes("Consulting") || text.includes("silent")) return;
    let archive = JSON.parse(localStorage.getItem('cyberOracleArchive')) || [];
    archive.unshift({ sign: document.getElementById('signTitle').innerText, text: text, date: new Date().toLocaleDateString() });
    localStorage.setItem('cyberOracleArchive', JSON.stringify(archive));
    renderArchive();
    document.getElementById('saveBtn').innerText = "Saved ✓";
}

function renderArchive() {
    const container = document.getElementById('archiveContainer');
    let archive = JSON.parse(localStorage.getItem('cyberOracleArchive')) || [];
    if (archive.length === 0) return;
    container.innerHTML = ''; 
    archive.forEach(item => {
        container.innerHTML += `<div class="archive-item"><div class="archive-date">${item.date} - <strong>${item.sign}</strong></div><div>${item.text}</div></div>`;
    });
}

async function shareDestiny() {
    const text = document.getElementById('fortuneText').innerText;
    if (text.includes("Consulting")) return;
    const shareData = { title: 'Cyber Oracle', text: `My forecast: ${text}` };
    const btn = document.getElementById('shareBtn');
    try {
        if (navigator.share) await navigator.share(shareData);
        else { await navigator.clipboard.writeText(shareData.text); btn.innerText = "Copied! ✓"; setTimeout(() => btn.innerText = "Share", 2000); }
    } catch (err) {}
}

document.querySelector('.close-btn').onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

// Particles init
if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        "particles": { "number": { "value": 60 }, "color": { "value": "#38bdf8" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5 }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.3, "width": 1 }, "move": { "enable": true, "speed": 2 } },
        "interactivity": { "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } } },
        "retina_detect": true
    });
}
renderArchive();
