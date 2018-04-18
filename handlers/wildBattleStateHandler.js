const Alexa = require("alexa-sdk");
const states = require("../session/states");
const transitions = require("../session/transitions");
const messages = require("../content/messages");
const battleAI = require("../battle/battleAI");
const dao = require("../data/dao");

const wildBattleHandler = Alexa.CreateStateHandler(states.WILD_BATTLE, {

    "LaunchRequest": function () {
        transitions.startWildBattle(this);
    },

    "WildBattleIntent": function () {
        var speechOutput, reprompt;
        var playerAnimal = this.attributes.player.animals[this.attributes.player.starter];
        var region = this.attributes.player.region;
        var emitter = this;
        var wildThresholdLvlRange = battleAI.getWildAnimalLevelRange(playerAnimal);
        var data = {
            levelThreshold: wildThresholdLvlRange,
            region: region
        }
        dao.getRandomWildAnimals(data, function (wildAnimals) {
            if (wildAnimals && wildAnimals.length > 0) {
                var chosenOpponent = battleAI.chooseOpponent(wildAnimals, playerAnimal);
                chosenOpponent.level = battleAI.getOpponentLevel(chosenOpponent, playerAnimal);
                emitter.attributes.player.duel = {};
                emitter.attributes.player.duel.isDueling = true;
                emitter.attributes.player.duel.type = "wild";
                emitter.attributes.player.duel.opponent = chosenOpponent;
                emitter.attributes.player.duel.playerAnimal = playerAnimal;
                speechOutput = messages.wildBattle.getIntro(chosenOpponent, region) + messages.wildBattle.introPrompt;
                reprompt = messages.wildBattle.introPrompt;
                emitter.response.speak(speechOutput).listen(reprompt);
            }
            else {
                speechOutput = messages.wildBattle.noWilds;
                transitions.clearState(this);            
                emitter.response.speak(speechOutput);                
            }
            emitter.emit(":responseReady");
        });
    },

    "BattleMovesIntent": function () {
        var speechOutput = "", reprompt = "";
        var emitter = this;
        if (this.attributes.player.duel.isDueling) {
            var playerAnimal = this.attributes.player.duel.playerAnimal;
            var opponent = this.attributes.player.duel.opponent;
            var candidateMove = this.event.request.intent.slots.move != null ? this.event.request.intent.slots.move.value : "";
            var chosenMove;
            for (var i = 0; i < playerAnimal.moves.length; i++) {
                if (playerAnimal.moves[i].name.toLowerCase() == candidateMove.toLowerCase()) {
                    chosenMove = playerAnimal.moves[i];
                    break;
                }
            }
            if (chosenMove) {
                var turnOutcome = battleAI.getTurnOutcome(playerAnimal, chosenMove, opponent);
                if (turnOutcome.isDuelOver) {
                    this.attributes.player.duel = {};
                    if (turnOutcome.isPlayerAlive) {
                        this.attributes.player.wins = this.attributes.player.wins != null ? this.attributes.player.wins + 1 : 1;
                        var experienceGained = battleAI.getExperienceFromBattle(opponent);
                        playerAnimal.experience += experienceGained;
                        this.attributes.player.animals[playerAnimal.name].experience += experienceGained;
                        var isLevelUp = battleAI.isReadyToLevelUp(playerAnimal);
                        if (isLevelUp) {
                            turnOutcome.isLevelUp = true;
                            playerAnimal.level += 1;
                            battleAI.levelUpAnimal(this.attributes.player.animals[playerAnimal.name]);
                            var isEvolving = battleAI.isReadyToEvolve(playerAnimal, this.attributes.player.region);
                            if (isEvolving) {
                                turnOutcome.isEvolution = true;
                                var currentLevel = playerAnimal.level;
                                var availableEvolutions = playerAnimal.evolution[this.attributes.player.region].names;
                                var chosenEvolution = availableEvolutions[Math.floor(Math.random() * availableEvolutions.length)];
                                console.log("Chisen evolve : " + JSON.stringify(chosenEvolution));
                                dao.getAnimal({ name: chosenEvolution }, function (evolution) {
                                    console.log("Inside evolve : " + JSON.stringify(evolution));
                                    if (evolution) {
                                        console.log("Got evolve : " + JSON.stringify(evolution));
                                        evolution.level = currentLevel;
                                        battleAI.evolveAnimal(playerAnimal, evolution);
                                        emitter.attributes.player.starter = evolution.name;
                                        emitter.attributes.player.animals[evolution.name] = evolution;

                                        turnOutcome.evolution = {
                                            from: playerAnimal,
                                            to: evolution
                                        };
                                    }

                                    speechOutput = messages.wildBattle.getWinSummary(turnOutcome) + messages.wildBattle.nextBattlePrompt;
                                    reprompt = messages.wildBattle.nextBattlePrompt;
                                    emitter.response.speak(speechOutput).listen(reprompt);
                                    emitter.emit(":responseReady");
                                });
                            }
                            else {
                                speechOutput = messages.wildBattle.getWinSummary(turnOutcome) + messages.wildBattle.nextBattlePrompt;
                                reprompt = messages.wildBattle.nextBattlePrompt;
                                emitter.response.speak(speechOutput).listen(reprompt);
                                emitter.emit(":responseReady");
                            }
                        }
                        else {
                            speechOutput = messages.wildBattle.getWinSummary(turnOutcome) + messages.wildBattle.nextBattlePrompt;
                            reprompt = messages.wildBattle.nextBattlePrompt;
                            emitter.response.speak(speechOutput).listen(reprompt);
                            emitter.emit(":responseReady");
                        }
                    }
                    else {
                        this.attributes.player.losses = this.attributes.player.losses != null ? this.attributes.player.losses + 1 : 1;
                        speechOutput = messages.wildBattle.getLossSummary(turnOutcome) + messages.wildBattle.nextBattlePrompt;
                        reprompt = messages.wildBattle.nextBattlePrompt;
                        this.response.speak(speechOutput).listen(reprompt);
                        this.emit(":responseReady");
                    }
                }
                else {
                    //this.attributes.player.duel.playerAnimal.stats.energy -= turnOutcome.damageToPlayer;
                    //this.attributes.player.duel.opponent.stats.energy -= turnOutcome.damageToOpponent;
                    speechOutput = messages.wildBattle.getTurnSummary(turnOutcome) + messages.wildBattle.askForNextMove();
                    reprompt = messages.wildBattle.askForNextMove();
                    this.response.speak(speechOutput).listen(reprompt);
                    this.emit(":responseReady");
                }
            }
            else {
                speechOutput = messages.wildBattle.invalidMove + messages.wildBattle.introPrompt;
                reprompt = messages.wildBattle.introPrompt;
                this.response.speak(speechOutput).listen(reprompt);
                this.emit(":responseReady");
            }
        }
        else {
            speechOutput = messages.wildBattle.nextBattlePrompt;
            reprompt = messages.wildBattle.nextBattlePrompt;
            this.response.speak(speechOutput).listen(reprompt);
            this.emit(":responseReady");
        }

    },

    "AMAZON.HelpIntent": function () {
        var speechOutput, reprompt;
        var playerAnimal = this.attributes.player.duel.playerAnimal;
        var opponent = this.attributes.player.duel.opponent;
        if (this.attributes.player.descHelp) {
            this.attributes.player.descHelp = false;
            speechOutput = messages.wildBattle.buildDescription(opponent) + messages.wildBattle.helpPromptAfterDesc;
            reprompt = messages.wildBattle.helpPromptAfterDesc;
        }
        else {
            this.attributes.player.descHelp = true;
            speechOutput = messages.wildBattle.getMovesList(playerAnimal) + messages.wildBattle.helpPromptAfterMove;
            reprompt = messages.wildBattle.helpPromptAfterMove;

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
        this.emitWithState("BattleMovesIntent");
    }
});

module.exports = wildBattleHandler;