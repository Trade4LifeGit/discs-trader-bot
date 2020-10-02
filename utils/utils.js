import {BOT_CORE_URL} from "../constants/constants";
import axios from 'axios';

export const getGamesFromCore = async (platform, page, size) => {
    const getGamesURL = `${BOT_CORE_URL}/api/${platform}/games?page=${page}&size=${size}`;
    return axios.get(getGamesURL);
}

export const postUserInfo = async (userInfo) => {
    const postUserUrl = `${BOT_CORE_URL}/api/users`
    let convertedUserInfo = {
        // id: userInfo.id,
        id: 1,
        // TODO: validate those fields (can be undefined)
        name: userInfo.first_name + ' ' + userInfo.last_name,
        nickname: userInfo.username
    }
    return axios.post(postUserUrl, convertedUserInfo);
}
