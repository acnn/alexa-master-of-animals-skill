const Alexa = require("alexa-sdk");
const states = require("../session/states");
const transitions = require("../session/transitions");
const messages = require("../content/messages");
const flags = require("../common/flags");
const tutorialHandler = Alexa.CreateStateHandler(states.TUTORIAL, {
    "LaunchRequest": function () {
        var speechOutput, reprompt;
        var starter = this.attributes.player.starter;
        var animal = this.attributes.player.animals[starter];
        speechOutput = messages.tutorial.getStarterCompliment(animal) + messages.tutorial.intro + messages.tutorial.introPrompt;
        reprompt = messages.tutorial.introPrompt;
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(":responseReady");
    },

    "AMAZON.YesIntent": function () {
        this.attributes.tutorialDone = true;
        transitions.startTutorialBattle(this);
    },
    "AMAZON.NoIntent": function () {
        var speechOutput;
        speechOutput = messages.newGame.outro;
        this.response.speak(speechOutput);
        this.emit(":responseReady");
    },

    "AMAZON.HelpIntent": function () {
        var speechOutput, reprompt;
        var starter = this.attributes.player.starter;
        var animal = this.attributes.player.animals[starter];
        if (this.attributes.player.typeHelp) {
            this.attributes.player.typeHelp = false;
            speechOutput = messages.tutorial.helpTypes + messages.tutorial.getTypeTutorial(animal) + messages.tutorial.helpTypesPrompt;
            reprompt = messages.tutorial.helpTypesPrompt;
        }
        else {
            this.attributes.player.typeHelp = flags.CATCHING_ENABLED; //dont tell types help till catching is allowed
            speechOutput = messages.tutorial.helpMoves + messages.tutorial.getMovesTutorial(animal) + messages.tutorial.helpMovesPrompt;
            reprompt = messages.tutorial.helpMovesPrompt;
        }
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
        this.emitWithState("AMAZON.NoIntent");
    }
});

module.exports = tutorialHandler;