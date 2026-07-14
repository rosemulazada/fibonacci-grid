export function generateFibonacciSequenceUpTo(max) {
    const sequenceArr = [1, 1];

    while (sequenceArr.at(-1) <= max) {
        const lastItemInSequence = sequenceArr.at(-1);
        const nextValue = lastItemInSequence + sequenceArr.at(-2);
        sequenceArr.push(nextValue);
    }

    return sequenceArr;
}
