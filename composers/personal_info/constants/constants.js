import {BOT_CORE_URL, BYN_CURRENCY} from "../../../constants";

export const PERSONAL_INFO_HEADER = 'Личный кабинет: ';

export const PERSONAL_INFO = "Личные данные";
export const MY_OFFERS = "Мои объявления";
export const CHANGE_PLATFORM = "Сменить платформу";
export const REACH_FOR_SUPPORT = "Сообщить о проблеме";

export const PLATFORM_CHANGE_UNAVAILABLE = "Мультиплатформа пока на стадии разработки";
export const SUPPORT_URL = "t.me/azaratos";

export const USER_NAME = "Имя пользователя: ";
export const COUNTRY_NAME = "Страна: ";
export const NUMBER_OF_SELL_OFFERS = "Объявлений о продаже: ";

export const MY_OFFERS_TITLE = "Мои объявления: ";

export const MY_OFFERS_PAGE_SIZE = 3;

export const GET_OFFERS_BY_USERNAME = (platform, gameId, page) => {
    return `${BOT_CORE_URL}/api/${platform}/offers/published?` +
        `userId=${gameId}&page=${page}&size=${MY_OFFERS_PAGE_SIZE}`;
}

export const PERSONAL_OFFERS_BACKEND_ERROR_TEXT = 'Backend error trying to get offers by username: ';


export const PREVIOUS_PAGE = "⬅️ Предыдущая";
export const NEXT_PAGE = "Следущая ➡️";
export const DELETE_OFFER = "❌️ Удалить";
export const EDIT_OFFER = "✍️ Изменить цену";

export const ARE_YOU_SURE = (gameTitle, offerCost) => {
    return `Вы уверены что хотите удалить объявление о продаже "${gameTitle}" за ${offerCost}${BYN_CURRENCY}?`;
};

export const ARE_YOU_SURE_CHANGE = (gameTitle, oldOfferCost, newOfferCost) => {
    return `Вы уверены, что хотите изменить цену предложения о продаже "${gameTitle}" с ${oldOfferCost} на ${newOfferCost}?`;
};

export const ENTER_NEW_OFFER_PRICE = "Введите новую цену предложения";
export const CONFIRM_OFFER_CHANGE = "Уверен, изменить предложение";
export const OFFER_CHANGED = "Цена изменена!";
export const ERROR_CHANGING_OFFER_PRICE = "При попытке изменить цену возникла ошибка!";
export const OFFER_CHANGE_CANCELLED = "Цена предложения не изменена!";
export const NEW_OFFER_PRICE_VALIDATION_FAILED = "Новая цена указана неверно!";

export const CONFIRM_OFFER_DELETION = "Уверен, удалить предложение";
export const ERROR_DELETING_OFFER = "При попытке удалить предложение возникла ошибка!";
export const OFFER_DELETED = "Предложение удалено!";

export const GET_UPDATE_OFFER_URL = (platform, offerId) => {
    return `${BOT_CORE_URL}/api/${platform}/offers/${offerId}`;
}
