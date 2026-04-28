const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

// Довідник стихій
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

// 1. Ініціалізація
signs.forEach(sign => {
    // Сітка
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${sign}</h3>`;
    card.onclick = () => getDailyFortune(sign);
    grid.appendChild(card);

    // Списки сумісності
    let opt1 = new Option(sign, sign);
    let opt2 = new Option(sign, sign);
    sign1Sel.add(opt1);
    sign2Sel.add(opt2);
});

// 2. API Прогноз
async function getDailyFortune(sign) {
    const modalText = document.getElementById('fortuneText');
    const modalTitle = document.getElementById('signTitle');
    const btn = document.getElementById('saveBtn');
    
    modalTitle.innerText = sign;
    modalText.innerText = "Consulting the stars...";
    btn.innerText = "Save to Archive"; // Скидаємо текст кнопки
    modal.style.display = "block";
    document.getElementById('luckyAttributes').style.display = "none";

    try {
        const response = await fetch(`https://sandipbgt.com/theastrologer/api/horoscope/${sign.toLowerCase()}/today/`);
        if (!response.ok) throw new Error('Network issues');
        
        const data = await response.json();
        modalText.innerText = data.horoscope;
        // --- Генерація щасливих атрибутів ---
        const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#a855f7', '#ec4899'];
        const colorNames = ['Ruby Red', 'Amber Orange', 'Solar Yellow', 'Emerald Green', 'Neon Cyan', 'Deep Blue', 'Cyber Purple', 'Hot Pink'];
        
        // Випадковий колір
        const colorIndex = Math.floor(Math.random() * colors.length);
        const luckyColorHex = colors[colorIndex];
        const luckyColorName = colorNames[colorIndex];
        
        // Генеруємо 3 випадкових числа від 1 до 99
        const luckyNums = Array.from({length: 3}, () => Math.floor(Math.random() * 99) + 1).join(', ');

        // Записуємо дані в HTML
        document.getElementById('luckyNumbers').innerText = luckyNums;
        document.getElementById('luckyColorBox').style.backgroundColor = luckyColorHex;
        document.getElementById('luckyColorName').innerText = luckyColorName;
        
        // Показуємо віджет
        document.getElementById('luckyAttributes').style.display = "flex";
    } catch (error) {
        console.error("API Error: ", error);
        modalText.innerText = "The stars are silent. Please check your internet connection or try again later.";
    }
}

// 3. Розумна Сумісність
function checkCompatibility() {
    const s1 = sign1Sel.value;
    const s2 = sign2Sel.value;
    const result = document.getElementById('compResult');
    
    const element1 = zodiacElements[s1];
    const element2 = zodiacElements[s2];
    
    let baseScore = 0;
    let message = "";

    if (element1 === element2) {
        baseScore = 85;
        message = `Perfect harmony! Both share the ${element1} element.`;
    } else if (
        (element1 === 'Fire' && element2 === 'Air') || (element1 === 'Air' && element2 === 'Fire') ||
        (element1 === 'Earth' && element2 === 'Water') || (element1 === 'Water' && element2 === 'Earth')
    ) {
        baseScore = 75;
        message = "Great match! Your elements complement each other beautifully.";
    } else {
        baseScore = 50;
        message = "A challenging but exciting dynamic. Opposites attract!";
    }

    const finalScore = baseScore + Math.floor(Math.random() * 15);
    result.innerHTML = `Compatibility: <strong>${finalScore}%</strong> <br> <span style="font-size: 0.9em; color: #94a3b8;">${message}</span>`;
}

// 4. Локальний Архів
function saveToArchive() {
    const currentSign = document.getElementById('signTitle').innerText;
    const currentText = document.getElementById('fortuneText').innerText;
    
    if (currentText.includes("Consulting") || currentText.includes("silent")) {
        alert("Wait for the forecast to load!");
        return;
    }

    const newEntry = {
        sign: currentSign,
        text: currentText,
        date: new Date().toLocaleDateString()
    };

    let archive = JSON.parse(localStorage.getItem('cyberOracleArchive')) || [];
    archive.unshift(newEntry);
    localStorage.setItem('cyberOracleArchive', JSON.stringify(archive));
    
    renderArchive();
    
    const btn = document.getElementById('saveBtn');
    btn.innerText = "Saved ✓";
}

