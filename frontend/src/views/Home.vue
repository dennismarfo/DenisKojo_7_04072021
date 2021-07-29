<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/icon-Gr.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <PostForm />
    <PostsList />
  </div>
</template>

<script>
// @ is an alias to /src
import PostsList from '@/components/PostsList.vue'
import PostForm from '@/components/PostForm.vue'

export default {
  name: 'Home',
  components: {
    PostsList,
    PostForm
  }
}
</script>
