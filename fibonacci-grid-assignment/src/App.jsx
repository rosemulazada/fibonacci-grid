import { useState } from "react";

import Grid from "./components/Grid.jsx";

import { incrementGrid } from "./utils/incrementGrid.js";
import { generateFibonacciSequenceUpTo } from "./utils/generateFibonacciSequenceUpTo.js";
import { findFibonacciCells } from "./utils/findFibonacciCells.js";
import { clearFibonacciCells } from "./utils/clearFibonacciCells.js";

const GAME_CONFIG = {
    GRID_SIZE: 50,
    SEQUENCE_LENGTH: 5,
    MAX_SEQUENCE_VALUE: 1000,
};
// Generate Fibonacci sequence up to reasonable amount for scale of assignment
const SEQUENCE_ARRAY = generateFibonacciSequenceUpTo(
    GAME_CONFIG.MAX_SEQUENCE_VALUE,
);
const SEQUENCE_SET = new Set(SEQUENCE_ARRAY);

function createEmptyGrid() {
    return Array.from({ length: GAME_CONFIG.GRID_SIZE }, () =>
        Array.from({ length: GAME_CONFIG.GRID_SIZE }, () => null),
    );
}

export default function App() {
    const [gridState, setGridState] = useState(() => createEmptyGrid());
    const [highlightedFibCells, setHighlightedFibCells] = useState(new Set());
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClickCell = (clickedRowIndex, clickedColIndex) => {
        // Prevent user interaction while a Fibonacci clear animation is running
        if (isAnimating) return;

        const incrementedGrid = incrementGrid(
            gridState,
            clickedRowIndex,
            clickedColIndex,
        );

        // Find horizontal sequences of 5 consecutive Fibonacci numbers. If any are present,
        // return the coordinates of the relevant cells (rowIndex,colIndex) in a Set
        const fibCellCoords = findFibonacciCells(
            incrementedGrid,
            SEQUENCE_ARRAY,
            SEQUENCE_SET,
            GAME_CONFIG.SEQUENCE_LENGTH,
        );
        const hasFibSequence = fibCellCoords.size > 0;

        setGridState(incrementedGrid);

        if (hasFibSequence) {
            setIsAnimating(true);
            setHighlightedFibCells(fibCellCoords);

            // Clear highlighted Fibonacci cells after the animation completes
            setTimeout(() => {
                setHighlightedFibCells(new Set());

                setGridState((prev) =>
                    clearFibonacciCells(prev, fibCellCoords),
                );

                setIsAnimating(false);
            }, 1000);
        }
    };

    return (
        <main>
            <Grid
                gridData={gridState}
                gridSize={GAME_CONFIG.GRID_SIZE}
                highlightedFibCells={highlightedFibCells}
                onClickCell={handleClickCell}
            />
        </main>
    );
}
