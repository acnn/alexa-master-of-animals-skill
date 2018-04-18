var utils = require("../common/utils");
var attackMultipliers = require("./attackMultipliers");
var animalNatures = require("./animalNatures");
var battleSystem = {
    expGrowthFactor: 11,

    getAttackMultiplier: function (attackerType, defenderType) {
        //return (attackMultipliers[attackerType])[defenderType];
        //dont apply multiplier until catching is allowed
        return 1;
    },

    getDamage: function (attacker, defender, move) {
        var attack = {};
        attack.name = move.name;
        attack.baseEffect = utils.randomIntFromInterval(move.effect.min, move.effect.max);
        attack.multiplier = this.getAttackMultiplier(attacker.type, defender.type);
        var levelDifference = attacker.level > defender.level ? attacker.level - defender.level : 0;
        attack.totalEffect = Math.ceil((attack.baseEffect * (attacker.stats.attack / defender.stats.defence) + levelDifference) * attack.multiplier);
        return attack;
    },

    getRandomMove: function (attacker) {
        return attacker.moves[Math.floor(Math.random() * attacker.moves.length)];
    },

    getWildAnimalLevelRange: function (playerAnimal) {
        var levelRange = Math.floor(playerAnimal.level / 5) * 5;
        if (Math.random() * 10 < 3)
            levelRange += 0;
        else if (levelRange > 4 && Math.random() > 8)
            levelRange -= 5;
        return levelRange;
    },

    getOpponentLevel: function (opponent, playerAnimal) {
        var level = 1;
        if (opponent.wildThresholdLvl > playerAnimal.level) {
            var probability = utils.randomIntFromInterval(1, 10);
            if (probability == 10)
                level = utils.randomIntFromInterval(opponent.wildThresholdLvl, opponent.wildThresholdLvl + 5);
            else if (probability > 7)
                level = utils.randomIntFromInterval(opponent.wildThresholdLvl, opponent.wildThresholdLvl + 2);
            else
                level = opponent.wildThresholdLvl;
        }
        else {
            var probability = utils.randomIntFromInterval(1, 10);
            if (probability == 10)
                level = utils.randomIntFromInterval(playerAnimal.level + 2, playerAnimal.level + 5);
            else if (probability > 7)
                level = utils.randomIntFromInterval(playerAnimal.level, playerAnimal.level + 2);
            else {
                var opponentMinLevel = playerAnimal.level > 2 ? playerAnimal.level - 2 : 1;
                level = utils.randomIntFromInterval(opponentMinLevel, playerAnimal.level);
            }
        }

        return level;
    },

    chooseOpponent: function (opponents, playerAnimal) {
        var choicePool;
        var rares = [], usuals = [], abudants = [];
        for (var i = 0; i < opponents.length; i++) {
            if (opponents[i].rarity < 20)
                rares.push(opponents[i]);
            else if (opponents[i].rarity > 50)
                abudants.push(opponents[i]);
            else
                usuals.push(opponents[i]);
        }
        var probability = Math.random() * 100;
        if (probability < 20 && rares.length > 0)
            choicePool = rares;
        else if (probability > 50 && abudants.length > 0)
            choicePool = abudants;
        else
            choicePool = usuals;
        var choice = choicePool[Math.floor(Math.random() * choicePool.length)];
        if (choicePool.length > 1) {
            while (choice.name == playerAnimal.name)
                choice = choicePool[Math.floor(Math.random() * choicePool.length)];
        }
        return choice;
    },

    getEvolutionsForLevel: function (level) {
        if (level > 22)
            return 4;
        else if (level > 14)
            return 3;
        else if (level > 7)
            return 2;
        else if (level > 2)
            return 1;
        else
            return 0;
    },

    getNormalizedStats: function (growth, level, evolutions) {
        var stats = {
            energy: 40,
            attack: 40,
            defence: 40,
            speed: 40,
            accuracy: 70,
            evasiveness: 0
        };
        var levelMultiples = level - evolutions;
        stats.energy += Math.ceil(growth.levelUp.energy * levelMultiples + growth.evolution.energy * evolutions);
        stats.attack += Math.ceil(growth.levelUp.attack * levelMultiples + growth.evolution.attack * evolutions);
        stats.defence += Math.ceil(growth.levelUp.defence * levelMultiples + growth.evolution.defence * evolutions);
        stats.speed += Math.ceil(growth.levelUp.speed * levelMultiples + growth.evolution.speed * evolutions);
        stats.accuracy += Math.ceil(growth.levelUp.accuracy * levelMultiples + growth.evolution.accuracy * evolutions);
        stats.evasiveness += Math.ceil(growth.levelUp.evasiveness * levelMultiples + growth.evolution.evasiveness * evolutions);
        return stats;
    },

    setStatsForLevel: function (opponent) {
        console.log("Setting stats for level : " + JSON.stringify(opponent));
        console.log("Before setting : " + JSON.stringify(opponent.stats));
        var statGrowth = animalNatures[opponent.nature];
        console.log("Stat growth : " + JSON.stringify(statGrowth));
        var evolutions = this.getEvolutionsForLevel(opponent.level);
        console.log("Evols : " + JSON.stringify(evolutions));
        var normalizedStats = this.getNormalizedStats(statGrowth, opponent.level, evolutions);
        console.log("Normalized stats : " + JSON.stringify(normalizedStats));
        opponent.stats.energy = opponent.stats.energy > normalizedStats.energy ? opponent.stats.energy : normalizedStats.energy;
        opponent.stats.attack = opponent.stats.attack > normalizedStats.attack ? opponent.stats.attack : normalizedStats.attack;
        opponent.stats.defence = opponent.stats.defence > normalizedStats.defence ? opponent.stats.defence : normalizedStats.defence;
        opponent.stats.speed = opponent.stats.speed > normalizedStats.speed ? opponent.stats.speed : normalizedStats.speed;
        opponent.stats.accuracy = opponent.stats.accuracy > normalizedStats.accuracy ? opponent.stats.accuracy : normalizedStats.accuracy;
        opponent.stats.evasiveness = opponent.stats.evasiveness > normalizedStats.evasiveness ? opponent.stats.evasiveness : normalizedStats.evasiveness;
        console.log("After setting : " + JSON.stringify(opponent.stats));
    },

    playerAttacksOpponent: function (outcome, opponent, playerMoveDamage) {
        outcome.damageToOpponent = playerMoveDamage.totalEffect;
        console.log("Oppo energy : " + opponent.stats.energy);
        console.log("Effect : " + playerMoveDamage.totalEffect);
        opponent.stats.energy -= playerMoveDamage.totalEffect;
        console.log("Oppo energy : " + opponent.stats.energy);
        if (opponent.stats.energy < 0) {
            outcome.isDuelOver = true;
            outcome.isOpponentAlive = false;
        }
    },

    opponentAttacksPlayer: function (outcome, player, opponentMoveDamage) {
        outcome.damageToPlayer = opponentMoveDamage.totalEffect;
        player.stats.energy -= opponentMoveDamage.totalEffect;
        if (player.stats.energy < 0) {
            outcome.isDuelOver = true;
            outcome.isPlayerAlive = false;
        }
    },

    isMoveAccurate: function (animal) {
        var probability = utils.randomIntFromInterval(0, 100);
        console.log("Checking accu for " + animal.name + animal.stats.accuracy + " < " + probability + " ? ");
        if (animal.stats.accuracy < probability)
            return false;
        else
            return true;
    },

    isMoveEvaded: function (animal) {
        var probability = utils.randomIntFromInterval(0, 100);
        if (animal.stats.evasiveness < probability)
            return false;
        else
            return true;
    },

    getTurnOutcome: function (player, playerMove, opponent) {
        var opponentMove = this.getRandomMove(opponent);
        var isPlayerAccurate = this.isMoveAccurate(player);
        var isOpponentAccurate = this.isMoveAccurate(opponent);
        var playerEvaded = this.isMoveEvaded(player);
        var opponentEvaded = this.isMoveEvaded(opponent);
        var outcome = {
            playerAnimal: player,
            opponentAnimal: opponent,
            playerName: player.shortName,
            opponentName: opponent.shortName,
            isDuelOver: false,
            isPlayerAlive: true,
            isOpponentAlive: true,
            isPlayerAccurate: isPlayerAccurate,
            playerEvaded: playerEvaded,
            isOpponentAccurate: isOpponentAccurate,
            opponentEvaded: opponentEvaded,
            playerMove: playerMove.name,
            opponentMove: opponentMove.name,
            damageToPlayer: 0,
            damageToOpponent: 0
        };

        var playerMoveDamage = this.getDamage(player, opponent, playerMove);
        var opponentMoveDamage = this.getDamage(opponent, player, opponentMove);

        outcome.playerAttackedFirst = (Math.floor(Math.random() * player.stats.speed) > Math.floor(Math.random() * opponent.stats.speed)) ? true : false;

        if (outcome.playerAttackedFirst) {
            if (isPlayerAccurate && !opponentEvaded) {
                console.log("player att first");
                this.playerAttacksOpponent(outcome, opponent, playerMoveDamage);
            }
            if (!outcome.isDuelOver && isOpponentAccurate && !playerEvaded) {
                this.opponentAttacksPlayer(outcome, player, opponentMoveDamage);
            }
        }
        else {
            if (isOpponentAccurate && !playerEvaded)
                this.opponentAttacksPlayer(outcome, player, opponentMoveDamage);
            if (!outcome.isDuelOver && isPlayerAccurate && !opponentEvaded) {
                console.log("player att after opp");
                this.playerAttacksOpponent(outcome, opponent, playerMoveDamage);
            }
        }

        return outcome;
    },

    getExperienceForLevel: function (level) {
        return (level * 2) ^ 2;
    },

    getExperienceFromBattle: function (opponent) {
        return utils.randomIntFromInterval(this.expGrowthFactor * opponent.level - 5, this.expGrowthFactor * opponent.level + 5);
    },

    isReadyToLevelUp: function (animal) {
        return (animal.experience) >= this.getExperienceForLevel(animal.level + 1);
    },

    evolveAnimal: function (baseAnimal, evolution) {
        evolution.level = baseAnimal.level;
        evolution.stats.energy = evolution.stats.energy > baseAnimal.stats.energy + animalNatures[baseAnimal.nature].evolution.energy ? evolution.stats.energy : baseAnimal.stats.energy + animalNatures[baseAnimal.nature].evolution.energy;
        evolution.stats.attack = evolution.stats.attack > baseAnimal.stats.attack + animalNatures[baseAnimal.nature].evolution.attack ? evolution.stats.attack : baseAnimal.stats.attack + animalNatures[baseAnimal.nature].evolution.attack;
        evolution.stats.defence = evolution.stats.defence > baseAnimal.stats.defence + animalNatures[baseAnimal.nature].evolution.defence ? evolution.stats.defence : baseAnimal.stats.defence + animalNatures[baseAnimal.nature].evolution.defence;
        evolution.stats.speed = evolution.stats.speed > baseAnimal.stats.speed + animalNatures[baseAnimal.nature].evolution.speed ? evolution.stats.speed : baseAnimal.stats.speed + animalNatures[baseAnimal.nature].evolution.speed;
        evolution.stats.accuracy = evolution.stats.accuracy > baseAnimal.stats.accuracy + animalNatures[baseAnimal.nature].evolution.accuracy ? evolution.stats.accuracy : baseAnimal.stats.accuracy + animalNatures[baseAnimal.nature].evolution.accuracy;
        evolution.stats.evasiveness = evolution.stats.evasiveness > baseAnimal.stats.evasiveness + animalNatures[baseAnimal.nature].evolution.evasiveness ? evolution.stats.evasiveness : baseAnimal.stats.evasiveness + animalNatures[baseAnimal.nature].evolution.evasiveness;
    },

    levelUpAnimal: function (animal) {
        animal.level += 1;
        var vitalStats = ["attack", "defence", "energy"];
        var statsByNature = animalNatures[animal.nature];
        animal.stats.energy += statsByNature.levelUp.energy;
        animal.stats.attack += statsByNature.levelUp.attack;
        animal.stats.defence += statsByNature.levelUp.defence;
        animal.stats.speed += statsByNature.levelUp.speed;
        animal.stats.accuracy += statsByNature.levelUp.accuracy;
        animal.stats.evasiveness += statsByNature.levelUp.evasiveness;
        var luckyStat = vitalStats[Math.floor(Math.random() * vitalStats.length)];
        animal.stats[luckyStat] += utils.randomIntFromInterval(1, 2);
    },

    isReadyToEvolve: function (animal, region) {
        if (animal.evolution[region])
            return animal.level >= animal.evolution[region].level;
        else
            return false;
    }
}

module.exports = battleSystem;