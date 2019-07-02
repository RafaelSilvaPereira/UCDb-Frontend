/**
 * @Author: Rafael da Silva Pereira Matricula: 117110921. UFCG: Ciência da Computação.
 *
 * O modulo é uma componente-web que serve para representar uma comentario, possui um style propio,
 * as ações do componente devem ser restritas aquelas definidas neste arquivos.
 */
export {SubjectComment}
import {deleteData, postData} from "../../../../controller/rest_controller.js";

class SubjectComment extends HTMLElement{
    /**
     * Definindo o construtor padrão de um comentario
     * _subjectID: o identificador da disciplina
     * _subComments: um array de sub-comentarios que um comentario pode ter, caso o comentario seja "reply" isto é resposta
     *          ele por construção ele não vai possuir sub-comentarios.
     * _type: o tipo de comentario, por padrão admite-se que o tipo passado seja "subject-comment" ou "reply"
     */
    constructor(subjectID = -1, subComments = [], type = "subject-comment") {
        super();
        this._subjectID = subjectID;
        this._subComments = (type === "comment-subject") ? subComments : [];
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
        this.setAttribute("id", `comment-${this.commentID}`); // definindo a string do id, exemplo: id="comment-15287"
        this.render();
    }

    render() {
        // language=HTML
        const html = this.getHtml();

        this.innerHTML = (!!this._isvisible) ? html : ""; // se o comentario tiver sua configuração definida como false ele terá um

        if (this._type === "comment-subject") {
            this.insertReplysOnComment(this._subComments);
        }
        this.innerJS();

    }

    /*definindo a parte estrutural do componente*/
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

    /*Definindo a parte de estilização do componente*/
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

    /* definindo o comportamento do componente. */
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
            const url = `comment/reply/${this._subjectID}/${this.commentID}`;
            postData(url,{comment: commentText}, `Bearer ${userToken}`)
                .then(r => {
                    if(!!r) {
                        this.insertReplysOnComment([r]);
                    }
                }).catch(err => alert(err))
        }
    }

    /*metodo auxiliar que define a classe que o comentario terá (sendo util para o css)*/
    chooseClass() {
        if (this._type === "comment-subject") {
            return "comment-subject"
        } else {
            return "reply"
        }
    }

    /*metodo que insere respostas a um comentario.*/
    insertReplysOnComment(subCommentsList) {
        const $subComments = document.createElement("div");

        $subComments.setAttribute("class", "reply");
        $subComments.setAttribute("id", `reply-to-subject-id-${this.commentID}`);
        subCommentsList.forEach(sc => {

            let reply = new SubjectComment(this._subjectID, [], "reply");

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
