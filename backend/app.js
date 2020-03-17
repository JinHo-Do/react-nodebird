const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

const db = require('./models');
const routes = require('./routes');
const passportConfig = require('./passport');

const PORT = process.env.PORT || 8080;

const app = express();

dotenv.config();
db.sequelize.sync();
passportConfig();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false, // https? = true
    },
    name: 'djh.qw', // connect.sid 대신 할 이름
  }),
);

app.use(passport.initialize());
app.use(passport.session());

routes(app);

app.listen(PORT, () => {
  console.log(`✅ server is running on ${PORT} port`);
});
