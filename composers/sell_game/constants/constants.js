import {BOT_CORE_URL} from "../../../constants/constants";

export const GAMES_PROPOSITIONS_SIZE = 8;

export const SELL_GAME_NAME = 'Введите название (или часть названия) игры';

export const GET_GAMES_BY_PART_OF_TITLE_URL = (platform, gameName) => {
    return `${BOT_CORE_URL}/api/${platform}/games?` +
        `titlePart=${gameName}&size=${GAMES_PROPOSITIONS_SIZE}&page=0`;
}