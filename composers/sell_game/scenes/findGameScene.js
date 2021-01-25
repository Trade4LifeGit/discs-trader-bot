import {CANCEL_BUTTON_TEXT, PSN_PLATFORM} from "../../../constants/constants";
import {cancelMenu, mainMenu} from "../../../keyboard/keyboard";
import WizardScene from 'telegraf/scenes/wizard';
import {
    CHOOSE_FROM_THE_LIST_TEXT,
    SELL_GAME_NAME,
} from "../constants/constants";
import {getTheListOfGamesByName} from "../utils/getListOfGamesByName";
import {proposedTitlesMenu} from "../keyboards/proposedTitlesMenu";


export const findGameScene = new WizardScene('findGameScene',
    (ctx) => {
        ctx.reply(SELL_GAME_NAME, cancelMenu);
        return ctx.wizard.next();
    },
    (ctx) => {
        let gameName = ctx.message.text;

        if (gameName === CANCEL_BUTTON_TEXT){
            ctx.reply('Canceled', mainMenu);
            return ctx.scene.leave();
        }

        getTheListOfGamesByName(PSN_PLATFORM, gameName)
            .then(response => {
                ctx.session.listOfGames = response.data.games;
                ctx.reply(CHOOSE_FROM_THE_LIST_TEXT,
                    {reply_markup: proposedTitlesMenu(response.data.games)}).then();
                return ctx.scene.leave();
            })
    });