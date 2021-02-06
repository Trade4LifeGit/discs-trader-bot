import WizardScene from 'telegraf/scenes/wizard';
import {mainMenu} from "../../../keyboard/keyboard";

export const buyGameScene = new WizardScene('buyGameScene',
    (ctx) => {

        let selectedGame = ctx.session.propositions[ctx.session.chosedIndex];

        // if selected game has no offers - return apology
        // if there are offers - return them

        ctx.reply(selectedGame, mainMenu);
        return ctx.scene.leave();
    });