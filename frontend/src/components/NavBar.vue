<template>
    <div id="nav">
        <div class="logo">
            <router-link to="/"><img src="../assets/icon-above.png" id="logo-groupomania"></router-link>
        </div>
        <div id="nav-info">
            <div v-if="$route.path==='/login' || $route.path==='/signup' ? false : true" v-bind="account">
                <div role="link" aria-label="Accès aux informations utilisateurs" class="navbar-user">
                    <ul id="list">
                        <li><router-link to="/account" class="menu">Mon compte</router-link></li>
                        <!--<li v-if="admin == 1"><router-link to="/allusersadmin" class="menu">Tous les utilisateurs</router-link></li>//-->
                        <li><router-link to="/login" class="logOut menu" @click="logOut()">Se déconnecter</router-link></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
//import axios from 'axios';
export default {
  name: 'NavBar',
  data() {
    return {
      userAvatar:'',
      admin:'',
      account:'',
    }
    
  },


methods: {
  logOut() {
    localStorage.removeItem('token');
  }
},


}

</script>



<style>
    body, * {
        margin: 0;
        padding: 0;
        font-family: 'Texturina', serif;
    }
    #nav {
        text-align: center;
    }
    #logo-groupomania {
        max-width: 350px;
        max-height: 200px;
    }
    .navbar-user {
        height: 100px;
        background-color: #ce1b1bc4;
        padding: 0 20px;
        color: #ffffff;
    }
    .menu {
        color: #ffffff;
        text-decoration: none;
        padding: 0 10px;
        line-height: 100px;
    }
    #list {
        display: flex;
        flex-direction: row;
        list-style-type: none;
        justify-content: space-evenly;
    }
    @media screen and (max-width: 568px) {
        #logo-groupomania {
            margin: 0px;
        }
        .navbar-user {
            height: 40px;
            background-color: #FD2D01;
        }
        .menu {
            color: #ffffff;
            font-size: 0.6rem;
            line-height: 40px;
        }
        #list li {
            height: 50px;
        }
    }
</style>