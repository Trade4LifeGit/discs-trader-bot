import {PSN_PLATFORM} from "../../../constants";
import {GET_OFFERS_BY_TITLE_PART_URL} from "../constants/constants";
import axios from "axios";


export const getListOfGamesWithOffersByName = (titlePart) => {
    const url = GET_OFFERS_BY_TITLE_PART_URL(PSN_PLATFORM, titlePart);
    const headers = {
        'Content-Type': 'application/json'
    }
    return axios.get(url,{
        headers: headers
    })
}