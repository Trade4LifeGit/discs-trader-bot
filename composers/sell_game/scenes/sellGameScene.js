import {
    COST_VALIDATION_ERROR_MESSAGE, FINAL_CONFIRMATION,
    WRITE_DOWN_COST_TEXT, ERROR_PLACING_OFFER
} from "../constants/constants";
import {cancelMenu, mainMenu} from "../../../keyboard/keyboard";
import {CANCEL_BUTTON_TEXT, PSN_PLATFORM} from "../../../constants";
import WizardScene from 'telegraf/scenes/wizard';
import {publishNewOffer} from "../utils/publishNewOffer";


export const sellGameScene = new WizardScene('sellGameScene',
    (ctx) => {
        ctx.reply(WRITE_DOWN_COST_TEXT, cancelMenu);
        return ctx.wizard.next();
    },
    (ctx) => {
        let gameCost = ctx.message.text;

        if (!isNaN(+gameCost.trim().replace(",", "."))){

            let selectedGame = ctx.session.listOfGames[ctx.session.chosedIndex]

            publishNewOffer(PSN_PLATFORM, selectedGame.id, ctx.message.from.username, gameCost)
                .catch(() => {
                    ctx.reply(ERROR_PLACING_OFFER, mainMenu);
                })
                .then(() => {
                    ctx.reply(FINAL_CONFIRMATION(selectedGame.title, gameCost), mainMenu)
                })

        } else if (gameCost === CANCEL_BUTTON_TEXT) {
            ctx.reply('Canceled', mainMenu);
        } else {
            ctx.reply(COST_VALIDATION_ERROR_MESSAGE, mainMenu);
        }
        return ctx.scene.leave();
    });