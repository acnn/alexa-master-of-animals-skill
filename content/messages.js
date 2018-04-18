const flags = require("../common/flags");
var messages = {
    skillName: "Master Of Animals",
    entry: {
        help: "Master Of Animals is inspired by the famous pokemon games. The objective of the game is to capture and train animals to become the greatest master ever. ",
        helpPromptForNew: "Are you ready to start your journey to become the greatest master ever? ",
        helpPromptForReturning: "Looks like you have already played this game on your echo. Would you like to continue from where you left off? ",
        outro: "Please come back when you are ready. "
    },

    newGame: {
        intro: "Welcome to Master Of Animals. Capture wild animals, train them, and battle others, to become the greatest master ever. ",
        introPrompt: "Are you ready to start your journey? ",
        help: "Master Of Animals is inspired by the famous pokemon games. The objective of the game is to capture and train animals to become the greatest master ever. ",
        helpPrompt: "Are you ready to start your journey? ",
        outro: "Please come back when you are ready. "
    },

    renewGame: {
        intro: "Do you want to lose your progress and start a new game? ",
        introPrompt: "If you want to start a new game, say Yes. If you want to continue from where you left off, say No, and launch the skill again. ",
        help: "Looks like you have already played this game on your echo. If you want to lose all the progress you have made so far and start a new game, say Yes. If you want to continue from where you left off, say No, and launch the skill again. ",
        helpPrompt: "Do you want to lose your progress and start a new game? ",
        outro: "Launch the skill again to continue your journey. "
    },

    exitGame: {
        exit: "We keep adding new animals to the game. Come back soon to check it out. "
    },

    renewGameConfirm: {
        intro: "You will lose all the progress you have made so far and have to start all over again. ",
        introPrompt: "Are you sure you want to start a new game? ",
        help: "Looks like you have already played this game on your echo. If you are okay with losing all the progress you have made so far and start a new game, say Yes. If you want to continue from where you left off, say No, and launch the skill again. ",
        helpPrompt: "Are you sure you want to start a new game? ",
        outro: "Launch the skill again to continue your journey. "
    },

    chooseStarter: {
        intro: "<say-as interpret-as='interjection'>Awesome. </say-as> Let's get started. To become a master, you will first need an animal. ",
        introPrompt: "Say the name of the animal you want to choose, or, Say help me, to know more about each animal. ",
        helpPrompt: "Say the name of the animal you want to choose. ",
        choiceConfirmPrompt: "Say yes to confirm your choice. ",
        choiceNotFound: "Sorry. I did not catch that. You have the say one of the following names, ",
        choiceNotFoundPrompt: "Say the name of the animal you want to choose. ",
        buildChoices: function (starterAnimals, giveIntro) {
            var choiceIntro = "You have the following animals in your area, ";
            var choices = [];
            for (var i = 0; i < starterAnimals.length; i++) {
                if (i == starterAnimals.length - 1 && i > 0)
                    choices.push("<s> and <prosody volume='x-loud'>" + starterAnimals[i].name + "</prosody></s>");
                else
                    choices.push("<s><prosody volume='x-loud'>" + starterAnimals[i].name + "</prosody></s>");
            }
            if (giveIntro)
                return choiceIntro + choices.toString();
            else
                return choices;
        },
        buildChoiceConfirmation: function (choice) {
            return "Would you like to choose " + choice + " as your first animal? "
        },
        buildShortDescription: function (animal) {
            if (flags.CATCHING_ENABLED)
                return animal.name + ", a " + animal.type + " type animal. ";
            else
                return animal.name;
        },
        buildDescription: function (animal) {
            if (flags.CATCHING_ENABLED)
                return animal.name + " is a " + animal.type + " type animal. " + animal.description;
            else
                return animal.description;
        },
        buildHelp: function (starterAnimals) {
            var descriptions = [];
            for (var i = 0; i < starterAnimals.length; i++) {
                if (i == starterAnimals.length - 1 && i > 0)
                    descriptions.push("<s>" + this.buildDescription(starterAnimals[i]) + "</s>");
                else
                    descriptions.push("<s>" + this.buildDescription(starterAnimals[i]) + "</s>");
            }
            return descriptions.toString();
        }
    },

    tutorial: {
        getStarterCompliment: function (starter) {
            return "Your " + starter.name + " looks good. ";
        },
        intro: "But it needs to be trained well to become the best and the best way to train is to battle other animals. ",
        outro: "Please come back when you are ready. ",
        //introPrompt: "Say help me, to know more about your animal's moves and type, or Say yes, to fight your first battle. ",
        introPrompt: "Are you ready to fight your first battle? ",
        helpTypes: "Each animal has a type. The strengths and weaknesses of a animal are based on its type. Commonly you can find 3 types, Terrestrial, Aquatic, and Flying. ",
        helpTypesPrompt: "Say help me, to learn about moves again, or say yes, to fight your first battle. ",
        helpMoves: "The moves that a animal can do is based on its type and level. Each move causes different amounts of damage. ",
        //helpMovesPrompt: "Say help me, to learn about types , or say yes, to fight your first battle. ",        
        helpMovesPrompt: "Say yes, to fight your first battle. ",
        getTypeTutorial: function (starter) {
            var type = starter.type;
            var name = starter.name;
            var intro = "Your " + name + " is a " + type + " animal. ";
            var typeBasedSW = "";
            switch (type) {
                case "terrestrial": {
                    typeBasedSW = type + " type animals are strong against aquatic but weak against flying. ";
                    break;
                }
                case "aquatic": {
                    typeBasedSW = type + " type animals are strong against flying but weak against terrestrial. ";
                    break;
                }
                case "flying": {
                    typeBasedSW = type + " type animals are strong against terrestrial but weak against aquatic. ";
                    break;
                }
            }
            return intro + typeBasedSW;
        },
        getMovesTutorial: function (starter) {
            var name = starter.name;
            var moves = starter.moves;
            var response = "Your " + name + " can do ";
            var movesList = [];
            for (var i = 0; i < moves.length; i++) {
                if (i == moves.length - 1 && i > 0) {
                    movesList.push("<s> and  <prosody volume='x-loud'>" + moves[i].name + "</prosody></s>");
                }
                else {
                    movesList.push("<s><prosody volume='x-loud'>" + moves[i].name + "</prosody></s>");
                }
            }
            response += movesList.toString();
            response += "A good master will remember their animal's moves! ";
            return response;
        }

    },

    tutorialBattle: {
        intro: "Welcome to your first battle. You should tell the move, that your animal should use each turn. ",
        getOpponentAnnouncement: function (opponent) {
            if (flags.CATCHING_ENABLED)
                return "You will be fighting " + opponent.name + ", a " + opponent.type + " type animal. ";
            else
                return "You will be fighting a " + opponent.name + ". ";
        },
        introPrompt: "Say help me, if you want to know your animal's moves again. Or say a move name, to begin the battle. ",
        getMovesList: function (animal) {
            var name = animal.name;
            var moves = animal.moves;
            var movesList = [];
            for (var i = 0; i < moves.length; i++) {
                if (i == moves.length - 1 && i > 0) {
                    movesList.push("<s> and <prosody volume='x-loud'>" + moves[i].name + "</prosody></s>");
                }
                else {
                    movesList.push("<s><prosody volume='x-loud'>" + moves[i].name + "</prosody></s>");
                }
            }
            var response = "Available moves for your " + name + " are " + movesList.toString();
            return response;
        },
        helpPrompt: "Say the move name you want to use. ",
        battle: "What's your next move? ",
        battlePrompt: "Say help me, if you want to know your animal's moves. Or say the move name, you want to use. ",
        battleVictory: "Congratulations! You have won your first battle. You need to keep battling to level up and evolve your animal. ",
        battleFuturePrompt: "Say explore, to battle more animals. Or say stop, to save and exit the game. ",
        getBattleDamage: function (attacker, defender, attack, firstMove) {
            var response;
            if (firstMove)
                response = "<s>" + attacker.name + " attacked first with a " + attack.name + " causing " + attack.totalEffect + " damage</s>";
            else
                response = "<s>" + attacker.name + " used " + attack.name + " causing " + attack.totalEffect + " damage</s>";
            return response;
        },
        getGameOver: function (attacker, defender, attack) {
            var gameOver = ["Game over. ", "That's the end of it. "];
            var loser = [" is out. ", " has given up. ", " has fainted. "];
            response = "<p>" + gameOver[Math.floor(Math.random() * gameOver.length)] + "</p><p>" + defender.name + loser[Math.floor(Math.random() * loser.length)] + "</p>";
            return response;
        }
    },

    wildBattle: {
        introPrompt: "<s>Say help me, to know your moves and about your opponent. Or say a move name, to start battling. </s>",
        invalidMove: "Sorry I didn't catch that. ",
        noWilds: "Sorry. There are no wild animals available in your area now. Please come back later. ",
        nextBattlePrompt: "<s>Say explore, to battle more animals. Or say stop, to save and exit the game. </s>",
        helpPromptAfterMove: "Say help me, to know about your opponent. Or Say the move name, you want to use. ",
        helpPromptAfterDesc: "Say help me, to know your moves again. Or Say the move name, you want to use. ",
        buildDescription: function (animal) {
            if (flags.CATCHING_ENABLED)
                return animal.shortName + " is a " + animal.type + " type animal. " + "It has " + animal.stats.energy + " energy. " + animal.description;
            else
                return animal.shortName + " has " + animal.stats.energy + " energy. " + animal.description;
        },
        getWildAlert: function (wildAnimal) {
            var introSound = "";
            if (wildAnimal.sounds && wildAnimal.sounds.length > 0) {
                introSound = wildAnimal.sounds[Math.floor(Math.random() * wildAnimal.sounds.length)];
            }
            return introSound + "<prosody volume='x-loud'><s>A wild " + wildAnimal.name + " appeared.</s></prosody>";
        },
        getMovesList: function (animal) {
            var name = animal.name;
            var moves = animal.moves;
            var movesList = [];
            for (var i = 0; i < moves.length; i++) {
                if (i == moves.length - 1 && i > 0) {
                    movesList.push("<s> and <prosody volume='x-loud'>" + moves[i].name + "</prosody></s>");
                }
                else {
                    movesList.push("<s><prosody volume='x-loud'>" + moves[i].name + "</prosody></s>");
                }
            }
            var response = name + " has " + animal.stats.energy + " energy. Your available moves are " + movesList.toString();
            return response;
        },
        getIntro: function (wildAnimal, region) {
            var ambience = require("./ambience");
            var ambientMessage, ambientSound;
            if (wildAnimal.ambience) {
                if (wildAnimal.ambience.profiles && wildAnimal.ambience.profiles.length > 0) {
                    var chosenAmbienceProfile = wildAnimal.ambience.profiles[Math.floor(Math.random() * wildAnimal.ambience.profiles.length)];
                    var introAmbience = ambience[chosenAmbienceProfile];
                    if (introAmbience) {
                        if (introAmbience.messages && introAmbience.messages.length > 0)
                            ambientMessage = introAmbience.messages[Math.floor(Math.random() * introAmbience.messages.length)];
                        if (introAmbience.sounds && introAmbience.sounds.length > 0)
                            ambientSound = introAmbience.sounds[Math.floor(Math.random() * introAmbience.sounds.length)];
                        if (introAmbience.isMessageFirst) {
                            var switchOrder = ambientMessage;
                            ambientMessage = ambientSound;
                            ambientSound = switchOrder;
                        }
                    }

                }
                else if (wildAnimal.ambience.custom) {
                    var introAmbience = wildAnimal.ambience.custom[Math.floor(Math.random() * wildAnimal.ambience.custom.length)];
                    if (introAmbience) {
                        if (introAmbience.message)
                            ambientMessage = introAmbience.message;
                        if (introAmbience.sound)
                            ambientSound = introAmbience.sound;
                    }
                }
            }
            ambientMessage = ambientMessage != undefined ? ambientMessage : "";
            ambientSound = ambientSound != undefined ? ambientSound : "";
            return ambientSound + ambientMessage + "<break strength='x-strong'/>" + this.getWildAlert(wildAnimal);
        },
        askForNextMove: function () {
            return "What's your next move? "
        },
        getGameOver: function (attackerName, defenderName) {
            var gameOver = ["Game over. ", "That's the end of it. "];
            var loser = [" is out. ", " has given up. ", " has fainted. "];
            response = "<p>" + gameOver[Math.floor(Math.random() * gameOver.length)] + "</p><p>" + defenderName + loser[Math.floor(Math.random() * loser.length)] + "</p>";
            return response;
        },
        getPlayerAttackSummary: function (outcome) {
            var response = "";
            if (!outcome.isPlayerAccurate)
                response += "<s>" + outcome.playerName + " tried " + outcome.playerMove + ", but missed</s>";
            else if (outcome.opponentEvaded)
                response += "<s>" + outcome.playerName + " tried " + outcome.playerMove + ", but " + outcome.opponentName + " evaded the attack</s>";
            else if (outcome.playerAttackedFirst)
                response += "<s>" + outcome.playerName + " attacked first with a " + outcome.playerMove + " causing " + outcome.damageToOpponent + "damage</s>";
            else
                response += "<s>" + outcome.playerName + " used " + outcome.playerMove + " causing " + outcome.damageToOpponent + "damage</s>";
            return response;
        },
        getOpponentAttackSummary: function (outcome) {
            var response = "";
            if (!outcome.isOpponentAccurate)
                response += "<s>" + outcome.opponentName + " tried " + outcome.opponentMove + ", but missed</s>";
            else if (outcome.playerEvaded)
                response += "<s>" + outcome.opponentName + " tried " + outcome.playerMove + ", but " + outcome.playerName + " evaded the attack</s>";
            else if (outcome.playerAttackedFirst)
                response += "<s>" + outcome.opponentName + " used " + outcome.opponentMove + " causing " + outcome.damageToPlayer + " damage</s>";
            else
                response += "<s>" + outcome.opponentName + " attacked first with a  " + outcome.opponentMove + " causing " + outcome.damageToPlayer + " damage</s>";
            return response;
        },
        getEnergySummary: function (outcome) {
            return "<s>" + outcome.playerName + " has " + outcome.playerAnimal.stats.energy + " energy left and " + outcome.opponentName + " has " + outcome.opponentAnimal.stats.energy + " energy left. </s>";
        },
        getTurnSummary: function (outcome) {
            var response = "";
            if (outcome.playerAttackedFirst) {
                response += this.getPlayerAttackSummary(outcome);
                response += this.getOpponentAttackSummary(outcome);
            }
            else {
                response += this.getOpponentAttackSummary(outcome);
                response += this.getPlayerAttackSummary(outcome);
            }
            response += this.getEnergySummary(outcome);
            return response;
        },
        getWinSummary: function (outcome) {
            var lvlUpShouts = ["<say-as interpret-as='interjection'>hurray. </say-as>"];
            var response = this.getPlayerAttackSummary(outcome);
            response += this.getGameOver(outcome.playerName, outcome.opponentName);
            if (outcome.isEvolution) {
                response += "<s>Wait.</s><s>There is something happening.</s><break time='1s'/><say-as interpret-as='interjection'>Wow. </say-as>" + outcome.evolution.from.name + " has evolved into " + outcome.evolution.to.name + ". ";
                response += outcome.evolution.to.name + " can do the moves ";
                for (var i = 0; i < outcome.evolution.to.moves.length; i++) {
                    if (i == outcome.evolution.to.moves.length - 1) {
                        response += "and " + outcome.evolution.to.moves[i].name + ". ";
                    }
                    else {
                        response += outcome.evolution.to.moves[i].name + ", ";
                    }
                }
            }
            else {
                if (outcome.isLevelUp) {
                    response += lvlUpShouts[Math.floor(Math.random() * lvlUpShouts.length)] + outcome.playerName + " has leveled up to " + outcome.playerAnimal.level + ". ";
                    if (outcome.playerAnimal.evolution.india) {
                        response += outcome.playerName + " will evolve when it reaches level " + outcome.playerAnimal.evolution.india.level + ". ";
                    }
                }
            }
            return response;
        },
        getLossSummary: function (outcome) {
            var response = this.getOpponentAttackSummary(outcome);
            response += this.getGameOver(outcome.opponentName, outcome.playerName) + "You have lost. ";
            return response;
        }

    },

    continueGame: {
        intro: "Welcome back. ",
        introPrompt: "Are you ready to continue your journey? ",
        help: "Master Of Animals is inspired by the famous pokemon games. The objective of the game is to capture and train animals to become the greatest master ever. ",
        helpPrompt: "Are you ready to continue your journey?  ",
    }
};

module.exports = messages;