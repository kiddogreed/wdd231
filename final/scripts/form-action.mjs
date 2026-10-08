// Entry module for form-action.html - echoes the submitted query string back to the visitor.
const params = new URLSearchParams(window.location.search);
const list = document.getElementById('order-details');

const fieldLabels = {
    'full-name': 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    'item-interest': 'Item of Interest',
    quantity: 'Quantity',
    'preferred-category': 'Preferred Category',
    'contact-method': 'Preferred Contact Method',
    message: 'Notes',
    newsletter: 'Newsletter Signup'
};

const rows = Object.entries(fieldLabels)
    .map(([key, label]) => {
        const raw = params.get(key);
        const value = key === 'newsletter' ? (raw ? 'Yes' : 'No') : raw && raw.trim() ? raw : 'Not provided';
        return `
            <div class="detail-row">
                <dt>${label}</dt>
                <dd>${value}</dd>
            </div>`;
    })
    .join('');

list.innerHTML = rows;

const submittedAt = document.getElementById('submitted-at');
if (submittedAt) {
    submittedAt.textContent = new Date().toLocaleString('en-PH', { dateStyle: 'long', timeStyle: 'short' });
}
