import {BYN_CURRENCY} from "../../../constants";
import {DELETE_OFFER, EDIT_OFFER, NEXT_PAGE, PREVIOUS_PAGE} from "../constants/constants";

export const myOffersKeyboard = (gamesWithOffers) => {
    let offersAsButtons = [];

    for (let i = 0; i < gamesWithOffers.length; i++){

        for (let j = 0; j < gamesWithOffers[i].offers.length; j++){
            let game = gamesWithOffers[i].game;
            let offer = gamesWithOffers[i].offers[j];

            let buttonIndex = i + j;

            offersAsButtons.push(
                [{"text": game.title + ': ' + offer.price + BYN_CURRENCY, "callback_data": 'test', "hide": false}], [
                    {"text": DELETE_OFFER, "callback_data": 'deleteOffer' + buttonIndex, "hide": false},
                    {"text": EDIT_OFFER, "callback_data": 'test', "hide": false}
                ]
            );
        }
    }
    offersAsButtons.push([
        {"text": PREVIOUS_PAGE, "callback_data": 'myOffersPrevPage', "hide": false},
        {"text": NEXT_PAGE, "callback_data": 'myOffersNextPage', "hide": false}
    ]);
    return {
        inline_keyboard: offersAsButtons,
        "columns": 2
    }
}