import WizardScene from 'telegraf/scenes/wizard';
import {cancelMenu, mainMenu} from "../../../keyboard/keyboard";
import {
    BUY_GAME_NAME_TEXT,
    PROPOSITIONS_BACKEND_ERROR_LOG,
    PROPOSITIONS_BACKEND_ERROR_TEXT,
    PROPOSITIONS_NOT_FOUND_TEXT,
    CHOOSE_FROM_THE_LIST_TEXT
} from "../constants/constants";
import {CANCEL_BUTTON_TEXT} from "../../../constants";
import {getListOfGamesByName} from "../utils/getListOfGamesByName";
import {proposedTitlesMenu} from "../keyboards/proposedTitlesMenu";

export const buyFindGameScene = new WizardScene('buyFindGameScene',
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

        // TODO: переделать эндпоинт на бэке - все варианты передавать в пропозишенах
        getListOfGamesByName(titlePart)
            .catch(error => {
                console.log(PROPOSITIONS_BACKEND_ERROR_LOG(error));
                ctx.reply(PROPOSITIONS_BACKEND_ERROR_TEXT, mainMenu);
                return ctx.scene.leave();
            })
            .then(response => {
                const propositions = response.data.propositions;

                if (propositions){
                    ctx.session.propositions = propositions;

                    ctx.reply(CHOOSE_FROM_THE_LIST_TEXT,
                        {reply_markup: proposedTitlesMenu(propositions)}).then();
                    return ctx.scene.leave();
                } else {
                    ctx.reply(PROPOSITIONS_NOT_FOUND_TEXT(titlePart), mainMenu);
                    return ctx.scene.leave();
                }

            })

    }

)