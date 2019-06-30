import {SubjectComment} from "./SubjectComment.js";
import {giveLike, giveDislike} from "./subject_profile_controller.js";
export {SubjectProfile};

class SubjectProfile extends HTMLElement {

    constructor(comments=[], isEnjoyed, isDisliked) {
        super();
        this.comments = comments;
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

    autoConfigureReplys() {
        const $replysContainer = document.createElement("div");
        $replysContainer.setAttribute("class", "subjectComments"); // configurar a classe para que ele tenha um tipo definido
        $replysContainer.innerHTML = ""; // limpando o que quer que esteja dentro do html
        this.comments.forEach(c => {
            let comment = new SubjectComment(this.id, c.subcomments, "comment-subject"); // criando um novo comentario
            comment.setAttribute("commentID", c.commentID);
            comment.setAttribute("studentName", c.studentName);
            comment.setAttribute("studentSecondName",c.studentSecondName);
            comment.setAttribute("comment", c.comment);
            comment.setAttribute("commentDate",c.date);
            $replysContainer.appendChild(comment);
        });

        return $replysContainer
    }

    render() {
        this.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <p id="subject-name">${this._name}</p>
            <p id="subject-id">${this._id}</p>
            <button id="like"><i id="ico-like" class="fa fa-thumbs-up">${this._likes}</i></button>
            <button id="dislike"><i id="ico-dislike" class="fa fa-thumbs-down dislike-class">${this._dislikes}</i></button>
            <style>
                .active-like {
                    color: dodgerblue;
                }

                .active-dislike {
                    color: indianred;
                }
            </style>`;
        if(this._userEnjoyed) {
            document.getElementById("like").classList.add("active-like");
        }

        if(this._userDisliked) {
            document.getElementById("dislike").classList.add("active-dislike");
        }
        let  subjectComments = this.autoConfigureReplys();
        this.appendChild(subjectComments);


        this.innerJS();
    }

    innerJS() {
        const $like = document.getElementById("like");
        const $dislike = document.getElementById("dislike");
        let $likeCount = $like.firstElementChild;
        let $dislikeCount = $dislike.firstElementChild;


        $like.onclick = () => {
            giveLike(this._id, $like, $dislike, $likeCount, $dislikeCount, this);
        };
        $dislike.onclick = () => {
            giveDislike(this._id, $like, $dislike, $likeCount, $dislikeCount, this);
        }

    }
}

window.customElements.define("subject-profile", SubjectProfile);