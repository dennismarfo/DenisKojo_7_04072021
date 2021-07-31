<template>
    <div id="container"> 
        <div id="home">
        </div>
        <div id="signup">
            <div id="subscribe">
                <h3>Inscription</h3>
            </div>
        </div>
        <div class="register">
            <input type="text" id="firstName" placeholder="Prénom" aria-label="Prénom de l'utilisateur" v-model="dataUser.firstName"/>
            <input type="text" id="lastName" placeholder="Nom" aria-label="Nom de famille de l'utilisateur" v-model="dataUser.lastName"/>
            <input type="email" id="email" placeholder="name@exemple.com" v-model="dataUser.email"/>
            <input type="password" id="password-input" placeholder="Votre mot de passe" aria-label="Mot de passe de l'utilisateur" v-model="dataUser.password" v-on:keyup.enter="submitSignup"/>
            <button type="submit" aria-label="Inscription de l'utilisateur" @click.prevent="submitSignup" class="btn">S'inscrire</button>
        </div>
        <div id="connexion">
            <router-link to="/login">Vous avez un compte ?</router-link>
         </div>

    </div>
    
</template>

<script>
import axios from "axios";
export default {
    name: 'signup',  
    data() {
        return {
            dataUser: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            }
        };
    },
    methods: {
        submitSignup() {
            if (this.firstName !== null || this.lastName !== null || this.email !== null || this.password !== null) {
                axios
                    .post("http://localhost:3000/api/users/signup",
                    this.dataUser, {
                            headers: {
                            Authorization: "Bearer " }
                            }
                    )
                    .then(response => {
                        console.log(response);
                        this.$router.push("/login");
                    })
                    .catch(error => {
                        console.log(error.response)
                    })
            } else {
                alert("L'un des champs n'est pas renseigné !");
            }
        },
    },
};
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

     #signup {
      text-align: center;
    }
    #subscribe h3 {
        padding: 10px 0;
        font-size: 3rem;
    }
    #connexion a {
        text-decoration: none;
        color: black;
        font-size: 1rem;
    }
    #connexion a:hover{
        color: #FD2D01;
    }

    .register{
        width: 250px;
        height: 40%;
        margin: 10px auto;
        background-color: #ce1b1b82;
        border: 2px solid #e6e6e6;
        padding: 64px 50px;
        border-radius: 12px;
    }
    .register input {
        margin-bottom: 30px;
        font-size: 25px;
    }

    #accueil {

        background-repeat: no-repeat;
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

    .btn {
        width: 50%;
        padding: 5px;
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