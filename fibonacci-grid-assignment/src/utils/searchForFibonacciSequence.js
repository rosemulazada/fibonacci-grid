import { isConsecutiveFibonacci } from "./isConsecutiveFibonacci.js";

export function searchForFibonacciSequence({
    numCells,
    getValue,
    markFibonacciCoord,
    sequenceLength,
    sequenceSet,
    sequenceArr,
}) {
    // Iterate over each possible candidate sequence (with a length of 5) in the line
    for (
        let firstValueIndex = 0;
        // Stop at index 45 because a sequence starting later wouldnt have enough numbers (5)
        firstValueIndex <= numCells - sequenceLength;
        firstValueIndex++
    ) {
        let allInSequence = true;
        // A slice of 5 cells to check
        const candidateValues = [];

        for (let offset = 0; offset < sequenceLength; offset++) {
            const value = getValue(firstValueIndex, offset);

            if (!sequenceSet.has(value)) {
                allInSequence = false;
                break; // Exit early if sequence is invalid
            }

            candidateValues.push(value);
        }

        // If false, skip these values and check the next slice of 5 cells
        if (
            !allInSequence ||
            !isConsecutiveFibonacci(candidateValues, sequenceArr)
        ) {
            continue;
        }

        for (let offset = 0; offset < sequenceLength; offset++) {
            markFibonacciCoord(firstValueIndex, offset);
        }
    }
}
