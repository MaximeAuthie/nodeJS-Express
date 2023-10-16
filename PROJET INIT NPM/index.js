//? Importation du module de node js qui permet de gérer un serveur http
const http = require('http');

//? Déclaration des variables pour le port et l'adresse IP du serveur
const hostname  = '127.0.0.1';
const port      = 3000;

//? On utilise la méthode createServeur du module htpp pour créer un nouveau serveur http
//? On passe en  paraméètre req (pour request) et res (pour response)
const server = http.createServer((req, res) => {
    res.statusCode = 200; //pour sépcifier le code de la réponse
    res.setHeader('Content-Type', 'text/html'); //pour spécifier le format de la réponse => ici du HTML
    res.end('<h1>Bonjour!</h1>'); //res.end => reponse de fin de requête
});

//? On va démarrer le serveur ==> lui demandder d'écouter les requête qu'on va exécuter
//? On utilise donc la méthode listen(port, adresse ip, fonction);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

//! Pour démarer le serveur, on ouvre un terminal et on saisi : "node index.js"
//! Pour éteindre le serveur : ctrl + c