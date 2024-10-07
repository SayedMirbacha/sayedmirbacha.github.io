"use strict";

// Declare variables at the start
let navbar = document.querySelector('.navbar');
let searchForm = document.querySelector('.search-form');
// let cartItem = document.querySelector('.cart-items-container');

// Menu button click event
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
};

// Search button click event
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
};


// Window scroll event
window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
};

const menuBtn = document.getElementById('menu-btn');
// const cartContainer = document.querySelector('.cart-items-container');

let activeElement = null; // Track which element is currently active

function toggle(element) {
    if (activeElement === element) {
        // If the clicked element is already active, hide it
        element.classList.remove('active');
        activeElement = null;
    } else {
        // Hide the currently active element
        if (activeElement) {
            activeElement.classList.remove('active');
        }
        // Show the clicked element
        element.classList.add('active');
        activeElement = element;
    }
}

// Event listeners
menuBtn.addEventListener('click', () => toggle(navbar));
searchBtn.addEventListener('click', () => toggle(searchForm));
// cartBtn.addEventListener('click', () => toggle(cartContainer)); // Add cart button in your HTML

document.addEventListener('click', (event) => {
    if (!menuBtn.contains(event.target) && !navbar.contains(event.target)) {
        navbar.classList.remove('active');
    }
    if (!searchBtn.contains(event.target) && !searchForm.contains(event.target)) {
        searchForm.classList.remove('active');
    }
    // if (!cartBtn.contains(event.target) && !cartContainer.contains(event.target)) {
    //     cartContainer.classList.remove('active');
    // }
});

$( function() {
    $( "#dialog" ).dialog();
  } );


