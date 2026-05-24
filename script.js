// ==========================================
// AUDIO SYSTEM 
// ==========================================
const sfxCyber = new Audio('https://actions.google.com/sounds/v1/science_fiction/sci_fi_computer_bleep.ogg');
const sfxMystic = new Audio('https://actions.google.com/sounds/v1/cartoon/magic_chime.ogg');
const sfxSuccess = new Audio('https://actions.google.com/sounds/v1/cartoon/cartoon_cowbell.ogg');

function playSound(type) {
    let sound = type === 'cyber' ? sfxCyber : type === 'mystic' ? sfxMystic : sfxSuccess;
    sound.volume = 0.2; sound.currentTime = 0; sound.play().catch(()=>{});
}

// ==========================================
// MASTER DATABASE 
// ==========================================
const zodiacData = {
    Aries: { 
        name: 'Aries', icon: '♈', motto: 'I Am', aura: '#ef4444',
        points: [[10, 80], [25, 60], [40, 35], [45, 10], [75, 50], [95, 70]],
        links: [[0, 1], [1, 2], [2, 3], [2, 4], [4, 5]]
    },
    Taurus: { 
        name: 'Taurus', icon: '♉', motto: 'I Have', aura: '#22c55e',
        points: [[10, 25], [30, 10], [45, 30], [45, 45], [30, 50], [35, 60], [50, 55], [45, 70], [55, 80], [75, 100], [75, 45], [90, 45]],
        links: [[0, 4], [1, 2], [2, 3], [3, 4], [3, 6], [4, 5], [5, 7], [6, 7], [3, 10], [10, 11], [7, 8], [8, 9]]
    },
    Gemini: { 
        name: 'Gemini', icon: '♊', motto: 'I Think', aura: '#eab308',
        points: [[25, 10], [25, 28], [10, 25], [20, 45], [30, 65], [20, 85], [40, 85], [40, 30], [60, 32], [90, 35], [55, 20], [45, 8], [65, 55], [55, 75], [80, 70], [95, 90]],
        links: [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [4, 6], [1, 7], [7, 8], [8, 9], [8, 10], [10, 11], [8, 12], [12, 13], [12, 14], [14, 15]]
    },
    Cancer: { 
        name: 'Cancer', icon: '♋', motto: 'I Feel', aura: '#93c5fd',
        points: [[50, 10], [55, 35], [50, 50], [20, 70], [80, 80]],
        links: [[0, 1], [1, 2], [2, 3], [2, 4]]
    },
    Leo: { 
        name: 'Leo', icon: '♌', motto: 'I Will', aura: '#f97316',
        points: [[10, 80], [30, 60], [40, 80], [75, 80], [80, 60], [70, 40], [60, 25], [85, 10], [95, 20]],
        links: [[0, 1], [1, 2], [0, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]]
    },
    Virgo: { 
        name: 'Virgo', icon: '♍', motto: 'I Analyze', aura: '#8b5cf6',
        points: [[5, 60], [20, 50], [35, 45], [50, 35], [40, 20], [65, 40], [75, 35], [90, 25], [85, 10], [70, 15], [55, 55], [60, 75], [40, 75], [25, 65], [10, 75]],
        links: [[0, 1], [1, 2], [1, 13], [13, 14], [13, 12], [2, 3], [3, 4], [3, 5], [2, 10], [5, 10], [10, 11], [5, 6], [6, 7], [7, 8], [8, 9]]
    },
    Libra: { 
        name: 'Libra', icon: '♎', motto: 'I Balance', aura: '#f472b6',
        points: [[10, 80], [20, 65], [35, 50], [25, 30], [50, 10], [85, 30], [75, 55], [90, 70]],
        links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [3, 5], [5, 6], [6, 7]]
    },
    Scorpio: { 
        name: 'Scorpio', icon: '♏', motto: 'I Desire', aura: '#991b1b',
        points: [[35, 35], [20, 45], [10, 55], [25, 70], [45, 70], [60, 60], [65, 45], [75, 35], [80, 25], [85, 20], [90, 5], [100, 15], [95, 35]],
        links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [9, 11], [9, 12]]
    },
    Sagittarius: { 
        name: 'Sagittarius', icon: '♐', motto: 'I See', aura: '#3b82f6',
        points: [[50, 70], [0, 40], [40, 35], [10, 10], [10, -10], [20, -40], [40, -50], [60, -30], [70, -55], [68, -80], [80, -35], [90, -25], [70, -17], [110, -30], [135, -35], [117, -10], [140, -10], [105, 15], [125, 35]],
        links: [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [7, 10], [10, 11], [11, 12], [11, 13], [13, 14], [13, 15], [15, 16], [15, 17], [17, 18]]
    },
    Capricorn: { 
        name: 'Capricorn', icon: '♑', motto: 'I Use', aura: '#475569',
        points: [[90, 15], [85, 25], [80, 35], [50, 40], [40, 38], [20, 35], [10, 35], [35, 65], [55, 75], [65, 65]],
        links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 2]]
    },
    Aquarius: { 
        name: 'Aquarius', icon: '♒', motto: 'I Know', aura: '#06b6d4',
        points: [[5, 55], [25, 35], [35, 25], [10, -5], [40, -40], [65,-40], [70,-10], [90, -20], [65, 15], [75, 55], [102, 10], [125, 35]],
        links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [7, 10], [10, 11]]
    },
    Pisces: { 
        name: 'Pisces', icon: '♓', motto: 'I Believe', aura: '#14b8a6',
        points: [[80, 40], [90, 35], [95, 25], [85, 20], [75, 30], [65, 33], [55, 40], [45, 43], [35, 48], [25, 52], [15, 65], [22, 40], [18, 25], [8, 20], [13, 10]],
        links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 12]]
    }
};

