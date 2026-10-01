const timestampField = document.getElementById('timestamp');
timestampField.value = new Date().toLocaleString();

const modalLinks = document.querySelectorAll('.modal-link');
modalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const modal = document.getElementById(link.dataset.modalTarget);
        modal.showModal();
    });
});

const closeButtons = document.querySelectorAll('.modal-close');
closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const modal = document.getElementById(button.dataset.modalClose);
        modal.close();
    });
});
