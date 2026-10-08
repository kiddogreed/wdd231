// Accessible product "quick view" modal built on the native <dialog> element.
import { isFavorite, toggleFavorite } from './favorites.mjs';
import { formatPrice, starString } from './format.mjs';

const dialog = document.getElementById('product-modal');
const content = document.getElementById('modal-content');
let favoriteChangeHandler = null;

export function setFavoriteChangeHandler(fn) {
    favoriteChangeHandler = fn;
}

function buildMarkup(product) {
    const favored = isFavorite(product.id);
    return `
        <button type="button" class="modal-close" id="modal-close-btn" aria-label="Close dialog">&times;</button>
        <img class="modal-image" src="${product.image}" alt="${product.name}" width="400" height="400">
        <div class="modal-badges">
            <span class="badge">${product.tag}</span>
            <span class="badge">${product.stock}</span>
            <span class="badge">SKU ${product.sku}</span>
        </div>
        <h2 id="modal-title">${product.name}</h2>
        <p aria-label="Rating ${product.rating} out of 5">${starString(product.rating)} <span>(${product.rating})</span></p>
        <p>${product.description}</p>
        <p class="modal-price">${formatPrice(product.price)}</p>
        <div class="modal-actions">
            <button type="button" class="btn btn-outline" id="modal-favorite-btn"
                aria-pressed="${favored}">${favored ? '\u2665 Saved to Favorites' : '\u2661 Save to Favorites'}</button>
            <a class="btn btn-primary" href="contact.html?item=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category)}#preorder-form">Request This Item</a>
        </div>`;
}

export function openModal(product) {
    content.innerHTML = buildMarkup(product);
    dialog.showModal();

    document.getElementById('modal-close-btn').addEventListener('click', () => dialog.close());

    const favoriteBtn = document.getElementById('modal-favorite-btn');
    favoriteBtn.addEventListener('click', () => {
        const favored = toggleFavorite(product.id);
        favoriteBtn.setAttribute('aria-pressed', String(favored));
        favoriteBtn.textContent = favored ? '\u2665 Saved to Favorites' : '\u2661 Save to Favorites';
        if (favoriteChangeHandler) favoriteChangeHandler(product.id, favored);
    });
}

// Close the dialog when the backdrop (outside the inner content box) is clicked.
dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const clickedInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
    if (!clickedInside) {
        dialog.close();
    }
});
