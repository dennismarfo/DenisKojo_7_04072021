<template>
    <div id="container">

        <div id='login'>
            <div id="subscribe">
                <div class="s-part">
                    <router-link to="/signup">Inscription</router-link>
                </div>
            </div>

        </div>
        <div class="main-content" >
            <div id="connect">
                <input type="email" id="email" placeholder="Email" aria-label="email d'un utilisateur" v-model="dataUser.email"/>
                <input type="password" id="password-input" placeholder="Mot de passe" aria-label="Mot de passe d'un utilisateur" v-model="dataUser.password" 
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
        width: 500px;
        height: 50%;
        overflow: hidden;
        border: 0px solid #000;
        margin: 50px auto;
        padding: 10px;
    }

    .main-content {
        width: 250px;
        height: 40%;
        margin: 10px auto;
        background-color: #ce1b1b82;
        border: 2px solid #e6e6e6;
        padding: 64px 50px;
        border-radius: 12px;
    }

    #subscribe {
        width: 250px;
        height: 40%;
        margin: 10px auto;
        border: 1px solid #e6e6e6;
        padding: 20px 50px;
        background-color: #ce1b1b82;
        border-radius: 12px;
    }


    #subscribe h3 {
        padding: 40px 0;
        font-size: 3rem;
    }
      #subscribe a {
        text-decoration: none;
        color: white;
        font-size: 1rem;
        font-weight: bold;
    }
    #subscribe a:hover{
        color: #FD2D01;
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
        border-radius: 20px;
        padding: 12px;
    }
    .btn {
        width: 100%;
        background-color: #ab9999;
        border: 1px solid #ab9999;
        padding: 9px 18px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        border-radius: 3px;       
    }
    .btn:hover {
        background-image: linear-gradient(to top left,rgba(0, 0, 0, .2),rgba(0, 0, 0, .2) 30%,rgba(0, 0, 0, 0));
        background-color: #FD2D01;
    }

</style>
