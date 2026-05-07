// ==========================================
// AUDIO SYSTEM
// ==========================================
const sfxCyber = new Audio('https://actions.google.com/sounds/v1/science_fiction/sci_fi_computer_bleep.ogg');
const sfxMystic = new Audio('https://actions.google.com/sounds/v1/cartoon/magic_chime.ogg');
const sfxSuccess = new Audio('https://actions.google.com/sounds/v1/cartoon/cartoon_cowbell.ogg');

function playSound(type) {
    let sound = type === 'cyber' ? sfxCyber : type === 'mystic' ? sfxMystic : sfxSuccess;
    sound.volume = 0.3; sound.currentTime = 0; sound.play().catch(()=>{});
}

// ==========================================
// DATABASE (Fully English, Merged Logic)
// ==========================================
const zodiacData = [
    { name: 'Aries', icon: '♈', motto: 'I Execute', aura: '#ef4444' }, // Red
    { name: 'Taurus', icon: '♉', motto: 'I Accumulate', aura: '#22c55e' }, // Green
    { name: 'Gemini', icon: '♊', motto: 'I Multi-task', aura: '#eab308' }, // Yellow
    { name: 'Cancer', icon: '♋', motto: 'I Feel the Vibe', aura: '#93c5fd' }, // Light Blue
    { name: 'Leo', icon: '♌', motto: 'I Lead', aura: '#f97316' }, // Orange
    { name: 'Virgo', icon: '♍', motto: 'I Refactor', aura: '#8b5cf6' }, // Purple
    { name: 'Libra', icon: '♎', motto: 'I Balance', aura: '#f472b6' }, // Pink
    { name: 'Scorpio', icon: '♏', motto: 'I Penetrate', aura: '#991b1b' }, // Dark Red
    { name: 'Sagittarius', icon: '♐', motto: 'I Explore', aura: '#3b82f6' }, // Blue
    { name: 'Capricorn', icon: '♑', motto: 'I Architect', aura: '#475569' }, // Slate
    { name: 'Aquarius', icon: '♒', motto: 'I Innovate', aura: '#06b6d4' }, // Cyan
    { name: 'Pisces', icon: '♓', motto: 'I Dream in Code', aura: '#14b8a6' }  // Teal
];

const elements = { 'Aries':'Fire', 'Leo':'Fire', 'Sagittarius':'Fire', 'Taurus':'Earth', 'Virgo':'Earth', 'Capricorn':'Earth', 'Gemini':'Air', 'Libra':'Air', 'Aquarius':'Air', 'Cancer':'Water', 'Scorpio':'Water', 'Pisces':'Water' };

const localDb = {
    dailyFailSafe: [
        "Your algorithms are highly optimized today. Launch that new project without fear.",
        "A minor syntax error might occur in your communication today. Double-check your messages.",
        "The network connectivity of your relationships is strong. Reach out to an old connection."
    ],
    weekly: [
        "This week focuses on debugging your personal connections. Speak your truth.",
        "A fast-paced sprint awaits you. Keep your focus, and the final push will be highly rewarding.",
        "Financial algorithms are stabilizing. Great time to review your resource allocation.",
        "Unexpected hardware upgrades (or gifts) might come your way. Accept them gracefully."
    ],
    monthly: [
        "A major spiritual refactoring is coming this month. You will drop old habits easily.",
        "Your charisma levels are peaking. Use this energy to network and secure new opportunities.",
        "Prepare for a massive update to your relationship status or depth. Harmony is maximized.",
        "This is your month of optimization. Focus on self-care to keep your systems running at 100%."
    ]
};

// ==========================================
// INITIALIZATION & CORE GRID
// ==========================================
const coreGrid = document.getElementById('zodiacGrid');
const sel1 = document.getElementById('sign1');
const sel2 = document.getElementById('sign2');

