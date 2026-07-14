export function clearFibonacciCells(grid, fibCellCoords) {
    const clearedSequenceGrid = grid.map((row) => [...row]);

    const parseCoord = (coord) => coord.split(",").map(Number);

    for (const cellCoord of fibCellCoords) {
        const [rowIndex, colIndex] = parseCoord(cellCoord);
        clearedSequenceGrid[rowIndex][colIndex] = null;
    }

    return clearedSequenceGrid;
}
