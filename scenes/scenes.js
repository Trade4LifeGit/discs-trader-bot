import WizardScene from "telegraf/scenes/wizard"
import {cancelMenu, mainMenu, proposedTitlesMenu} from "../keyboard/keyboard";
import {
    CANCEL_BUTTON_TEXT,
    COST_VALIDATION_ERROR_MESSAGE, PSN_PLATFORM,
    SELL_GAME_COST,
    SELL_GAME_NAME
} from "../constants/constants";
import {getTheListOfGamesByName} from "../utils/utils";

export const sellGameFromExploreScene = new WizardScene('sellGameFromExploreScene',
    (ctx) => {
        ctx.reply(SELL_GAME_COST, cancelMenu);
        return ctx.wizard.next();
    },
    (ctx) => {
        let gameName = ctx.scene.state.gameName;
        let gameCost = ctx.message.text;
        if (!isNaN(+gameCost.trim().replace(",", "."))){
            ctx.reply(`The offer of selling "${gameName}" for ${gameCost} is published`, mainMenu);
        } else if (gameCost === CANCEL_BUTTON_TEXT){
            ctx.reply('Canceled', mainMenu);
            return ctx.scene.leave();
        } else {
            ctx.reply(COST_VALIDATION_ERROR_MESSAGE);
            return;
        }
        return ctx.scene.leave();
    });

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
