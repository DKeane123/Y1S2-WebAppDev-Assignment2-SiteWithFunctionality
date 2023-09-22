"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");
const cloudinary = require("cloudinary");
const logger = require("../utils/logger");

try {
  const env = require("../.data/.env.json");
  cloudinary.config(env.cloudinary);
} catch (e) {
  logger.info("You must provide a Cloudinary credentials file - see README.md");
  process.exit(1);
}

const genresStore = {
  store: new JsonStore("./models/genres-store.json", { genresCollection: [] }),
  collection: "genresCollection",

  getAllGenres() {
    return this.store.findAll(this.collection);
  },

  getGenres(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addGenre(genre, response) {
    genre.picture.mv("tempimage", (err) => {
      if (!err) {
        cloudinary.uploader.upload("tempimage", (result) => {
          console.log(result);
          genre.picture = result.url;
          response();
        });
      }
    });
    this.store.add(this.collection, genre);
  },

  removeGenre(id) {
    const genre = this.getGenres(id);
    this.store.remove(this.collection, genre);
  },

  removeAllGenres() {
    this.store.removeAll(this.collection);
  },

  addGame(id, game) {
    const gamelist = this.getGenres(id);
    gamelist.games.push(game);
  },

  removeGame(id, gameId) {
    const genres = this.getGenres(id);
    const games = genres.games;
    _.remove(games, { id: gameId });
  },

  editGame(id, gameId, updatedGame) {
    const gamelist = this.getGenres(id);
    const games = gamelist.games;
    const index = games.findIndex((game) => game.id === gameId);
    games[index].title = updatedGame.title;
    games[index].developer = updatedGame.developer;
    games[index].review = updatedGame.review;
  },

  getUserGenrelists(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = genresStore;
