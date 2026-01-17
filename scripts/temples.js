// Footer copyright and last modified
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('show');
    hamburger.textContent = nav.classList.contains('show') ? '✕' : '☰';
});
