var config = {
    dynamodb: {
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com",
        tables: {
            starters: "BattleAnimalsStarters",
            animals: "BattleAnimals"
        },
        indexes: {
            randomWildAnimals: "WildAnimalsIndexByLevel"
        }
    }
};

module.exports = config;