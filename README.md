# Dynamic-Digital-Clock - A Modern & Dynamic Timepiece

Dynamic-Digital-Clock is a beautifully designed, highly interactive digital and analog clock built with modern web technologies. It features a stunning animated gradient background, a sleek glassmorphic UI, and a wealth of customization options. This project goes beyond a simple clock to provide a complete and elegant time-keeping dashboard.

## Key Features

-   **Ultra-Modern UI**: A visually stunning interface with a "live wallpaper" style animated gradient background.
-   **Glassmorphism & Neumorphism**: Soft, translucent UI elements and subtle shadows create a tactile and sophisticated feel.
-   **Sleek Slide-Out Settings Panel**: All options are neatly organized in a non-intrusive side panel, keeping the main view clean.
-   **Dynamic Weather with Geolocation**: Automatically detects the user's location to provide an accurate, real-time weather forecast.
-   **Extensive World Clock Display**: View the current time in over 15 major cities across different continents, all within the settings panel.
-   **Advanced Theming**: Personalize your experience by choosing from multiple professional color themes (Neon, Ocean, Sunrise, Forest, etc.) and modern web fonts.
-   **Digital & Analog Clocks**: Enjoy both a large, easy-to-read digital display and a beautifully animated analog clock that sync in real-time.
-   **Alarm System**: Set an alarm with a simple time picker, with a clear status display on the main screen.
-   **Persistent User Preferences**: Your chosen theme, font, and time format are saved in your browser, so your settings are remembered for your next visit.
-   **Fully Responsive**: The layout fluidly adapts to any screen size, from mobile phones to desktop monitors.

## Demo

*(**Note to developer:** Please replace the placeholder image below with a new screenshot of the beautiful Dynamic-Digital-Clock interface!)*

![Dynamic-Digital-Clock Demo](https://github.com/Longno12/Dynamic-Digital-Clock/blob/main/download.png)
*^ An image of the previous version. The new version is significantly more modern!*

## Technologies Used

-   **HTML5**: Structured with semantic and accessible markup.
-   **CSS3**: Heavily utilizes modern features like **CSS Variables** for theming, **Flexbox** and **Grid** for layout, and advanced **Animations/Transitions**.
-   **JavaScript (ES6+)**: Powers all the dynamic functionality in a modular and efficient structure. It handles:
    -   Real-time clock updates (`Date` object).
    -   DOM manipulation for all interactive elements.
    -   The **Geolocation API** for location-based weather.
    -   **localStorage** for saving user preferences.
-   **OpenWeather API**: Used to fetch live weather data.

## Setup & Configuration

Setting up Dynamic-Digital-Clock on your local machine is simple.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Longno12/Dynamic-Digital-Clock.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd Dynamic-Digital-Clock
    ```

3.  **Get your API Key for Weather:**
    To enable the live weather feature, you need a free API key from OpenWeather.
    -   Sign up on the [OpenWeather](https://openweathermap.org/appid) platform.
    -   Open the `script.js` file.

4.  **Add your API Key:**
    Find the `CONFIGURATION` block at the top of `script.js` and replace `'YOUR_API_KEY'` with your actual key:
    ```javascript
    const API_KEY = 'YOUR_API_KEY'; // Replace with your actual OpenWeatherMap API key
    ```

5.  **Run the Application:**
    Simply open the `index.html` file in your web browser to see Dynamic-Digital-Clock in action.

## Customization

Dynamic-Digital-Clock is designed to be easily customizable.

-   **Add More World Clocks**: Open `script.js` and add a new city object to the `WORLD_CLOCKS` array. You can find time zone names on the [TZ database list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

-   **Add New Themes**: Open `styles.css` and define a new theme ruleset using CSS variables. Then, add it as an `<option>` in the `index.html` file's theme selector.
