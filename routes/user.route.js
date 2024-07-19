// // const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/product.controller');

// router.post('/login', productController.login);
// router.get('/', productController.getProducts);
// router.post('/connexion', productController.createProduct);

// module.exports = router;


const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const router = express.Router();

// Route pour l'inscription
router.post('/login', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    // Hasher le mot de passe avant de l'enregistrer
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send({ message: 'Internal server error', error });
  }
});

// Route pour la connexion
router.post('/connexion', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid password' });
    }
    res.send({ message: 'Login successful', name: user.name });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ message: 'Internal server error', error });
  }
});

// Autres routes pour la gestion des produits
router.get('/', async (req, res) => {
  try {
    const Users = await User.find();
    res.send(Users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).send({ message: 'Internal server error', error });
  }
});

module.exports = router;

