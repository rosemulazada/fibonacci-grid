import Cell from "./Cell.jsx";

export default function Grid({
    gridData,
    gridSize,
    onClickCell,
    highlightedFibCells,
}) {
    // Presentational grid component; all game logic lives in App
    return (
        // Scrollable container
        <div className="w-full overflow-auto border border-gray-300 dark:border-gray-600 p-2">
            <div
                className="grid gap-1.5"
                role="grid"
                aria-label="Fibonacci game grid"
                // Base grid width off grid size
                style={{
                    gridTemplateColumns: `repeat(${gridSize}, 2rem)`,
                    gridAutoRows: `2rem`,
                }}
            >
                {gridData.map((row, rowIndex) =>
                    row.map((cellValue, colIndex) => {
                        const isHighlighted = highlightedFibCells.has(
                            `${rowIndex},${colIndex}`,
                        );

                        return (
                            <Cell
                                key={`${rowIndex}-${colIndex}`}
                                value={cellValue}
                                onClick={() => onClickCell(rowIndex, colIndex)}
                                highlighted={isHighlighted}
                            />
                        );
                    }),
                )}
            </div>
        </div>
    );
}
