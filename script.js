document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURATION ---
        // --- CONFIGURATION ---
    const API_KEY = 'YOUR_API_KEY'; // IMPORTANT: Replace with your OpenWeatherMap API key
    const DEFAULT_LOCATION = 'San Francisco';
    const WORLD_CLOCKS = [
        { name: 'Tokyo', timeZone: 'Asia/Tokyo' },
        { name: 'London', timeZone: 'Europe/London' },
        { name: 'Sydney', timeZone: 'Australia/Sydney' },
        { name: 'New York', timeZone: 'America/New_York' },
        { name: 'Paris', timeZone: 'Europe/Paris' },
        { name: 'Moscow', timeZone: 'Europe/Moscow' },
        { name: 'Dubai', timeZone: 'Asia/Dubai' },
        { name: 'Shanghai', timeZone: 'Asia/Shanghai' },
        { name: 'Los Angeles', timeZone: 'America/Los_Angeles' },
        { name: 'Chicago', timeZone: 'America/Chicago' },
        { name: 'Singapore', timeZone: 'Asia/Singapore' },
        { name: 'Hong Kong', timeZone: 'Asia/Hong_Kong' },
        { name: 'Berlin', timeZone: 'Europe/Berlin' },
        { name: 'São Paulo', timeZone: 'America/Sao_Paulo' },
        { name: 'Cairo', timeZone: 'Africa/Cairo' },
        { name: 'Vancouver', timeZone: 'America/Vancouver' },
        { name: 'Seoul', timeZone: 'Asia/Seoul' }
    ];

    // --- DOM ELEMENT SELECTORS ---
    const elements = {
        digitalClock: document.getElementById('digital-clock'),
        dateDisplay: document.getElementById('date-display'),
        hourHand: document.getElementById('hour-hand'),
        minuteHand: document.getElementById('minute-hand'),
        secondHand: document.getElementById('second-hand'),
        locationName: document.getElementById('location-name'),
        temperature: document.getElementById('temperature'),
        alarmStatus: document.getElementById('alarm-status'),
        settingsToggle: document.getElementById('settings-toggle'),
        settingsPanel: document.getElementById('settings-panel'),
        settingsClose: document.getElementById('settings-close-btn'),
        themeSelector: document.getElementById('theme-selector'),
        fontSelector: document.getElementById('font-selector'),
        toggleFormatBtn: document.getElementById('toggle-format-btn'),
        alarmTimeInput: document.getElementById('alarm-time-input'),
        setAlarmBtn: document.getElementById('set-alarm-btn'),
        worldClocksContainer: document.getElementById('world-clocks-container'),
        html: document.documentElement,
    };

    // --- STATE MANAGEMENT ---
    let state = {
        is24HourFormat: true,
        alarmTime: null,
        weatherData: null,
        userLocation: DEFAULT_LOCATION,
    };

    // --- CLOCK AND TIME ---
    function updateClocks() {
        const now = new Date();

        // Digital Clock
        const hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        let displayHours = hours;
        let period = '';
        if (!state.is24HourFormat) {
            period = hours >= 12 ? ' PM' : ' AM';
            displayHours = hours % 12 || 12;
        }
        elements.digitalClock.textContent = `${String(displayHours).padStart(2, '0')}:${minutes}:${seconds}${period}`;

        // Date Display
        elements.dateDisplay.textContent = now.toLocaleDateString(undefined, {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        // Analog Clock
        const secondsRatio = now.getSeconds() / 60;
        const minutesRatio = (secondsRatio + now.getMinutes()) / 60;
        const hoursRatio = (minutesRatio + now.getHours()) / 12;

        setRotation(elements.secondHand, secondsRatio);
        setRotation(elements.minuteHand, minutesRatio);
        setRotation(elements.hourHand, hoursRatio);

        checkAlarm(now);
        updateWorldClocks();
    }

    function setRotation(element, rotationRatio) {
        element.style.transform = `rotate(${rotationRatio * 360}deg)`;
    }
    
    function updateWorldClocks() {
        let content = '';
        const now = new Date();
        WORLD_CLOCKS.forEach(city => {
            const timeString = now.toLocaleTimeString('en-US', {
                timeZone: city.timeZone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            content += `<div>${city.name}: ${timeString}</div>`;
        });
        elements.worldClocksContainer.innerHTML = content;
    }


    // --- WEATHER ---
    async function fetchWeather(location) {
        if (API_KEY === 'YOUR_API_KEY' || !API_KEY) {
            console.warn('API Key for weather is not set. Skipping fetch.');
            elements.locationName.textContent = 'Weather Unavailable';
            return;
        }
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`);
            if (!response.ok) throw new Error(`Weather data not found for ${location}`);
            const data = await response.json();
            state.weatherData = {
                name: data.name,
                temp: Math.round(data.main.temp)
            };
            updateWeatherDisplay();
        } catch (error) {
            console.error('Error fetching weather:', error);
            elements.locationName.textContent = 'Location Error';
        }
    }

    function updateWeatherDisplay() {
        if (state.weatherData) {
            elements.locationName.textContent = state.weatherData.name;
            elements.temperature.textContent = `${state.weatherData.temp}°C`;
        }
    }
    
    function getUserLocationAndFetchWeather() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(async position => {
                const { latitude, longitude } = position.coords;
                if (API_KEY === 'YOUR_API_KEY' || !API_KEY) return fetchWeather(DEFAULT_LOCATION);
                try {
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`);
                    const data = await response.json();
                    state.userLocation = data.name;
                } catch(e) {
                    state.userLocation = DEFAULT_LOCATION;
                }
                fetchWeather(state.userLocation);
            }, () => {
                fetchWeather(DEFAULT_LOCATION);
            });
        } else {
            fetchWeather(DEFAULT_LOCATION);
        }
    }


    // --- ALARM ---
    function setAlarm() {
        const timeValue = elements.alarmTimeInput.value;
        if (timeValue) {
            state.alarmTime = timeValue;
            elements.alarmStatus.textContent = `Alarm for ${timeValue}`;
            elements.alarmTimeInput.value = '';
            closeSettings();
        }
    }

    function checkAlarm(now) {
        if (state.alarmTime) {
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            if (currentTime === state.alarmTime) {
                alert(`ALARM! It's ${state.alarmTime}`);
                state.alarmTime = null;
                elements.alarmStatus.textContent = 'No Alarm Set';
            }
        }
    }

    // --- SETTINGS & UI ---
    function toggleSettings() {
        elements.settingsPanel.classList.toggle('open');
    }
    
    function closeSettings() {
        elements.settingsPanel.classList.remove('open');
    }

    function setTheme(theme) {
        elements.html.setAttribute('data-theme', theme);
        localStorage.setItem('clockTheme', theme);
    }

    function setFont(font) {
        elements.html.setAttribute('data-font', font);
        localStorage.setItem('clockFont', font);
    }

    function toggleTimeFormat() {
        state.is24HourFormat = !state.is24HourFormat;
        elements.toggleFormatBtn.textContent = state.is24HourFormat ? 'Switch to 12-Hour' : 'Switch to 24-Hour';
        localStorage.setItem('is24HourFormat', state.is24HourFormat);
        updateClocks();
    }

    // --- EVENT LISTENERS ---
    function addEventListeners() {
        elements.settingsToggle.addEventListener('click', toggleSettings);
        elements.settingsClose.addEventListener('click', toggleSettings);
        elements.themeSelector.addEventListener('change', (e) => setTheme(e.target.value));
        elements.fontSelector.addEventListener('change', (e) => setFont(e.target.value));
        elements.toggleFormatBtn.addEventListener('click', toggleTimeFormat);
        elements.setAlarmBtn.addEventListener('click', setAlarm);
    }
    
    // --- INITIALIZATION ---
    function init() {
        // Load saved preferences
        const savedTheme = localStorage.getItem('clockTheme') || 'neon';
        const savedFont = localStorage.getItem('clockFont') || 'poppins';
        const savedFormat = localStorage.getItem('is24HourFormat');

        elements.themeSelector.value = savedTheme;
        elements.fontSelector.value = savedFont;
        setTheme(savedTheme);
        setFont(savedFont);

        if (savedFormat !== null) {
            state.is24HourFormat = JSON.parse(savedFormat);
        }
        elements.toggleFormatBtn.textContent = state.is24HourFormat ? 'Switch to 12-Hour' : 'Switch to 24-Hour';

        addEventListeners();
        getUserLocationAndFetchWeather();
        setInterval(updateClocks, 1000);
        updateClocks();
    }

    init();
});