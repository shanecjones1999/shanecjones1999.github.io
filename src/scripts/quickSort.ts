const ANIMATION_SPEED = 10; // milliseconds

type Operation = {
    type: "compare" | "swap";
    index1: number;
    index2: number;
};

function generateQuickSortOperations(array: number[]): Operation[] {
    const operations: Operation[] = [];
    const n = array.length;

    function quickSort(left: number, right: number): void {
        if (left < right) {
            const pivotIndex = partition(left, right);
            quickSort(left, pivotIndex - 1);
            quickSort(pivotIndex + 1, right);
        }
    }

    function partition(left: number, right: number): number {
        const pivotValue = array[right];
        let i = left - 1;

        for (let j = left; j < right; j++) {
            operations.push({
                type: "compare",
                index1: j,
                index2: right,
            });

            if (array[j] < pivotValue) {
                i++;
                [array[i], array[j]] = [array[j], array[i]];

                operations.push({ type: "swap", index1: i, index2: j });
            }
        }

        [array[i + 1], array[right]] = [array[right], array[i + 1]];
        operations.push({ type: "swap", index1: i + 1, index2: right });

        return i + 1;
    }

    quickSort(0, n - 1);
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
        const barHeight = (array[i] / 100) * maxHeight;

        ctx.fillStyle = highlightedIndices.includes(i) ? "#f59e0b" : "#4f46e5";
        ctx.fillRect(i * barWidth, maxHeight - barHeight, barWidth, barHeight);
    }
}

export function renderQuickSortAnimation(
    canvas: HTMLCanvasElement,
    array: number[]
): void {
    const operations = generateQuickSortOperations([...array]);
    let currentOperationIndex = 0;

    function animate() {
        if (currentOperationIndex >= operations.length) {
            renderArray(canvas, array);
            return;
        }

        const operation = operations[currentOperationIndex];
        const highlightedIndices =
            operation.type === "compare"
                ? [operation.index1, operation.index2]
                : [];

        renderArray(canvas, array, highlightedIndices);

        if (operation.type === "swap") {
            [array[operation.index1], array[operation.index2]] = [
                array[operation.index2],
                array[operation.index1],
            ];
        }

        currentOperationIndex++;
        setTimeout(() => {
            requestAnimationFrame(animate);
        }, ANIMATION_SPEED);
    }

    animate();
}
