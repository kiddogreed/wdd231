const params = new URLSearchParams(window.location.search);

const fields = {
    'out-first-name': 'first-name',
    'out-last-name': 'last-name',
    'out-email': 'email',
    'out-phone': 'phone',
    'out-business-name': 'business-name',
    'out-timestamp': 'timestamp'
};

Object.entries(fields).forEach(([elementId, paramName]) => {
    document.getElementById(elementId).textContent = params.get(paramName) || 'Not provided';
});
