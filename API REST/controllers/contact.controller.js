//! Importer le modèle Contact
const Contact = require('../models/contact');

//! Importer le helper catchAsunc pour renvoyer les erreur non prévues
const catchAsync = require('../helpers/catchAsync');

//! Importer Mongoose
const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');

//! Fonction de création d'un nouveau contact
const create = async (req, res) => {
    console.log("req.body = ", req.body);
    const newContact = await Contact.create(req.body);
    console.log(newContact);
    res.send(newContact);
};

//! Fonction de récupération de l'ensemble des contacts
const getAll = catchAsync(async (req, res) => {
    console.log(req.query.firstName);
    const contacts = await Contact.find({firstName: req.query.firstName} );
    res.send(contacts);
});

//! Fonction de récupération d'un seul contact
const getById = catchAsync(async (req,res) => {
    
    //? Vérifier le format de l'identifiant envoyé dans la requête
    const { id } = req.params;
    try {
        new mongoose.Types.ObjectId(id);
    } catch (error) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .send("Format de l'ID invalide"); // En cas d'erreur de la convertion de l'ID en ObjectID, on return une réponse d'erreur pour mettre fin à l'execution de la fonction
    }
    
    const contact = await Contact.findById(req.params.id);
    if (contact) {
        res.send(contact);
    } else {
        res.status(404);
        res.send("Le contact demandé n'existe pas");
    }
});

//! Fonction pour mettre à jour un contact
const updateById = catchAsync(async (req, res) => {
    console.log(req.params);
    console.log(req.body);
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true}); //ici, {new: true} permet de stocker le document après mise à jour
    if (contact) {
        res.send(contact);
    } else {
        res.status(404);
        res.send("Le contact demandé n'existe pas");
    }
});

//! Fonction pour supprimer un contact
const deleteById = catchAsync(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (contact) {
        res.send('Contact supprimé avec succès');
    } else {
        res.status(404);
        res.send("Le contact demandé n'existe pas");
    }
});

module.exports = {
    create,
    getAll,
    getById,
    updateById,
    deleteById
}