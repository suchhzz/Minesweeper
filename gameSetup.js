function setupGame() {
    clearTable();
    generatePlayground(FIELD_ROWS, FIELD_COLUMNS);
    generateBombs(BOMBS_COUNT);
    checkBombsCountAroundCell();
    flagsCounter = 0;
    bombsCounter = BOMBS_COUNT;
    hiddenCellsRemains = FIELD_ROWS * FIELD_COLUMNS;
    updateTable();
    updateInterface();
    $('.button-interface').removeClass('active');
}

let $tableBody = $('#tableBody');

function buildTable(rows, cols) {
    for (let i = 0; i < rows; i++) {

        let rowSection = $('<tr></tr>');

        for (let j = 0; j < cols; j++) {
            let cell = $('<td></td>')
                .attr('data-cellX', j)
                .attr('data-cellY', i);

            rowSection.append(cell);
        }

        $tableBody.append(rowSection);
    }
}

buildTable(FIELD_ROWS, FIELD_COLUMNS);

function clearTable() {
    $('td').removeClass('bomb empty value flag flag-question');
    $('td').text('');
}


function generatePlayground(rows, columns) {
    playground = new Array(rows).fill().map(() => new Array(columns).fill().map(() => new Cell()));
}

function generateBombs(count) {
    let generatedBombs = 0;

    while (generatedBombs < count) {
        let randomY = Math.floor(Math.random() * playground.length);
        let randomX = Math.floor(Math.random() * playground[0].length);

        if (playground[randomY][randomX].sectionType !== BOMB_SECTION) {
            playground[randomY][randomX].sectionType = BOMB_SECTION;
            generatedBombs++;
        }
    }
}
