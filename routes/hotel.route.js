const express = require('express');
const multer = require('multer');
const Hotel = require('../models/hotel.model'); // Assurez-vous que le chemin est correct
const router = express.Router();
const fs = require('fs');


// Configuration de multer pour gérer les fichiers
// const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Route pour ajouter un nouvel hôtel
router.post('/add', upload.single('image'), async (req, res) => {
  const { name, address, email, phone, price, currency } = req.body;

  try {
    // Création d'une nouvelle instance d'hôtel avec les données reçues
    const hotel = new Hotel({
      name,
      address,
      email,
      phone,
      price,
      currency,
      image: req.file ? req.file.filename : null,
    });

    // Sauvegarde de l'hôtel dans la base de données
    await hotel.save();

    // Réponse au client avec succès
    res.status(201).json({ message: 'Hôtel ajouté avec succès', hotel });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'hôtel:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Route GET pour récupérer les hôtels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    console.error('Erreur lors de la récupération des hôtels:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

module.exports = router;
//  // Route pour ajouter un nouvel hôtel
//  app.post('/api/hotels/add', upload.single('image'), async (req, res) => {
//   const { name, address, email, phone, price, currency } = req.body;

//   try {
//     // Création d'une nouvelle instance d'hôtel avec les données reçues
//     const hotel = new Hotel({
//       name,
//       address,
//       email,
//       phone,
//       price,
//       currency,
//       image: req.file ? req.file.filename : null,
//     });

//     // Sauvegarde de l'hôtel dans la base de données
//     await hotel.save();

//     // Réponse au client avec succès
//     res.status(201).json({ message: 'Hôtel ajouté avec succès', hotel });
//   } catch (error) {
//     console.error('Erreur lors de l\'ajout de l\'hôtel:', error);
//     res.status(500).json({ message: 'Erreur interne du serveur' });
//   }
// });




// const express = require('express');
// const router = express.Router();
// const Hotel = require('../models/hotel.model'); // Assurez-vous d'avoir un modèle Hotel

// // Route pour créer un nouvel hôtel
// router.post('/add', async (req, res) => {
//   const { name, address, email, phone, price, currency, image } = req.body;
//   try {
//     const newHotel = new Hotel({
//       name,
//       address,
//       email,
//       phone,
//       price,
//       currency,
//       image
//     });
//     await newHotel.save();
//     res.status(201).send({ message: 'Hotel added successfully', hotel: newHotel });
//   } catch (error) {
//     console.error('Error adding hotel:', error);
//     res.status(500).send({ message: 'Internal server error', error });
//   }
// });

// module.exports = router;
