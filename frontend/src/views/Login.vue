<template>
    <div id="container">
        <div id="home">
            <div>
                <p>Groupomania, le réseau social de votre entreprise!</p>
            </div>
            <div>
                <p>Venez echanger et partager!</p>
            </div>
            <div>
                <p>Publier et poster !</p>
            </div>
        </div>
        <div id='login'>
            <div id="connexion">
                <h3>Connexion</h3>
            </div>
            <div id="subscribe">
                <router-link to="/signup">Inscription</router-link>
            </div>

        </div>

    </div>
    
</template>

<script>

export default {
    name: 'login',
    data() {
        return {
            dataUser: {
                email: '',
                password: ''
            }
        };
    },
    methods: {
        submitLogin() {

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
    #container {
        display: flex;
        justify-content: center;
        margin: 100px;
    }
    #home {
/*        background-repeat: no-repeat;*/
        background-position: 50% 50%;
        text-align: center;
        display: flex;
        flex-direction: column;
        padding: 165px 80px;
    }
    #home div i {
        float: left;
        font-size: 35px;
        padding-top: 10px;
    }
    #home div p {
        font-size: 2rem;
    }
    #home div {
        padding: 10px;
    }
    #subscribe h3 {
        padding: 40px 0;
        font-size: 3rem;
    }
      #subscribe a {
        text-decoration: none;
        color: black;
        font-size: 1rem;
    }
    #subscribe a:hover{
        color: #FD2D01;
    }
    #login {
      text-align: center;
      margin-left: 80px;
      padding-top: 50px;
    }

</style>
