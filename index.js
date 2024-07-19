// const express = require('express');
// const mongoose = require('mongoose');
// const productRoute = require('./routes/product.route');
// const app = express();
// const cors = require('cors');

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// const allowedOrigins = ['http://localhost:3000'];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like curl or Postman)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'the CORS policy for this site does not allow access from the specified Origin: ${origin}';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },

//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // Enable cookies and other credentials
// }));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });

// // Routes
// app.use('/api/products', productRoute);

// // Exemple de route pour la connexion
// app.post('/api/products/login', (req, res) => {
//     // Logique de traitement de la connexion ici
//     const { email, password } = req.body;
//     // Exemple de traitement : vérification dans la base de données, etc.
//     // Puis renvoyer une réponse appropriée
//     res.status(200).send('Connexion réussie');
// });

// // Connexion à MongoDB
// mongoose.connect('mongodb://localhost:27017/test')
//     .then(() => {
//         console.log('Connected to database!');
//         // Lancement du serveur
//         app.listen(5000, () => {
//             console.log('Server is running on port 5000');
//         });
//     })
//     .catch((error) => {
//         console.error('Connection failed!', error);
//     });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/user.route');
const hotelRoute = require('./routes/hotel.route')
const Hotel = require('./models/hotel.model'); // Assurez-vous que le chemin est correct
const path = require('path');


const app = express();
const allowedOrigins = ['http://localhost:3000'];



app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoute);
app.use('/api/hotels', hotelRoute); // Utiliser les routes de l'hôtel
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch((error) => {
    console.error('Connection failed!', error);
  });

 