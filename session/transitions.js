var states = require("./states");
var transitions = {
    moveTo: function (alexaObj, state, intent) {
        alexaObj.handler.state = state;
        alexaObj.emitWithState(intent);
    },

    clearState: function (alexaObj) {
        if (alexaObj.attributes.isReturningUser)
            alexaObj.handler.state = states.CONTINUE_GAME;
        else
            alexaObj.handler.state = states.NEW_GAME;
        alexaObj.emit(":saveState", true);
    },

    launchNewGame: function (alexaObj) {
        this.moveTo(alexaObj, states.NEW_GAME, "LaunchRequest");
    },

    continueGame: function (alexaObj) {
        this.moveTo(alexaObj, states.CONTINUE_GAME, "LaunchRequest");
    },

    renewGame: function (alexaObj) {
        this.moveTo(alexaObj, states.RENEW_GAME, "LaunchRequest");
    },

    confirmRenewGame: function (alexaObj) {
        this.moveTo(alexaObj, states.CONFIRM_RENEW_GAME, "LaunchRequest");
    },

    chooseStarter: function (alexaObj) {
        this.moveTo(alexaObj, states.CHOOSE_STARTER, "LaunchRequest");
    },

    startTutorial: function (alexaObj) {
        this.moveTo(alexaObj, states.TUTORIAL, "LaunchRequest");
    },
    startTutorialBattle: function (alexaObj) {
        this.moveTo(alexaObj, states.TUTORIAL_BATTLE, "LaunchRequest");
    },
    startWildBattle: function (alexaObj) {
        this.moveTo(alexaObj, states.WILD_BATTLE, "WildBattleIntent");
    }

}

module.exports = transitions;