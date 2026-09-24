const spotlightsContainer = document.getElementById('spotlights-container');

const membershipLabels = {
    2: { label: 'Silver', className: 'silver' },
    3: { label: 'Gold', className: 'gold' }
};

async function getSpotlights() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        displaySpotlights(data.members);
    } catch (error) {
        spotlightsContainer.innerHTML = '<p>Spotlights are currently unavailable.</p>';
        console.error('Error fetching spotlights:', error);
    }
}

function displaySpotlights(members) {
    const eligible = members.filter((member) => member.membership === 2 || member.membership === 3);
    const shuffled = [...eligible].sort(() => Math.random() - 0.5);
    const count = Math.random() < 0.5 ? 2 : 3;
    const selected = shuffled.slice(0, count);

    spotlightsContainer.innerHTML = '';

    selected.forEach((member) => {
        const membership = membershipLabels[member.membership];

        const card = document.createElement('section');
        card.classList.add('spotlight-card');
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" width="120" height="120" loading="lazy">
            <div class="spotlight-info">
                <h3>${member.name}</h3>
                <p>${member.phone}</p>
                <p>${member.address}</p>
                <p><a href="${member.url}" target="_blank" rel="noopener">${member.url}</a></p>
                <span class="membership-badge ${membership.className}">${membership.label}</span>
            </div>
        `;
        spotlightsContainer.appendChild(card);
    });
}

getSpotlights();
