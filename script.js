// ==========================================
// ГЛОБАЛЬНА ЛОГІКА ТУМБЛЕРА
// ==========================================
let isCyberMode = true;
let userCustomBackground = null

function toggleDimension() {
    const body = document.body;
    const btn = document.getElementById('dimToggleBtn');
    const cyberDiv = document.getElementById('cyber-dimension');
    const classicDiv = document.getElementById('classic-dimension');
    const particles = document.getElementById('particles-js');

    if (isCyberMode) {
        // Перемикаємо на CLASSIC (Угорська)
        body.classList.remove('cyber-mode');
        body.classList.add('classic-mode');
        
        // ОНОВЛЕННЯ: Відновлюємо обраний фон (якщо він є)
        if (userCustomBackground) {
            body.style.background = userCustomBackground;
        } else {
            body.style.background = ''; // Вмикає стандартний CSS фон
        }
        
        cyberDiv.style.display = 'none';
        classicDiv.style.display = 'block';
        particles.style.display = 'none';
        
        btn.innerHTML = 'Switch to Cyber Mode 🔮';
        btn.className = 'dim-toggle-btn classic-btn';
    } else {
        // Перемикаємо на CYBER (Англійська)
        body.classList.remove('classic-mode');
        body.classList.add('cyber-mode');
        body.style.background = '#0f172a'; // Повертаємо кібер-фон
        
        classicDiv.style.display = 'none';
        cyberDiv.style.display = 'block';
        particles.style.display = 'block';
        
        btn.innerHTML = 'Switch to Classic Mode ✨';
        btn.className = 'dim-toggle-btn cyber-btn';
    }
    isCyberMode = !isCyberMode;
}


// ==========================================
// ЛОГІКА CYBER ORACLE
// ==========================================
const cyberSigns = [
    { name: 'Aries', motto: 'I Execute' }, { name: 'Taurus', motto: 'I Accumulate' },
    { name: 'Gemini', motto: 'I Multi-task' }, { name: 'Cancer', motto: 'I Feel the Vibe' },
    { name: 'Leo', motto: 'I Lead' }, { name: 'Virgo', motto: 'I Refactor' },
    { name: 'Libra', motto: 'I Balance' }, { name: 'Scorpio', motto: 'I Penetrate' },
    { name: 'Sagittarius', motto: 'I Explore' }, { name: 'Capricorn', motto: 'I Architect' },
    { name: 'Aquarius', motto: 'I Innovate' }, { name: 'Pisces', motto: 'I Dream in Code' }
];

const cyberElements = {
    'Aries': 'Fire', 'Leo': 'Fire', 'Sagittarius': 'Fire',
    'Taurus': 'Earth', 'Virgo': 'Earth', 'Capricorn': 'Earth',
    'Gemini': 'Air', 'Libra': 'Air', 'Aquarius': 'Air',
    'Cancer': 'Water', 'Scorpio': 'Water', 'Pisces': 'Water'
};

const grid = document.getElementById('zodiacGrid');
const modal = document.getElementById('fortuneModal');
const sign1Sel = document.getElementById('sign1');
const sign2Sel = document.getElementById('sign2');

