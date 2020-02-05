const express = require('express');
const db = require('./models');
const routes = require('./routes');

const PORT = process.env.PORT || 8080;

const app = express();

db.sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(PORT, () => {
  console.log(`✅ server is running on ${PORT} port`);
});
