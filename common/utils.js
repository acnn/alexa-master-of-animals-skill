var utils = {
    randomIntFromInterval: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    getUserRegion: function (language) {
        // switch (language) {
        //     case "en-US":
        //         return "us";
        //     case "en-IN":
        //         return "india";
        //     default:
        //         return "india";
        // }
        return "india";
    },


};

module.exports = utils;