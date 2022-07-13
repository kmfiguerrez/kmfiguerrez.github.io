const hamburgerButton = document.getElementById("hamburger");
const navList = document.getElementById("navList");
const logoContainer = document.getElementById("logo-container");
const logoElement = document.getElementById("logo")
const projectOne = document.querySelector("#projectOne")
const modalOne = document.querySelector("#modalOne")
const closeButton = document.querySelector(".modal-close-button")
let currentLogo = 1;

hamburgerButton.addEventListener("click", () => {
    navList.classList.toggle("show-links");
    logoContainer.classList.toggle("hide-logo");
});

logoElement.addEventListener("click", () => {
    currentLogo++;
    logo.src = `img/logo 3-${currentLogo}.png`;
    if (currentLogo === 3) {
        // Back to first logo when clicked.
        currentLogo = 0;
    }    
})

// Modals
projectOne.addEventListener("click", () => {
    modalOne.showModal();
    document.body.style.overflowY = "hidden" // Prevents the background from scrolling
})

closeButton.addEventListener("click", () => {
    modalOne.close();
    document.body.style.overflowY = "visible" // Prevents the background from scrolling
})