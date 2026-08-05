interface Point3D {
    x: number;
    y: number;
    z: number;
}

interface Point2D {
    x: number;
    y: number;
}

const SCALE = 15;
const CAMERA_DISTANCE = 40;
const MAJOR_RADIUS = 10;
const MINOR_RADIUS = 5;
const MAJOR_SEGMENTS = 50;
const MINOR_SEGMENTS = 30;

class Torus {
    readonly points: Point3D[];

    constructor() {
        this.points = this.createTorus(
            MAJOR_RADIUS,
            MINOR_RADIUS,
            MAJOR_SEGMENTS,
            MINOR_SEGMENTS
        );
    }

    private createTorus(
        majorRadius: number,
        minorRadius: number,
        majorSegments: number,
        minorSegments: number
    ): Point3D[] {
        const points: Point3D[] = [];

        for (let i = 0; i < minorSegments; i++) {
            const phi = (i / minorSegments) * 2 * Math.PI;

            for (let j = 0; j < majorSegments; j++) {
                const theta = (j / majorSegments) * 2 * Math.PI;

                const x =
                    (majorRadius + minorRadius * Math.cos(phi)) *
                    Math.cos(theta);
                const y = minorRadius * Math.sin(phi);

                const z =
                    (majorRadius + minorRadius * Math.cos(phi)) *
                    Math.sin(theta);

                points.push({ x, y, z });
            }
        }

        return points;
    }
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

function rotateX(point: Point3D, angle: number): Point3D {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return {
        x: point.x,
        y: point.y * cos - point.z * sin,
        z: point.y * sin + point.z * cos,
    };
}

function project(point: Point3D): Point2D {
    const factor = CAMERA_DISTANCE / (CAMERA_DISTANCE - point.z);

    return {
        x: point.x * factor,
        y: point.y * factor,
    };
}

export function startTorusRotation(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Could not get 2D rendering context.");
    }

    ctx.font = "16px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const torus = new Torus();
    const points = torus.points;

    let angle = 0;

    function draw() {
        ctx!.clearRect(0, 0, canvas.width, canvas.height);

        for (const point of points) {
            const rotated = rotateY(rotateX(point, angle * 0.8), angle);
            //const rotated = rotateY(point, angle);

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
