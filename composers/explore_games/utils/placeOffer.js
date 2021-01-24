import {GET_NEW_OFFER_URL} from "../constants/constants";
import axios from "axios";
import {PSN_PLATFORM} from "../../../constants/constants";

export const placeOffer = async (platform, gameId, telegramUserId, price) => {
    const placeOfferURL = GET_NEW_OFFER_URL(platform);
    return axios.post(placeOfferURL, {
        gameId: gameId,
        telegramUserId: telegramUserId,
        price: price,
        platform: PSN_PLATFORM,
        type: "SELL"
    })
}