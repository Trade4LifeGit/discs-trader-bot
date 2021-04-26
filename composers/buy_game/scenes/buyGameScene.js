import WizardScene from 'telegraf/scenes/wizard';
import {mainMenu} from "../../../keyboard/keyboard";
import {getOffersForGameById} from "../utils/getOffersForGameById";
import {
    CHOOSE_SELLER_FROM_LIST_TEXT,
    NO_OFFERS_TEXT,
    OFFERS_BACKEND_ERROR_TEXT,
    OFFERS_TEXT
} from "../constants/constants";
import {offersMenu} from "../keyboards/offersMenu";

export const buyGameScene = new WizardScene('buyGameScene',
    (ctx) => {

        let selectedGame = ctx.session.propositions[ctx.session.chosedIndex];

        getOffersForGameById(selectedGame.id)
            .catch(error => {
                console.log(OFFERS_BACKEND_ERROR_TEXT, error);
            })
            .then(response => {
                let offers = response.data.offers;

                if (offers.length === 0){
                    ctx.reply(NO_OFFERS_TEXT(selectedGame.title), mainMenu);
                    return ctx.scene.leave();
                } else {

                    ctx.reply(OFFERS_TEXT, {reply_markup: offersMenu(offers)});
                    // TODO: Can't send main menu and list of sellers in one message (may be ads here)
                    ctx.reply(CHOOSE_SELLER_FROM_LIST_TEXT, mainMenu);

                    return ctx.scene.leave();
                }
            })
    });