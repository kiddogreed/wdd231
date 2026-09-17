const membersContainer = document.getElementById('members-container');
const memberCount = document.getElementById('member-count');
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');

const membershipLabels = {
    1: { label: 'Member', className: 'member' },
    2: { label: 'Silver', className: 'silver' },
    3: { label: 'Gold', className: 'gold' }
};

async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        membersContainer.innerHTML = `<p>Sorry, the member directory could not be loaded right now.</p>`;
        console.error('Error fetching members:', error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = '';
    memberCount.textContent = `${members.length} member businesses`;

    members.forEach((member) => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        const membership = membershipLabels[member.membership] ?? membershipLabels[1];

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" width="200" height="200" loading="lazy">
            <div class="member-info">
                <h3>${member.name}</h3>
                <p>${member.category}</p>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.url}" target="_blank" rel="noopener">${member.url}</a></p>
                <p>${member.tagline}</p>
                <span class="membership-badge ${membership.className}">${membership.label}</span>
            </div>
        `;

        membersContainer.appendChild(card);
    });
}

function setView(view) {
    const isList = view === 'list';
    membersContainer.classList.toggle('list-view', isList);
    gridBtn.classList.toggle('view-active', !isList);
    listBtn.classList.toggle('view-active', isList);
    gridBtn.setAttribute('aria-pressed', String(!isList));
    listBtn.setAttribute('aria-pressed', String(isList));
    localStorage.setItem('directoryView', view);
}

gridBtn.addEventListener('click', () => setView('grid'));
listBtn.addEventListener('click', () => setView('list'));

setView(localStorage.getItem('directoryView') ?? 'grid');
getMembers();
