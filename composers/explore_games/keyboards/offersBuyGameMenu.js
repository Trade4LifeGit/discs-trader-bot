import {Markup} from "telegraf";
import {TELEGRAM_LINK_PREFIX} from "../constants/constants";

export const buyGameOffersMenu = (offers) => {
    let offersAsButtons = [];
    for (let i = 0; i < offers.length; i++){
        let offer = offers[i];
        let telegramNickname = offer.telegramUserId.substring(1);
        offersAsButtons.push(
            [Markup.urlButton(offer.price + (' ').concat(telegramNickname),
                TELEGRAM_LINK_PREFIX.concat(telegramNickname), false)]
        );
    }
    return {
        inline_keyboard: offersAsButtons,
        "columns": 1
    }
}