const localDb = {
    daily: [
        "The stars align to grant you clarity today. Trust your intuition over pure logic.",
        "A celestial shift might bring a minor miscommunication. Speak with intention and grace.",
        "Your planetary ruler is well-aspected. A perfect day to plant the seeds for future success."
    ],
    weekly: [
        "This week's lunar phase emphasizes emotional growth. Seek harmony in your relationships.",
        "A dynamic transit brings rapid changes. Keep your mind open and adapt to the currents.",
        "The cosmos advises patience. Focus on foundational work rather than immediate results."
    ],
    monthly: [
        "This lunar cycle heralds a period of deep transformation. Shed what no longer serves your spirit.",
        "Your solar return brings radiant energy. Step into the spotlight and claim your power.",
        "A major planetary alignment suggests it is time to realign your physical space with your spiritual goals."
    ]
};

// ==========================================
// BACKGROUND CANVAS (CONSTELLATIONS & TOUCH)
// ==========================================
const canvas = document.getElementById('starlight-canvas');
const ctx = canvas.getContext('2d');
let width, height, stars = [];
let currentAuraColor = '#d4af37'; 
const mouse = { x: null, y: null };

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    stars = [];

    // ОПТИМІЗАЦІЯ ДЛЯ СМАРТФОНІВ (Зменшуємо кількість зірок для батареї)
    const divisor = width < 768 ? 25000 : 10000;
    const starCount = (width * height) / divisor;
    
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star(Math.random() * width, Math.random() * height, false));
    }

    const signs = Object.keys(zodiacData);
    const cols = width < 768 ? 2 : 4; // 2 колонки сузір'їв на телефонах, 4 на ПК
    
    signs.forEach((name, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        
        const centerX = (width / cols) * (col + 0.5) - 50; 
        const centerY = (height / Math.ceil(signs.length / cols)) * (row + 0.5) - 50;
        
        // Масштабування для різних екранів
        const baseScale = width < 768 ? 1200 : 800;
        const scale = Math.min(width, height) / baseScale; 

        const pattern = zodiacData[name];
        const zodiacStars = pattern.points.map(p => {
            const s = new Star(centerX + p[0] * scale, centerY + p[1] * scale, true, name);
            stars.push(s);
            return s;
        });
        
        pattern.links.forEach(link => {
            const s1 = zodiacStars[link[0]];
            const s2 = zodiacStars[link[1]];
            if (!s1.connections) s1.connections = [];
            s1.connections.push(s2);
        });
    });
}

class Star {
    constructor(x, y, isZodiac, signName = null) {
        this.x = x; this.y = y;
        this.isZodiac = isZodiac;
        this.signName = signName;
        // На телефонах зірки сузір'їв трішки менші
        this.size = isZodiac ? (width < 768 ? 1.8 : 2.5) : Math.random() * 1.2 + 0.2;
        this.opacity = Math.random();
        this.blinkSpeed = 0.005 + Math.random() * 0.01;
        this.connections = [];
    }

