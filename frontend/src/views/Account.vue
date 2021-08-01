
<template>
  <div id="profile">
      <div>
         <img v-bind:src="dataUser.avatar">
      </div>
      <div>
          <input class="coordonees" type="text" placeholder="First-name" aria-label="Prénom de l'utilisateur" v-model="dataUser.firstName"/>
          <input class="coordonees" type="text" placeholder="Last-name" aria-label="Nom de famille de l'utilisateur" v-model="dataUser.lastName"/>
          <input class="coordonees" type="email" aria-label="Email de l'utilisateur" placeholder="name@example.com" v-model="dataUser.email"/>
          <label id="img-profile">
              <div role="button" aria-label="Téléchargement d'un fichier">
                  <span v-if="newUserData.avatar">Fichier séléctionné : {{newUserData.avatar.name}}</span>
                  <span class="ajout" v-else >Ajouter un avatar </span>
              </div>
              <input class="fichier" type="file" ref="photo" v-on:change="handleFileUpload()"/>
          </label>
          <div id="btn-profile">
              <div>
                  <button class="maj" type="submit" aria-label="Modifier les informations utilisateur" @click.prevent="updateUserInformations">Mettre à jour les informations</button>
              </div>
              <div>
                  <button class="delete" type="submit" aria-label="Supprimer l'utilisateur" @click.prevent="deleteUser">Supprimer le compte</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'account',  
    data() {
        return {
          dataUser: {
              firstName: '',
              lastName: '',
              email: '',
              avatar: ''
          },
          newUserData: {
            avatar: null
          }
        };
    },
    created() {
      axios
        .get("http://localhost:3000/api/users/me", {
          headers: { Authorization: localStorage.getItem("token")  }
        })
        .then(response => {
          console.log(response.data);
          this.dataUser = response.data.user;
        })
    },
    methods: {
        updateUserInformations() {
          console.log(this.newUserData.avatar);
          if (this.newUserData.avatar !== null) {
            console.log('non null');
            let formData = new FormData();
            formData.append('email', this.dataUser.email);
            formData.append('firstName', this.dataUser.firstName);
            formData.append('lastName', this.dataUser.lastName);
            formData.append('avatar', this.newUserData.avatar, this.newUserData.avatar.name);
            axios
              .put('http://localhost:3000/api/users/me',
                    formData,
                    {
                    headers: {
                        Authorization: localStorage.getItem("token") 
                    },
                  }
                ).then(() => {
                  console.log('Image téléchargée !');
                  this.$router.go();
              })
              .catch(error =>
                console.log(error)
              );
            } else {
              console.log('null');
              let formData = new FormData();
              formData.append('email', this.dataUser.email);
              formData.append('firstName', this.dataUser.firstName);
              formData.append('lastName', this.dataUser.lastName);
              formData.append('avatar', this.dataUser.avatar);
              axios
                .put('http://localhost:3000/api/users/me',
                      formData,
                      {
                      headers: {
                          Authorization: localStorage.getItem("token") 
                      },
                    }
                  ).then(() => {
                    console.log('Image téléchargée !');
                    this.$router.go();
                })
                .catch(error =>
                  console.log(error)
                );
            }
          },
        loadUser() {
          axios
            .get("http://localhost:3000/api/users/me", {
              headers: { Authorization: localStorage.getItem("token") }
            })
            .then(response => {
              console.log(response.data);
              this.dataUser = response.data.user;
            })
        },
        handleFileUpload(){
          this.newUserData.avatar = this.$refs.avatar.files[0];
        },
        deleteUser() {
            this.$confirm(
                {
                    message: `Êtes-vous sur de vouloir supprimer votre compte ?`,
                    button: {
                        no: 'No',
                        yes: 'Yes'
                    },
                    callback: confirm => {
                        if (confirm) {
                        const id = this.dataUser.id;
                        axios
                            .delete('http://localhost:3000/api/users/' + id, {
                            headers: { Authorization: localStorage.getItem("token")  }
                            })
                            .then(response => {
                            console.log(response.data);
                            this.$router.push("/signup");
                            })
                            .catch(error => console.log(error))
                        }
                    }
                }
            )
        },
    },
};


</script>

<style>
    #profile {
        text-align: center;
        margin-top: 38px;
    }
    #profile div img {
        max-width: 150px;
        max-height: 150px;
        width: 100%;
        height: 100%; 
        border-radius: 150px;
        margin-bottom: 30px;
    }
    .coordonees {
        margin: 0 30px 30px 0;
        text-align: center;
        font-size: 1.3rem;
        padding-bottom: 3px;
        border-radius: 7px;
        border: dashed 1px;
    }
    #img-profile {
        display: flex;
        justify-content: center;
    }
    .ajout {
        font-size: 1.2rem;
        padding-right: 20px;
    }
    .fichier {
        font-size: 1.2rem;
        margin-bottom: 30px;
    }
    #btn-profile {
      display: flex;
      justify-content: center;
    }
    .maj {
      margin: 0 20px 0 0;
      padding: 0 3px 5px 3px;
      border-radius: 7px;
      border: solid 1px;
    }
    .delete {
      padding: 0 3px 5px 3px;
      border-radius: 7px;
      border: solid 1px;
    }

     @media screen and (max-width: 568px) {
      .coordonees {
          margin: 0 0 15px 0;
      }
      #img-profile {
          flex-direction: column;
        
      }
      .fichier {
          margin: 5px 0 20px 20px;
      }
    }
</style>