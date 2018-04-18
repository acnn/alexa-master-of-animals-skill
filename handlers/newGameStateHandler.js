const Alexa = require("alexa-sdk");
const states = require("../session/states");
const transitions = require("../session/transitions");
const messages = require("../content/messages");
const battleAI = require("../battle/battleAI");
const utils = require("../common/utils");
const newGameHandler = Alexa.CreateStateHandler(states.NEW_GAME, {
    "LaunchRequest": function () {
        this.attributes.isReturningUser = false;
        this.attributes.tutorialDone = false;
        this.attributes.player = {};
        this.attributes.player.animals = {};
        this.attributes.player.duel = {};
        this.attributes.player.region = utils.getUserRegion(this.event.request.locale);
        var speechOutput, reprompt;
        speechOutput = messages.newGame.intro;
        reprompt = messages.newGame.introPrompt;
        this.response.speak(speechOutput + reprompt).listen(reprompt);
        this.emit(":responseReady");
    },

    "AMAZON.YesIntent": function () {
        transitions.chooseStarter(this);
    },

    "AMAZON.NoIntent": function () {
        var speechOutput;
        speechOutput = messages.newGame.outro;
        this.response.speak(speechOutput);
        this.emit(":responseReady");
    },

    "AMAZON.HelpIntent": function () {
        var speechOutput, reprompt;
        speechOutput = messages.newGame.help + messages.newGame.helpPrompt;
        reprompt = messages.newGame.helpPrompt;
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

module.exports = newGameHandler;