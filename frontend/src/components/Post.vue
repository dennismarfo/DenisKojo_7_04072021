<template>
    <div id="post">
        <div class="user">
            <h1> {{ firstName}} {{ lastName }}</h1>
        </div>
            <div class="date">{{ new Date(post.createdAt).toISOString() }}</div>
            <div class="content">{{ post.content }}</div>
    </div>
</template>

<script>
export default {
    name: 'Post',
    props: ['post'],

    firstName: ['user']
}
</script>

<style>
    #post {
        margin-top: 50px;
        border-radius: 10px;
        width: 600px;
        margin-left: 650px;
        background-color: #c7c7c7;
    }

    .user {
        display: flex;
        padding-top: 20px;
    }

    .date {
        text-align: end;
        margin-right: 10px;
    }

    .content {
        margin-top: 30px;
        text-align: center;
    }
</style>