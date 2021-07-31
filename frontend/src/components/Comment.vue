<template>
    <div class="last-comments">
        <div class="comment-bloc">
            <img class="user-photo-comment" :src="commentUserPhoto">
            <div class="comment-area">
                <p class="user-name">{{ commentFirstName }} {{ commentLastName }}</p>
                <p aria-label="Zone de texte d'un commentaire">{{ commentContent }}</p>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Comment',
    props: {
        commentFirstName: {
            type: String,
            default: "Sophie"
        },
        commentLastName: {
            type: String,
            default: "Groupomania"
        },
        commentUserPhoto: {
            type: String,
            default: "http://localhost:3000/images/avatar.png"
        },
        commentContent: {
            type: String,
            default: "Voici mon commentaire."
        }
    }
}
</script>

<style>
    .user-photo-comment {
        width: 60px;
        height: 60px;
    }
</style>