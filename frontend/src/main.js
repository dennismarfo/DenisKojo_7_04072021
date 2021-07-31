import App from './App.vue'
// import Vue from 'vue'
import { createApp } from 'vue'
import router from './router'
// import VueConfirmDialog from 'vue-confirm-dialog'

// new Vue({
//     router,
//     render: h => h(App),
// }).$mount('#app');

// Vue.use(VueConfirmDialog)
// Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

createApp(App).use(router).mount('#app')


