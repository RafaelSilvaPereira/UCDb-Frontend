export {SubjectComment}
import {deleteData} from "../../controller/rest_controller.js";

class SubjectComment extends HTMLElement{

    constructor(subjectID=-1, subComments=[], type="comment") {
        super();
        this.subjectID = subjectID;
        this.subComments = subComments;
        this._type = type;

    }
    connectedCallback() {
        this.commentID = this.getAttribute("commentID");
        this.studentName = this.getAttribute("studentName");
        this.studentSecondName = this.getAttribute("studentSecondName");
        this.comment = this.getAttribute("comment");
        this.date = this.getAttribute("commentDate");
        this.hour = this.getAttribute("commentHour");
        this._isvisible = this.getAttribute("visible");
        this.setAttribute("id", `comment-${this.commentID}`); // para ser setado automaticamente em todas as subjects
        this.render();
    }

    chooseClass() {
        if(this._type==="comment-subject") {
            return "comment-subject"
        } else {
            return "reply"
        }
    }
    render() {
        const html = `
            <style>
                .comment-subject {
                    background-color: red; /*diferencia comentario de respostas*/
                }
                
                .comment-info {
                    /*a*/
                }
                
                .reply {
                    background-color: blue; /*diferencia comentario de respostas*/
                }
                
                .comment-id {
                    /*preencha tds se achar necessario*/
                }
                
                .author{
                    /*fique sem mensagens para tu*/
                }
                
                .date {
                    /*na faixa de gaza, so homem bomba na guerra eh tudo ou nada*/
                }
                
                .comment {
                    background-color: green; /*diferencia comentario de respostas*/
                }
            </style>
            <div class="${this.chooseClass()}">
                <div class="comment-info">
                    <p class="comment-id"><i>id: ${this.commentID}</i></p>
                    <p class="author">escrito por: ${this.studentName} ${this.studentSecondName}</p> 
                    <p class="date">as: ${this.hour} do dia ${this.date}</p>
                </div>
                <p class="comment">${this.comment}</p>
                <button id="delete-${this.id}" type="button" class="delete-comment">DELETAR!</button>
            </div>
        `;

        this.innerHTML = (this._isvisible) ? html : "";

        this.insertReplysOnComment();
        this.innerJS();

    }

    innerJS() {
        console.log(this);

        const $deleteButtom = document.getElementById(`delete-${this.id}`);

        $deleteButtom.onclick = () => {
            const token = window.localStorage.___access_token___;
            deleteData(`localhost:8080/api/v1/comment/${this.commentID}`, {}, `Bearer ${token}`)
                .then(r => {
                    if (r===true) {
                        this.setAttribute("visible",false);
                        this.innerHTML = "";
                    }else {
                        alert("algo deu errado nos nosso servidores, tente novamente mais tarde! ;-)")
                    }
                })


        }



    }

    insertReplysOnComment() {
        const $subComments = document.createElement("div");
        $subComments.setAttribute("class", "reply");
        $subComments.innerHTML = "";
        this.subComments.forEach(sc => {

            let reply = new SubjectComment(this.subjectID, [], "reply");
            reply.setAttribute("commentID", sc.commentID);
            reply.setAttribute("studentName", sc.studentName);
            reply.setAttribute("studentSecondName", sc.studentSecondName);
            reply.setAttribute("comment", sc.comment);
            reply.setAttribute("commentDate", sc.date);
            $subComments.appendChild(reply);
        });

        this.appendChild($subComments);
    }
}
window.customElements.define("subject-comment", SubjectComment);

