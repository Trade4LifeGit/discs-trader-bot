import axios from "axios";
import {GET_GAMES_BY_PART_OF_TITLE_URL} from "../constants/constants";
import {PSN_PLATFORM} from "../../../constants";

export const getTheListOfGamesByName = async (gameName) => {
    const getGamesByTitleUrl = GET_GAMES_BY_PART_OF_TITLE_URL(PSN_PLATFORM, gameName);
    const headers = {
        'Content-Type': 'application/json'
    }
    return axios.get(getGamesByTitleUrl,{
        headers: headers
    })
}