import {Markup} from "telegraf";
import {TELEGRAM_LINK_PREFIX} from "../constants/constants";

export const buyGameOffersMenu = (offers) => {
    let offersAsButtons = [];
    for (let i = 0; i < offers.length; i++){
        let offer = offers[i];
        offersAsButtons.push(
            [Markup.urlButton(offer.cost.concat(' ').concat(offer.telegramNickname),
                TELEGRAM_LINK_PREFIX.concat(offer.telegramNickname), false)]
        );
    }
    return {
        inline_keyboard: offersAsButtons,
        "columns": 1
    }
}