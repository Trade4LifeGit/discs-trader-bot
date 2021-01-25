import {BOT_CORE_URL} from "../../../constants/constants";

export const GAMES_PROPOSITIONS_SIZE = 8;
export const SELL_OFFER_TYPE = 'SELL'

export const SELL_GAME_NAME = 'Введите название (или часть названия) игры';
export const CHOOSE_FROM_THE_LIST_TEXT = 'Выберете из списка: ';
export const WRITE_DOWN_COST_TEXT = 'Введите стоимость игры: ';
export const COST_VALIDATION_ERROR_MESSAGE = 'Введённое значение не является числом! Пожалуйста, введите правильное ' +
    'число!';
export const ERROR_PLACING_OFFER = 'При попытке разместить объявление возникла ошибка! Пожалуйста, повторите попытку ' +
    'позже!';
export const FINAL_CONFIRMATION = (gameName, price) => {
    return `Объявление о продаже "${gameName}" за ${price}р. опубликовано!`
};

export const GET_GAMES_BY_PART_OF_TITLE_URL = (platform, gameName) => {
    return `${BOT_CORE_URL}/api/${platform}/games?` +
        `titlePart=${gameName}&size=${GAMES_PROPOSITIONS_SIZE}&page=0`;
};

export const PUBLISH_NEW_OFFER_URL = (platform) => {
    return `${BOT_CORE_URL}/api/${platform}/offers`;
}