"use strict";

const logger = require("../utils/logger");
const genresStore = require("../models/genres-store.js");
const accounts = require ('./accounts.js');


const start = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('start rendering');
    
    if(loggedInUser){

    const genres = genresStore.getAllGenres();
    let numGenres = genres.length;
    let numGames = 0;
    for (let item of genres) {
      numGames += item.games.length;
    }

    const viewData = {
      title: "Welcome to the Game Review App!",
      totalGenres: numGenres,
      totalGames: numGames,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,

    };

    response.render("start", viewData);
    }
   else response.redirect('/');
  },
};

module.exports = start;