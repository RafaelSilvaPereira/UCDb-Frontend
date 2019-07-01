import {SubjectComment} from "./SubjectComment.js";
import {giveLike, giveDislike} from "./subject_profile_controller.js";
// import {getData} from "../../controller/rest_controller.js";
import {postData} from "../../../../controller/rest_controller.js";


export {SubjectProfile};

class SubjectProfile extends HTMLElement {

    constructor(comments = [], isEnjoyed, isDisliked) {
        super();
        this._comments = comments;
        this._userEnjoyed = isEnjoyed;
        this._userDisliked = isDisliked;
    }

    connectedCallback() {
        this._id = this.getAttribute("id");
        this._name = this.getAttribute("name");
        this._likes = this.getAttribute("likes");
        this._dislikes = this.getAttribute("dislikes");
        this.render();
    }

    render() {
        const html = this.getHtml();

        this.innerHTML = html;
        this.setLikeAndDislikeButtonState();
        this.autoConfigureSubjectComments(this._comments);
        this.innerJS();
    }

    getHtml() {
        const html = `
            ${this.getCss()}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <p id="subject-name">${this._name}</p>
            <p id="subject-id">${this._id}</p>
            <button id="like"><i id="ico-like" class="fa fa-thumbs-up">${this._likes}</i></button>
            <button id="dislike"><i id="ico-dislike" class="fa fa-thumbs-down dislike-class">${this._dislikes}</i></button>
            <form id="subject-comment">
                <div id="comment-container">
                    <textarea name="text-comment" id="comment-id" cols="120" rows="10" placeholder="conte para nós o que achou da disciplina"></textarea>
                    <button type="button" name="submit" id="send-comment-to-subject-${this._id}" class="send-comment-button">ENVIAR!</button>
                </div>
            </form>
            `;
        return html;
    }

    getCss() {
        const css = `
            <style>
            .active-like {
                color: dodgerblue;
            }

            .active-dislike {
                color: indianred;
            }
            </style>
        `;
        return css;
    }

    innerJS() {
        const $like = document.getElementById("like");
        const $dislike = document.getElementById("dislike");
        const $sendComment = document.getElementById(`send-comment-to-subject-${this._id}`);
        let $likeCount = $like.firstElementChild;
        let $dislikeCount = $dislike.firstElementChild;


        $like.onclick = () => {
            giveLike(this._id, $like, $dislike, $likeCount, $dislikeCount, this);
        };

        $dislike.onclick = () => {
            giveDislike(this._id, $like, $dislike, $likeCount, $dislikeCount, this);
        };

        $sendComment.onclick = () => {
            const commentText = document.getElementById("comment-id").value;
            const userToken = window.localStorage.___access_token___;
            postData("comment/create/" + this._id, {comment: commentText.trim()},
                `Bearer ${userToken}`).then(newC => {
                if (!!newC) {
                    this.autoConfigureSubjectComments([newC]);
                }
            }).catch(err => alert("algo deu errado"));
        };
    }

    autoConfigureSubjectComments(commentsList) { // nota commentList deve ser um lista de comentários :( sdd's tipagem estatica agr
        let $subjectsComments = document.getElementById("subjectCommentsID");

        $subjectsComments = document.createElement("div");
        $subjectsComments.setAttribute("class", "subjectComments"); // configurar a classe para que ele tenha um tipo definido
        $subjectsComments.setAttribute("id", "subjectCommentsID");

        // $subjectsComments.innerHTML = ""; // limpando o que quer que esteja dentro do html
        commentsList.forEach(c => {
            let comment = new SubjectComment(this.id, c.subcomments, "comment-subject"); // criando um novo comentario


            comment.setAttribute("visible", c.visible);
            comment.setAttribute("commentID", c.commentID);
            comment.setAttribute("id", `subject-${c.commentID}`);
            comment.setAttribute("studentName", c.studentName);
            comment.setAttribute("studentSecondName", c.studentSecondName);
            comment.setAttribute("comment", c.comment);
            comment.setAttribute("commentDate", c.commentDate);
            comment.setAttribute("commentHour", c.commentHour);
            comment.setAttribute("visible", c.visible);
            $subjectsComments.appendChild(comment);

        });

        this.appendChild($subjectsComments);
    };

    setLikeAndDislikeButtonState() {
        if (this._userEnjoyed) {
            document.getElementById("like").classList.add("active-like");
        }

        if (this._userDisliked) {
            document.getElementById("dislike").classList.add("active-dislike");
        }
    };


}

window.customElements.define("subject-profile", SubjectProfile);