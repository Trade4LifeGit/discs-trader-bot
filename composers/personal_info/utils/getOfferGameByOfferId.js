
export const getOfferGameByOfferId = (gamesWithOffers, offerId) => {
    for (let i = 0; i < gamesWithOffers.length; i++) {
        for (let j = 0; j < gamesWithOffers[i].offers.length; j++) {
            if (gamesWithOffers[i].offers[j].id === offerId){
                return gamesWithOffers[i].game;
            }
        }
    }
    return null;
}