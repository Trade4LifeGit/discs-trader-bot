import {GET_OFFERS_BY_USERNAME} from "../constants/constants";
import {PSN_PLATFORM} from "../../../constants";
import axios from "axios";

export const getOffersForUser = (username, page) => {
    const url = GET_OFFERS_BY_USERNAME(PSN_PLATFORM, username, page);
    const headers = {
        'Content-Type': 'application/json'
    }
    return axios.get(url,{
        headers: headers
    })
}
