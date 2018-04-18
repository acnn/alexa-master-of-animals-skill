const Alexa = require("alexa-sdk");
const states = require("../session/states");
const transitions = require("../session/transitions");
const messages = require("../content/messages");
const entryHandler = Alexa.CreateStateHandler(states.ENTRY, {
    "LaunchRequest": function () {
        var isReturningUser = this.attributes.isReturningUser;
        if (isReturningUser) {
            transitions.continueGame(this);
        }
        else {
            transitions.launchNewGame(this);
        }
    },

    "AMAZON.HelpIntent": function () {
        var speechOutput, reprompt;
        var isReturningUser = this.attributes.isReturningUser;
        if (isReturningUser) {
            reprompt = messages.entry.helpPromptForReturning;
        }
        else {
            reprompt = messages.entry.helpPromptForNew;
        }
        speechOutput = messages.entry.help;
        this.response.speak(speechOutput + reprompt).listen(reprompt);
        this.emit(":responseReady");
    },

    "AMAZON.YesIntent": function () {
        var speechOutput, reprompt;
        var isReturningUser = this.attributes.isReturningUser;
        if (isReturningUser) {
            transitions.continueGame(this);
        }
        else {
            transitions.launchNewGame(this);
        }
    },

    "AMAZON.NoIntent": function () {
        var speechOutput;
        var isReturningUser = this.attributes.isReturningUser;
        if (isReturningUser) {
            transitions.renewGame(this);
        }
        else {
            speechOutput = messages.entry.outro;
            this.response.speak(speechOutput);
            this.emit(":responseReady");
        }
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

module.exports = entryHandler;