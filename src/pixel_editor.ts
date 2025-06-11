import dino from './dino.png';
import init, { convert } from 'squre-marchinator';

init();

export default () => {

    const PIXEL_SIZE: [number, number] = [30, 24];
    const PIXEL_SIZE_MULT = 16;

    const outputCanvas = document.getElementById('output') as HTMLCanvasElement;
    outputCanvas.width = PIXEL_SIZE[0] * PIXEL_SIZE_MULT + PIXEL_SIZE_MULT;
    outputCanvas.height = PIXEL_SIZE[1] * PIXEL_SIZE_MULT + PIXEL_SIZE_MULT;
    const outCtx = outputCanvas.getContext('2d')!;

    function parseColor(colorStr: string): [number, number, number, number] {
        const ctx = document.createElement('canvas').getContext('2d')!;
        ctx.fillStyle = colorStr;
        ctx.fillRect(0, 0, 1, 1);
        const data = ctx.getImageData(0, 0, 1, 1).data;
        return [data[0], data[1], data[2], data[3]];
    }

    function processGrid() {
        const pixels = Array.from(document.querySelectorAll<HTMLDivElement>('#grid .pixel'));
        const buf = new Uint8Array(PIXEL_SIZE[0] * PIXEL_SIZE[1] * 4);
  
        pixels.forEach((pixel, i) => {
            const bg = pixel.dataset.color;
            if (bg) {
                const rgba = parseColor(bg);
                buf[i * 4 + 0] = rgba[0];
                buf[i * 4 + 1] = rgba[1];
                buf[i * 4 + 2] = rgba[2];
                buf[i * 4 + 3] = rgba[3];
            }
        });

        const result = convert(PIXEL_SIZE[0], PIXEL_SIZE[1], buf, 4., 4.);
        if (!result) {
            console.warn('WASM processing failed');
            return;
        }
        if (result.length !== outputCanvas.width * outputCanvas.height * 4) {
            console.error('Output buffer size mismatch', result.length, outputCanvas.width * outputCanvas.height * 4);
            return;
        }
        const imgData = new ImageData(new Uint8ClampedArray(result), outputCanvas.width, outputCanvas.height);
        outCtx.putImageData(imgData, 0, 0);
    }

    let currentSchedule: number | null= null;

    function scheduleProcessGrid() {
        if (currentSchedule != null) {
            clearTimeout(currentSchedule);
        }
        currentSchedule = setTimeout(() => {
            processGrid();
        }, 500);
    }

    let colors: string[] = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00'];
    let selectedColor: string = colors[0];

    const grid = document.getElementById('grid')!;
    const palette = document.getElementById('palette')!;

    let isPainting: null | 'color' | 'erase' = null;

    function togglePixel(pixel: HTMLElement) {
        if (isPainting === 'erase') {
            pixel.style.backgroundColor = 'rgba(255, 255, 255, 0.075)';
            pixel.dataset.color = '';
        } else if (isPainting === 'color') {
            pixel.style.backgroundColor = selectedColor;
            pixel.dataset.color = selectedColor;
        }
        scheduleProcessGrid();
    }

    const img = new Image();
    img.src = dino;
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = PIXEL_SIZE[0];
        canvas.height = PIXEL_SIZE[1];
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        const cols = new Set<string>();

        for (let i = 0; i < PIXEL_SIZE[0] * PIXEL_SIZE[1]; i++) {
            const r = imageData[(i * 4)];
            const g = imageData[(i * 4) + 1];
            const b = imageData[(i * 4) + 2];
            const a = imageData[(i * 4) + 3];
    
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            if (a === 0) {
                pixel.dataset.color = '';
            } else {
                pixel.dataset.color = `rgba(${r},${g},${b},${(a / 255).toFixed(2)})`;
                cols.add(pixel.dataset.color)
            }
            pixel.style.backgroundColor = pixel.dataset.color;

            pixel.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const currentColor = pixel.dataset.color;
                if (currentColor === selectedColor) {
                    isPainting = 'erase';
                } else {
                    isPainting = 'color';
                }
                togglePixel(pixel);
            });

            pixel.addEventListener('mouseenter', () => {
                if (isPainting) {
                    togglePixel(pixel);
                }
            });

            pixel.addEventListener('mouseup', () => {
                isPainting = null;
            });

            grid.appendChild(pixel);
        }

        colors = [...cols];
        selectedColor = colors[0];

        for (const color of colors) {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'color';
            colorDiv.style.backgroundColor = color;
            colorDiv.addEventListener('click', () => {
                selectedColor = color;
                document.querySelectorAll('.color').forEach(c => c.classList.remove('selected'));
                colorDiv.classList.add('selected');
            });
            palette.appendChild(colorDiv);
        }

        palette.firstElementChild!.classList.add('selected');

        setTimeout(processGrid, 1000);
    };

    grid.addEventListener('mouseleave', () => {
        isPainting = null;
    });

    window.addEventListener('mouseup', () => {
        isPainting = null;
    });
};