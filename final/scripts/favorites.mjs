// Persists a visitor's favorited product ids in localStorage.
const STORAGE_KEY = 'trentsyFavorites';

export function getFavorites() {
    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(stored) ? stored : [];
    } catch {
        return [];
    }
}

export function isFavorite(id) {
    return getFavorites().includes(id);
}

export function toggleFavorite(id) {
    const favorites = getFavorites();
    const index = favorites.indexOf(id);
    if (index === -1) {
        favorites.push(id);
    } else {
        favorites.splice(index, 1);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    return favorites.includes(id);
}
