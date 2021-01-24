import WizardScene from "telegraf/scenes/wizard"
import {cancelMenu, mainMenu, proposedTitlesMenu} from "../keyboard/keyboard";
import {
    CANCEL_BUTTON_TEXT,
    PSN_PLATFORM,
    SELL_GAME_NAME
} from "../constants/constants";
import {getTheListOfGamesByName} from "../utils/utils";

export const sellGameScene = new WizardScene('sellGameScene',
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
                // Handle success
                console.log(response.data.title);

            })
            .catch(error => {
                ctx.reply('Выберете из списка: ',
                    {reply_markup: proposedTitlesMenu(error.response.data.propositions)}).then();
                ctx.scene.leave().then();
            });

    });
