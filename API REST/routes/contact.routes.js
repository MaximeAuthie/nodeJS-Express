//! Importer Express
const express = require('express');

//! Importer le contrôleur contact.controller.js
const contactController = require('../controllers/contact.controller');

//! Créer uns nouvelle isntance de router
const router = express.Router();

//! Routes

//? Route de création d'un nouveau contact
router.post('/contacts', contactController.create);

//! Exporter ce router
module.exports = router;