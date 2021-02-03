import WizardScene from 'telegraf/scenes/wizard';
import {cancelMenu, mainMenu} from "../../../keyboard/keyboard";
import {BUY_GAME_NAME_TEXT} from "../constants/constants";
import {CANCEL_BUTTON_TEXT} from "../../../constants";
import {getListOfGamesWithOffersByName} from "../utils/getListOfGamesWithOffersByName";

export const buyGameScene = new WizardScene('buyGameScene',
    (ctx) => {
        ctx.reply(BUY_GAME_NAME_TEXT, cancelMenu);
        return ctx.wizard.next();
    },
    (ctx) => {
        let titlePart = ctx.message.text;

        if (titlePart === CANCEL_BUTTON_TEXT){
            ctx.reply('Canceled', mainMenu);
            return ctx.scene.leave();
        }

        getListOfGamesWithOffersByName(titlePart)
            .catch()
            .then(response => {
                console.log(response.data);
                return ctx.wizard.next();
            })



        // get game and validate here
    },
    (ctx) => {
        ctx.reply(`Введите стоимость ${ctx}`, cancelMenu);
        return ctx.scene.leave();
    }

)