// Entry module for catalog.html - full catalog with category + favorites filtering.
import { getProducts } from './data.mjs';
import { renderProducts, attachGridEvents } from './render.mjs';
import { openModal, setFavoriteChangeHandler } from './modal.mjs';
import { getFavorites } from './favorites.mjs';

let allProducts = [];
let activeCategory = 'all';
let favoritesOnly = false;

const grid = document.getElementById('catalog-grid');
const resultCount = document.getElementById('result-count');
const favoritesCheckbox = document.getElementById('favorites-only');
const tabButtons = document.querySelectorAll('.tab-btn');

function applyFilters() {
    let list = allProducts;

    if (activeCategory !== 'all') {
        list = list.filter((product) => product.category === activeCategory);
    }

    if (favoritesOnly) {
        const favorites = getFavorites();
        list = list.filter((product) => favorites.includes(product.id));
    }

    renderProducts(grid, list);
    resultCount.textContent = `${list.length} item${list.length === 1 ? '' : 's'}`;
}

function setActiveTab(category) {
    activeCategory = category;
    tabButtons.forEach((btn) => {
        const isActive = btn.dataset.category === category;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
    });
}

function wireControls() {
    tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            setActiveTab(btn.dataset.category);
            applyFilters();
        });
    });

    favoritesCheckbox.addEventListener('change', (event) => {
        favoritesOnly = event.target.checked;
        applyFilters();
    });

    attachGridEvents(grid, {
        onView: (id) => {
            const product = allProducts.find((item) => item.id === id);
            if (product) openModal(product);
        },
        onFavoriteChange: () => {
            if (favoritesOnly) applyFilters();
        }
    });

    setFavoriteChangeHandler(() => {
        if (favoritesOnly) applyFilters();
    });
}

async function init() {
    allProducts = await getProducts();

    const params = new URLSearchParams(window.location.search);
    const presetCategory = params.get('category');
    if (presetCategory && ['apparel', 'watches', 'mugs'].includes(presetCategory)) {
        setActiveTab(presetCategory);
    }

    wireControls();
    applyFilters();
}

init();
