import {BOT_CORE_URL} from "../../../constants";

export const BUY_GAME_NAME_TEXT = 'Введите название (или часть названия игры), которую вы хотите купить';



export const GET_OFFERS_BY_TITLE_PART_URL = (platform, titleText) => {
    return `${BOT_CORE_URL}/api/${platform}/games/propositions?titleText=${titleText}`;
}