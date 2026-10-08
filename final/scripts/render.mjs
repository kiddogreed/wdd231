// Renders product cards into a grid container and wires up their shared
// favorite/view-details interactions using event delegation.
import { isFavorite, toggleFavorite } from './favorites.mjs';
import { formatPrice } from './format.mjs';

function cardMarkup(product) {
    const favored = isFavorite(product.id);
    return `
        <article class="product-card" data-id="${product.id}" data-category="${product.category}">
            <div class="product-image-wrap">
                <img src="${product.image}" alt="${product.name}" width="400" height="400" loading="lazy">
                <button type="button" class="favorite-btn" data-id="${product.id}"
                    aria-pressed="${favored}"
                    aria-label="${favored ? 'Remove' : 'Add'} ${product.name} ${favored ? 'from' : 'to'} favorites">${favored ? '\u2665' : '\u2661'}</button>
            </div>
            <div class="product-info">
                <span class="product-tag">${product.tag}</span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-meta-row">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <span class="product-stock">${product.stock}</span>
                </div>
                <button type="button" class="btn btn-outline btn-small view-btn" data-id="${product.id}">View Details</button>
            </div>
        </article>`;
}

export function renderProducts(container, products) {
    if (!products.length) {
        container.innerHTML = '<p class="no-results">No items match these filters yet. Try a different category.</p>';
        return;
    }
    container.innerHTML = products.map(cardMarkup).join('');
}

export function attachGridEvents(container, { onView, onFavoriteChange } = {}) {
    container.addEventListener('click', (event) => {
        const favoriteBtn = event.target.closest('.favorite-btn');
        const viewBtn = event.target.closest('.view-btn');

        if (favoriteBtn) {
            const id = favoriteBtn.dataset.id;
            const favored = toggleFavorite(id);
            favoriteBtn.setAttribute('aria-pressed', String(favored));
            favoriteBtn.textContent = favored ? '\u2665' : '\u2661';
            if (onFavoriteChange) onFavoriteChange(id, favored);
            return;
        }

        if (viewBtn && onView) {
            onView(viewBtn.dataset.id);
        }
    });
}