    draw() {
        this.opacity += this.blinkSpeed;
        if (this.opacity > 1 || this.opacity < 0.2) this.blinkSpeed *= -1;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(this.opacity)})`;
        if (this.isZodiac) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = currentAuraColor; 
        } else { ctx.shadowBlur = 0; }
        
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0; 
    }

    update() {
        this.x -= 0.05; 
        if (this.x < -150) this.x = width + 150;
        this.draw();
    }
}

function drawLines() {
    stars.forEach(s1 => {
        if (s1.isZodiac && s1.connections.length > 0) {
            s1.connections.forEach(s2 => {
                let mdist = 1000;
                if (mouse.x != null) {
                    let dx = s1.x - mouse.x, dy = s1.y - mouse.y;
                    mdist = Math.sqrt(dx*dx + dy*dy);
                }
                ctx.globalAlpha = mdist < 180 ? 0.9 : 0.35;
                ctx.strokeStyle = currentAuraColor;
                ctx.lineWidth = mdist < 180 ? 1.5 : 0.8;
                ctx.beginPath(); ctx.moveTo(s1.x, s1.y); ctx.lineTo(s2.x, s2.y); ctx.stroke();
            });
        }
        if (!s1.isZodiac && mouse.x != null) {
            let dx = s1.x - mouse.x, dy = s1.y - mouse.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 120) {
                stars.forEach(s2 => {
                    if (s1 === s2 || s2.isZodiac) return;
                    let d2x = s1.x - s2.x, d2y = s1.y - s2.y;
                    if (Math.sqrt(d2x*d2x + d2y*d2y) < 40) {
                        ctx.globalAlpha = (1 - dist/120) * 0.2;
                        ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 0.3;
                        ctx.beginPath(); ctx.moveTo(s1.x, s1.y); ctx.lineTo(s2.x, s2.y); ctx.stroke();
                    }
                });
            }
        }
    });
    ctx.globalAlpha = 1;
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(s => s.update());
    drawLines();
    requestAnimationFrame(animate);
}

// Події ПК (Мишка)
window.addEventListener('resize', initCanvas);
window.addEventListener('mousemove', e => { mouse.x = e.x; mouse.y = e.y; });
window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

// Події МОБІЛЬНІ (Тачскрін)
window.addEventListener('touchstart', e => { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; }, {passive: true});
window.addEventListener('touchmove', e => { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; }, {passive: true});
window.addEventListener('touchend', () => { mouse.x = null; mouse.y = null; });

initCanvas();
animate();

// ==========================================
// SYSTEM CORE (UI & RESONANCE)
// ==========================================
const coreGrid = document.getElementById('zodiacGrid');
const sel1 = document.getElementById('sign1');
const sel2 = document.getElementById('sign2');

Object.values(zodiacData).forEach(s => {
    let coreCard = document.createElement('div'); coreCard.className = 'card';
    coreCard.innerHTML = `<div class="icon" style="color:${s.aura}">${s.icon}</div><h3>${s.name}</h3><span class="sign-motto">"${s.motto}"</span>`;
    
    coreCard.onclick = () => { 
        setAura(s.aura); 
        playSound('mystic'); 
        openModal(s.name); 
    };
    coreGrid.appendChild(coreCard);
    sel1.add(new Option(s.name, s.name));
    sel2.add(new Option(s.name, s.name));
});

document.getElementById('omenText').innerText = "The position of Venus suggests harmony in upcoming endeavors.";

function setAura(hexColor) {
    document.documentElement.style.setProperty('--glow-color', hexColor);
    currentAuraColor = hexColor; 
}

function resetAura() {
    setAura('#d4af37'); 
    playSound('mystic');
}

// Функція для мобільного меню
function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
}

// ==========================================
// JSON MODAL LOGIC (З FailSafe)
// ==========================================
async function openModal(sign) {
    document.getElementById('signTitle').innerText = sign;
    document.getElementById('saveBtn').innerText = "Inscribe to Grimoire";
    document.getElementById('fortuneModal').style.display = "block";
    
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6'];
    const names = ['Ruby', 'Topaz', 'Citrine', 'Emerald', 'Sapphire', 'Lapis Lazuli'];
    const rIdx = Math.floor(Math.random() * colors.length);
    document.getElementById('luckyNumbers').innerText = Array.from({length: 3}, () => Math.floor(Math.random() * 9) + 1).join(' - ');
    document.getElementById('luckyColorBox').style.backgroundColor = colors[rIdx];
    document.getElementById('luckyColorBox').style.color = colors[rIdx];
    document.getElementById('luckyColorName').innerText = names[rIdx];

    try { switchTab(null, 'daily'); } catch(e) {} // Безпечний виклик
    
    document.getElementById('fortuneTextDaily').innerText = "Consulting the celestial charts...";
    document.getElementById('fortuneTextWeekly').innerText = "Calculating planetary transits...";
    document.getElementById('fortuneTextMonthly').innerText = "Reading the lunar cycles...";

    try {
        const response = await fetch('horoszkop.json');
        if (!response.ok) throw new Error('File not found');
        const data = await response.json();
        
        document.getElementById('fortuneTextDaily').innerText = data.zodiacs[sign].daily;
        document.getElementById('fortuneTextWeekly').innerText = data.zodiacs[sign].weekly;
        document.getElementById('fortuneTextMonthly').innerText = data.zodiacs[sign].monthly;
    } catch (error) {
        console.log("JSON offline, reverting to local mystical database...");
        document.getElementById('fortuneTextDaily').innerText = localDb.daily[Math.floor(Math.random() * localDb.daily.length)] + "\n\n(Drawn from local grimoire)";
        document.getElementById('fortuneTextWeekly').innerText = localDb.weekly[Math.floor(Math.random() * localDb.weekly.length)];
        document.getElementById('fortuneTextMonthly').innerText = localDb.monthly[Math.floor(Math.random() * localDb.monthly.length)];
    }
}

// Оновлена функція з підтримкою Event для кнопок
function switchTab(event, tabName) {
    playSound('mystic');
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    // Якщо клік був ручний, беремо event.target, інакше знаходимо кнопку за tabName
    const targetBtn = event ? event.target : document.querySelector(`.tab-btn[onclick*="${tabName}"]`);
    if (targetBtn) targetBtn.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active-content'));
    document.getElementById(`tab-${tabName}`).classList.add('active-content');
}

// ==========================================
// WIDGETS
// ==========================================
function checkCompatibility() {
    playSound('mystic');
    const score = Math.floor(Math.random() * 40) + 60; 
    let message = score > 85 ? "A celestial match written in the stars." : score > 70 ? "Strong alignment, with room for growth." : "Challenging aspects. Patience is required.";
    document.getElementById('compResult').innerHTML = `Harmonic Resonance: <strong>${score}%</strong> <br><br> <span style="font-size:0.9em; color:var(--text-muted)">${message}</span>`;
}

function drawTarot() {
    playSound('mystic');
    const cards = ["The Magician", "The High Priestess", "The Empress", "Wheel of Fortune", "The Star", "The Moon", "The Sun"];
    const shuffled = cards.sort(() => 0.5 - Math.random()).slice(0, 3);
    const layout = ["Past", "Present", "Future"];
    let html = "";
    for(let i=0; i<3; i++) {
        html += `<div class="tarot-card" onclick="this.classList.toggle('flipped'); playSound('mystic')"><div class="tarot-inner"><div class="tarot-front">✧</div><div class="tarot-back"><div class="tarot-title">${layout[i]}</div><div class="tarot-name">${shuffled[i]}</div></div></div></div>`;
    }
    document.getElementById('tarotResult').innerHTML = html;
}
drawTarot();

function analyzeUsername() {
    playSound('mystic');
    const name = document.getElementById('usernameInput').value.trim();
    if (!name) return;
    const powers = ["Aura Healer", "Truth Seeker", "Dream Weaver", "Star Walker", "Spirit Guide"];
    let hash = 0; for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    document.getElementById('analyzerResult').innerText = `Your Hidden Arcana: [ ${powers[hash % powers.length]} ]`;
}

function getMagicAnswer() {
    playSound('mystic');
    const a = ["The stars say YES.", "The cosmic answer is clouded.", "It is foretold.", "The signs point to no.", "Trust your inner light."];
    document.getElementById('magicAnswer').innerText = a[Math.floor(Math.random() * a.length)];
}

/*function submitLead() {
    const email = document.getElementById('emailInput').value;
    const res = document.getElementById('leadResult');
    if(!email.includes('@')) { res.style.color = '#ef4444'; res.innerText = "Please provide a valid connection."; return; }
    document.getElementById('leadBtn').innerText = "Aligning...";
    setTimeout(() => {
        playSound('success');
        document.getElementById('leadBtn').innerText = "Subscribed";
        res.style.color = '#22c55e';
        res.innerText = "The stars acknowledge your request. Projection initiated.";
    }, 1500);
}
*/

// Archive
function saveToArchive() { 
    document.getElementById('saveBtn').innerText = "Inscribed ✓"; 
    playSound('success');
    let archive = JSON.parse(localStorage.getItem('astroArchive')) || [];
    archive.unshift({ sign: document.getElementById('signTitle').innerText, date: new Date().toLocaleDateString() });
    localStorage.setItem('astroArchive', JSON.stringify(archive));
    renderArchive();
}

function renderArchive() {
    const container = document.getElementById('archiveContainer');
    let archive = JSON.parse(localStorage.getItem('astroArchive')) || [];
    if (archive.length === 0) return;
    container.innerHTML = ''; 
    archive.forEach(item => { container.innerHTML += `<div class="archive-item"><div class="archive-date">${item.date}</div><strong>${item.sign} Reading Inscribed</strong></div>`; });
}

document.querySelector('.close-btn').onclick = () => document.getElementById('fortuneModal').style.display = "none";
window.onclick = (e) => { if (e.target == document.getElementById('fortuneModal')) document.getElementById('fortuneModal').style.display = "none"; };
renderArchive();
