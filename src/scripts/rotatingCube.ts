const SIZE = 20;
const SCALE = 15;
const CAMERA_DISTANCE = 40;

interface Point3D {
    x: number;
    y: number;
    z: number;
}

interface Point2D {
    x: number;
    y: number;
}

type Axis = "x" | "y" | "z";

class Cube {
    readonly points: Point3D[];

    constructor() {
        const half = SIZE / 2;

        this.points = [
            ...this.createPlane("z", half),
            ...this.createPlane("z", -half),
            ...this.createPlane("x", half),
            ...this.createPlane("x", -half),
            ...this.createPlane("y", half),
            ...this.createPlane("y", -half),
        ];
    }

    private createPlane(axis: Axis, value: number): Point3D[] {
        const points: Point3D[] = [];
        const half = SIZE / 2;

        for (let a = -half; a < half; a++) {
            for (let b = -half; b < half; b++) {
                switch (axis) {
                    case "x":
                        points.push({ x: value, y: a, z: b });
                        break;
                    case "y":
                        points.push({ x: a, y: value, z: b });
                        break;
                    case "z":
                        points.push({ x: a, y: b, z: value });
                        break;
                }
            }
        }

        return points;
    }
}

class Transformer {
    static rotateY(point: Point3D, angle: number): Point3D {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        return {
            x: point.x * cos + point.z * sin,
            y: point.y,
            z: -point.x * sin + point.z * cos,
        };
    }

    static rotateX(point: Point3D, angle: number): Point3D {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        return {
            x: point.x,
            y: point.y * cos - point.z * sin,
            z: point.y * sin + point.z * cos,
        };
    }

    static project(point: Point3D): Point2D {
        const factor = CAMERA_DISTANCE / (CAMERA_DISTANCE - point.z);

        return {
            x: point.x * factor,
            y: point.y * factor,
        };
    }
}

export function startCubeRotation(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Could not get 2D rendering context.");
    }

    ctx.font = "16px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const cube = new Cube();

    let angle = 0;

    function draw() {
        ctx!.clearRect(0, 0, canvas.width, canvas.height);

        for (const point of cube.points) {
            const rotated = Transformer.rotateY(
                Transformer.rotateX(point, angle * 0.8),
                angle
            );
            const projected = Transformer.project(rotated);

            const screenX = canvas.width / 2 + projected.x * SCALE;
            const screenY = canvas.height / 2 - projected.y * SCALE;

            ctx!.fillText(".", screenX, screenY);
        }
    }

    function animate() {
        draw();
        angle += 0.015;
        requestAnimationFrame(animate);
    }

    animate();
}
