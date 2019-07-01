export {SubjectComment}
import {deleteData, postData} from "../../../../controller/rest_controller.js";

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

    render() {
        // language=HTML
        const html = this.getHtml();

        this.innerHTML = (!!this._isvisible) ? html : "";

        this.insertReplysOnComment(this.subComments);
        this.innerJS();

    }

    getHtml() {
        const defautHTML = `
            ${this.getCss()};
            <div class="${this.chooseClass()}">
                <div class="comment-info-class">
                    <p class="comment-id-class"><i>id: ${this.commentID}</i></p>
                    <p class="author-class">escrito por: ${this.studentName} ${this.studentSecondName}</p> 
                    <p class="date-class">as: ${this.hour} do dia ${this.date}</p>
            </div>  
                <p class="comment-class">${this.comment}</p>
                <button id="delete-${this.id}" type="button" class="delete-comment">DELETAR!</button>
            `;
        if(this._type === "comment-subject") {
            return defautHTML + `
            
                <form id="subject-comment">
                    <div id="reply-${this.id}">
                        <textarea name="text-comment" id="reply-${this.id}-id" cols="10" rows="10" placeholder="responda o comentario!"></textarea>  
                        <button type="button" name="submit" id="send-reply-${this.id}" class="send-comment-button">ENVIAR!</button>
                    </div>
                </form>
            </div>
        `;
        } else {
            return  defautHTML + "</div>"
        }

    }

    getCss() {
        return `
            <style>
                .comment-subject {
                    background-color: red; /*diferencia comentario de respostas*/
                }
                
                .reply {
                    background-color: blue; /*diferencia comentario de respostas*/
                }
                
                .comment-info-class {
                    /*a*/
                }
                
                
                .comment-id-class {
                    /*preencha tds se achar necessario*/
                }
                
                .author-class{
                    /*fique sem mensagens para tu*/
                }
                
                .date-class {
                    /*na faixa de gaza, so homem bomba na guerra eh tudo ou nada*/
                }
                
                .comment-class {
                    background-color: green; /*diferencia comentario de respostas*/
                }
            </style>
        `;
    }

    innerJS() {
        const $deleteButtom = document.getElementById(`delete-${this.id}`);
        const $sendReply = document.getElementById(`send-reply-${this.id}`);

        $deleteButtom.onclick = () => {
            const token = window.localStorage.___access_token___;
            deleteData(`comment/${this.commentID}`, {}, `Bearer ${token}`)
                .then(r => {
                    if (r===true) {
                        this.setAttribute("visible",false);
                        this.innerHTML = "";
                    }else {
                        alert("Token invalido :( , por favor refaça seu login!! ")
                    }
                }).catch(err => alert("lamentamos muito mas... algo deu errado nos nossos servidores :( . Por favor tente novamente mais tarde "))
        };

        $sendReply.onclick = () => {
            const commentText = document.getElementById(`reply-${this.id}-id`).value;
            const userToken = window.localStorage.___access_token___;
            const url = `comment/reply/${this.subjectID}/${this.commentID}`;
            postData(url,{comment: commentText}, `Bearer ${userToken}`)
            .then( r => {
                if(!!r) {
                    this.insertReplysOnComment([r]);
                }
            }).catch(err => alert(err))
        }
    }

    chooseClass() {
        if (this._type === "comment-subject") {
            return "comment-subject"
        } else {
            return "reply"
        }
    }

    insertReplysOnComment(subCommentsList) {
        const $subComments = document.createElement("div");

        $subComments.setAttribute("class", "reply");
        $subComments.setAttribute("id", `reply-to-subject-id-${this.commentID}`);
        subCommentsList.forEach(sc => {

            let reply = new SubjectComment(this.subjectID, [], "reply");

            reply.setAttribute("visible", sc.visible);
            reply.setAttribute("commentID", sc.commentID);
            reply.setAttribute("studentName", sc.studentName);
            reply.setAttribute("studentSecondName", sc.studentSecondName);
            reply.setAttribute("comment", sc.comment);
            reply.setAttribute("commentDate", sc.date);
            reply.setAttribute("commentDate", sc.commentDate);
            reply.setAttribute("commentHour", sc.commentHour);
            reply.setAttribute("visible", sc.visible);
            $subComments.appendChild(reply);
        });

        this.appendChild($subComments);
    }

}
window.customElements.define("subject-comment", SubjectComment);
