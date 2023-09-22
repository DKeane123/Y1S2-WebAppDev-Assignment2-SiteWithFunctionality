'use strict';

const ceoStore = {

  ceos: require('./ceo-store.json').ceos,

  getAllCeos() {
    return this.ceos;
  },

};

module.exports = ceoStore;