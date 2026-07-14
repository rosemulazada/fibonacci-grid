import { searchForFibonacciSequence } from "./searchForFibonacciSequence.js";

export function findFibonacciCells(
    grid,
    sequenceArr,
    sequenceSet,
    sequenceLength,
) {
    const fibCells = new Set();

    // Horizontal
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = grid[rowIndex];

        searchForFibonacciSequence({
            numCells: row.length,
            getValue: (firstIndex, offset) => row[firstIndex + offset],
            markFibonacciCoord: (firstIndex, offset) =>
                fibCells.add(`${rowIndex},${firstIndex + offset}`),
            sequenceLength,
            sequenceSet,
            sequenceArr,
        });
    }

    // Vertical
    for (let colIndex = 0; colIndex < grid[0].length; colIndex++) {
        searchForFibonacciSequence({
            numCells: grid.length,
            getValue: (firstIndex, offset) =>
                grid[firstIndex + offset][colIndex],
            markFibonacciCoord: (firstIndex, offset) =>
                fibCells.add(`${firstIndex + offset},${colIndex}`),
            sequenceLength,
            sequenceSet,
            sequenceArr,
        });
    }

    // For illustration purposes, how simple it would be to add Diagonal (left to right)
    // for (let colIndex = 0; colIndex < grid[0].length; colIndex++) {
    //     searchForFibonacciSequence({
    //         numCells: grid.length,
    //         getValue: (firstIndex, offset) =>
    //             grid[firstIndex + offset][colIndex + offset],
    //         markFibonacciCoord: (firstIndex, offset) =>
    //             fibCells.add(`${firstIndex + offset},${colIndex + offset}`),
    //         sequenceLength,
    //         sequenceSet,
    //         sequenceArr,
    //     });
    // }

    // Returns a Set of coordinates in "row,col" format
    return fibCells;
}
