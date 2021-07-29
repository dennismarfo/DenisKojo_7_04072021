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
        <div >
            <div id="connect">
                <input type="email" id="email" placeholder="name@example.com" aria-label="email d'un utilisateur" v-model="dataUser.email"/>
                <input type="password" id="password-input" placeholder="Votre mot de passe" aria-label="Mot de passe d'un utilisateur" v-model="dataUser.password" 
                v-on:keyup.enter="submitLogin"/>
                <button type="submit" class="btn" aria-label="Connexion d'un utilisateur" @click.prevent="submitLogin" v-on:keyup.enter="submitLogin">Se connecter</button>
            </div>
        </div>

    </div>
    
</template>

<script>

import axios from "axios";
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
            if (this.email !== null || this.password !== null) {
                axios
                    .post("http://localhost:3000/api/users/login",
                        this.dataUser
                    )
                    .then(response => {
                        localStorage.setItem("token", response.data.token);
                        this.$router.push("/");
                    })
                    .catch(error => {
                        console.log(error.response)
                    })
            } else {
                alert("L'un des champs n'est pas renseigné !");
            }
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
        color:#FD2D01;
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

     #connect{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 50px 50px 0 50px;
    }
    #connect input {
        margin-bottom: 30px;
        font-size: 25px;
        border-color: red;
        border-radius: 20px;
        padding: 12px;
    }
    .btn {
        width: 50%;
        padding: 10px;
        border-radius: 15px;
        font-size: 1.2rem;
        margin-top: 50px;
        background-image: linear-gradient(to top left,rgba(0, 0, 0, .2),rgba(0, 0, 0, .2) 30%,rgba(0, 0, 0, 0));       
    }
    .btn:hover {
        background-image: linear-gradient(to top left,rgba(0, 0, 0, .2),rgba(0, 0, 0, .2) 30%,rgba(0, 0, 0, 0));
        background-color: #FD2D01;
    }

</style>
