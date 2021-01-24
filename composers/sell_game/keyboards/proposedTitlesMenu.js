import {Markup} from "telegraf";

export const proposedTitlesMenu = (proposedTitles) => {
    let propositionsAsButtons = [];
    for (let i = 0; i < proposedTitles.length; i++) {
        let proposition = proposedTitles[i];
        propositionsAsButtons.push(
            [Markup.callbackButton(proposition.title,'propositionSelected' + i, false)]
        )
    }
    return {
        inline_keyboard: propositionsAsButtons,
        "columns": 1
    }
}