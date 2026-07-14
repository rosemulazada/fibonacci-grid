A small interactive React app game using JavaScript and Tailwind CSS where you increment numbers in a 50×50 grid and clear sequences of 5 consecutive Fibonacci numbers.

---

### Implementation details

- Supports horizontal- and vertical clearing.
- Empty cells are `null`, not `0`, so sequences starting with `0` do not occur.
- In the case of two consecutive sequences in one (i.e. `1,1,2,3,5,8`), both sequences are cleared.

#### Details

1. **`gridState`** state
   Stores the current grid as a 2D array, initially lazily initialized as a 2D array of `null` values. All updates create a new grid instance to preserve immutability and avoid side effects in React.
2. **`incrementGrid(grid, row, col)`**  
   Increments all cells in the selected row and column. Empty cells (`null`) are initialized to `1`.
3. **`findFibonacciCells(grid, sequenceArr, sequenceSet, sequenceLength)`** & **`searchForFibonacciSequence({numCells, getValue, markFibonacciCoord, sequenceLength, sequenceSet, sequenceArr})`**  
   Scans each row for horizontal and vertical sequences of `sequenceLength` values, with a helper function `searchForFibonacciSequence` to do so. Uses an early-exit check to skip candidate ranges that contain non-Fibonacci values before `isConsecutiveFibonacci` validates whether the remaining values form a consecutive Fibonacci sequence.
4. **`isConsecutiveFibonacci(candidateValues, sequenceArr)`**  
   Verifies whether a given array of values appears consecutively within the Fibonacci sequence. Also is responsible for ensuring that both `1,1,2,3,5` and `1,2,3,5,8` are registered as valid Fibonacci despite the duplicate `1`.
5. **`clearFibonacciCells(grid, fibCellCoords)`**  
   Returns a new grid with all detected Fibonacci sequence cells cleared (set back to `null`).
6. **`highlightedFibCells`** state
   Stores the coordinates (`rowIndex,colIndex`) of Fibonacci sequence cells during animation, keeping visual effects separate from core game state.
7. **`isAnimating`** state
   Simple `boolean` state to ensure you don't edit the grid while the grid is animating and clearing.

All core game logic lives in the `App` component. The `Grid` and `Cell` components serve a purely presentational purpose.

#### Accessibility & UX

- Accessible, keyboard-navigable cells with focus outlines
- Cell highlight animation before clearing sequences ✨ which ensures that the sequence is fully visible (i.e. `1,2,3,5,8`) before being cleared (i.e. seeing `1,2,3,5,7`, clicking to complete the sequence and seeing `null` cells instead of the full sequence).
- Dark ☾ and light ☀ mode support

---

### Potential improvements

- **`findFibonacciCells(grid, sequenceArr, sequenceSet, sequenceLength)`** & **`searchForFibonacciSequence({numCells, getValue, markFibonacciCoord, sequenceLength, sequenceSet, sequenceArr})`**
    - Add ~~vertical and~~ diagonal (in both directions) detection if that was something I misinterpreted.
    - Instead of scanning the entire grid, only search the row at clickedRowIndex and the limited range of cells (up to 10 per row) that could form a valid sequence with the changed column cells.
- **`isConsecutiveFibonacci(candidateValues, sequenceArr)`**
    - For larger grids, finding the `index` of a `value` in the Fibonacci sequence can be optimized by precomputing a `value:index Map`, allowing instant `O(1)` lookup instead of repeatedly scanning the sequence array.
- **`Grid.jsx`**
    - For larger grids, rendering could be optimized with some kind of virtualized grid with `react-window` or `React.memo` so that only cells whose value or highlight state changes are re-rendered.
    - Possibly a zoom- and pannable grid instead of scrollbars & buttons on screen to zoom/move around with, for better navigation.
