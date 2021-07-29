<template>
    <div id="posts">
        <Post
            v-bind:key="post.id"
            v-for="post in posts"
            v-bind:post="post"
        />
    </div>
</template>

<script>
import axios from 'axios';
import Post from './Post.vue';
export default {
    name: 'PostsList',
    components: {
        Post
    },
    data() {
        return {
            posts: []
        }
        
    },
    mounted() {
        axios
            .get('http://localhost:3000/api/posts', {
                headers: { 
                    Authorization: localStorage.getItem("token") }
            
            })
            .then(response => {
                console.log(response);
                this.posts = response.data
            })
            .catch(error => {
                console.log(error);
            });
    }
}
</script>
<style>
</style>