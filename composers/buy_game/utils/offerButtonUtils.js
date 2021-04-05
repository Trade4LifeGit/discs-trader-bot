
export const getOfferButtonText = (offer) => {
    return offer.telegramUserId + ' ' + offer.price;
}

export const getOfferSellerLink = (offer) => {
    return 't.me/' + offer.telegramUserId;
}