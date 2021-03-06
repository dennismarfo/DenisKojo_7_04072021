import App from './App.vue'



import { createApp } from 'vue'
import router from './router'
// import VueConfirmDialog from 'vue-confirm-dialog'

// new Vue({
//     router,
//     render: h => h(App),
// }).$mount('#app');

// Vue.use(VueConfirmDialog)
// Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

// Vue.use(require('vue-moment'));



const app = createApp(App);

app.use(router).mount('#app');

