export function generateRandomArray(length: number): number[] {
    const array = Array.from({ length }, (_, i) => i + 1);

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}
