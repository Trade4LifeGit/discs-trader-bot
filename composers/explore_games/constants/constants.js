import {BOT_CORE_URL} from "../../../constants/constants";

export const GET_GAMES_URL = (platform, page, size) => {
    return `${BOT_CORE_URL}/api/${platform}/offers/published?page=${page}&size=${size}`;
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

export const BUY_GAME_TEXT_PREFIX = (gameName) => {
    return `Объявления о продаже "${gameName}":`;
};

export const SELL_GAME_TEXT = (gameName, price) => {
    return `Объявление о продаже "${gameName}" за ${price} р. опубликовано!`;
}

export const GAMES_PAGE_SIZE = 5;

export const MOCKED_OFFERS = [
    {
        telegramNickname: "Azaratos",
        telegramId: "30802666",
        ps4Id: "UP0082-CUSA18774_00-0000000000000000",
        cost: "20.3"
    },
    {
        telegramNickname: "puzzleqw",
        telegramId: "486069613",
        ps4Id: "UP0082-CUSA18774_00-0000000000000000",
        cost: "30.1"
    },
    {
        telegramNickname: "freeda_slaves",
        telegramId: "272279892",
        ps4Id: "UP0082-CUSA18774_00-0000000000000000",
        cost: "15.2"
    }
]
