import {SubjectComment} from "./SubjectComment.js";
import {giveLike} from "./subject_profile_controller.js";
export {SubjectProfile}

class SubjectProfile extends HTMLElement {

    constructor(comments=[]) {
        super();
        this.comments = comments;
    }

    connectedCallback() {
        this._id = this.getAttribute("id");
        this._name = this.getAttribute("name");
        this._likes = this.getAttribute("likes");
        this._dislikes = this.getAttribute("dislikes");
        this.render();
    }

    carregaComentariosAutomaticamente() {
        const $comments = document.createElement("div");
        $comments.setAttribute("class", "subjectComments");
        $comments.innerHTML = "";
        this.comments.forEach(c => {
            let comment = new SubjectComment(this.id, c.subComments, "comment");
            comment.setAttribute("commentID", c.commentID);
            comment.setAttribute("studentName", c.studentName);
            comment.setAttribute("studentSecondName",c.studentSecondName);
            comment.setAttribute("comment", c.comment);
            comment.setAttribute("commentDate",c.date);
            $comments.appendChild(comment);
        });

        return $comments
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

        let  subjectComments = this.carregaComentariosAutomaticamente();
        this.appendChild(subjectComments);


        this.innerJS();
    }

    innerJS() {
        const $like = document.getElementById("like");
        const $dislike = document.getElementById("dislike");
        let $likeCount = $like.firstElementChild;
        let $dislikeCount = $dislike.firstElementChild;
        this.likeFlag = false;
        this.dislikeFlag = false;
        $like.onclick = () => {
            // console.log("funciona");
            // console.log(this._id, $like, $dislike, $likeCount, $dislikeCount, this.likeFlag, this.dislikeFlag);
            //subjectID, $like, $dislike, $likeCount, $dislikeCount, likeFlag, dislikeFlag
            giveLike(this._id, $like, $dislike, $likeCount, $dislikeCount, this);
        };
    }
}

window.customElements.define("subject-profile", SubjectProfile);