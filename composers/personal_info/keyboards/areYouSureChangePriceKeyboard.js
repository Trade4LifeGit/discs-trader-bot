import {CONFIRM_OFFER_CHANGE} from "../constants/constants";

export const areYouSureChangePriceKeyboard = () => {
    return {
        inline_keyboard: [
            [
                {"text": CONFIRM_OFFER_CHANGE, "callback_data": 'confirmOfferChangePrice', "hide": false},
            ],
        ],
        "columns": 1
    }
}