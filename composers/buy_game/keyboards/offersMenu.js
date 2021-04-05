import {Markup} from "telegraf";
import {getOfferButtonText, getOfferSellerLink} from "../utils/offerButtonUtils";

export const offersMenu = (offers) => {
    let offersAsButtons = [];
    for (let i = 0; i < offers.length; i++) {
        let offer = offers[i];
        offersAsButtons.push(
            [Markup.urlButton(getOfferButtonText(offer), getOfferSellerLink(offer), false)]
        )
    }

    return {
        inline_keyboard: offersAsButtons,
        "columns": 1
    }
}