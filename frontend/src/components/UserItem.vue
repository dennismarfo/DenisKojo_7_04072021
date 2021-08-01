
<template>
    <div class="card">
        <div>
            <div class="user-item">
                <img id="img-profile" :src="photo">
                <div>
                    <p>{{ firstName }} {{ lastName }}</p>
                    <p>{{ email }}</p>
                </div>
            </div>
            <div class="permission">
                <slot name="Permission"></slot>
                <button type="submit" aria-label="Modification de permission admin d'un utilisateur" v-on:click.prevent="updateUsers(user)">Mettre à jour
                </button>
            </div>
        </div>
        <div id="divDelete">
            <button aria-label="Suppression d'un utilisateur" v-on:click.prevent="deleteUser(user)" class="userDelete">Supprimer le compte</button>
        </div>
    </div>
</template>


<script>
export default {
    name: 'UserItem',
    props: {
        firstName: {
            type: String,
            default: 'Victor'
        },
        lastName: {
            type: String,
            default: 'Deweerdt'
        },
        photo: {
            type: String,
            default: 'http://localhost:3000/images/DSC04282.jpg1604754621573.jpg'
        },
        email: {
            type: String,
            default: 'vdeweerdt@groupomania.com'
        },
        user: {
            type: String
        }
    },
    methods: {
        deleteUser(user) {
            this.$emit('user-deleted', user);
        },
        updateUsers(user) {
            this.$emit('user-updated', user);
        }
    }
}
</script>

<style>
    #img-profile {
        max-width: 100px;
        max-height: 100px;
        width: 100%;
        height: 100%; 
        border-radius: 100px;
        margin: 25px 50px 25px 25px;
    }
    .user-item {
        display: flex;
        align-items: center;
    }
    .permission {
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
    }
    .userDelete {
        margin: 15px 0;
    }
    #divDelete {
        text-align: center;
    }
    .card {
        border-bottom: #b1a7a6 solid 1px;
        
    }
    @media screen and (max-width: 568px) {
        #img-profile {
        max-width: 70px;
        max-height: 70px;
        width: 100%;
        height: 100%; 
        border-radius: 70px;
        margin: 5px;
    }
    .user-item {
        display: flex;
        align-items: center;
    }
    .permission {
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
    }
    .userDelete {
        margin: 15px 0;
    }
    #divDelete {
        text-align: center;
    }
}
</style>