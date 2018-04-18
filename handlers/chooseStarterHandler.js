const Alexa = require("alexa-sdk");
const states = require("../session/states");
const transitions = require("../session/transitions");
const messages = require("../content/messages");
const dao = require("../data/dao");
const chooseStarterHandler = Alexa.CreateStateHandler(states.CHOOSE_STARTER, {
    "LaunchRequest": function () {
        var speechOutput, reprompt;
        var emitter = this;
        if (emitter.attributes.player.starters) {
            var starters = emitter.attributes.player.starters;
            speechOutput = messages.chooseStarter.buildChoices(starters, true) + messages.chooseStarter.introPrompt;
            var reprompt = messages.chooseStarter.introPrompt
            emitter.response.speak(speechOutput).listen(reprompt);
            emitter.emit(":responseReady");
        }
        else {
            dao.getStarterAnimals(undefined, function (starters) {
                emitter.attributes.player.starters = starters;
                speechOutput = messages.chooseStarter.intro + messages.chooseStarter.buildChoices(starters, true) + messages.chooseStarter.introPrompt;
                var reprompt = messages.chooseStarter.introPrompt
                emitter.response.speak(speechOutput).listen(reprompt);
                emitter.emit(":responseReady");
            });
        }
    },

    "ChooseAnimalIntent": function () {
        var speechOutput, reprompt;
        var animalName = this.event.request.intent.slots.animalName;
        var starters = this.attributes.player.starters;
        var alreadyDescribedStarters = this.attributes.player.describedStarters;
        var chosenAnimal;
        if (animalName && animalName.value) {
            for (var i = 0; i < starters.length; i++) {
                if (starters[i].name.toString().toLowerCase() == animalName.value.toString().toLowerCase()) {
                    chosenAnimal = starters[i];
                    break;
                }
            }
            if (chosenAnimal) {
                this.attributes.player.starterCandidate = chosenAnimal;
                if (alreadyDescribedStarters) {
                    var shortDescription = messages.chooseStarter.buildShortDescription(chosenAnimal);
                    speechOutput = messages.chooseStarter.buildChoiceConfirmation(shortDescription);
                    reprompt = messages.chooseStarter.choiceConfirmPrompt;
                }
                else {
                    this.attributes.player.describedStarters = true;
                    speechOutput = messages.chooseStarter.buildDescription(chosenAnimal) + messages.chooseStarter.buildChoiceConfirmation(chosenAnimal.name);
                    reprompt = messages.chooseStarter.buildChoiceConfirmation(chosenAnimal.name);
                }
            }
            else {
                //invalid choice
                speechOutput = messages.chooseStarter.choiceNotFound + messages.chooseStarter.buildChoices(starters, false) + messages.chooseStarter.choiceNotFoundPrompt;;
                reprompt = messages.chooseStarter.choiceNotFoundPrompt;
            }
        }
        else {
            //choice not received
            speechOutput = messages.chooseStarter.choiceNotFound + messages.chooseStarter.buildChoices(starters, false) + messages.chooseStarter.choiceNotFoundPrompt;;
            reprompt = messages.chooseStarter.choiceNotFoundPrompt;
        }

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(":responseReady");
    },


    "AMAZON.YesIntent": function () {
        var emitter = this;
        var starterCandidate = emitter.attributes.player.starterCandidate;
        dao.getAnimal({ name: starterCandidate.name }, function (animal) {
            if (animal) {
                animal.level = 1;
                animal.experience = 1;
                emitter.attributes.player.starter = animal.name;
                emitter.attributes.player.animals[animal.name] = animal;
                emitter.attributes.player.starterCandidate = {};
                emitter.attributes.player.starters = [];
                emitter.attributes.isReturningUser = true;
                transitions.startTutorial(emitter);
            }
            else {
                console.log("Did not get starter animal ");
            }
        });
    },
    "AMAZON.NoIntent": function () {
        this.emitWithState("LaunchRequest");
    },

    "AMAZON.HelpIntent": function () {
        var speechOutput, reprompt;
        var starters = this.attributes.player.starters;
        this.attributes.player.describedStarters = true;
        speechOutput = messages.chooseStarter.buildHelp(starters) + messages.chooseStarter.helpPrompt;
        reprompt = messages.chooseStarter.helpPrompt;
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
        this.emitWithState("ChooseAnimalIntent");
    }
});

module.exports = chooseStarterHandler;