<template>
    <div id="UpdatePost">
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
                   <router-link to='/'><input class="modifier" type="submit" value="Modifier" aria-label="Publication d'un post" v-on:click="updatePost()"/></router-link> 
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
        props: {
        submit: Function,

    },
    data() {
        return {
            postContent: {
                content: null,
                attachments: null,
            }
        }
    },
    created() {
        axios
        .get('http://localhost:3000/api/posts/' + this.$route.params.postId, {
            headers: { 
            Authorization: localStorage.getItem("token") }
        })
        .then((response) => {
            this.postContent.content = response.data.content;
        })
        .catch(error => {
            console.log(error);
        })
    },
    methods: {
        updatePost() {
            if (this.postContent.content !== null) {
                if (this.postContent.attachments !== null) {
                    let formData = new FormData();
                    formData.append('content', this.postContent.content);
                    formData.append('attachments', this.postContent.attachments, this.postContent.attachments.name);
                    axios
                        .put('http://localhost:3000/api/posts/' + this.$route.params.postId, 
                            formData , {
                            headers: {
                            Authorization: localStorage.getItem("token") }
                            }
                        )
                        .then(response => {
                            console.log(response);
                            
                            })
                        .catch(error => {
                            console.log(error)
                            });
                } else {
                    let formData = new FormData();
                    formData.append('content', this.postContent.content);
                    axios
                        .put('http://localhost:3000/api/posts/' + this.$route.params.postId, 
                            formData , {
                            headers: {
                            Authorization: localStorage.getItem("token") }
                            }
                        )
                        .then(response => {
                            console.log(response);
                            
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
        handleFileUpload(){
        this.postContent.attachments = this.$refs.photo.files[0];
        },
        realoadToHome() {
            this.$router.go('/')
        }
    },
}




</script>
<style>
.modifier{
    text-align: end;
    padding: 1px 10px;
    font-size: 16px;
    border-radius: 16px;
    border: 1px solid firebrick;
    color: white;
    background: firebrick;
    cursor: pointer;
}
</style>