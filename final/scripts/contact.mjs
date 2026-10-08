// Entry module for contact.html - pre-order form draft persistence + prefill.
import { getProducts } from './data.mjs';

const DRAFT_KEY = 'trentsyPreorderDraft';
const form = document.getElementById('preorder-form');
const itemField = document.getElementById('item-interest');
const categoryRadios = form.querySelectorAll('input[name="preferred-category"]');

function restoreDraft() {
    try {
        const draft = JSON.parse(localStorage.getItem(DRAFT_KEY));
        if (!draft) return;
        Object.entries(draft).forEach(([name, value]) => {
            const field = form.elements.namedItem(name);
            if (!field) return;
            if (field instanceof RadioNodeList || field.type === 'radio') {
                const match = form.querySelector(`[name="${name}"][value="${value}"]`);
                if (match) match.checked = true;
            } else if (field.type === 'checkbox') {
                field.checked = value === 'on';
            } else {
                field.value = value;
            }
        });
    } catch {
        // Ignore corrupted draft data.
    }
}

function saveDraft() {
    const data = {};
    new FormData(form).forEach((value, key) => {
        data[key] = value;
    });
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
}

function prefillFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const item = params.get('item');
    const category = params.get('category');

    if (item) itemField.value = item;

    if (category) {
        categoryRadios.forEach((radio) => {
            radio.checked = radio.value === category;
        });
    }
}

async function populateItemSuggestions() {
    const products = await getProducts();
    const datalist = document.getElementById('item-options');
    datalist.innerHTML = products.map((product) => `<option value="${product.name}"></option>`).join('');
}

restoreDraft();
prefillFromQuery();
populateItemSuggestions();

form.addEventListener('input', saveDraft);
form.addEventListener('submit', () => {
    localStorage.removeItem(DRAFT_KEY);
    // Default GET submission continues on to form-action.html.
});
