export const TELEGRAM_BOT_KEY = "960038286:AAGZZHaFHCj1VCxvkBhGTLAYYWxd7DT7JNk";
export const BOT_CORE_URL = "http://localhost:8081";

export const greetingText = "Привет! Это - телеграм-бот, предназначеный для обмена играми для PS4! Бот в разработке, " +
    "так что может не работать часть функций или все функции вообще. Enjoy!";

export const cancelButtonText = '❌ Cancel';

export const exploreButtonText = '🎮 Я просто смотрю';
export const myOffersButtonText = '🤝 Мои объявления';
export const sellGamesButtonText = '➡️ Продать игру';
export const buyGamesButtonText = '⬅️ Купить игру'

export const previousGameButtonText = '⬅️ Previous';
export const nextGameButtonText = 'Next ➡️';
export const buyGameButtonText = 'Buy this game 🤝';
export const sellGameButtonText = 'Sell this game 💰️';
export const thisGameInPSNButtonText = 'This game in PSN';

export const costValidationErrorText = 'A value you entered is not a number! Please enter a valid value!';
// export const offerPublishedText = `The offer of selling "${gameName}" for ${gameCost} is published`;

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