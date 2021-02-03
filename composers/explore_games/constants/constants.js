import {BOT_CORE_URL} from "../../../constants";

export const GET_GAMES_URL = (platform, page, size) => {
    return `${BOT_CORE_URL}/api/${platform}/offers/published?page=${page}&size=${size}`;
}
export const GET_NEW_OFFER_URL = (platform) => {
    return `${BOT_CORE_URL}/api/${platform}/offers`;
}
export const NO_PIC_THUMB_URL = "https://www.logosurfer.com/wp-content/uploads/2018/03/PlayStation_logo.svg_.png";

export const BUY_GAME_BUTTON_TEXT = '💰 Купить';
export const NEXT_GAME_BUTTON_TEXT = 'Следующая ➡️';
export const PREVIOUS_GAME_BUTTON_TEXT = '⬅️ Предыдущая';
export const SELL_GAME_BUTTON_TEXT = '🤝 Продать';
export const TELEGRAM_LINK_PREFIX = "t.me/";
export const THIS_GAME_IN_PSN_BUTTON_TEXT = '🎮 Это игра в PSN';

export const COST_VALIDATION_ERROR_MESSAGE = 'Введённое значение не является числом! Пожалуйста, введите правильное ' +
    'число!';
export const SELL_GAME_COST = 'Введите стоимость игры';
export const ERROR_PLACING_OFFER = 'При попытке разместить объявление возникла ошибка! Пожалуйста, повторите попытку ' +
    'позже!';

export const BUY_GAME_TEXT_PREFIX = (gameName) => {
    return `Объявления о продаже "${gameName}":`;
};

export const SELL_GAME_TEXT = (gameName, price) => {
    return `Объявление о продаже "${gameName}" за ${price}р. опубликовано!`;
};

export const PAGINATION_ERROR_COLLISION_TEXT = (userNickname) => {
    return `User "${userNickname}" got collision error on explore!`
}

export const GAMES_PAGE_SIZE = 5;
