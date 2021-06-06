import {Composer} from "telegraf";
import {PERSONAL_INFO_BUTTON_TEXT} from "../../constants";
import {
    ARE_YOU_SURE,
    COUNTRY_NAME, MY_OFFERS_PAGE_SIZE, MY_OFFERS_TITLE, NUMBER_OF_SELL_OFFERS,
    PERSONAL_INFO_HEADER, PERSONAL_OFFERS_BACKEND_ERROR_TEXT,
    PLATFORM_CHANGE_UNAVAILABLE,
    USER_NAME
} from "./constants/constants";
import {personalInfoKeyboard} from "./keyboards/personalInfoKeyboard";
import {myOffersKeyboard} from "./keyboards/myOffersKeyboard";
import {getOffersForUser} from "./utils/getOffersForUser";
import {areYouSureKeyboard} from "./keyboards/areYouSureKeyboard";
import {deleteOffer} from "./utils/deleteOffer";
import {getOfferFromPage} from "./utils/getOfferFromPage";
import {getOfferGameByOfferId} from "./utils/getOfferGameByOfferId";

export const personalInfoCommandsComposer = new Composer();

let offersPage = 0;
let totalOffers;
let totalPages;
let gamesWithOffers;

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
            totalOffers = response.data.totalOfferGames;
            gamesWithOffers = response.data.offerGames;
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
                gamesWithOffers = response.data.offerGames;
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
                gamesWithOffers = response.data.offerGames;
                ctx.editMessageReplyMarkup(myOffersKeyboard(gamesWithOffers)).then()
            });
    }

});

for (let i = 0; i < MY_OFFERS_PAGE_SIZE; i++){
    personalInfoCommandsComposer.action('deleteOffer' + i, ctx => {
        ctx.session.offerToDelete = getOfferFromPage(gamesWithOffers, offersPage, i);
        // can't find offerToDelete
        let offerGame = getOfferGameByOfferId(gamesWithOffers, ctx.session.offerToDelete.id);
        ctx.reply(ARE_YOU_SURE(offerGame.title, ctx.session.offerToDelete.price),
            {reply_markup: areYouSureKeyboard()}).then();
    })
}

personalInfoCommandsComposer.action('confirmOfferDeletion', ctx => {
    deleteOffer(ctx.session.offerToDelete).then();
    ctx.reply("Оффер удалён!").then();
    ctx.session.offerToDelete = null;
    ctx.session.offerGame = null;
})

personalInfoCommandsComposer.action('changePlatform', ctx => {
    ctx.reply(PLATFORM_CHANGE_UNAVAILABLE).then();
});
