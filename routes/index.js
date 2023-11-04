const express = require('express');
const router = express.Router();
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET,
  baseURL: 'http://localhost:8080',
  clientID: 'm5s6EIgdwT91Hbpb86iHHszcobQLQrEH',
  issuerBaseURL: 'https://dev-weuevtrangclj7vb.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.use('/books', require('./books'))

module.exports = router;