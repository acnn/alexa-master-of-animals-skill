const Alexa = require("alexa-sdk");
const states = require("../session/states");
const transitions = require("../session/transitions");
const messages = require("../content/messages");
const continueGameHandler = Alexa.CreateStateHandler(states.CONTINUE_GAME, {
    "LaunchRequest": function () {
        this.attributes.player.region = "india";
        var speechOutput, reprompt;
        speechOutput = messages.continueGame.intro + messages.continueGame.introPrompt;
        reprompt = messages.continueGame.introPrompt;
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(":responseReady");
    },

    "WildBattleIntent": function () {
        transitions.startWildBattle(this);
    },

    "AMAZON.YesIntent": function () {
        transitions.startWildBattle(this);
    },

    "AMAZON.NoIntent": function () {
        transitions.renewGame(this);
    },

    "AMAZON.HelpIntent": function () {
        var speechOutput, reprompt;
        speechOutput = messages.continueGame.help + messages.continueGame.helpPrompt;
        reprompt = messages.continueGame.helpPrompt;
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(":responseReady");
    },

    "SessionEndedRequest": function () {
        transitions.clearState(this);
    },

    "AMAZON.CancelIntent": function () {
        transitions.clearState(this);
        this.response.speak(messages.exitGame.exit);
        this.emit(":responseReady");
    },

    "AMAZON.StopIntent": function () {
        transitions.clearState(this);
        this.response.speak(messages.exitGame.exit);
        this.emit(":responseReady");
    },

    "Unhandled": function () {
        this.emitWithState("LaunchRequest");
    }
});

module.exports = continueGameHandler;