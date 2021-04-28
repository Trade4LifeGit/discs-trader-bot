import {Composer, Stage} from "telegraf";
import {PERSONAL_INFO_BUTTON_TEXT} from "../../constants";
import {
    COUNTRY_NAME, MY_OFFERS_TITLE,NUMBER_OF_SELL_OFFERS,
    PERSONAL_INFO_HEADER, PERSONAL_OFFERS_BACKEND_ERROR_TEXT,
    PLATFORM_CHANGE_UNAVAILABLE,
    USER_NAME
} from "./constants/constants";
import {personalInfoKeyboard} from "./keyboards/personalInfoKeyboard";
import {myOffersScene} from "./scenes/myOffersScene";
import {myOffersKeyboard} from "./keyboards/myOffersKeyboard";
import {getOffersForUser} from "./utils/getOffersForUser";

export const personalInfoCommandsComposer = new Composer();
const stage = new Stage([myOffersScene]);
personalInfoCommandsComposer.use(stage.middleware());

let offersPage = 0;
let totalPages;

personalInfoCommandsComposer.hears(PERSONAL_INFO_BUTTON_TEXT, ctx => {
    ctx.reply(PERSONAL_INFO_HEADER, { reply_markup: personalInfoKeyboard() }).then();
});

personalInfoCommandsComposer.action('personalData', ctx => {
    // TODO: add number of offers, platform and country
    ctx.reply(USER_NAME + "\t" + ctx.from.username + "\t\n" + COUNTRY_NAME + "\t\n" +
        NUMBER_OF_SELL_OFFERS).then();
});

personalInfoCommandsComposer.action('myOffers', ctx => {
    offersPage = 0;

    getOffersForUser(ctx.from.username, offersPage)
        .catch(error => {
            console.log(PERSONAL_OFFERS_BACKEND_ERROR_TEXT, error);
        })
        .then(response => {
            totalPages = response.data.totalPages;
            let gamesWithOffers = response.data.offerGames;
            ctx.reply(MY_OFFERS_TITLE, {reply_markup: myOffersKeyboard(gamesWithOffers)}).then()
        });
});

personalInfoCommandsComposer.action('myOffersNextPage', ctx => {
    if (offersPage !== totalPages - 1){
        offersPage++;
        getOffersForUser(ctx.from.username, offersPage)
            .catch(error => {
                console.log(PERSONAL_OFFERS_BACKEND_ERROR_TEXT, error);
            })
            .then(response => {
                let gamesWithOffers = response.data.offerGames;
                ctx.editMessageReplyMarkup(myOffersKeyboard(gamesWithOffers)).then()
            });
    }
});

personalInfoCommandsComposer.action('myOffersPrevPage', ctx => {
    if (offersPage !== 0){
        offersPage--;

        getOffersForUser(ctx.from.username, offersPage)
            .catch(error => {
                console.log(PERSONAL_OFFERS_BACKEND_ERROR_TEXT, error);
            })
            .then(response => {
                let gamesWithOffers = response.data.offerGames;
                ctx.editMessageReplyMarkup(myOffersKeyboard(gamesWithOffers)).then()
            });
    }

});

personalInfoCommandsComposer.action('changePlatform', ctx => {
    ctx.reply(PLATFORM_CHANGE_UNAVAILABLE).then();
});
