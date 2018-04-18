var natures = {
    violent: {
        levelUp: {
            attack: 3,
            defence: 0,
            speed: 1,
            energy: 3,
            accuracy: 0,
            evasiveness: 0
        },
        evolution: {
            attack: 7,
            defence: 3,
            speed: 1,
            energy: 5,
            accuracy: 1,
            evasiveness: 0
        }
    },
    aggressive: {
        levelUp: {
            attack: 2,
            defence: 1,
            speed: 1,
            energy: 4,
            accuracy: 1,
            evasiveness: 0
        },
        evolution: {
            attack: 5,
            defence: 2,
            speed: 2,
            energy: 4,
            accuracy: 1,
            evasiveness: 1
        }
    },
    defensive: {
        levelUp: {
            attack: 1,
            defence: 1,
            speed: 0,
            energy: 5,
            accuracy: 2,
            evasiveness: 0
        },
        evolution: {
            attack: 2,
            defence: 7,
            speed: 2,
            energy: 7,
            accuracy: 2,
            evasiveness: 1
        }
    },
    gentle: {
        levelUp: {
            attack: 1,
            defence: 2,
            speed: 0,
            energy: 5,
            accuracy: 2,
            evasiveness: 0
        },
        evolution: {
            attack: 1,
            defence: 7,
            speed: 0,
            energy: 8,
            accuracy: 3,
            evasiveness: 0
        }
    },
    neutral: {
        levelUp: {
            attack: 1,
            defence: 1,
            speed: 1,
            energy: 5,
            accuracy: 1,
            evasiveness: 0.5
        },
        evolution: {
            attack: 4,
            defence: 4,
            speed: 2,
            energy: 6,
            accuracy: 2,
            evasiveness: 1
        }
    },
    weak: {
        levelUp: {
            attack: 1,
            defence: 1,
            speed: 1,
            energy: 4,
            accuracy: 1,
            evasiveness: 0
        },
        evolution: {
            attack: 3,
            defence: 3,
            speed: 1,
            energy: 5,
            accuracy: 1,
            evasiveness: 1
        }
    },
    agile: {
        levelUp: {
            attack: 1,
            defence: 1,
            speed: 2,
            energy: 5,
            accuracy: 1,
            evasiveness: 1
        },
        evolution: {
            attack: 4,
            defence: 4,
            speed: 4,
            energy: 6,
            accuracy: 1,
            evasiveness: 1
        }
    },
    accurate: {
        levelUp: {
            attack: 1,
            defence: 1,
            speed: 1,
            energy: 5,
            accuracy: 2,
            evasiveness: 0
        },
        evolution: {
            attack: 4,
            defence: 4,
            speed: 1,
            energy: 6,
            accuracy: 3,
            evasiveness: 1
        }
    },
    evasive: {
        levelUp: {
            attack: 1,
            defence: 1,
            speed: 2,
            energy: 5,
            accuracy: 1,
            evasiveness: 1
        },
        evolution: {
            attack: 4,
            defence: 3,
            speed: 2,
            energy: 6,
            accuracy: 2,
            evasiveness: 2
        }
    }

};

module.exports = natures;
