const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./models');
const routes = require('./routes');

const PORT = process.env.PORT || 8080;

const app = express();

db.sequelize.sync();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

routes(app);

app.listen(PORT, () => {
  console.log(`✅ server is running on ${PORT} port`);
});
