// Entry module for index.html - loads and renders the featured product subset.
import { getProducts } from './data.mjs';
import { renderProducts, attachGridEvents } from './render.mjs';
import { openModal } from './modal.mjs';

async function init() {
    const products = await getProducts();
    const featured = products.filter((product) => product.featured);
    const grid = document.getElementById('featured-grid');

    renderProducts(grid, featured);

    attachGridEvents(grid, {
        onView: (id) => {
            const product = products.find((item) => item.id === id);
            if (product) openModal(product);
        }
    });
}

init();
