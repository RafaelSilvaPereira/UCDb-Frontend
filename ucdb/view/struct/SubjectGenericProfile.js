export {SubjectenericProfile}
class SubjectenericProfile extends HTMLElement{

    constructor() {
        super();
        this.$shadow = this.attachShadow({"mode": "open"});
    };


    connectedCallback() {
        this.name = this.getAttribute('name');
        this.id = this.getAttribute('id');
        this.render();
    }

    render() {
        this.$shadow.innerHTML = `<link rel="stylesheet" href="./view/struct/SubjectGenericProfile.css">
             <p class="subject-name">${this.name}</p>
             <p class="subject-id">${this.id}</p>`;

    }
}
window.customElements.define('subject-generic-profile', SubjectenericProfile);
