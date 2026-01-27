// Activities JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    const favoritesList = document.getElementById('favorites-list');

    // Load favorites from localStorage
    loadFavorites();

    // Add event listeners to favorite buttons
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const activity = this.getAttribute('data-activity');
            toggleFavorite(activity);
        });
    });

    // Set current year and last modified
    setFooterInfo();
});

function toggleFavorite(activity) {
    let favorites = getFavoritesFromStorage();

    if (favorites.includes(activity)) {
        // Remove from favorites
        favorites = favorites.filter(fav => fav !== activity);
    } else {
        // Add to favorites
        favorites.push(activity);
    }

    saveFavoritesToStorage(favorites);
    loadFavorites();
}

function loadFavorites() {
    const favorites = getFavoritesFromStorage();
    const favoritesList = document.getElementById('favorites-list');

    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p>No favorites selected yet.</p>';
        return;
    }

    favorites.forEach(activity => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        favoriteItem.textContent = formatActivityName(activity);
        favoritesList.appendChild(favoriteItem);
    });
}

function getFavoritesFromStorage() {
    const favorites = localStorage.getItem('madagascarFavorites');
    return favorites ? JSON.parse(favorites) : [];
}

function saveFavoritesToStorage(favorites) {
    localStorage.setItem('madagascarFavorites', JSON.stringify(favorites));
}

function formatActivityName(activity) {
    const names = {
        'lemur': 'Lemur Watching',
        'hiking': 'Hiking & Trekking',
        'diving': 'Scuba Diving',
        'culture': 'Cultural Tours'
    };
    return names[activity] || activity;
}

function setFooterInfo() {
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;

    document.getElementById('currentyear').textContent = currentYear;
    document.getElementById('lastModified').textContent = `Last modified: ${lastModified}`;
}