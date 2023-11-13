//! Helper permettant d'emettre une erreur tout en maintenant le fonctionnement du serveur.
//! Cette erreur est captés par app.use((err, req, res, next) dans index.js

const catchAsync = (fn) => (req,res,next) => {
    Promise // On attend ici que le traitement asynchrone soit terminé pour renvoyer l'erreur
        .resolve(fn(req,res,next))
        .catch((err) => next(err)); //ici, Express comprend que le paramètre est une erreur et l'a transmet au reste du code pour interception
}

module.exports = catchAsync;