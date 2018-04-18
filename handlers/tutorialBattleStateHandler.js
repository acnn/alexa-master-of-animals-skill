const Alexa = require("alexa-sdk");
const states = require("../session/states");
const transitions = require("../session/transitions");
const messages = require("../content/messages");
const battleAI = require("../battle/battleAI");
const opponents = require("../battle/tutorialOpponents");

const tutorialBattleHandler = Alexa.CreateStateHandler(states.TUTORIAL_BATTLE, {
    "LaunchRequest": function () {
        var speechOutput, reprompt;
        var animal = this.attributes.player.animals[this.attributes.player.starter];
        var opponent = opponents[animal.type];
        this.attributes.opponent = opponent;
        speechOutput = messages.tutorialBattle.intro + messages.tutorialBattle.getMovesList(animal) + messages.tutorialBattle.getOpponentAnnouncement(opponent) + messages.tutorialBattle.introPrompt;
        reprompt = messages.tutorialBattle.introPrompt;
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(":responseReady");
    },

    "BattleMovesIntent": function () {
        var speechOutput, reprompt;
        var animal = this.attributes.player.animals[this.attributes.player.starter];
        var opponent = this.attributes.opponent;
        var move = this.event.request.intent.slots != null ? this.event.request.intent.slots.move : null;
        var movesList = animal.moves;
        var chosenMove;
        for (var i = 0; i < movesList.length; i++) {
            if (move && move.value && movesList[i].name.toLowerCase() == move.value.toLowerCase()) {
                chosenMove = movesList[i];
                break;
            }
        }
        if (chosenMove) {
            console.log("Player using : " + JSON.stringify(chosenMove));
            var opponentMove = battleAI.getRandomMove(opponent);
            console.log("OPponent using : " + JSON.stringify(opponentMove));
            var chosenMoveDamage = battleAI.getDamage(animal, opponent, chosenMove);
            console.log("Player damaging : " + JSON.stringify(chosenMoveDamage));
            this.attributes.opponent.stats.energy = this.attributes.opponent.stats.energy - chosenMoveDamage.totalEffect;
            if (this.attributes.opponent.stats.energy > 0) {
                var opponentMoveDamage = battleAI.getDamage(opponent, animal, opponentMove);
                speechOutput = messages.tutorialBattle.getBattleDamage(animal, opponent, chosenMoveDamage, true) + messages.tutorialBattle.getBattleDamage(opponent, animal, opponentMoveDamage, false) + messages.tutorialBattle.battle;
                reprompt = messages.tutorialBattle.battlePrompt;
            }
            else {
                this.attributes.opponent = {};
                this.handler.state = states.WILD_BATTLE;
                speechOutput = messages.tutorialBattle.getGameOver(animal, opponent, chosenMoveDamage) + messages.tutorialBattle.battleVictory + messages.tutorialBattle.battleFuturePrompt;
                reprompt = messages.tutorialBattle.battleFuturePrompt;
            }
        }
        else {
            speechOutput = messages.wildBattle.invalidMove + messages.wildBattle.introPrompt;
            reprompt = messages.wildBattle.introPrompt;
        }
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(":responseReady");

    },

    "AMAZON.HelpIntent": function () {
        var speechOutput, reprompt;
        var animal = this.attributes.player.animals[this.attributes.player.starter];
        speechOutput = messages.tutorialBattle.getMovesList(animal) + messages.tutorialBattle.helpPrompt;
        reprompt = messages.tutorialBattle.helpPrompt;
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
        this.emitWithState("BattleMovesIntent");
    }
});

module.exports = tutorialBattleHandler;