import {CANCEL_BUTTON_TEXT} from "../../../constants";
import {cancelMenu, mainMenu} from "../../../keyboard/keyboard";
import WizardScene from 'telegraf/scenes/wizard';
import {
    ARE_YOU_SURE_CHANGE,
    ENTER_NEW_OFFER_PRICE,
    NEW_OFFER_PRICE_VALIDATION_FAILED,
    OFFER_CHANGE_CANCELLED
} from "../constants/constants";
import {areYouSureChangePriceKeyboard} from "../keyboards/areYouSureChangePriceKeyboard";

export const changeOfferCostScene = new WizardScene('changeOfferCostScene',
    (ctx) => {
        ctx.reply(ENTER_NEW_OFFER_PRICE, cancelMenu);
        return ctx.wizard.next();
    },
    (ctx) => {

        let offerGame = ctx.scene.state.offerGame;
        let offerToChange = ctx.scene.state.offerToChange;
        ctx.session.newOfferCost = ctx.message.text;


        if (!isNaN(+ctx.session.newOfferCost.trim().replace(",", "."))){

            ctx.reply(ARE_YOU_SURE_CHANGE(offerGame.title, offerToChange.price, ctx.session.newOfferCost),
                {reply_markup: areYouSureChangePriceKeyboard()}).then();

        } else if (ctx.session.newOfferCost === CANCEL_BUTTON_TEXT){
            ctx.reply(OFFER_CHANGE_CANCELLED, mainMenu);
        } else {
            ctx.reply(NEW_OFFER_PRICE_VALIDATION_FAILED, mainMenu);
        }
        return ctx.wizard.next();
    },
    (ctx) => {
        if (ctx.message.text === CANCEL_BUTTON_TEXT){
            ctx.reply(OFFER_CHANGE_CANCELLED, mainMenu);
        }
        return ctx.scene.leave();
    });