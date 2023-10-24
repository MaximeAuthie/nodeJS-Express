//? Importer Express
const express   = require('express');
const app       = express();

//? Définir les variables de l'URL
const hostname  = 'http://127.0.0.1';
const port      = 3001;

//? Créer une constante qui va contenir les données
const tasks = [
    {
        title: "Apprendre à programmer",
        done: false
    },
    {
        title: "Faire les courses",
        done: false
    }
]
    
//? Définir le moteur de template
app.set('view engine', 'ejs');

//? Router
app.get('/', (req, res) => {
    res.render('todolist', );
});


//? Ecouter le port 3000
app.listen(port, () => {
    console.log(`Serveur lancé sur ${hostname}:${port}`);
});