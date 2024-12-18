"use strict";

// Declare variables at the start
let navbar = document.querySelector('.navbar');
let searchForm = document.querySelector('.search-form');


// Menu button click event
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
};

// Search button click event
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
};


// Window scroll event
window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
};

const menuBtn = document.getElementById('menu-btn');

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

document.addEventListener('click', (event) => {
    if (!menuBtn.contains(event.target) && !navbar.contains(event.target)) {
        navbar.classList.remove('active');
    }
    if (!searchBtn.contains(event.target) && !searchForm.contains(event.target)) {
        searchForm.classList.remove('active');
    }
});

$( function() {
    $( "#dialog" ).dialog();
  } );


