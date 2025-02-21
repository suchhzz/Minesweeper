function updateTable() {
    $('table')
        .find('tr').each((rowIndex, row) => {
            $(row).find('td').each((colIndex, cell) => {

                let bombs = checkBombsCountAroundCell(rowIndex, colIndex);

                if (playground[rowIndex][colIndex].isOpened && playground[rowIndex][colIndex].sectionType === VALUE_SECTION) {
                    $(cell).text(bombs);
                }

                playground[rowIndex][colIndex].bombsAroundCount = bombs;


                if (playground[rowIndex][colIndex].sectionType === BOMB_SECTION && playground[rowIndex][colIndex].isOpened === true) {
                    $(cell).addClass('bomb');
                }

                if (playground[rowIndex][colIndex].sectionType === EMPTY_SECTION && playground[rowIndex][colIndex].isOpened === true) {
                    $(cell).addClass('empty');
                }

                if (playground[rowIndex][colIndex].sectionType === VALUE_SECTION && playground[rowIndex][colIndex].isOpened === true) {
                    $(cell).addClass('value');
                }
            });
        });
}

function checkBombsCountAroundCell(cellY, cellX) {
    let bombCount = 0;

    for (let y = cellY - 1; y <= cellY + 1; y++) {
        for (let x = cellX - 1; x <= cellX + 1; x++) {
            if (checkBorders(y, x) && playground[y][x].sectionType === BOMB_SECTION) {
                bombCount++;
            }
        }
    }

    if (bombCount > 0 && playground[cellY][cellX].sectionType !== BOMB_SECTION) {
        playground[cellY][cellX].sectionType = VALUE_SECTION;
    }

    return bombCount;
}

function checkBorders(cellY, cellX) {
    if (cellY < 0 || cellY > playground.length - 1 ||
        cellX < 0 || cellX > playground[0].length - 1
    ) {
        return false;
    }

    return true;
}

function checkVisited(cellY, cellX, visited) {
    return !(visited.has(`${cellY},${cellX}`));
}

function displayBombs() {
    for (let i = 0; i < playground.length; i++) {
        let rowStr = "";
        for (let j = 0; j < playground[i].length; j++) {
            rowStr += playground[i][j].bombsAroundCount + ' ';
        }
    }
}

function displaySectionTypes() {
    for (let i = 0; i < playground.length; i++) {
        let rowStr = "";
        for (let j = 0; j < playground[i].length; j++) {
            rowStr += playground[i][j].sectionType + ' ';
        }
    }
}

function emptySectionHit(cellY, cellX) {
    let visited = new Set();
    showClosestEmptySections(cellY, cellX, visited);

    updateTable();
}

function showClosestEmptySections(cellY, cellX, visited) {
    for (let dy = cellY - 1; dy <= cellY + 1; dy++) {
        for (let dx = cellX - 1; dx <= cellX + 1; dx++) {
            if (checkBorders(dy, dx) && !visited.has(`${dy},${dx}`) && playground[dy][dx].sectionType !== BOMB_SECTION) {

                visited.add(`${dy},${dx}`);

                if (!playground[dy][dx].isOpened) {
                    hiddenCellsRemains--;
                }

                playground[dy][dx].isOpened = true;

                if (playground[dy][dx].sectionType === EMPTY_SECTION) {
                    showClosestEmptySections(dy, dx, visited);
                }
            }
        }
    }
}

function showSection(cellY, cellX) {
    playground[cellY][cellX].isOpened = true;
    hiddenCellsRemains--;
}

function setHitPoint(cellY, cellX) {
    cellY = parseInt(cellY);
    cellX = parseInt(cellX);

    if (!playground[cellY][cellX].isOpened) {
        if (playground[cellY][cellX].bombsAroundCount === 0) {
            emptySectionHit(cellY, cellX)
        } else {
            showSection(cellY, cellX);
        }
    }

    updateTable();

    if (playground[cellY][cellX].sectionType === BOMB_SECTION) {
        setLose();
        return;
    }

    checkGameStatus();
}

function checkGameStatus() {
    if (hiddenCellsRemains <= BOMBS_COUNT) {
        setWin();
    }
}

function setWin() {
    $('.info-field').addClass('active');
    $('.info-text').text('You won');
}

function setLose() {
    $('.info-field').addClass('active');
    $('.info-text').text('You lose');
    showBombs();
}

function updateInterface() {
    $('#flagsCountInterafce').text(flagsCounter);
    $('#bombsCountInterafce').text(bombsCounter);
}

function showBombs() {
    $('table')
        .find('tr').each((rowIndex, row) => {
            $(row).find('td').each((colIndex, cell) => {
                if (playground[rowIndex][colIndex].sectionType === BOMB_SECTION) {
                    playground[rowIndex][colIndex].isOpened = true;
                }
            });
        });

    updateTable();
}
