import {
    GET_GAMES_BY_PART_OF_TITLE_URL,
    GET_GAMES_URL,
    NO_PIC_THUMB_URL,
    POST_USER_URL,
    PSN_PLATFORM
} from "../constants/constants";
import axios from 'axios';
import {exploreGame} from "../keyboard/keyboard";

export const getGamesFromCore = async (platform, page, size) => {
    const getGamesURL = GET_GAMES_URL(platform, page, size);
    return axios.get(getGamesURL);
}

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

export const updateGameMessageOnExplore = (ctx, imageUrl, titleName, psnUrl) => {
    ctx.editMessageMedia({
        type: "photo",
        media: imageUrl ? imageUrl : NO_PIC_THUMB_URL,
        caption: titleName
    }, {
        reply_markup: exploreGame(psnUrl),
    }).then(() => ctx.answerCbQuery());
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