<template>
    <div id="post">
        <div class="user">
            <img :src="post.User.avatar">
            <h1> {{ post.User.firstName }} {{ post.User.lastName }}</h1>
        </div>
            <div class="date"><p>{{  moment(post.createdAt).format("ddd MMM DD, YYYY [at] HH:mm a") }}</p></div>
            <div class="content">
                <p>{{ post.content }}</p>
                <img :src="post.attachments" v-if="post.attachments" >    
            </div>
            <div class="delete-post" v-on:click="deletePost(post.id)" v-if="post.user_id == user.id || user.permission === 1">
                Supprimer
                <i class="fas fa-trash-restore"></i>
            </div>
            <slot name="Comments"></slot>
            <slot name="lastCommentZone"></slot>
        </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
    name: 'Post',
    props: ['post', 'user'],
    created: function () {
    this.moment = moment;
  },
    methods: {
        deletePost(id) {
            axios
            .delete('http://localhost:3000/api/posts/' + id, {
                headers: { Authorization: localStorage.getItem("token") }
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                window.alert(error);
            })
        }
    }
}
</script>

<style>
    #post {
        margin-top: 50px;
        border-radius: 10px;
        width: 600px;
        margin: auto;
        background-color: white;
        border: 1px solid red;
        margin-bottom: 18px;
        
    }
    .delete-post {
        text-align: end;
        padding-right: 10px;
        font-size: 1.5rem;
    }
    .user {
        display: flex;
        padding-top: 20px;
    }
    .user img {
        border-radius: 50px;
        max-width: 60px;
        max-height: 60px;
        height: 100%;
        width: 100%;
        margin-left: 10px;
    }
    .user h1 {
        padding: 10px 15px 0 15px;
        font-size: 1.5rem;
    }
    .date {
        text-align: end;
        margin-right: 10px;
    }
    .content {
        margin-top: 30px;
        text-align: center;
    }
    .content p {
        font-size: 1.3rem;
        margin-bottom: 20px;
        overflow-wrap: break-word;
    }
    .content img {
        box-shadow: 5px 5px 5px rgb(212, 212, 212);
        max-width: 500px;
        max-height: 500px;
        width: 100%;
        height: 100%;
    }
    @media screen and (max-width: 568px) {
        #post {
            margin: 0 15px 30px 15px;
            padding: 0;
            width: 90%;
        }
        .user h1 {
            font-size: 1rem;
            padding: 0;
        }
        .user img {
            width: 40px;
            height: 40px;
            margin: 0 10px 0 20px;
        }
        .user {
            padding-top: 10px;
            align-items: center;
        }
        .content {
            margin: 0;
        }
    }
</style>