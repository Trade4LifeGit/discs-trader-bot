
export const getOfferFromPage = (gamesWithOffers, page, index) => {
    let offers = [];

    for (let i = 0; i < gamesWithOffers.length; i++) {
        for (let j = 0; j < gamesWithOffers[i].offers.length; j++) {
            offers.push(gamesWithOffers[i].offers[j])
        }
    }

    return offers[index];
}