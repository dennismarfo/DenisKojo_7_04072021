<template>
    <div id="posts-box">
        <PostForm v-on:load-all-posts="onSubmit()"/>
          <!--<PostsList/>-->
        <div>
            <Post v-for="post in allPosts" :key="post.id" v-bind:post="post" v-bind:user="user">
            <template v-slot:Comments v-if="post.Comments !== null">
                <div class="commentaire">
                    <button class="btn-cmt"  v-on:click="showComments = showComments ? false : true">Commentaires</button>
                </div>
                    <div id="last-comment" v-if="showComments">
                        <div class="last-comment" v-for="comment in post.Comments" v-bind:key="comment.id">
                            
                            <div class="user-comment">
                                <p class="name">{{ comment.User.firstName }} {{ comment.User.lastName }}</p>
                                <p class="comment-content">{{ comment.content }}</p>
                            <div class="delete" v-on:click="deleteComment(post.id, comment.id, user.id, comment.user_id)" v-if="comment.user_id == user.id || user.permission ">
                                <i class="fas fa-trash-alt"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:lastCommentZone>
                <div>
                    <form class="comment">
                        <div class="comment-zone">
                            <img :src="user.avatar" class="photo-user-comment">
                            <textarea v-model="newComment.content" aria-label="Zone d'un commentaire" placeholder="Écrire votre commentaire ici" class="text-comment">
                            </textarea>
                        </div>
                        <div class="btn-comments">
                            <button v-on:click="submitComment(post.id)" type="submit" aria-label="Publication d'un commentaire" class="btn-post">Publier</button>
                        </div>
                    </form>
                </div>
            </template>
            </Post>
        </div>
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import Post from '@/components/Post.vue'
import axios from 'axios'
export default {
    name: 'Home',
    components: {
        PostForm,
        //PostsList,
        Post,
    },
    data() {
        return {
            allPosts: "",
            post: {
                user_id: "",
                createdAt: "",
                content: "",
                id: "",
                attachments: "",
                Comments: []
            },
            postContent: {
                content: null,
                attachments: null,
            },
            comment: {
                content: '',
                user_id: ''
            },
            newComment: {
                content: ''
            },
            user: {
                photo: ''
            },
            showComments: true
        }
    },
    created() {
        axios
            .get('http://localhost:3000/api/posts', {
                headers: { Authorization: localStorage.getItem("token")}
            })
            .then((response) => {
                
                this.allPosts = response.data;
            })
            .catch(error => {
                console.log(error);
            });
        axios
            .get('http://localhost:3000/api/users/me', {
                headers: { Authorization: localStorage.getItem("token") }
            })
            .then(response => {
                this.user = response.data.user;
            })
            .catch(error => console.log(error))
    },
    methods: {
        deletePost(id) {
                            axios
                                .delete('http://localhost:3000/api/posts/' + id, {
                                    headers: { Authorization: localStorage.getItem("token") }
                                })
                                .then(response => {
                                    console.log(response)
                                    this.$router.go('/')
                                })
                                .catch(error => {
                                    window.alert(error);
                                })
                    
                    
                
            
        },
        loadPosts() {
            axios
                .get('http://localhost:3000/api/posts', {
                    headers: { Authorization: localStorage.getItem("token")}
                })
                .then((response) => {
                    console.log("posts", response.data);
                    this.allPosts = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        onSubmit() {
            let messageText = document.getElementById('post-area')._value;
            console.log(messageText);
            if (messageText !== null) {
                this.$router.go();
            } else {
                alert('Remplissez le champs texte de votre post !');
                return false;
            }
        },
        submitComment(postId) {
            const comment = this.newComment;
            console.log(comment);
            axios
                .post('http://localhost:3000/api/posts/' + postId + '/comments', 
                comment, {
                    headers: {
                        Authorization: localStorage.getItem("token") }
                })
                .then(response => {
                    console.log(response);
                    this.$router.go();
                })
                .catch(error => console.log(error))
        },
        deleteComment(postId, commentId, user_id1, user_id2) {
            console.log(user_id1, user_id2)
            this.$confirm(
                {
                    message: `Supprimer ce commentaire ?`,
                    button: {
                        no: 'Non',
                        yes: 'Oui'
                    },
                    callback: confirm => {
                        if (confirm) {
                            axios
                                .delete('http://localhost:3000/api/posts/' + postId + '/comments/' + commentId, {
                                    headers: { Authorization: localStorage.getItem("token") }
                                })
                                .then(response => {
                                    console.log(response)
                                    this.loadPosts();
                                })
                                .catch(error => {
                                    window.alert(error);
                                })
                        }
                    }
                }
            )
        }
    }
}
</script>

<style>

    .user-comment{
        display: flex;

    }

    .logo{
        background-color: white;
    }

    #posts-box{
        background-color: #F0F2F5;
        padding-top: 28px;
        padding-bottom: 33%;
    }

    .commentaire {
        text-align: center;
        margin-top: 18px;
    }
    .comment-zone {
        text-align: center;
        display: flex;
        align-content: center;
        align-items: center;
    }

    .btn-cmt {
        background-color: white;
        padding: 1px 15px;
        border-radius: 8px;
        color: #2C3E50;;
        font-size: 17px;
        font-weight: normal;
        border: 1px solid firebrick;
        cursor: pointer;

    }
    .photo-user-comment {
        max-height: 30px;
        max-width: 30px;
        width: 100%;
        height: 100%;
        border-radius: 30px;
        margin: 5px 15px 0 15px;
    }
    .text-comment {
        width: 400px;
        height: 25px;
        padding-top: 3px;
        text-align: center;
        border-radius: 10px;
        margin: 0 0 0 10px;
        background-color: #F0F2F5;
        border: 1px solid red;
    }
    .name {
        font-size: 17px;
        color: #181818;
        font-weight: bold;
    }
    .comment-content {
        text-align: center;
        margin-top: 15px;
        width: 450px;
    }
    .btn-post {
        padding: 3px 10px;
        border-radius: 8px;
        color: white;
        font-size: 17px;
        font-weight: normal;
        border: 1px solid firebrick;
        background-color: firebrick;
        cursor: pointer;
    }
    .comment {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: 30px 0;
        padding-bottom: 30px;
    }
    .delete {
        text-align: end;
        padding: 0 5px 5px 0;
    }
    .last-comment  {
        display: flex;
    }
    #last-comment {
        width: 90%;
        margin: 20px 0 20px 28px;
        background-color: #F0F2F5;
        border-radius: 10px;
    }
    
    @media screen and (max-width: 568px) {
        .delete {
            padding: 0 7px 5px 0;
        }
        .user-comment {
            width: 100%;
        }
        .name {
            font-size: 1rem;
            padding: 7px 0 0 0;
        }
        .comment-content {
            width: 100%;
        }
        .text-comment {
            width: 220px;
            margin: 10px 0 0 0;
        }
        .photo-user-comment {
            margin: 5px 7px 0 5px;
        }
        #last-comment {
            margin: 10px 7px 0 7px;
            width: 95%;
        }
        .last-comment {
            margin-bottom: 15px;
            border-bottom: #e2e2e2 solid;
        }
        .comment {
            display: flex;
            flex-direction: column;
        }
        .btn-post {
            margin: 15px 0 0 0;
        }
    }
    .last-comment {
        border-bottom: 1px solid white;
        border-bottom-width: 6px;
    }
</style>