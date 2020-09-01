export const generateMessageOptions = (markup, caption) => {
    let messageOptions = {};
    if (markup){
        messageOptions.reply_markup = markup;
    }
    if (caption){
        messageOptions.caption = caption;
    }
    return messageOptions;
}