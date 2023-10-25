//? Importer Express
const express   = require('express');
const app       = express();

//? Importer Express Session
const session = require('express-session');

//? Déclarer le middleware d'authentification dans app.use()
app.use(session({
    secret: 'qPu48qdKQV2vG8XjmATVgkghEV6qiCvo',
    resave: false,
    saveUninitialized: true,
    // cookie: {secure: true} //uniqument en https
}))

//? Définir les variables de l'URL
const hostname  = 'http://127.0.0.1';
const port      = 3001;

//? Paramétrage d'Express nécessaire pour exploiter le body de nos requêtes (indispensable pour POST, PUT, PATCH...)
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//? Définir le moteur de template
app.set('view engine', 'ejs');

//? Router
app.get('/', (req, res) => {
    if (!req.session.tasks) { // On vérfie ici si une liste de tâches existe déjà pour cette session
        req.session.tasks = [];
    }
    res.render('todolist', { tasks: req.session.tasks });
});

app.post('/task', (req, res) => {
    if (req.body.task) {
        req.session.tasks.push({
            title: req.body.task,
            done: false
        }); 
    }
    res.redirect('/');
});

app.get('/task/:id/done', (req, res) => {
    if (req.session.tasks [req.params.id]) {
        req.session.tasks [req.params.id].done = true;
    }
    res.redirect('/');
});

app.get('/task/:id/delete', (req, res) => {
    if (req.session.tasks[req.params.id]) {
        req.session.tasks .splice(req.params.id, 1);
    }
    res.redirect('/');
})

//? Ecouter le port 3000
app.listen(port, () => {
    console.log(`Serveur lancé sur ${hostname}:${port}`);
});