zodiacData.forEach(s => {
    // Build Core Grid with Resonance Magic
    let coreCard = document.createElement('div'); coreCard.className = 'card';
    coreCard.innerHTML = `<div class="icon" style="color:${s.aura}">${s.icon}</div><h3>${s.name}</h3><span class="sign-motto">"${s.motto}"</span>`;
    
    // ДОДАНО ФІЧУ: Одночасна зміна Аури та відкриття модального вікна
    coreCard.onclick = () => { 
        setAura(s.aura); // Миттєва зміна кольору
        playSound('cyber'); 
        openModal(s.name); // Відкриття прогнозу
    };
    coreGrid.appendChild(coreCard);

    // Populate Sync Selectors
    sel1.add(new Option(s.name, s.name));
    sel2.add(new Option(s.name, s.name));
});

document.getElementById('omenText').innerText = "Deploying on Friday leads to a weekend of hotfixes.";

// ==========================================
// AURA LOGIC
// ==========================================
function setAura(hexColor) {
    document.documentElement.style.setProperty('--glow-color', hexColor);
    
    const rgba = hexColor.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16));
    document.body.style.backgroundColor = `rgba(${rgba[0]*0.1}, ${rgba[1]*0.1}, ${rgba[2]*0.1}, 1)`;

    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.particles.color.value = hexColor;
        window.pJSDom[0].pJS.particles.line_linked.color = hexColor;
        window.pJSDom[0].pJS.fn.particlesRefresh();
    }
}

// ДОДАНО: Функція для кнопки Reset
function resetAura() {
    setAura('#38bdf8');
    playSound('cyber');
}

// ==========================================
// MODAL & FORECAST LOGIC
// ==========================================
async function openModal(sign) {
    document.getElementById('signTitle').innerText = sign;
    document.getElementById('saveBtn').innerText = "Save to Archive";
    document.getElementById('fortuneModal').style.display = "block";
    
    // Generate Lucky Attributes
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6'];
    const names = ['Ruby', 'Amber', 'Yellow', 'Green', 'Cyan', 'Blue'];
    const rIdx = Math.floor(Math.random() * colors.length);
    document.getElementById('luckyNumbers').innerText = Array.from({length: 3}, () => Math.floor(Math.random() * 99) + 1).join(' : ');
    document.getElementById('luckyColorBox').style.backgroundColor = colors[rIdx];
    document.getElementById('luckyColorName').innerText = names[rIdx];

    // Populate Weekly and Monthly (Local Logic)
    document.getElementById('fortuneTextWeekly').innerHTML = `<strong>Sprint Overview:</strong> <br><br> ${localDb.weekly[Math.floor(Math.random() * localDb.weekly.length)]}`;
    document.getElementById('fortuneTextMonthly').innerHTML = `<strong>Release Notes:</strong> <br><br> ${localDb.monthly[Math.floor(Math.random() * localDb.monthly.length)]}`;

    // Fetch Daily (API with Fail-safe)
    document.getElementById('fortuneTextDaily').innerText = "Establishing secure connection to Astrological API...";
    
    // Безпечний виклик зміни вкладок
    try { switchTab('daily'); } catch(e) {}

    try {
        const response = await fetch(`https://sandipbgt.com/theastrologer/api/horoscope/${sign.toLowerCase()}/today/`);
        if (!response.ok) throw new Error('API Offline');
        const data = await response.json();
        document.getElementById('fortuneTextDaily').innerText = data.horoscope;
    } catch (error) {
        const randomFallback = localDb.dailyFailSafe[Math.floor(Math.random() * localDb.dailyFailSafe.length)];
        document.getElementById('fortuneTextDaily').innerText = randomFallback + "\n\n(Connection routed via local Hybrid Engine)";
    }
}

function switchTab(tabName) {
    playSound('cyber');
    // Handle Buttons (Безпечна обробка event)
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    }
    
    // Handle Content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active-content'));
    document.getElementById(`tab-${tabName}`).classList.add('active-content');
}

