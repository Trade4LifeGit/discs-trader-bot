import {Composer, Stage} from "telegraf";
import {PERSONAL_INFO_BUTTON_TEXT} from "../../constants";
import {
    PERSONAL_INFO_HEADER,
    PLATFORM_CHANGE_UNAVAILABLE,
} from "./constants/constants";
import {personalInfoKeyboard} from "./keyboards/personalInfoKeyboard";
import {myOffersScene} from "./scenes/myOffersScene";
import {
    getOffersForUser,
    offersForUserNextPage,
    offersForUserPrevPage
} from "./utils/getOffersForUser";
import {getUserPersonalData} from "./utils/getUserPersonalData";

export const personalInfoCommandsComposer = new Composer();
const stage = new Stage([myOffersScene]);
personalInfoCommandsComposer.use(stage.middleware());

personalInfoCommandsComposer.hears(PERSONAL_INFO_BUTTON_TEXT, ctx => {
    ctx.reply(PERSONAL_INFO_HEADER, { reply_markup: personalInfoKeyboard() }).then();
});

personalInfoCommandsComposer.action('personalData', ctx => {
    // TODO: add number of offers, platform and country
    ctx.reply(getUserPersonalData(ctx)).then();
});

personalInfoCommandsComposer.action('myOffers', ctx => {
    getOffersForUser(ctx);
});

personalInfoCommandsComposer.action('myOffersNextPage', ctx => {
    offersForUserNextPage(ctx)
});

personalInfoCommandsComposer.action('myOffersPrevPage', ctx => {
    offersForUserPrevPage(ctx);
});

personalInfoCommandsComposer.action('changePlatform', ctx => {
    ctx.reply(PLATFORM_CHANGE_UNAVAILABLE).then();
});
