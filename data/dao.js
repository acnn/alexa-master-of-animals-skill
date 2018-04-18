"use strict"
var dao = (function () {
    var handler = require("./handlers/dynamodb");
    return {
        getStarterAnimals: function (data, callback) {
            handler.getStarterAnimals(data, callback);
        },

        getAnimal: function (data, callback) {
            handler.getAnimal(data, callback);
        },

        getRandomWildAnimals: function (data, callback) {
            console.log("In dao : " + JSON.stringify(data));
            handler.getRandomWildAnimals(data, callback);
        }
    }
})();

module.exports = dao;