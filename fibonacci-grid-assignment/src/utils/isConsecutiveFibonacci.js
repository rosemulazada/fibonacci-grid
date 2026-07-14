export function isConsecutiveFibonacci(candidateValues, sequenceArr) {
    let indexOfCellInSequence;
    if (candidateValues[0] === 1 && candidateValues[1] === 2) {
        indexOfCellInSequence = 1;
    } else {
        indexOfCellInSequence = sequenceArr.indexOf(candidateValues[0]);
    }
    return (
        candidateValues.every(
            (cell, i) => cell === sequenceArr[indexOfCellInSequence - i],
        ) ||
        candidateValues.every(
            (cell, i) => cell === sequenceArr[indexOfCellInSequence + i],
        )
    );
}
