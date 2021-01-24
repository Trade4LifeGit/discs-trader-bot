import axios from "axios";
import {GET_GAMES_URL} from "../constants/constants";

export const getGamesFromCore = async (platform, page, size) => {
    const getGamesURL = GET_GAMES_URL(platform, page, size);
    return axios.get(getGamesURL);
}