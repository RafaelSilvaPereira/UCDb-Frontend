export {SubjectenericProfile}

class SubjectenericProfile extends HTMLElement {
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
        <style>
        * {
            margin: 20px auto;
            color: #0a0ae6;
        }
        
        .disciplina{
            background-color: #a3a3ff;
            margin: 20px 20px;
            display: grid;
            grid-template-rows: 50px;
            grid-template-columns: repeat(6, 150px);
            font-size: 20px;
            font-weight: bold;
        }
        
        .disciplina:hover{
            -moz-transform: scale(1.1);
            \t-webkit-transform: scale(1.1);
            \ttransform: scale(1.1);
        }
        
        .subject-name{
            grid-column: 2 / 7;
            align-self: center;
        }
        
        .subject-id{
            align-self: center;
            grid-column: 1;
            grid-row: 1;
        }
        </style>
               
        `;
        // retorne o css da pagina SubjectGenericProfile.css
        return css;
    }

    render() {
        this.$shadow.innerHTML = `
            ${this.getCss()}
            <div class="disciplina">
                 <p class="subject-name">${this.name}</p>
                 <p class="subject-id">${this.id}</p>
            </div>        
        `;

    }
}

window.customElements.define('subject-generic-profile', SubjectenericProfile);
