"use strict";

const logger = require("../utils/logger");
const uuid = require("uuid");
const gamelistStore = require("../models/genres-store");
const accounts = require ('./accounts.js');


const gamelist = {  
    index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const gamelistId = request.params.id;
    logger.debug('Genre id = ' + gamelistId);
    if (loggedInUser) {
    const viewData = {
      title: 'Game App Genres',
      gamelists: gamelistStore.getUserGenrelists(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('gamelist', viewData);
    }
    else response.redirect('/');
  },
  
  deleteGame(request, response) {
    const gamelistId = request.params.id;
    const gameId = request.params.gameid;
    logger.debug(`Deleting Game ${gameId} from gamelist ${gamelistId}`);
    gamelistStore.removeGame(gamelistId, gameId);
    response.redirect("/gamelist/" + gamelistId);
  },
  
  addGame(request, response) {
    const gamelistId = request.params.id;
    const gamelist = gamelistStore.getGenres(gamelistId);
    const newGame = {
      id: uuid(),
      title: request.body.title,
      developer: request.body.developer,
      review: request.body.review,
    };
    gamelistStore.addGame(gamelistId, newGame);
    response.redirect('/gamelist/' + gamelistId);
  },
    
  updateGame(request, response) {
    const gamelistId = request.params.id;
    const gameId = request.params.gameid;
    logger.debug("updating game " + gameId);
    const updatedGame = {
      title: request.body.title,
      developer: request.body.developer,
      review: request.body.review,
    };
    gamelistStore.editGame(gamelistId, gameId, updatedGame);
    response.redirect("/gamelist/" + gamelistId);
  },
};

module.exports = gamelist;
