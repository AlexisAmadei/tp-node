// app.js (ou index.js)
const express = require('express');
const app = express();
const userRoutes = require('./userBackend/userRoutes');
const authRoutes = require('./authBackend/authRoutes');

app.use(express.json());
app.use('/usr', userRoutes);
app.use('/auth', authRoutes);

const PORT = 80;
app.listen(PORT, () => {
  console.log(`Le serveur Express écoute sur le port ${PORT}`);
});
