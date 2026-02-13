
document.addEventListener('DOMContentLoaded', function () {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');


    loadFavorites();


    favoriteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const activity = this.getAttribute('data-activity');
            toggleFavorite(activity);

            updateButtonState(activity);
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
        favoritesList.innerHTML = `
            <p>No favorites selected yet.</p>
        `;
        return;
    }

    favorites.forEach(activity => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        favoriteItem.textContent = formatActivityName(activity);
        favoritesList.appendChild(favoriteItem);
    });

    // Update buttons to reflect saved favorites
    favorites.forEach(activity => updateButtonState(activity));
}

function updateButtonState(activity) {
    const btn = document.querySelector(`.favorite-btn[data-activity="${activity}"]`);
    if (!btn) return;
    const favorites = getFavoritesFromStorage();
    const isFav = favorites.includes(activity);
    btn.setAttribute('aria-pressed', String(isFav));
    btn.textContent = isFav ? 'Remove Favorite' : 'Add to Favorites';
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