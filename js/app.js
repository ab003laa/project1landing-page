/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to Link from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/  



/**
 * Define Global Variables
 * 
*/
let navbarItem = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");

/**
 * End Global Variables
 * 
 * Start Helper Functions
 * 
*/
var viewCheck = function (elem) {
	var location = elem.getBoundingClientRect();
	return (
		location.top >= 0 &&
		location.left >= 0 &&
		location.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		location.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};


function deactivateSections() {
    sections.forEach((element)=>{
        element.classList.remove("active");
    });
}

function deactivateNavLinks() {
    let navbarLink = document.querySelectorAll(".nav__hyperlink");
    navbarLink.forEach((element)=>{
        element.classList.remove("active-nav");
    });
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

window.addEventListener('load', buildNav())


// Add class 'active' to section when near top of viewport
function activateCurrentSection(currentSection) {
    currentSection.classList.add("active");

    deactivateNavLinks();
    activateNavLinks(currentSection.getAttribute('id'));
}

function activateNavLinks(currentSectionId) {
    let navbarLink = document.querySelectorAll(".nav__hyperlink");
    //console.log(navbarLink);
        navbarLink.forEach((element)=>{
            if(element.getAttribute('href') == `#${currentSectionId}`) {
                element.classList.add("active-nav");
            }
        });
}



// Scroll to anchor ID using scrollTO event
function scrollToSectionOnClick() {
    let navbarAnchors = document.querySelectorAll(".nav__hyperlink");
    navbarAnchors.forEach((element) => {
        element.addEventListener("click", function(event) {
            event.preventDefault();
            document.querySelector(element.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
function buildNav() {
	sections.forEach((element)=>{
	    let listItem = document.createElement("li");
	    listItem.classList.add("navbar__list__item");
    	let sectionName = element.getAttribute("data-nav");
    	let currentSectionId = element.getAttribute("id");
        listItem.innerHTML = `<a href="#${currentSectionId}" class="nav__hyperlink">${sectionName}</a>`;
        navbarItem.appendChild(listItem);
    });
}

// Scroll to section on link click
scrollToSectionOnClick();



// Set sections as active
window.addEventListener('scroll', function (event) {
    sections.forEach((element)=>{
        
        if (viewCheck(element)) {
            deactivateSections();
            activateCurrentSection(element);
            
        } 
        else if(window.scrollY==0) {
            deactivateSections();
            deactivateNavLinks();
            
        }
    }, false);
});


