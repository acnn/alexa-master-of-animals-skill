const Alexa = require("alexa-sdk");
const entryHandler = require("./handlers/entryStateHandler");
const newGameHandler = require("./handlers/newGameStateHandler");
const chooseStarterHandler = require("./handlers/chooseStarterHandler");
const continueGameHandler = require("./handlers/continueGameStateHandler");
const renewGameHandler = require("./handlers/renewGameStateHandler");
const renewGameConfirmHandler = require("./handlers/renewGameConfirmStateHandler");
const tutorialHandler = require("./handlers/tutorialStateHandler");
const tutorialBattleHandler = require("./handlers/tutorialBattleStateHandler");
const wildBattleHandler = require("./handlers/wildBattleStateHandler");
exports.handler = function (event, context, callback) {
    var alexaHandler = Alexa.handler(event, context);
    alexaHandler.dynamoDBTableName = "BattleAnimalsUsers";
    alexaHandler.registerHandlers(entryHandler, newGameHandler, chooseStarterHandler, continueGameHandler, renewGameHandler, renewGameConfirmHandler, tutorialHandler, tutorialBattleHandler, wildBattleHandler);
    alexaHandler.execute();
};