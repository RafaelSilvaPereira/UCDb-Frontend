const loginButton = document.querySelector(".login-button");
const closeButton = document.querySelector('[close-pop-up]');

closeButton.onclick = () => {
    document.getElementById("pop-up-container-id").style.display='none';
}