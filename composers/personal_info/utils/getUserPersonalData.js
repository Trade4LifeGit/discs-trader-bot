import {COUNTRY_NAME, NUMBER_OF_SELL_OFFERS, USER_NAME} from "../constants/constants";

export const getUserPersonalData = (ctx) => {
    return USER_NAME + "\t" + ctx.from.username + "\t\n" + COUNTRY_NAME + "\t\n" +
        NUMBER_OF_SELL_OFFERS;
}