const express = require('express');
const db = require('./models');

const PORT = process.env.PORT || 8080;

const app = express();

db.sequelize.sync();

app.get('/', (req, res) => {
  res.send('index');
});

app.listen(PORT, () => {
  console.log(`✅ server is running on ${PORT} port`);
});
