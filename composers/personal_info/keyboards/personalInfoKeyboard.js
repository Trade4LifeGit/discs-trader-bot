import {CHANGE_PLATFORM, MY_OFFERS, PERSONAL_INFO, REACH_FOR_SUPPORT, SUPPORT_URL} from "../constants/constants";
import {Markup} from "telegraf";

export const personalInfoKeyboard = () => {
    return {
        inline_keyboard: [
            [
                {"text": PERSONAL_INFO, "callback_data": 'personalData', "hide": false},
                {"text": MY_OFFERS, "callback_data": 'myOffers', "hide": false}
            ],
            [
                {"text": CHANGE_PLATFORM, "callback_data": 'changePlatform', "hide": false},
                Markup.urlButton(REACH_FOR_SUPPORT, SUPPORT_URL, false)
            ],
        ],
        "columns": 2
    }
}