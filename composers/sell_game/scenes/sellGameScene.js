import {CANCEL_BUTTON_TEXT, PSN_PLATFORM} from "../../../constants/constants";
import {cancelMenu, mainMenu} from "../../../keyboard/keyboard";
import WizardScene from 'telegraf/scenes/wizard';
import {SELL_GAME_NAME} from "../constants/constants";
import {getTheListOfGamesByName} from "../utils/getListOfGamesByName";
import {proposedTitlesMenu} from "../keyboards/proposedTitlesMenu";


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

                console.log("response: ", response.data);

                ctx.reply('Выберете из списка: ',
                    {reply_markup: proposedTitlesMenu(response.data.games)}).then();
                ctx.scene.leave().then();

            })
            .catch(error => {
                console.log(error.data);


            });

    });