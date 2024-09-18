async function updateClock() {
    const clockElement = document.getElementById("clock");
    const dateElement = document.getElementById("date");
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const is24Hour = document.body.classList.contains('format-24');
    let period = '';
    if (!is24Hour) {
        period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
    }
    hours = String(hours).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds} ${period}`;
    dateElement.textContent = now.toISOString().split('T')[0];
    updateAnalogClock(now);
    updateWorldClocks();
}
function updateAnalogClock(now) {
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const hourDeg = (hours % 12) * 30 + minutes * 0.5;
    const minuteDeg = minutes * 6 + seconds * 0.1;
    const secondDeg = seconds * 6;

    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;
}
async function updateWeather() {
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const location = 'London'; // Default location or change to your location
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
    const data = await response.json();   
    document.getElementById('locationName').textContent = data.name;
    document.getElementById('temperature').textContent = data.main.temp;
}
let alarmTime = '';
document.getElementById('setAlarm').addEventListener('click', () => {
    alarmTime = document.getElementById('alarmTime').value;
    document.getElementById('alarmStatus').textContent = `Alarm set for ${alarmTime}`;
});
function checkAlarm() {
    const now = new Date();
    const currentTime = now.toTimeString().substring(0, 5);
    if (currentTime === alarmTime) {
        alert('Alarm is ringing!');
        alarmTime = '';
    }
}
function updateWorldClocks() {
    const now = new Date();
    const newYorkOffset = -4; 
    const tokyoOffset = 9;
    const newYorkTime = new Date(now.getTime() + (newYorkOffset * 3600000));
    const tokyoTime = new Date(now.getTime() + (tokyoOffset * 3600000));
    document.getElementById('newYorkClock').textContent = `New York: ${newYorkTime.toTimeString().substring(0, 8)}`;
    document.getElementById('tokyoClock').textContent = `Tokyo: ${tokyoTime.toTimeString().substring(0, 8)}`;
}
document.getElementById('toggleMode').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});
document.getElementById('toggleFormat').addEventListener('click', () => {
    document.body.classList.toggle('format-24');
});
document.getElementById('themeSelector').addEventListener('change', (e) => {
    document.documentElement.style.setProperty('--primary-color', e.target.value);
});
document.getElementById('fontSelector').addEventListener('change', (e) => {
    document.body.style.fontFamily = e.target.value;
});
setInterval(() => {
    updateClock();
    checkAlarm();
}, 1000);
updateWeather();
