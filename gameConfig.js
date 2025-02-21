const FIELD_ROWS = 8;
const FIELD_COLUMNS = 8;
const BOMBS_COUNT = parseInt((FIELD_ROWS * FIELD_COLUMNS) / 6);

const EMPTY_SECTION = 0;
const VALUE_SECTION = 1;
const BOMB_SECTION = 2

let playground = [];
let hiddenCellsRemains;
let flagsCounter;
let bombsCounter;

class Cell {
    sectionType = 0;
    bombsAroundCount = 0;
    isOpened = false;
}