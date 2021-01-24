import {
    GET_GAMES_BY_PART_OF_TITLE_URL,
    POST_USER_URL,
    PSN_PLATFORM
} from "../constants/constants";
import axios from 'axios';

export const postUserInfo = async (ctx) => {
    let userInfo = ctx.update.message.from;
    const postUserUrl = POST_USER_URL;
    const headers = {
        'Content-Type': 'application/json'
    }
    const data = {
        telegramId: userInfo.id,
        name: userInfo.first_name + userInfo.last_name,
        nickname: userInfo.username,
        platform: PSN_PLATFORM
    }
    return axios.post(postUserUrl, data, {
        headers: headers
    });
}

export const getTheListOfGamesByName = async (platform, gameName) => {
    const getGamesByTitleUrl = GET_GAMES_BY_PART_OF_TITLE_URL(platform, gameName);
    const headers = {
        'Content-Type': 'application/json'
    }
    return axios.get(getGamesByTitleUrl,{
        headers: headers
    })
}