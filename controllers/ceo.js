"use strict";

const logger = require("../utils/logger");
const ceoStore = require('../models/ceo-store.js');
const accounts = require ('./accounts.js');



const ceo = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('ceo rendering');
    if (loggedInUser) {
      const viewData = {
        title: 'List of Game Ceos',
        ceos: ceoStore.getAllCeos(),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };
      response.render('ceo', viewData);
    }
    else response.redirect('/');    
  },
};

module.exports = ceo;