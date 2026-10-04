import { discoverItems } from '../data/discover.mjs';

const discoverGrid = document.getElementById('discover-grid');
const visitBanner = document.getElementById('visit-message');
const modal = document.getElementById('discover-modal');
const modalTitle = document.getElementById('discover-modal-title');
const modalImg = document.getElementById('discover-modal-img');
const modalAddress = document.getElementById('discover-modal-address');
const modalDesc = document.getElementById('discover-modal-desc');
const modalClose = document.getElementById('discover-modal-close');

function displayItems(items) {
    discoverGrid.innerHTML = '';

    items.forEach((item) => {
        const card = document.createElement('section');
        card.classList.add('card');

        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button type="button" class="card-button">Learn More</button>
        `;

        card.querySelector('.card-button').addEventListener('click', () => openModal(item));
        discoverGrid.appendChild(card);
    });
}

function openModal(item) {
    modalTitle.textContent = item.name;
    modalImg.src = item.image;
    modalImg.alt = item.name;
    modalAddress.textContent = item.address;
    modalDesc.textContent = item.description;
    modal.showModal();
}

modalClose.addEventListener('click', () => modal.close());

function getVisitMessage() {
    const now = Date.now();
    const lastVisit = localStorage.getItem('discoverLastVisit');
    let message;

    if (!lastVisit) {
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const msPerDay = 1000 * 60 * 60 * 24;
        const elapsed = now - Number(lastVisit);

        if (elapsed < msPerDay) {
            message = 'Back so soon! Awesome!';
        } else {
            const days = Math.floor(elapsed / msPerDay);
            const dayWord = days === 1 ? 'day' : 'days';
            message = `You last visited ${days} ${dayWord} ago.`;
        }
    }

    localStorage.setItem('discoverLastVisit', String(now));
    return message;
}

visitBanner.textContent = getVisitMessage();
displayItems(discoverItems);
