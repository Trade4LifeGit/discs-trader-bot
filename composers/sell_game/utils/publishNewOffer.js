import axios from "axios";
import {PUBLISH_NEW_OFFER_URL, SELL_OFFER_TYPE} from "../constants/constants";

export const publishNewOffer = async(platform, gameId, telegramUserId, price) => {
    const publishOfferURL = PUBLISH_NEW_OFFER_URL(platform);
    return axios.post(publishOfferURL, {
        gameId: gameId,
        telegramUserId: telegramUserId,
        platform: platform,
        type: SELL_OFFER_TYPE,
        price: price
    })
}