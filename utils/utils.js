import {BOT_CORE_URL} from "../constants/constants";
import axios from 'axios';

export const getGamesFromCore = async (platform, page, size) => {
    let getGamesURL = `${BOT_CORE_URL}/api/${platform}/games?page=${page}&size=${size}`;
    return axios.get(getGamesURL);
}