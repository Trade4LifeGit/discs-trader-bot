import {exploreGame} from "../keyboards/exploreButtons";
import {NO_PIC_THUMB_URL} from "../constants/constants";

export const updateGameMessage = (ctx, imageUrl, titleName, psnUrl) => {
    ctx.editMessageMedia({
        type: "photo",
        media: imageUrl ? imageUrl : NO_PIC_THUMB_URL,
        caption: titleName
    }, {
        reply_markup: exploreGame(psnUrl),
    }).then(() => ctx.answerCbQuery());
}