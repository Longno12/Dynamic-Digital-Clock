# Dynamic-Digital-Clock

A modern, interactive digital clock featuring weather updates, world time zones, and customizable themes, built using JavaScript, HTML, and CSS.

## Key Features

- **Real-Time Clock**: Displays the current time with an option to toggle between 12-hour and 24-hour formats.
- **Analog Clock**: A visual analog clock with smooth, real-time animations.
- **Weather Widget**: Displays the current weather for a specified location using the OpenWeather API.
- **World Clocks**: Shows the time in multiple time zones (New York, Tokyo).
- **Alarm System**: Users can set alarms and receive notifications when it's time.
- **Customizable Themes**: Change the clock’s primary color and font family through an intuitive UI.
- **Dark/Light Mode**: Switch between dark and light modes to match the user's preference.
- **Smooth Transitions**: All UI components have animated transitions for a modern feel.

## Demo
![Digital Clock Demo](https://github.com/Longno12/Dynamic-Digital-Clock/blob/main/Screenshot%202024-09-18%20064522.png)

## Technologies Used

- **HTML5**: For structuring the web page.
- **CSS3**: For designing the layout and applying animations.
- **JavaScript (ES6+)**: For adding interactivity, weather updates, clock functionality, and theme customization.
- **OpenWeather API**: For fetching live weather data based on the user's selected location.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Longno12/Dynamic-Digital-Clock.git

2. Navigate to the project directory:
 ```bash
   cd Dynamic-Digital-Clock

Open index.html in your browser to view and use the clock.

## Configuration
   To fetch live weather data, you need an API key from OpenWeather. Follow these steps:

Sign up on the OpenWeather platform and get your free API key.
Open the script.js file.

Replace YOUR_API_KEY in the weather section with your actual API key:

const apiKey = 'YOUR_API_KEY';

