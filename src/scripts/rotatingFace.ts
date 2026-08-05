interface Point3D {
    x: number;
    y: number;
    z: number;
}

interface Point2D {
    x: number;
    y: number;
}

const SIZE = 20;
const SCALE = 15;
const CAMERA_DISTANCE = 40;

function createFace(): Point3D[] {
    const points: Point3D[] = [];

    for (let y = -SIZE / 2; y < SIZE / 2; y++) {
        for (let x = -SIZE / 2; x < SIZE / 2; x++) {
            points.push({ x, y, z: 0 });
        }
    }

    return points;
}

function rotateY(point: Point3D, angle: number): Point3D {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return {
        x: point.x * cos + point.z * sin,
        y: point.y,
        z: -point.x * sin + point.z * cos,
    };
}

function project(point: Point3D): Point2D {
    const factor = CAMERA_DISTANCE / (CAMERA_DISTANCE - point.z);

    return {
        x: point.x * factor,
        y: point.y * factor,
    };
}

export function startFaceRotation(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Could not get 2D rendering context.");
    }

    ctx.font = "16px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const points = createFace();

    let angle = 0;

    function draw() {
        ctx!.clearRect(0, 0, canvas.width, canvas.height);

        for (const point of points) {
            const rotated = rotateY(point, angle);

            const projected = project(rotated);

            const screenX = canvas.width / 2 + projected.x * SCALE;
            const screenY = canvas.height / 2 - projected.y * SCALE;

            ctx!.fillText(".", screenX, screenY);
        }
    }

    function animate() {
        draw();
        angle += 0.01;
        requestAnimationFrame(animate);
    }

    animate();
}
