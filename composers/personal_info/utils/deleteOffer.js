import {GET_UPDATE_OFFER_URL} from "../constants/constants";
import {PSN_PLATFORM} from "../../../constants";
import axios from "axios";

export const deleteOffer = (offer) => {
    const url = GET_UPDATE_OFFER_URL(PSN_PLATFORM, offer.id);
    const headers = {
        'Content-Type': 'application/json'
    }
    offer.status = "DELETED";
    return axios.put(url,{
        headers: headers,
        offer: offer
    })
}