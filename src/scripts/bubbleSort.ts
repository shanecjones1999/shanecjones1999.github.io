const MAXIMUM_VALUE = 100;

type Operation = {
    type: "compare" | "swap";
    index1: number;
    index2: number;
};

function generateBubbleSortOperations(array: number[]): Operation[] {
    const operations: Operation[] = [];
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            operations.push({
                type: "compare",
                index1: j,
                index2: j + 1,
            });
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                operations.push({ type: "swap", index1: j, index2: j + 1 });
            }
        }
    }

    return operations;
}

function renderArray(
    canvas: HTMLCanvasElement,
    array: number[],
    highlightedIndices: number[] = []
): void {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Failed to get canvas context");
    }

    const barWidth = canvas.width / array.length;
    const maxHeight = canvas.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < array.length; i++) {
        const barHeight = (array[i] / MAXIMUM_VALUE) * maxHeight;

        ctx.fillStyle = highlightedIndices.includes(i) ? "#f59e0b" : "#4f46e5";
        ctx.fillRect(i * barWidth, maxHeight - barHeight, barWidth, barHeight);
    }
}

export function renderBubbleSortAnimation(
    canvas: HTMLCanvasElement,
    array: number[]
): void {
    const bubbleSortOperations = generateBubbleSortOperations([...array]);

    let currentOperationIndex = 0;

    function animate() {
        if (currentOperationIndex >= bubbleSortOperations.length) {
            renderArray(canvas, array);
            return;
        }

        const operation = bubbleSortOperations[currentOperationIndex];

        const highlightedIndices = [operation.index1, operation.index2];

        renderArray(canvas, array, highlightedIndices);

        if (operation.type === "swap") {
            [array[operation.index1], array[operation.index2]] = [
                array[operation.index2],
                array[operation.index1],
            ];
        }

        currentOperationIndex++;
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}
