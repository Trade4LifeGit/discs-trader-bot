import {CANCEL_BUTTON_TEXT, PSN_PLATFORM} from "../../../constants/constants";
import {cancelMenu, mainMenu} from "../../../keyboard/keyboard";
import {COST_VALIDATION_ERROR_MESSAGE, ERROR_PLACING_OFFER, SELL_GAME_COST, SELL_GAME_TEXT} from "../constants/constants";
import WizardScene from 'telegraf/scenes/wizard';
import {placeOffer} from "../utils/placeOffer";

export const sellGameFromExploreScene = new WizardScene('sellGameFromExploreScene',
    (ctx) => {
        ctx.reply(SELL_GAME_COST, cancelMenu);
        return ctx.wizard.next();
    },
    (ctx) => {

        let gameName = ctx.scene.state.gameName;
        let gameId = ctx.scene.state.gameId;
        let gameCost = ctx.message.text;

        if (!isNaN(+gameCost.trim().replace(",", "."))){

            placeOffer(PSN_PLATFORM, gameId, ctx.message.from.username, gameCost)
                .catch(() => {
                    ctx.reply(ERROR_PLACING_OFFER);
                })
                .then(() => {
                    ctx.reply(SELL_GAME_TEXT(gameName, gameCost), mainMenu);
                })
        } else if (gameCost === CANCEL_BUTTON_TEXT){
            ctx.reply('Canceled', mainMenu);
            return ctx.scene.leave();
        } else {
            ctx.reply(COST_VALIDATION_ERROR_MESSAGE);
            return;
        }
        return ctx.scene.leave();
    });