import './style.css'
import gun_in_a_well from './gun_in_a_well.png';
import assembler from './assembler.png';
import deamon from './deamon.png';
import wizard_pixelart from './wizard_pixelart.png';
import protorunner_video from './protorunner.webm';
import protorunner from './protorunner.jpg';
// @ts-ignore
import jsdos_game from './bundle.jsdos?url';
import init, { convert } from 'squre-marchinator';

init();

const afterInit: Array<() => void> = [];

const desc = (title: string, body: string, right: boolean = false) => {
  let r = "";
  if (right) {
    r = "right";
  };
  return `
  <div class="description ${r}">
    <h1>
      ${title}
    </h1>
    ${body}
  </div>
  `;
}

const showcase = (id: string, img: string, text: string, onClick: string, onClickInit: () => void = () => { }) => {
  afterInit.push(() => {
    const gunInAWellImg = document.querySelector<HTMLButtonElement>(`#${id}`)!;
    gunInAWellImg.addEventListener("click", () => {
      gunInAWellImg.parentElement!.innerHTML = onClick;
      onClickInit();
    });
  });
  return `
     <div class="showcase big">
      <button id=${id} class="showcase_button">
        <img src=${img}>
        <div>
          ${text}
        </div>
      </button>
    </div>
    `
};

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="toplevel">
    ${desc("Gun in a Well", "asd")}
    ${showcase("gun_in_a_well", gun_in_a_well, "Click to run", `
      <iframe class="itch_embed" frameborder="0" src="https://itch.io/embed-upload/13659283?color=141414" allowfullscreen="">
        <a href="https://naruvan.itch.io/gun-in-a-well">Play Gun in a Well on itch.io</a>
      </iframe>
    `)}
    
    ${showcase("assebler", assembler, "Click to run", `
      <div id="dos" tabindex="0"></div>
    `, () => {
      // @ts-expect-error
      const dos = Dos(document.getElementById("dos"), {
        url: jsdos_game,
        autoStart: true,
        kiosk: true,
        noCloud: true,
      });
    })}
    ${desc("Assembler stuffs", "asd", true)}

    ${desc("Shader Clock", "asd")}
    <div class="showcase big">
      <iframe class="shadertoy_embed" frameborder="0" src="https://www.shadertoy.com/embed/3fd3zX?gui=false&t=10&paused=false&muted=false" allowfullscreen></iframe>
    </div>


    ${showcase("deamon", deamon, "Click to run", `
      <iframe class="itch_embed" frameborder="0" src="https://itch.io/embed-upload/13137580?color=141414" allowfullscreen="">
        <a href="https://naruvan.itch.io/daemon-resources-department">Play Daemon Resources Department on itch.io</a>
      </iframe>
    `)}
    ${desc("Daemon Resource Department", "asd", true)}

    ${desc("EXTREMELY OK PAINTING RESTORATION STUDIO", "asd")}
    <div class="showcase big">
      <iframe class="video_embed" src="https://www.youtube.com/embed/5fttXWCcJEc?si=512SX2hHcefYK568&start=92&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>

    
    ${showcase("protorunner", protorunner, "Click to watch", `
      <video class="video_embed" controls autoplay muted>
        <source src=${protorunner_video}>
      </video>
    `)}
    ${desc("Protunner", "asd")}
    
    ${desc("Square Marchinator", "asd")}
    <div class="showcase big">
      <div class="square_marchinator">
        <div>
          <div id="grid"></div>
          <div id="palette"></div>
        </div>
        <canvas id="output" style="width: 320px; height: 320px;"></canvas>
      </div>
    </div>
  </div>`;

for (const initF of afterInit) {
  initF();
}

// Pixel Editor

const outputCanvas = document.getElementById('output') as HTMLCanvasElement;
outputCanvas.width = 16 * 16 + 16;
outputCanvas.height = 16 * 16 + 16;
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
  const buf = new Uint8Array(16 * 16 * 4);
  
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

  const result = convert(16, 16, buf, 3., 2.);
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

let isProcessing = false;
let scheduled = false;

function scheduleProcessGrid() {
  if (isProcessing) {
    scheduled = true;
    return;
  }
  isProcessing = true;
  processGrid();
  setTimeout(() => {
    isProcessing = false;
    if (scheduled) {
      scheduled = false;
      scheduleProcessGrid();
    }
  }, 250);
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
img.src = wizard_pixelart;
img.onload = () => { 
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  const cols = new Set<string>();

  for (let i = 0; i < 16 * 16; i++) {
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

  setTimeout(processGrid, 1000);
};

grid.addEventListener('mouseleave', () => {
  isPainting = null;
});

window.addEventListener('mouseup', () => {
  isPainting = null;
});

palette.firstElementChild!.classList.add('selected');