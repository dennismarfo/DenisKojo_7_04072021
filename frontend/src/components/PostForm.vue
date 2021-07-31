<template>
    <div id="createPost">
        <div id="user">
            <img :src="user.avatar">
            <div class="nom">
                <p>{{ user.firstName }} {{ user.lastName }}</p>
            </div>
        </div>
        <form @submit.prevent="createPost" id="form">
            <div>
                <textarea aria-label="Contenu texte d'un post" v-model="postContent.content" placeholder="Quoi de neuf ?" class="text"></textarea>
            </div>
            <div>
                <label>
                    <div role="button" aria-label="Téléchargement d'un fichier">
                        <span v-if="postContent.attachments">Fichier séléctionné : {{postContent.attachments.name}}</span>
                        <span v-else>Ajouter un fichier</span>
                    </div>
                    <input class="upload" type="file" ref="photo" v-on:change="handleFileUpload()"/>
                </label>
                <div>
                    <input class="publier" type="submit" value="Publier" aria-label="Publication d'un post" v-on:click="loadAllPosts()"/>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'NewPost',
    props: {
        submit: Function
    },
    data() {
        return {
            user: "",
            userPhoto: '',
            postContent: {
                content: null,
                attachments: null,
            }
        }
    },
    created() {
        axios
        .get('http://localhost:3000/api/users/me', {
            headers: { 
            Authorization: localStorage.getItem("token") }
        })
        .then((response) => {
            this.user = response.data.user;
        })
        .catch(error => {
            console.log(error);
        })
    },
    methods: {
        createPost() {
            if (this.postContent.content !== null) {
                if (this.postContent.attachments !== null) {
                    let formData = new FormData();
                    formData.append('content', this.postContent.content);
                    formData.append('attachments', this.postContent.attachments, this.postContent.attachments.name);
                    axios
                        .post('http://localhost:3000/api/posts', 
                            formData , {
                            headers: {
                            Authorization: localStorage.getItem("token") }
                            }
                        )
                        .then(response => {
                            console.log(response);
                            this.$router.go('/')
                            })
                        .catch(error => {
                            console.log(error)
                            });
                } else {
                    let formData = new FormData();
                    formData.append('content', this.postContent.content);
                    axios
                        .post('http://localhost:3000/api/posts', 
                            formData , {
                            headers: {
                            Authorization: localStorage.getItem("token") }
                            }
                        )
                        .then(response => {
                            console.log(response);
                            this.$router.go('/')
                            })
                        .catch(error => {
                            console.log(error)
                            });
                }
            } else {
                return false;
            }
        },
        uploadImage() {
            console.log('Image Téléchargée !')
        },
        loadAllPosts() {
            this.$emit('load-all-posts');
        },
        handleFileUpload(){
        this.postContent.attachments = this.$refs.photo.files[0];
        },
    },
}
</script>

<style>
    #user {
        display: flex;
        justify-content: center;
        margin: 0 0 20px 0;
        }
    #user img {
        max-width: 60px;
        max-height: 60px;
        width: 100%;
        height: 100%; 
        border-radius: 50px;  
    }
    .nom {
        line-height: 60px;
        padding: 0 15px;
        font-size: 2rem;
    }
    #createPost {
        text-align: center;
        padding: 20px 0;
        background-color: #c7c7c7;
        border-radius: 10px;
        width: 600px;
        height: 200px;
        margin: auto;
    }
    .text {
        width: 220px;
        height: 30px;
        padding-top: 3px;
        text-align: center;
        border-radius: 10px;
        margin: 25px 15px 0 50px;
    }
    #form {
        display: flex;
        justify-content: center;
    }
    .upload {
        margin-bottom: 20px;
        padding: 5px;
    }
    .publier {
        padding: 0 5px 3px 5px;
    }
    @media screen and (max-width: 568px) {
        #createPost {
            margin: 0 15px 30px 15px;
            padding: 0 0 15px 0;
            height: 100%;
            width: 90%;
            background-color: #c7c7c7;
            
        }
        .nom {
            font-size: 1rem;
        }
        #user {
            margin: 0;
        }
        #form {
            display: flex;
            flex-direction: column;
        }
        #user img {
            width: 40px;
            height: 40px;
            margin-top: 7px;
        }
        .text {
            margin: 0;
        }
        .upload {
            margin: 0;
        }
    }
</style>