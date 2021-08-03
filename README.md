# DenisKojo_7_04072021

Environnement

Backend : Ce projet est développé avec NodeJS, Express, Sequelize et Mysql

Frontend : Ce projet est développé avec VueJS

Prérequis

L'installation de NodeJS, Express, Sequelize et Mysql est requise sur votre ordinateur.

Démarrage de l'application frontend

Clônez le repo sur lequel vous vous trouvez.

À la racine du dossier frontend faites un yarn install

Puis yarn serve

Vous rendre sur http://localhost:8080/

Installation de la base de données

Créez une base de données nommée "database_production" dans votre base de données mysql. Command : CREATE DATABASE database_production;

Pour finaliser la base de données, executez dans la racine du dossier backend : Command : "sequelize db:migrate --env=production"

Puis lancez le serveur avec "yarn start --env=production"

Démarrage de l'application backend

À la racine du dossier backend, faites un yarn install

le ficher .env eest à compléter : les champs DB_USER=, DB_MDP=, SECRET_TOKEN=JHGJHDF678SGD785D6G

Faites un node server ou nodemon server (node recquis pour cette aplication)

Vous pouvez utiliser l'application


