// Import du package http 
const http = require('http');
// Methode qui permet de créer un serveur
const server = http.createServer((req, res) => {
    res.end('Voilà la réponse du nouveau serveur !');
});

server.listen(process.env.PORT || 3000);