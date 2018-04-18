var attackMultipliers = {
    terrestrial: {
        terrestrial: 1,
        aquatic: 1.5,
        flying: 0.75,
        amphibian: 1,
        prehistoric: 0.5,
        mythical: 0.5
    },
    aquatic: {
        terrestrial: 0.75,
        aquatic: 1,
        flying: 1.5,
        amphibian: 1,
        prehistoric: 0.5,
        mythical: 0.5
    },
    flying: {
        terrestrial: 1.5,
        aquatic: 0.75,
        flying: 1,
        amphibian: 1,
        prehistoric: 0.5,
        mythical: 0.5
    },
    amphibian: {
        terrestrial: 1.25,
        aquatic: 1.25,
        flying: 1.25,
        amphibian: 1,
        prehistoric: 1,
        mythical: 0.5
    },
    prehistoric: {
        terrestrial: 2,
        aquatic: 2,
        flying: 2,
        amphibian: 2,
        prehistoric: 1,
        mythical: 0.5
    },
    mythical: {
        terrestrial: 2,
        aquatic: 2,
        flying: 2,
        amphibian: 2,
        prehistoric: 1.5,
        mythical: 1
    }
};

module.exports = attackMultipliers;