//? On commence par importer le package 'express' dans une constante qu'on va pouvoir utiliser plus tard
const express = require('express');

//? On créé ici une application en initalisant Express dans une constante 'app'
const app = express();

//? On définit l'IP et le port du serveur
const hostname = '127.0.0.1';
const port = 3000;

//? On importe l'utilistaire 'path' dans une constante
const path = require('path');
// const { send } = require('process');

//? On paramètre Express pour gérer le body des requêtes POST
app.use(express.json()) // Pour gérer le body en json
app.use(express.urlencoded({ extended: true })) // Pour gérer le body des formulaires

//? On créé un middleware qui sera appliqué à toute les routes
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleTimeString()} - [${req.method}] - ${req.originalUrl}`);
    next(); // Permet de passer au prochain middleware
}

//? Pour appliquer ce middleware à toutes les routes
app.use(logRequest);

//? On déclare à Express l'emplacement du dossier contenant les fichiers statiques du projet (dans le html <img src="/images/dark_rabbit.jpg" alt="">)
app.use(express.static('public'));

//? On gère nos routes statiques
app.get('/', logRequest, (req, res) => {
    res.send('Hello world');
});

app.get('/bonjour', (req, res) => {
    res.send('<h1>Bonjour!</h1>');
});

app.get('/fichiers/html', (req, res) => {
    
    //? On réalise une joiture entre le chemin absolu du répertoire (récupéré avec __dirname) et du chemin relatif du fichier html
    //? Node exige des chemins absolus
    res.sendFile(path.join(__dirname, 'views/page.html')); 
});

//? On gère nos routes dynamiques avec paramètres (:nom_parametre)
app.get('/hello/:prenom/:nom', (req, res) => {
    console.log(req.params);
    const text = `<h1>Bonjour ${req.params.prenom} ${req.params.nom}!</h1>`;
    res.send(text);
});

//? On gère nos routes dynamiques avec variables d'URL (localhost:3000/hola?prenom=Maxou&nom=Delavega)
app.get('/hola', (req, res) => {
    console.log(req.query);
    const text = `Bonjour ${req.query.prenom} ${req.query.nom} !`;
    res.send(text);
});

//? On gère la route appelée lors de la soumission du formulaire
app.post('/form', (req,res) => {
    console.log(req.body);
    
    if (req.body.password == "1234") {
        res.send('Connexion réussie!');
    } else {
        res.redirect('/fichier/html?mdpIncorrect=1');
    }
});

//? A la fin du traitement de toutes les routes, on gère l'erreur 404
app.use((req, res) => {
    res.status(404).send('Page non trouvée.');
});

//? On va écouter le port 3000 pour déclarer via la console que le serveur à été lancé
app.listen(port, () => {
    console.log(`Serveur lancé sur http://${hostname}:${port}`);
});