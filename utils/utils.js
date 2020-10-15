import {BOT_CORE_URL, GAMES_PAGE_SIZE, PSN_PLATFORM} from "../constants/constants";
import axios from 'axios';
import {exploreGame} from "../keyboard/keyboard";

export const getGamesFromCore = async (platform, page, size) => {
    const getGamesURL = `${BOT_CORE_URL}/api/${platform}/games?page=${page}&size=${size}`;
    return axios.get(getGamesURL);
}

export const postUserInfo = async (ctx) => {
    let userInfo = ctx.update.message.from;
    const postUserUrl = `${BOT_CORE_URL}/api/telegram/users`
    const headers = {
        'Content-Type': 'application/json'
    }
    const data = {
        telegramId: userInfo.id,
        name: userInfo.first_name + userInfo.last_name,
        nickname: userInfo.username
    }
    return axios.post(postUserUrl, data, {
        headers: headers
    });
}