function renderArchive() {
    const container = document.getElementById('archiveContainer');
    let archive = JSON.parse(localStorage.getItem('cyberOracleArchive')) || [];
    
    if (archive.length === 0) return;

    container.innerHTML = ''; 
    
    archive.forEach(item => {
        const div = document.createElement('div');
        div.className = 'archive-item';
        div.innerHTML = `
            <div class="archive-date">${item.date} - <strong>${item.sign}</strong></div>
            <div>${item.text}</div>
        `;
        container.appendChild(div);
    });
}

// 5. Закриття модального вікна
document.querySelector('.close-btn').onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

// Запускаємо рендер архіву при старті
renderArchive();

// --- Логіка кнопки "Поділитися" ---
async function shareDestiny() {
    const currentSign = document.getElementById('signTitle').innerText;
    const currentText = document.getElementById('fortuneText').innerText;

    // Перевірка, чи завантажився текст
    if (currentText.includes("Consulting") || currentText.includes("silent")) {
        alert("Wait for the forecast to load!");
        return;
    }

    // Текст, який буде відправлятися
    const shareData = {
        title: 'Cyber Oracle Prediction',
        text: `My daily forecast for ${currentSign}:\n"${currentText}"\n\nDiscover your destiny at Cyber Oracle!`
    };

    const btn = document.getElementById('shareBtn');

    try {
        // Перевіряємо, чи підтримує браузер нативний Share API (зазвичай це мобільні пристрої)
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Запасний варіант для ПК: копіюємо в буфер обміну
            await navigator.clipboard.writeText(shareData.text);
            const originalText = btn.innerText;
            btn.innerText = "Copied! ✓";
            setTimeout(() => { btn.innerText = originalText; }, 2000);
        }
    } catch (err) {
        console.error('Share failed:', err);
    }
}

// --- Ініціалізація анімованого фону Particles.js ---
// Ми обгортаємо це в перевірку, щоб уникнути помилок, якщо бібліотека не завантажилась
if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#38bdf8" }, // Наш фірмовий блакитний
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#38bdf8",
                "opacity": 0.3,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2, // Плавний рух
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" }, // Лінії тягнуться до мишки
                "onclick": { "enable": true, "mode": "push" }, // При кліку додаються нові точки
                "resize": true
            },
            "modes": {
                "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
}

// --- Логіка фічі "Ask the Oracle" (Кібер-Куля передбачень) ---
function getMagicAnswer() {
    const input = document.getElementById('questionInput');
    const answerDisplay = document.getElementById('magicAnswer');
    
    // Перевіряємо, чи користувач щось ввів
    if (input.value.trim() === "") {
        answerDisplay.style.color = "#ef4444"; // Червоний колір для помилки
        answerDisplay.innerText = "Error 404: Question not found. Please type something.";
        return;
    }

    // Масив "кібер-відповідей"
    const answers = [
        "The algorithms say YES.",
        "Data is currently unclear. Recalculate later.",
        "System confirms: Absolutely.",
        "Access denied. The stars say NO.",
        "Probability is high (99.9%).",
        "Warning: Outcome is highly doubtful.",
        "Loading logic... Yes, it shall be done.",
        "Insufficient data for a meaningful answer."
    ];

    // Робимо ефект "обчислення"
    answerDisplay.style.color = "#94a3b8";
    answerDisplay.innerText = "Processing data...";

    // Затримка 1 секунда для більшого ефекту перед видачею результату
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * answers.length);
        answerDisplay.style.color = "#c084fc"; // Повертаємо фіолетовий колір
        answerDisplay.innerText = answers[randomIndex];
    }, 1000);
}
