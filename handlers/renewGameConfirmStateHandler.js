const Alexa = require("alexa-sdk");
const states = require("../session/states");
const transitions = require("../session/transitions");
const messages = require("../content/messages");
const renewGameConfirmHandler = Alexa.CreateStateHandler(states.CONFIRM_RENEW_GAME, {
    "LaunchRequest": function () {
        var speechOutput, reprompt;
        speechOutput = messages.renewGameConfirm.intro;
        reprompt = messages.renewGameConfirm.introPrompt;
        this.response.speak(speechOutput + reprompt).listen(reprompt);
        this.emit(":responseReady");
    },

    "AMAZON.YesIntent": function () {
        transitions.launchNewGame(this);
    },

    "AMAZON.NoIntent": function () {
        var speechOutput;
        speechOutput = messages.renewGameConfirm.outro;
        transitions.clearState(this);
        this.response.speak(speechOutput);
        this.emit(":responseReady");
    },

    "AMAZON.HelpIntent": function () {
        var speechOutput, reprompt;
        speechOutput = messages.renewGameConfirm.help + messages.renewGameConfirm.helpPrompt;
        reprompt = messages.renewGameConfirm.helpPrompt;
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

module.exports = renewGameConfirmHandler;