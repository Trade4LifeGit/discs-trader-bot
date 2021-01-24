import {exploreGame} from "../keyboards/exploreButtons";
import {NO_PIC_THUMB_URL, PAGINATION_ERROR_COLLISION_TEXT} from "../constants/constants";

export const updateGameMessage = (ctx, imageUrl, titleName, psnUrl) => {
    ctx.editMessageMedia({
        type: "photo",
        media: imageUrl ? imageUrl : NO_PIC_THUMB_URL,
        caption: titleName
    }, {
        reply_markup: exploreGame(psnUrl),
    }).catch(() => {
        console.log(PAGINATION_ERROR_COLLISION_TEXT(ctx.update.callback_query.from.username))
    }).then(() => ctx.answerCbQuery());
}