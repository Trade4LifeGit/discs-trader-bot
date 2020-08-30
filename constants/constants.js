export const TELEGRAM_BOT_KEY = "960038286:AAGZZHaFHCj1VCxvkBhGTLAYYWxd7DT7JNk"

export const mockedGames ={
    games:[
        {
            id: "1",
            name: "One",
            pictureURL: "https://store.playstation.com/store/api/chihiro/00_09_000/container/RU/ru/999/EP4497-CUSA16579_00-00000000000000P1/1596558946000/image?w=240&h=240&bg_color=000000&opacity=100&_version=00_09_000",
        },
        {
            id: "2",
            name: "Two",
            pictureURL: "https://store.playstation.com/store/api/chihiro/00_09_000/container/RU/ru/999/EP0102-CUSA14123_00-BH3B000000000001/1592010505000/image?w=480&h=480&bg_color=000000&opacity=100&_version=00_09_000",
        },
        {
            id: "3",
            name: "Three",
            pictureURL: "https://store.playstation.com/store/api/chihiro/00_09_000/container/RU/ru/999/EP0102-CUSA14123_00-BH3B000000000001/1592010505000/image?w=480&h=480&bg_color=000000&opacity=100&_version=00_09_000",
        },
        {
            id: "4",
            name: "Four",
            pictureURL: "https://store.playstation.com/store/api/chihiro/00_09_000/container/RU/ru/999/EP0102-CUSA14123_00-BH3B000000000001/1592010505000/image?w=480&h=480&bg_color=000000&opacity=100&_version=00_09_000",
        },
        {
            id: "5",
            name: "Five",
            pictureURL: "https://store.playstation.com/store/api/chihiro/00_09_000/container/RU/ru/999/EP0102-CUSA14123_00-BH3B000000000001/1592010505000/image?w=480&h=480&bg_color=000000&opacity=100&_version=00_09_000",
        },
        {
            id: "6",
            name: "Six",
            pictureURL: "https://store.playstation.com/store/api/chihiro/00_09_000/container/RU/ru/999/EP0102-CUSA14123_00-BH3B000000000001/1592010505000/image?w=480&h=480&bg_color=000000&opacity=100&_version=00_09_000",
        }
    ]
}

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