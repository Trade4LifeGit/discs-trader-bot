export const TELEGRAM_BOT_KEY = "960038286:AAGZZHaFHCj1VCxvkBhGTLAYYWxd7DT7JNk";
export const BOT_CORE_URL = "http://localhost:8081";
export const PSN_PLATFORM = "PSN";
export const GAMES_PROPOSITIONS_SIZE = 6;

export const POST_USER_URL = `${BOT_CORE_URL}/api/telegram/users`

export const GET_GAMES_BY_PART_OF_TITLE_URL = (platform, gameName) => {
    return `${BOT_CORE_URL}/api/${platform}/games/titles?titleText=${gameName}&propositionSize=${GAMES_PROPOSITIONS_SIZE}`
}

export const GREETING_TEXT = "Привет! Это - телеграм бот, предназначеный для обмена играми для PS4! Бот в разработке, " +
    "так что может не работать часть функций или все функции вообще. Enjoy!";
export const FIRST_GAME_WARNING = "Это первая игра в списке!";

// Menu constants
export const CANCEL_BUTTON_TEXT = '❌ Cancel';
export const EXPLORE_BUTTON_TEXT = '🎮 Я просто смотрю';
export const BUY_GAMES_BUTTON_TEXT = '💰 Купить игру';
export const MY_OFFERS_BUTTON_TEXT = '🧾 Мои объявления';
export const SELL_GAMES_BUTTON_TEXT = '🤝 Продать игру';

// Sell games constants
export const SELL_GAME_NAME = 'Введите название (или часть названия) игры';





// Так отправляется уведомление вверху чата
// ctx.answerCbQuery(FIRST_GAME_WARNING).then();

