export const TELEGRAM_BOT_KEY = "960038286:AAGZZHaFHCj1VCxvkBhGTLAYYWxd7DT7JNk";
export const BOT_CORE_URL = "http://localhost:8081";
export const TELEGRAM_LINK_PREFIX = "t.me/";
export const NO_PIC_THUMB_URL = "https://www.logosurfer.com/wp-content/uploads/2018/03/PlayStation_logo.svg_.png";
export const PSN_PLATFORM = "PSN";
export const GAMES_PAGE_SIZE = 5;
export const GAMES_PROPOSITIONS_SIZE = 6;

export const POST_USER_URL = `${BOT_CORE_URL}/api/telegram/users`
export const GET_GAMES_URL = (platform, page, size) => {
    return `${BOT_CORE_URL}/api/${platform}/games?page=${page}&size=${size}`;
}
export const GET_GAMES_BY_PART_OF_TITLE_URL = (platform, gameName) => {
    return `${BOT_CORE_URL}/api/${platform}/games/titles?titleText=${gameName}&propositionSize=${GAMES_PROPOSITIONS_SIZE}`
}

export const GREETING_TEXT = "Привет! Это - телеграм бот, предназначеный для обмена играми для PS4! Бот в разработке, " +
    "так что может не работать часть функций или все функции вообще. Enjoy!";
export const FIRST_GAME_WARNING = "Это первая игра в списке!";

// Menu constants
export const CANCEL_BUTTON_TEXT = '❌ Cancel';
export const EXPLORE_BUTTON_TEXT = '🎮 Я просто смотрю';
export const BUY_GAME_BUTTON_TEXT = '💰 Купить';
export const BUY_GAMES_BUTTON_TEXT = '💰 Купить игру';
export const MY_OFFERS_BUTTON_TEXT = '🧾 Мои объявления';
export const NEXT_GAME_BUTTON_TEXT = 'Следующая ➡️';
export const PREVIOUS_GAME_BUTTON_TEXT = '⬅️ Предыдущая';
export const SELL_GAME_BUTTON_TEXT = '🤝 Продать';
export const SELL_GAMES_BUTTON_TEXT = '🤝 Продать игру';
export const THIS_GAME_IN_PSN_BUTTON_TEXT = '🎮 Это игра в PSN';

// Sell games constants
export const SELL_GAME_COST = 'Введите стоимость игры';
export const SELL_GAME_NAME = 'Введите название (или часть названия) игры';
export const COST_VALIDATION_ERROR_MESSAGE = 'Введённое значение не является числом! Пожалуйста, введите правильное ' +
    'число!';


export const BUY_GAME_TEXT_PREFIX = (gameName) => {
    return `Объявление о продаже "${gameName}":`;
};

// Так отправляется уведомление вверху чата
// ctx.answerCbQuery(FIRST_GAME_WARNING).then();

export const mockedOffers = [
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