
<template>
    <div id="nav">
        <div class="logo">
            <router-link to="/"><img src="../assets/icon.png" id="logo-groupomania"></router-link>
        </div>
        <div id="nav-info">
            <div>
                <div role="link" aria-label="Accès aux informations utilisateurs" class="navbar-user">
                    <ul id="list">
                        <li></li>
                        <li></li>
                        <li><a href="#" class="logOut menu" @click="logOut()">Se déconnecter</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>



<style>
    body, * {
        margin: 0;
        padding: 0;
        font-family: 'Texturina', serif;
    }
    #nav {
        text-align: center;
        margin-bottom: 40px;
    }
    #logo-groupomania {
        max-width: 350px;
        max-height: 200px;
        width: 100%;
        height: 100%;
    }
    .navbar-user {
        height: 100px;
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
        justify-content: center;
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