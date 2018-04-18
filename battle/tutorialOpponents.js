var opponents = {
    terrestrial: {
        name: "goldfish",
        type: "aquatic",
        description: "goldfish is gold. ",
        level: 1,
        stats: {
            energy: 41,
            attack: 49,
            defence: 25,
            speed: 55
        },
        region: "india",
        moves: [
            {
                name: "splash",
                effect: {
                    type: "damage",
                    min: 1,
                    max: 3
                },
                maxUsage: 10
            }
        ]
    },
    aquatic: {
        name: "sparrow",
        type: "flying",
        description: "sparrow is small. ",
        level: 1,
        stats: {
            energy: 41,
            attack: 49,
            defence: 25,
            speed: 55
        },
        region: "india",
        moves: [
            {
                name: "dive",
                effect: {
                    type: "damage",
                    min: 1,
                    max: 2
                },
                maxUsage: 10
            },
            {
                name: "peck",
                effect: {
                    type: "damage",
                    min: 1,
                    max: 3
                },
                maxUsage: 10
            }
        ]
    },
    flying: {
        name: "earthworm",
        type: "terrestrial",
        description: "earthworm is digging. ",
        level: 1,
        stats: {
            energy: 41,
            attack: 49,
            defence: 25,
            speed: 55
        },
        region: "india",
        moves: [
            {
                name: "dig",
                effect: {
                    type: "damage",
                    min: 1,
                    max: 2
                },
                maxUsage: 10
            },
            {
                name: "head butt",
                effect: {
                    type: "damage",
                    min: 1,
                    max: 2
                },
                maxUsage: 10
            }
        ]
    }

};

module.exports = opponents;