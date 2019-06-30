export {SubjectComment}

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
        this.innerHTML = `
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
                    <p id="date">as: ${this.date}</p>
                </div>
                <p class="comment">${this.comment}</p>
            </div>
        `;

        const $subComments = document.createElement("div");
        $subComments.setAttribute("class", "reply");
        $subComments.innerHTML = "";
        this.subComments.forEach(sc => {

            let reply = new SubjectComment(this.subjectID, [], "reply");
            reply.setAttribute("commentID", sc.commentID);
            reply.setAttribute("studentName", sc.studentName);
            reply.setAttribute("studentSecondName",sc.studentSecondName);
            reply.setAttribute("comment", sc.comment);
            reply.setAttribute("commentDate",sc.date);
            $subComments.appendChild(reply);
        });

        this.appendChild($subComments);
    }
}
window.customElements.define("subject-comment", SubjectComment);

