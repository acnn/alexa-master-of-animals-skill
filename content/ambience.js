var ambience = {
    rain: {
        messages: [
            "You are getting drenched by the rains in Cherrapunji, ",
            "You are getting drenched by the rains in Mahabaleshwar, ",
            "You have taken shelter under a tree due to the rains, ",
        ],
        sounds: [
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_thunder_rumble_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_thunder_rumble_02.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_rain_01.mp3'/><audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_thunder_rumble_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_rain_01.mp3'/><audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_thunder_rumble_02.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_rain_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_rain_02.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_rain_03.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_lightning_strike_01.mp3'/><audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_rain_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_lightning_strike_01.mp3'/><audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_rain_01.mp3'/>"
        ]
    },

    city: {
        messages: [
            "You are walking in the busy roads of Mumbai, ",
            "You are walking in the busy roads of Delhi, ",
            "You are walking in the busy roads of Pune, ",
            "You are walking in the busy roads of Bengaluru, ",
            "You are walking in the busy roads of Hyderabad, ",
            "You are walking in the busy roads of Chennai, ",
            "You are walking in the busy roads of Jodhpur, ",
            "You are walking in the busy roads of Thirupathi, ",
            "You are walking in the busy roads of Kolkata, ",
            "You are walking in the busy roads of Kochi, "
        ],
        sounds: [
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/transportation/amzn_sfx_bus_drive_past_01.mp3'/>"
        ]
    },

    forest: {
        messages: [
            "You are passing through the forests of Western Ghats, ",
            "You are passing through the forests of Bandipur, ",
            "You are passing through the forests of Eastern Ghats, ",
            "You are passing through the forests of Vandalur, ",
            "You are passing through the forests of Kaziranga, ",
            "You are passing through the forests of Parambikulam, ",
            "You are passing through the forests of Udaipur, ",
            "You are passing through the forests of Mudumalai, ",
            "You are passing through the forests of Radhanagari, "
        ],
        sounds: [
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_bird_forest_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_bird_forest_02.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_bird_forest_short_01.mp3'/>"
        ]
    },

    grass: {
        messages: [],
        sounds: [
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/human/amzn_sfx_walking_on_grass_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/human/amzn_sfx_walking_on_grass_02.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/human/amzn_sfx_walking_on_grass_03.mp3'/>"
        ]
    },

    mud: {
        messages: [
            "You are trudging through the mangrove forests of Sundarbans, ",
            "You are trudging through the mangrove forests of Pichavaram, ",
            "You are trudging through the mangrove forests of Andaman, "
        ],
        sounds: [
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/human/amzn_sfx_walking_in_mud_01.mp3'/>"
        ]
    },

    boat: {
        messages: [],
        sounds: [
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_oars_splashing_rowboat_01.mp3'/>"
        ]
    },

    water: {
        messages: [
            "You are strolling along the beautiful bank of river ganga, ",
            "You are paddling slowly in the cauvery river, ",
            "You are crossing a bridge over the tumultuous brahmaputra river, ",
            "You are rowing to cross the mahanadi river, "
        ],
        sounds: [
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_stream_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_stream_02.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_stream_03.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_small_stream_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_small_stream_02.mp3'/>"
        ]
    },

    desert: {
        messages: [],
        sounds: [
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_wind_whistling_desert_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_strong_wind_desert_01.mp3'/>"
        ]
    },

    windy: {
        messages: [],
        sounds: [
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_strong_wind_whistling_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_strong_wind_whistling_02.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/nature/amzn_sfx_strong_wind_whistling_03.mp3'/>"
        ]
    },

    ride: {
        messages: [],
        sounds: [
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_horse_gallop_4x_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_horse_gallop_4x_02.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_horse_gallop_4x_03.mp3'/>"
        ]
    },

    heavyantelope: {
        isMessageFirst: true,
        messages: [
            "You are following the trail left by a big animal, "
        ],
        sounds: [
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_sheep_baa_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_sheep_bleat_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_sheep_bleat_02.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_sheep_bleat_03.mp3'/>"

        ]
    },

    cat: {
        isMessageFirst: true,
        messages: [],
        sounds: [
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_cat_meow_1x_01.mp3'/>"
        ]
    },

    bigcat: {
        isMessageFirst: true,
        messages: [
            "You are following the foot prints of a big cat, "
        ],
        sounds: [
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_cat_purr_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_cat_purr_03.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_lion_roar_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_lion_roar_02.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_lion_roar_03.mp3'/>"
        ]
    },

    bigbird: {
        isMessageFirst: true,
        messages: [
            "You are searching the skies for signs of a big bird, "
        ],
        sounds: [
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/foley/amzn_sfx_wings_flap_4x_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/foley/amzn_sfx_wings_flap_fast_01.mp3'/>"
        ]
    },

    rooster: {
        isMessageFirst: true,
        messages: [],
        sounds: [
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_rooster_crow_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_rooster_crow_02.mp3'/>"
        ]
    },

    dog: {
        isMessageFirst: true,
        messages: [],
        sounds: [
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_dog_med_bark_growl_01.mp3'/>"
        ]
    },

    wolf: {
        isMessageFirst: true,
        messages: [
            "You are following the trail left by a wolf pack, "
        ],
        sounds: [
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_wolf_howl_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_wolf_howl_02.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_wolf_howl_03.mp3'/>",
        ]
    },

    elephant: {
        isMessageFirst: true,
        messages: [
            "You are tracking down a elephant herd with their big foot prints, "
        ],
        sounds: [
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_elephant_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_elephant_02.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_elephant_03.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_elephant_04.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_elephant_05.mp3'/>"
        ]
    },

    monkey: {
        isMessageFirst: true,
        messages: [
            "You are making your way through the thick evergreen forests of Western Ghats, "
        ],
        sounds: [
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_monkey_calls_3x_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_monkey_chimp_01.mp3'/>",
            "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_monkeys_chatter_01.mp3'/>",
        ]
    }

};

module.exports = ambience;