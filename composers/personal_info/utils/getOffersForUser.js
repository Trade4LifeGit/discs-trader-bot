import {GET_OFFERS_BY_USERNAME, MY_OFFERS_TITLE, PERSONAL_OFFERS_BACKEND_ERROR_TEXT} from "../constants/constants";
import {PSN_PLATFORM} from "../../../constants";
import axios from "axios";
import {myOffersKeyboard} from "../keyboards/myOffersKeyboard";

let offersPage = 0;
let totalPages;

export const getOffersForUser = (ctx) => {
    offersPage = 0;

    fetchOffersForUser(ctx.from.username, offersPage)
        .catch(error => {
            console.log(PERSONAL_OFFERS_BACKEND_ERROR_TEXT, error);
            return 0;
        })
        .then(response => {
            let gamesWithOffers = response.data.offerGames;
            totalPages = response.data.totalPages;
            ctx.reply(MY_OFFERS_TITLE, {reply_markup: myOffersKeyboard(gamesWithOffers)}).then();
        });
}

export const offersForUserNextPage = (ctx) => {
    if (offersPage !== totalPages - 1){
        offersPage++;
        fetchOffersForUser(ctx.from.username, offersPage)
            .catch(error => {
                console.log(PERSONAL_OFFERS_BACKEND_ERROR_TEXT, error);
            })
            .then(response => {
                let gamesWithOffers = response.data.offerGames;
                ctx.editMessageReplyMarkup(myOffersKeyboard(gamesWithOffers)).then()
            });
    }
}

export const offersForUserPrevPage = (ctx) => {
    if (offersPage !== 0){
        offersPage--;
        fetchOffersForUser(ctx.from.username, offersPage)
            .catch(error => {
                console.log(PERSONAL_OFFERS_BACKEND_ERROR_TEXT, error);
            })
            .then(response => {
                let gamesWithOffers = response.data.offerGames;
                ctx.editMessageReplyMarkup(myOffersKeyboard(gamesWithOffers)).then()
            });
    }
}

const fetchOffersForUser = (username, page) => {
    const url = GET_OFFERS_BY_USERNAME(PSN_PLATFORM, username, page);
    const headers = {
        'Content-Type': 'application/json'
    }
    return axios.get(url,{
        headers: headers
    })
}