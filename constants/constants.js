export const TELEGRAM_BOT_KEY = "960038286:AAGZZHaFHCj1VCxvkBhGTLAYYWxd7DT7JNk";
export const BOT_CORE_URL = "http://localhost:8081";
export const PSN_PLATFORM = "PSN";
export const GAMES_PAGE_SIZE = 3;

// Метод Сёмы для апдейтов
const replaceReplyMarkup = async(ctx, newMarkup) => {
    try{
        const chatID = ctx.update.callback_query.message.chat.id;
        const messageID = ctx.update.callback_query.message.message_id;
        return bot.telegram.editMessageReplyMarkup(chatID, messageID, null, newMarkup);

    } catch (e) {
        console.log("Не получилось удалить кнопочки после апдейта поста");
    }
}

export const greetingText = "Привет! Это - телеграм бот, предназначеный для обмена играми для PS4! Бот в разработке, " +
    "так что может не работать часть функций или все функции вообще. Enjoy!";
export const FIRST_GAME_WARNING = "Это первая игра в списке!";

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