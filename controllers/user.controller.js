const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid password' });
    }
    res.send({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);  // Ajout du log d'erreur
    res.status(500).send({ message: 'Internal server error', error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error('Error fetching users:', error);  // Ajout du log d'erreur
    res.status(500).send({ message: 'Internal server error', error });
  }
};

exports.conexion = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Product({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    console.error('Error creating user:', error);  // Ajout du log d'erreur
    res.status(500).send({ message: 'Internal server error', error });
  }
};
