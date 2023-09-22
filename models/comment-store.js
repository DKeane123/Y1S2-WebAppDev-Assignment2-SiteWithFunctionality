"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");
const logger = require("../utils/logger");


const commentStore = {
  store: new JsonStore("./models/comment-store.json", { commentCollection: [] }),
  collection: "commentCollection",

  getAllComments() {
    return this.store.findAll(this.collection);
  },

  getComments(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addComment(comment) {
    this.store.add(this.collection, comment);
  },

  removeComment(id) {
    const comment = this.getComments(id);
    this.store.remove(this.collection, comment);
  },

  editGame(id, gameId, updatedGame) {
    const gamelist = this.getGenres(id);
    const games = gamelist.games;
    const index = games.findIndex((game) => game.id === gameId);
    games[index].title = updatedGame.title;
    games[index].developer = updatedGame.developer;
    games[index].review = updatedGame.review;
  },

  getUserComments(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = commentStore;
