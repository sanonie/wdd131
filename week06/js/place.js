// Place JavaScript - Enhanced with required functionality

// Function 1: Calculate wind chill
function calculateWindChill(temp, windSpeed) {
    if (temp <= 10 && windSpeed > 4.8) {
        return Math.round(13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16));
    } else {
        return "N/A";
    }
}

// Function 2: Get weather data
function getWeatherData() {
    return {
        temperature: 25,
        windSpeed: 5,
        humidity: 65,
        condition: "Sunny"
    };
}

// Function 3: Display weather information
function displayWeatherInfo() {
    const weather = getWeatherData();
    const windchill = calculateWindChill(weather.temperature, weather.windSpeed);

    // Using template literals for string building
    const weatherHTML = `
        <div class="weather-item">
            <h3>Temperature</h3>
            <p>${weather.temperature}°C</p>
        </div>
        <div class="weather-item">
            <h3>Wind Speed</h3>
            <p>${weather.windSpeed} km/h</p>
        </div>
        <div class="weather-item">
            <h3>Wind Chill</h3>
            <p id="windchill">${windchill}</p>
        </div>
        <div class="weather-item">
            <h3>Humidity</h3>
            <p>${weather.humidity}%</p>
        </div>
    `;

    document.querySelector('.weather-info').innerHTML = weatherHTML;
}

// Function 4: Handle user preferences
function handleUserPreferences() {
    const preferences = JSON.parse(localStorage.getItem('userPreferences')) || {
        theme: 'light',
        units: 'celsius',
        notifications: true
    };

    // Conditional branching
    if (preferences.theme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    return preferences;
}

// Function 5: Save user interaction
function saveUserInteraction(interactionType, details) {
    const interactions = JSON.parse(localStorage.getItem('userInteractions')) || [];
    const interaction = {
        type: interactionType,
        details: details,
        timestamp: new Date().toISOString()
    };

    interactions.push(interaction);

    // Limit to last 10 interactions
    if (interactions.length > 10) {
        interactions.shift();
    }

    localStorage.setItem('userInteractions', JSON.stringify(interactions));
}

// Array of Madagascar facts
const madagascarFacts = [
    "Madagascar is the fourth largest island in the world.",
    "It is home to over 100 species of lemurs found nowhere else.",
    "The island separated from Africa about 160 million years ago.",
    "It has unique baobab trees that store water in their trunks.",
    "Madagascar has 5 UNESCO World Heritage Sites."
];

// Function 6: Display random fact
function displayRandomFact() {
    const randomIndex = Math.floor(Math.random() * madagascarFacts.length);
    const fact = madagascarFacts[randomIndex];

    // Check if fact element exists, if not create it
    let factElement = document.getElementById('random-fact');
    if (!factElement) {
        factElement = document.createElement('div');
        factElement.id = 'random-fact';
        factElement.className = 'fact-display';
        document.querySelector('main').appendChild(factElement);
    }

    factElement.innerHTML = `<h3>Did you know?</h3><p>${fact}</p>`;
}

// Object containing page configuration
const pageConfig = {
    title: "Madagascar - A Beautiful Island Nation",
    theme: "nature",
    features: ["weather", "facts", "navigation"],
    loadLazyImages: function() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }
};

// Main initialization function
document.addEventListener('DOMContentLoaded', function () {
    // DOM interaction and event listening
    displayWeatherInfo();
    handleUserPreferences();
    displayRandomFact();

    // Set footer information
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;
    document.getElementById('current-year').textContent = currentYear;
    document.getElementById('last-modified').textContent = `Last modified: ${lastModified}`;

    // Add event listener for fact refresh
    const refreshButton = document.createElement('button');
    refreshButton.textContent = 'New Fact';
    refreshButton.id = 'refresh-fact';
    refreshButton.addEventListener('click', function() {
        displayRandomFact();
        saveUserInteraction('fact_refresh', 'User clicked for new fact');
    });

    // Insert button after the weather section
    const weatherSection = document.querySelector('.weather-section');
    if (weatherSection) {
        weatherSection.appendChild(refreshButton);
    }

    // Load lazy images
    pageConfig.loadLazyImages();

    // Save page visit
    saveUserInteraction('page_visit', 'Visited place.html');
});
