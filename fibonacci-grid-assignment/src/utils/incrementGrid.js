const incrementCell = (cell) => (cell === null ? 1 : cell + 1);

export function incrementGrid(grid, clickedRowIndex, clickedColIndex) {
    return grid.map((row, rowIndex) => {
        const isClickedRow = rowIndex === clickedRowIndex;
        const updatedRow = isClickedRow
            ? row.map(incrementCell)
            : row.map((cell, colIndex) => {
                  const isClickedCol = colIndex === clickedColIndex;
                  return isClickedCol ? incrementCell(cell) : cell;
              });

        return updatedRow;
    });
}