// ==========================================
// WIDGETS
// ==========================================
function checkCompatibility() {
    playSound('cyber');
    const s1 = sel1.value, s2 = sel2.value;
    const el1 = elements[s1], el2 = elements[s2];
    const score = Math.floor(Math.random() * 40) + 60; // 60-100% logic inspired by partner
    let message = score > 85 ? "Perfect sync! Data packets are flowing flawlessly." : score > 70 ? "Stable connection. Minor packet loss possible." : "High latency detected. Communication requires effort.";
    document.getElementById('compResult').innerHTML = `Sync Rate: <strong>${score}%</strong> <br><br> <span style="font-size:0.9em; color:var(--text-muted)">${message}</span>`;
}

function drawTarot() {
    playSound('mystic');
    const cards = ["The Compiler", "Infinite Loop", "The Backup", "404 Error", "Stack Overflow", "Syntax Error", "The Deadline"];
    const shuffled = cards.sort(() => 0.5 - Math.random()).slice(0, 3);
    const layout = ["Past (Debt)", "Present (Sprint)", "Future (Release)"];
    let html = "";
    for(let i=0; i<3; i++) {
        html += `<div class="tarot-card" onclick="this.classList.toggle('flipped'); playSound('mystic')"><div class="tarot-inner"><div class="tarot-front">?</div><div class="tarot-back"><div class="tarot-title">${layout[i]}</div><div class="tarot-name">${shuffled[i]}</div></div></div></div>`;
    }
    document.getElementById('tarotResult').innerHTML = html;
}
drawTarot();

function analyzeUsername() {
    playSound('cyber');
    const name = document.getElementById('usernameInput').value.trim();
    if (!name) return;
    const powers = ["Master of Debugging", "Code Architect", "Bug Hunter", "Database Whisperer", "UI/UX Visionary"];
    let hash = 0; for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    document.getElementById('analyzerResult').innerText = `Superpower: [ ${powers[hash % powers.length]} ]`;
}

function getMagicAnswer() {
    playSound('cyber');
    const a = ["Algorithms say YES.", "Recalculate later.", "System confirms.", "Access denied.", "Probability is 99.9%."];
    document.getElementById('magicAnswer').innerText = a[Math.floor(Math.random() * a.length)];
}

function submitLead() {
    const email = document.getElementById('emailInput').value;
    const res = document.getElementById('leadResult');
    if(!email.includes('@')) { res.style.color = '#ef4444'; res.innerText = "Invalid email format."; return; }
    document.getElementById('leadBtn').innerText = "Processing...";
    setTimeout(() => {
        playSound('success');
        document.getElementById('leadBtn').innerText = "Subscribe";
        res.style.color = '#22c55e';
        res.innerText = "Success! PDF generation initiated.";
    }, 1500);
}

// Archive & Modal UI
function saveToArchive() { 
    document.getElementById('saveBtn').innerText = "Saved ✓"; 
    playSound('success');
    let archive = JSON.parse(localStorage.getItem('cyberArchive')) || [];
    archive.unshift({ sign: document.getElementById('signTitle').innerText, date: new Date().toLocaleDateString() });
    localStorage.setItem('cyberArchive', JSON.stringify(archive));
    renderArchive();
}

function renderArchive() {
    const container = document.getElementById('archiveContainer');
    let archive = JSON.parse(localStorage.getItem('cyberArchive')) || [];
    if (archive.length === 0) return;
    container.innerHTML = ''; 
    archive.forEach(item => { container.innerHTML += `<div class="archive-item"><div class="archive-date">${item.date}</div><strong>${item.sign} Log Saved</strong></div>`; });
}

document.querySelector('.close-btn').onclick = () => document.getElementById('fortuneModal').style.display = "none";
window.onclick = (e) => { if (e.target == document.getElementById('fortuneModal')) document.getElementById('fortuneModal').style.display = "none"; };
renderArchive();

// ==========================================
// PARTICLES.JS INIT
// ==========================================
if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        "particles": { "number": { "value": 60 }, "color": { "value": "#38bdf8" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5 }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.3, "width": 1 }, "move": { "enable": true, "speed": 2 } },
        "interactivity": { "detect_on": "window", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 180, "line_linked": { "opacity": 0.8 } }, "push": { "particles_nb": 4 } } },
        "retina_detect": true
    });
}
