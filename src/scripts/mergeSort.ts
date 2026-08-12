const MAXIMUM_VALUE = 100;

const ANIMATION_SPEED = 1;

export function mergeSort(array: number[]): number[] {
    if (array.length <= 1) {
        return array;
    }

    const mid = Math.floor(array.length / 2);

    const left = mergeSort(array.slice(0, mid));
    const right = mergeSort(array.slice(mid));

    return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
    const result: number[] = [];

    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}

export function renderArray(
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

        if (highlightedIndices.includes(i)) {
            ctx.fillStyle = "#f59e0b";
        } else {
            ctx.fillStyle = "#4f46e5";
        }

        ctx.fillRect(i * barWidth, maxHeight - barHeight, barWidth, barHeight);
    }
}

type AnimationOperation =
    | {
          type: "overwrite";
          index: number;
          value: number;
      }
    | {
          type: "compare";
          left: number;
          right: number;
      };

function generateMergeSortOperations(array: number[]): AnimationOperation[] {
    const workingArray = [...array];
    const operations: AnimationOperation[] = [];

    function mergeSortAnimated(start: number, end: number): void {
        if (end - start <= 1) {
            return;
        }

        const mid = Math.floor((start + end) / 2);

        mergeSortAnimated(start, mid);
        mergeSortAnimated(mid, end);

        mergeAnimated(start, mid, end);
    }

    function mergeAnimated(start: number, mid: number, end: number): void {
        const left = workingArray.slice(start, mid);
        const right = workingArray.slice(mid, end);

        let i = 0;
        let j = 0;
        let k = start;

        while (i < left.length && j < right.length) {
            operations.push({
                type: "compare",
                left: start + i,
                right: mid + j,
            });

            if (left[i] < right[j]) {
                workingArray[k] = left[i];

                operations.push({
                    type: "overwrite",
                    index: k,
                    value: left[i],
                });

                i++;
            } else {
                workingArray[k] = right[j];

                operations.push({
                    type: "overwrite",
                    index: k,
                    value: right[j],
                });

                j++;
            }

            k++;
        }

        while (i < left.length) {
            workingArray[k] = left[i];

            operations.push({
                type: "overwrite",
                index: k,
                value: left[i],
            });

            i++;
            k++;
        }

        while (j < right.length) {
            workingArray[k] = right[j];

            operations.push({
                type: "overwrite",
                index: k,
                value: right[j],
            });

            j++;
            k++;
        }
    }

    mergeSortAnimated(0, workingArray.length);

    return operations;
}

export function renderMergeSortAnimation(
    canvas: HTMLCanvasElement,
    array: number[]
): void {
    const operations = generateMergeSortOperations(array);
    const workingArray = [...array];

    let operationIndex = 0;
    let lastOperationTime = 0;

    let highlightedIndices: number[] = [];

    function animate(timestamp: number): void {
        if (operationIndex >= operations.length) {
            renderArray(canvas, workingArray);
            return;
        }

        if (timestamp - lastOperationTime >= ANIMATION_SPEED) {
            const operation = operations[operationIndex];

            if (operation.type === "compare") {
                highlightedIndices = [operation.left, operation.right];
            } else if (operation.type === "overwrite") {
                workingArray[operation.index] = operation.value;
                highlightedIndices = [];
            }

            operationIndex++;
            lastOperationTime = timestamp;

            renderArray(canvas, workingArray, highlightedIndices);
        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}
