"use strict";

// import express and initialise router
const express = require("express");
const router = express.Router();

// import controllers
const start = require("./controllers/start.js");
const genres = require("./controllers/review-board.js");
const ceo = require("./controllers/ceo.js");
const gamelist = require("./controllers/gamelist.js");
const about = require("./controllers/about.js");
const accounts = require ('./controllers/accounts.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

// connect routes to controllers
router.get('/start', start.index);
router.get("/genres", genres.index);
router.get("/ceo", ceo.index);
router.get("/about", about.index);
router.get("/gamelist", gamelist.index);

router.get("/gamelist/:id", gamelist.index);
router.get("/gamelist/:id/deletegame/:gameid", gamelist.deleteGame);
router.post("/gamelist/:id/addgame", gamelist.addGame);
router.post('/gamelist/:id/updategame/:gameid', gamelist.updateGame);

router.get("/review-board/deletegenre/:id", genres.deleteGenre);
router.post("/review-board/addgenre", genres.addGenre);

// export router module
module.exports = router;
