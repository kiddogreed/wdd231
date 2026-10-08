// Small formatting helpers shared across pages.
export function formatPrice(amount) {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        maximumFractionDigits: 0
    }).format(amount);
}

export function starString(rating) {
    const rounded = Math.round(rating);
    return Array.from({ length: 5 }, (_, i) => (i < rounded ? '\u2605' : '\u2606')).join('');
}
