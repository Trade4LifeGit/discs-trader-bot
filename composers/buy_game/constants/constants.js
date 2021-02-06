import {BOT_CORE_URL} from "../../../constants";

export const BUY_GAME_NAME_TEXT = 'Введите название (или часть названия игры), которую вы хотите купить';

export const GAMES_PROPOSITIONS_SIZE = 5;

export const GET_GAME_BY_TITLE_PART_URL = (platform, titleText) => {
    return `${BOT_CORE_URL}/api/${platform}/games/propositions?` +
        `titleText=${titleText}&propositionSize=${GAMES_PROPOSITIONS_SIZE}`;
}

export const PROPOSITIONS_BACKEND_ERROR_LOG = (error) => {
    return `Backend error trying to get game propositions: ${error}`;
}

export const PROPOSITIONS_BACKEND_ERROR_TEXT = () => {
    return `Произошла внутренняя ошибка! Повторите попытку позже!`;
}

export const PROPOSITIONS_NOT_FOUND_TEXT = (titlePart) => {
    return `Не нашлось игр, содержащих в названии "${titlePart}"`;
}

export const CHOOSE_FROM_THE_LIST_TEXT = 'Выберете из списка: ';
