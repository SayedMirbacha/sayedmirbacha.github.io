// Declare variables at the start, initializing to empty string 
let navbar: HTMLElement = document.querySelector('.navbar') as HTMLElement || '';
let searchForm: HTMLElement = document.querySelector('.search-form') as HTMLElement || '';
let cartItem: HTMLElement = document.querySelector('.cart-items-container') as HTMLElement || '';

// Menu button click event
document.querySelector('#menu-btn')?.addEventListener('click', () => {
    if (navbar) navbar.classList.toggle('active');
    if (searchForm) searchForm.classList.remove('active');
    if (cartItem) cartItem.classList.remove('active');
});

// Search button click event
document.querySelector('#search-btn')?.addEventListener('click', () => {
    if (searchForm) searchForm.classList.toggle('active');
    if (navbar) navbar.classList.remove('active');
    if (cartItem) cartItem.classList.remove('active');
});

// Cart button click event
document.querySelector('#cart-btn')?.addEventListener('click', () => {
    if (cartItem) cartItem.classList.toggle('active');
    if (navbar) navbar.classList.remove('active');
    if (searchForm) searchForm.classList.remove('active');
});

// Window scroll event
window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.remove('active');
    if (searchForm) searchForm.classList.remove('active');
    if (cartItem) cartItem.classList.remove('active');
});