// Ініціалізація Cyber карток
cyberSigns.forEach(signObj => {
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
    const el1 = cyberElements[s1], el2 = cyberElements[s2];
    let baseScore = (el1 === el2) ? 85 : ((el1 === 'Fire' && el2 === 'Air') || (el1 === 'Air' && el2 === 'Fire') || (el1 === 'Earth' && el2 === 'Water') || (el1 === 'Water' && el2 === 'Earth')) ? 75 : 50;
    const msg = (baseScore === 85) ? `Perfect harmony! Both share ${el1}.` : (baseScore === 75) ? "Great match! Elements complement." : "A challenging but exciting dynamic.";
    document.getElementById('compResult').innerHTML = `Compatibility: <strong>${baseScore + Math.floor(Math.random() * 15)}%</strong> <br> <span style="font-size: 0.9em; color: #94a3b8;">${msg}</span>`;
}

// Tarot, Analyzer, 8-Ball
function drawTarot() {
    const cards = ["The Compiler", "The Infinite Loop", "The Backup", "The 404 Error", "The Stack Overflow", "The Syntax Error", "The Open Source", "The Coffee Cup", "The Deadline"];
    const shuffled = cards.sort(() => 0.5 - Math.random()).slice(0, 3);
    const layout = ["Past (Tech Debt)", "Present (Current Sprint)", "Future (Next Release)"];
    let html = "";
    for(let i=0; i<3; i++) html += `<div class="tarot-card"><div class="tarot-title">${layout[i]}</div><div class="tarot-name">${shuffled[i]}</div></div>`;
    document.getElementById('tarotResult').innerHTML = html;
}

function analyzeUsername() {
    const name = document.getElementById('usernameInput').value.trim();
    const result = document.getElementById('analyzerResult');
    if (!name) { result.style.color = "#ef4444"; result.innerText = "Please enter an alias."; return; }
    const powers = ["Master of Debugging", "Code Architect", "Bug Hunter", "Database Whisperer", "UI/UX Visionary", "The Prompt Engineer", "Logic Overlord"];
    let hash = 0; for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    result.style.color = "#22c55e"; result.innerText = `Superpower detected: [ ${powers[hash % powers.length]} ]`;
}

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
    archive.forEach(item => { container.innerHTML += `<div class="archive-item"><div class="archive-date">${item.date} - <strong>${item.sign}</strong></div><div>${item.text}</div></div>`; });
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


// ==========================================
// ЛОГІКА SZTÁR HOROSZKÓP (Партнер)
// ==========================================
const horoszkopAdatok = {
    napi: [
        "Ma váratlanul egy régi ismerős bukkanhat fel az életedben. Légy nyitott, mert fontos üzenetet hordozhat számodra!",
        "A bolygók állása ma különösen kedvez a pénzügyeidnek. Egy remek lehetőség adódhat, de gyorsan kell döntened.",
        "Energiád ma a csúcson van! Amit ma eltervezel, azt könnyedén véghez is viszed. Ne hagyd, hogy mások lehangoljanak.",
        "Egy apró konfliktus alakulhat ki a munkahelyeden vagy a családban. A legjobb, ha ma te vagy a békebíró, engedj a feszültségből.",
        "Kiváló nap ez a tanulásra és a fejlődésre. Ha régóta halogatsz egy könyv elolvasását vagy egy feladatot, ma vágj bele!",
        "Figyelj a belső hangodra! Ma egy olyan megérzésed támadhat, ami a jövőben nagyon hasznosnak bizonyul majd.",
        "A mai nap a pihenésé és a feltöltődésé kellene, hogy legyen. Engedj meg magadnak egy kis luxust és kényeztetést.",
        "Valaki a környezetedben nagyon számít a segítségedre. Egy jó szó vagy egy apró gesztus ma csodákat tehet.",
        "Váratlan szerencse érhet ma! Akár egy apró nyeremény, akár egy kedves bók formájában – fogadd hálával.",
        "Kreativitásod ma szárnyal. Olyan problémákra is megtalálod a megoldást, amik hetek óta fejtörést okoztak."
    ],
    heti: [
        "Ezen a héten a kommunikáció kerül a fókuszba. Végre képes leszel őszintén megbeszélni egy olyan dolgot, amit régóta magadban tartasz.",
        "Egy rohanós, kihívásokkal teli hét vár rád, de a hétvégére mindent sikeresen lezársz. A kitartásod meghozza a gyümölcsét!",
        "A héten egy új projekt vagy hobbi vonhatja magára a figyelmedet. Engedd szabadjára a lelkesedésedet, jó úton jársz.",
        "Pénzügyi stabilitás jellemzi ezt a hetet. Ideális időszak arra, hogy átgondold a megtakarításaidat és a jövőbeli terveidet.",
        "Családi ügyek igényelhetik a figyelmedet a napokban. Légy türelmes a szeretteiddel, most nagy szükségük van a bölcsességedre.",
        "Egy váratlan utazás vagy kimozdulás lehetősége villanyozhat fel. Mondj igent a kalandra, ráfér a lelkedre egy kis környezetváltozás!",
        "A hét közepe felé kisebb akadályokba ütközhetsz, de ne add fel! Használd a diplomáciai érzékedet a konfliktusok elsimítására."
    ],
    havi: [
        "A Vénusz mosolyog rád ebben a hónapban! Ha szingli vagy, tarts nyitva a szemed, mert a szerelem a legváratlanabb helyen találhat rád. Ha kapcsolatban élsz, a szenvedély ismét fellángol köztetek.",
        "Ez a hónap a mély, spirituális átalakulásról szól. Sikerül elengedned egy régi sérelmet, ami eddig visszahúzott. Szabadabbnak fogod érezni magad, mint valaha.",
        "Szerelmi életedben egy komoly döntés meghozatala előtt állsz. Ne a racionális érvekre, hanem a szívedre hallgass!",
        "A hónap során vonzerőd az egekbe szökik. Titokzatos kisugárzásoddal bárkit leveszel a lábáról. Használd ezt az energiát arra, hogy elmélyítsd a fontos kapcsolataidat.",
        "Egy békés, harmonikus hónap vár rád. Tökéletes időszak arra, hogy a pároddal közös terveket szőjetek a jövőre nézve. A szinglik egy mély, lelki kapcsolódást tapasztalhatnak meg.",
        "Ebben a hónapban megtanulod jobban szeretni és értékelni önmagad. Ez az új magabiztosság mágnesként fogja vonzani hozzád a megfelelő embereket."
    ]
};

const szinek = ["Mélyvörös", "Smaragdzöld", "Éjkék", "Arany", "Ezüst", "Halványlila", "Türkiz", "Barackvirág", "Fehér"];
const erossegek = ["Kitartás", "Empátia", "Kreativitás", "Logika", "Bátorság", "Szenvedély", "Optimizmus", "Őszinteség"];

const classicSigns = [
    { name: 'Kos', icon: '♈', bg: 'linear-gradient(to right, #870000, #190a05)' },
    { name: 'Bika', icon: '♉', bg: 'linear-gradient(to right, #11998e, #38ef7d)' },
    { name: 'Ikrek', icon: '♊', bg: 'linear-gradient(to right, #f6d365, #fda085)' },
    { name: 'Rák', icon: '♋', bg: 'linear-gradient(to right, #e0c3fc, #8ec5fc)' },
    { name: 'Oroszlán', icon: '♌', bg: 'linear-gradient(to right, #f12711, #f5af19)' },
    { name: 'Szűz', icon: '♍', bg: 'linear-gradient(to right, #8E54E9, #4776E6)' },
    { name: 'Mérleg', icon: '♎', bg: 'linear-gradient(to right, #ff9a9e, #fecfef)' },
    { name: 'Skorpió', icon: '♏', bg: 'linear-gradient(to right, #000000, #434343)' },
    { name: 'Nyilas', icon: '♐', bg: 'linear-gradient(to right, #4b6cb7, #182848)' },
    { name: 'Bak', icon: '♑', bg: 'linear-gradient(to right, #3f4c6b, #606c88)' },
    { name: 'Vízöntő', icon: '♒', bg: 'linear-gradient(to right, #00c6ff, #0072ff)' },
    { name: 'Halak', icon: '♓', bg: 'linear-gradient(to right, #2bc0e4, #eaecc6)' }
];

function generateClassicGrids() {
    const grids = ['napi', 'heti', 'havi', 'jegyek'];
    grids.forEach(page => {
        const container = document.getElementById(`grid-${page}`);
        if (!container) return; // Захист від помилок
        classicSigns.forEach(sign => {
            const card = document.createElement('div');
            card.className = 'classic-zodiac-card';
            card.innerHTML = `<div class="icon">${sign.icon}</div><div class="sign-name">${sign.name}</div>`;
            
            if (page === 'napi') card.onclick = () => generateRandomHoroscope(sign.name, 'napi', 'Napi Horoszkóp');
            if (page === 'heti') card.onclick = () => generateRandomHoroscope(sign.name, 'heti', 'Heti Előrejelzés');
            if (page === 'havi') card.onclick = () => generateRandomHoroscope(sign.name, 'havi', 'Havi & Szerelmi Elemzés');
            if (page === 'jegyek') card.onclick = () => changeBackground(sign.bg);
            
            container.appendChild(card);
        });
    });
}

function switchPage(pageId) {
    document.querySelectorAll('.page-section').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.classic-navbar button').forEach(btn => btn.classList.remove('active-nav'));
    
    document.getElementById(pageId).classList.add('active');
    document.getElementById(`nav-${pageId}`).classList.add('active-nav');

    // ОНОВЛЕНА ЛОГІКА: Перевіряємо, чи є збережений фон
    if (!isCyberMode) {
        if (userCustomBackground) {
            // Якщо користувач вже вибрав фон у вкладці "Háttérválasztó", залишаємо його!
            document.body.style.background = userCustomBackground;
        } else {
            // Якщо ще не вибирав - показуємо стандартний
            document.body.style.background = 'linear-gradient(to right, #0f0c29, #302b63, #24243e)';
        }
    }
}

function generateRandomHoroscope(signName, type, titleText) {
    const resultBox = document.getElementById(`result-${type}`);
    const title = document.getElementById(`title-${type}`);
    const textElement = document.getElementById(`text-${type}`);

    const szovegLista = horoszkopAdatok[type];
    const randomSzoveg = szovegLista[Math.floor(Math.random() * szovegLista.length)];
    const randomSzam = Math.floor(Math.random() * 99) + 1;
    const randomSzin = szinek[Math.floor(Math.random() * szinek.length)];
    const randomErosseg = erossegek[Math.floor(Math.random() * erossegek.length)];

    title.innerText = `${signName} - ${titleText}`;
    let htmlTartalom = `
        <p style="font-size: 1.1rem; line-height: 1.8;"><b>Kedves ${signName}!</b> ${randomSzoveg}</p>
        <div class="astro-data" style="margin-top: 15px; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 15px;">
            <span class="astro-badge">🍀 Szerencseszám: <b>${randomSzam}</b></span>
            <span class="astro-badge">🎨 Szerencseszín: <b>${randomSzin}</b></span>
            <span class="astro-badge">💪 Napi erősség: <b>${randomErosseg}</b></span>
        </div>
    `;

    textElement.innerHTML = htmlTartalom;
    resultBox.style.display = 'block';
    resultBox.scrollIntoView({ behavior: 'smooth' });
}

function changeBackground(bgStyle) {
    // Змінюємо фон тільки якщо ми в класичному режимі
    if (!isCyberMode) {
        document.body.style.background = bgStyle;
        userCustomBackground = bgStyle; // <-- ЗБЕРІГАЄМО ВИБІР КОРИСТУВАЧА!
    }
}

// Запускаємо генерацію угорських карток при завантаженні
window.onload = generateClassicGrids;