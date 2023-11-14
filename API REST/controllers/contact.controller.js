//! Importer le modèle Contact
const Contact = require('../models/contact');

//! Fonction de création d'un nouveau contact
const create = async (req, res) => {
    console.log("req.body = ", req.body);
    const newContact = await Contact.create(req.body);
    console.log(newContact);
    res.send(newContact);
};

module.exports = {
    create,
}