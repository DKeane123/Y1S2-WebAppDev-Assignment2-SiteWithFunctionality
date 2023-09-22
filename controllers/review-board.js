"use strict";

const logger = require("../utils/logger");
const uuid = require("uuid");
const gameGenresStore = require("../models/genres-store.js");
const accounts = require ('./accounts.js');


const listOfGenres = {
  index(request, response) {
    logger.info("game genres rendering");

    const viewData = {
      title: "Game Review App genres",
      genres: gameGenresStore.getAllGenres(),
    };

    logger.info("about to render", viewData.genres);
    response.render("genres", viewData);
  },

  deleteGenre(request, response) {
    const genreId = request.params.id;
    logger.debug(`Deleting Genre ${genreId}`);
    gameGenresStore.removeGenre(genreId);
    response.redirect("/genres");
  },

    addGenre(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const date = new Date();
    const newGenre = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      description: request.body.description,
      picture: request.files.picture,
      date: date,
      games: [],
    };
    logger.debug('Creating a new Genre' + newGenre);
    gameGenresStore.addGenre(newGenre, function() {
    response.redirect('/genres');
    });
  },
};



module.exports = listOfGenres;

