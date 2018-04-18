const Alexa = require("alexa-sdk");
const states = require("../session/states");
const transitions = require("../session/transitions");
const messages = require("../content/messages");
const renewGameHandler = Alexa.CreateStateHandler(states.RENEW_GAME, {
    "LaunchRequest": function () {
        var speechOutput, reprompt;
        speechOutput = messages.renewGame.intro;
        reprompt = messages.renewGame.introPrompt;
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(":responseReady");
    },

    "AMAZON.YesIntent": function () {
        transitions.confirmRenewGame(this);
    },

    "AMAZON.NoIntent": function () {
        var speechOutput;
        speechOutput = messages.renewGame.outro;
        transitions.clearState(this);
        this.response.speak(speechOutput);
        this.emit(":responseReady");
    },

    "AMAZON.HelpIntent": function () {
        var speechOutput, reprompt;
        speechOutput = messages.renewGame.help + messages.renewGame.helpPrompt;
        reprompt = messages.renewGame.helpPrompt;
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

module.exports = renewGameHandler;