export const TELEGRAM_BOT_KEY = "960038286:AAGZZHaFHCj1VCxvkBhGTLAYYWxd7DT7JNk";
export const BOT_CORE_URL = "http://localhost:8081";
export const TELEGRAM_LINK_PREFIX = "t.me/";
export const NO_PIC_THUMB_URL = "https://www.logosurfer.com/wp-content/uploads/2018/03/PlayStation_logo.svg_.png";
export const PSN_PLATFORM = "PSN";
export const GAMES_PAGE_SIZE = 5;

export const GREETING_TEXT = "Привет! Это - телеграм бот, предназначеный для обмена играми для PS4! Бот в разработке, " +
    "так что может не работать часть функций или все функции вообще. Enjoy!";
export const FIRST_GAME_WARNING = "Это первая игра в списке!";
export const COST_VALIDATION_ERROR_MESSAGE = "Введённое значение не является числом! Пожалуйста, введите правильное число!"

export const cancelButtonText = '❌ Cancel';
export const exploreButtonText = '🎮 Я просто смотрю';
export const buyGameButtonText = '💰 Купить';
export const buyGamesButtonText = '💰 Купить игру';
export const myOffersButtonText = '🧾 Мои объявления';
export const nextGameButtonText = 'Следующая ➡️';
export const previousGameButtonText = '⬅️ Предыдущая';
export const sellGameButtonText = '🤝 Продать';
export const sellGamesButtonText = '🤝 Продать игру';
export const thisGameInPSNButtonText = '🎮 Это игра в PSN';

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