import WizardScene from 'telegraf/scenes/wizard';
import {MY_OFFERS} from "../constants/constants";
import {cancelMenu, mainMenu} from "../../../keyboard/keyboard";
import {CANCEL_BUTTON_TEXT} from "../../../constants";

export const myOffersScene = new WizardScene('personalInfoScene',
    (ctx) => {
        ctx.reply(MY_OFFERS, cancelMenu);
        return ctx.wizard.next();
    },
    (ctx) => {
        if (gameCost === CANCEL_BUTTON_TEXT) {
            ctx.reply('Canceled', mainMenu);
            return ctx.scene.leave();
        }
        
    });