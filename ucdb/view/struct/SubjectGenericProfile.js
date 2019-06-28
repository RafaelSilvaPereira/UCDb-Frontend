export {SubjectenericProfile}
class SubjectenericProfile extends HTMLElement{

    constructor() {
        super();
        this.$shadow = this.attachShadow({"mode": "open"});
        console.log(this.$shadow);
    };


    connectedCallback() {
        this.name = this.getAttribute('name');
        this.id = this.getAttribute('id');
        this.render();
    }

    render() {
        this.$shadow.innerHTML = `<link rel="stylesheet" href="./view/struct/GenericSubjectProfile.css">
             <p class="subject-name">${this.name}</p>
             <p class="subject-id">${this.id}</p>`;

    }
}
window.customElements.define('subject-generic-profile', SubjectenericProfile);
