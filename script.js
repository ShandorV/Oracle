const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

const grid = document.getElementById('zodiacGrid');
const modal = document.getElementById('fortuneModal');
const sign1Sel = document.getElementById('sign1');
const sign2Sel = document.getElementById('sign2');

// Ініціалізація випадаючих списків та карток
signs.forEach(sign => {
    // Для сітки
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${sign}</h3>`;
    card.onclick = () => getDailyFortune(sign);
    grid.appendChild(card);

    // Для вибору сумісності
    let opt1 = new Option(sign, sign);
    let opt2 = new Option(sign, sign);
    sign1Sel.add(opt1);
    sign2Sel.add(opt2);
});

// Функція отримання прогнозу з API
async function getDailyFortune(sign) {
    const modalText = document.getElementById('fortuneText');
    const modalTitle = document.getElementById('signTitle');
    
    modalTitle.innerText = sign;
    modalText.innerText = "Consulting the stars...";
    modal.style.display = "block";

    try {
        // ВИПРАВЛЕНО: правильний синтаксис для URL-адреси
        const response = await fetch(`https://sandipbgt.com/theastrologer/api/horoscope/${sign.toLowerCase()}/today/`);
        
        if (!response.ok) {
            throw new Error('Network issues');
        }
        
        const data = await response.json();
        modalText.innerText = data.horoscope;
    } catch (error) {
        console.error("API Error: ", error);
        modalText.innerText = "The stars are silent. Please check your internet connection or try again later.";
    }
}

// Проста логіка сумісності
function checkCompatibility() {
    const s1 = sign1Sel.value;
    const s2 = sign2Sel.value;
    const result = document.getElementById('compResult');
    
    const score = Math.floor(Math.random() * 41) + 60; // Випадковий результат 60-100%
    result.innerText = `Compatibility between ${s1} and ${s2} is ${score}%!`;
}

// Close Modal (виправлено, щоб працювало коректно)
document.querySelector('.close-btn').onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };