//? Importer le package express
const express = require('express');

//? Créer l'application
const app = express();

//? Déclarer l'utilisation du moteur de template 'ejs'
app.set('view engine','ejs');

//? Déclarer l'emplacement du  répertoire contenant les ficheirs statiques du projet
app.use('/static', express.static('public'));

//? Déclarer l'adresse du serverur ainsi que le port utilisé
const hostname = '127.0.0.1';
const port = 3000;

//? Déclarer un tableau d'articles

const articles = [
    {
        title       : 'Débuter avec node.js'
    },
    {
        title       : 'Node.js vs PHP', 
        category    : 'Développement web'
    },
    {
        title       : 'Les sockets en C', 
        category    : 'Programmation'
    },
    {
        title       : 'Quel système d\'exploitation utiliser', 
        category    : 'Informatique'
    },
]

//? Router
app.get('/', (req, res) => {
    res.render('pages/home');
});

app.get('/hello/:name', (req, res)  => {
    res.render('pages/hello', { name: req.params.name });
});

app.get('/posts', (req, res) => {
    res.render('pages/posts-list', { posts: articles});
});

//? Ecouter le port du serveur au  démarrrage du serveur
app.listen(port, (() => {
    console.log(`Serveur lancé sur http://${hostname}:${port}`);
}));