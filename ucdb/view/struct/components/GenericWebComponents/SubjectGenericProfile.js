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

    getCss() {
        const css = `
               
        `;
        // retorne o css da pagina SubjectGenericProfile.css
        return css;
    }

    render() {
        this.$shadow.innerHTML = `
            ${this.getCss()}
             <p class="subject-name">${this.name}</p>
             <p class="subject-id">${this.id}</p>
        `;

    }
}
window.customElements.define('subject-generic-profile', SubjectenericProfile);