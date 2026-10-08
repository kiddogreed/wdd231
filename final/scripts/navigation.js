const hamburgerBtn = document.getElementById('hamburger');
const primaryNav = document.getElementById('primary-nav');

hamburgerBtn.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    hamburgerBtn.textContent = isOpen ? '\u2715' : '\u2630';
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
});
