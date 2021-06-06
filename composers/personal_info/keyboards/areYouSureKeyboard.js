import {CONFIRM_OFFER_DELETION} from "../constants/constants";

export const areYouSureKeyboard = () => {
    return {
        inline_keyboard: [
            [
                {"text": CONFIRM_OFFER_DELETION, "callback_data": 'confirmOfferDeletion', "hide": false},
            ],
        ],
        "columns": 1
    }
}