import './style.css'
import gun_in_a_well from './gun_in_a_well.png';
import assembler from './assembler.png';
import deamon from './deamon.png';
import tile from './tile4.png';
import restoration from './restoration.jpg';
import godot from './godot.png';
import rust from './rust.png';
import bevy from './bevy.svg';
// https://feathericons.com as MIT license
import play_icon from './play.svg';
import protorunner_video from './protorunner.webm';
import protorunner from './protorunner.jpg';
// @ts-ignore
import jsdos_game from './bundle.jsdos?url';
import init, { convert } from 'squre-marchinator';

init();

const afterInit: Array<() => void> = [];

const pill = (img: string, text: string, url: string | null = null) => {
  if (url != null) {
    return `
    <a href=${url} class="pill">
      <img class="fancy_colors" src=${img}>
      ${text}
    </a>
    `  
  } else {
    return `
    <div class="pill">
      <img class="fancy_colors" src=${img}>
      ${text}
    </div>
  `
  }
}

const pills = {
  godot: pill(godot, "Godot", "https://godotengine.org/"),
  gamedesign: pill(godot, "Game Design"),
  vfx: pill(godot, "VFX"),
  assembler: pill(godot, "Assembler"),
  glsl: pill(godot, "GLSL"),
  unity: pill(godot, "Unity", "https://unity.com/"),
  rust: pill(rust, "Rust", "https://www.rust-lang.org/"),
  tool: pill(godot, "Tool"),
  bevy: pill(bevy, "Bevy", "https://bevy.org/"),
  physical: pill(godot, "Physical"),
  mobile: pill(godot, "Mobile"),
};

const desc = (title: string, body: string, right: boolean = false) => {
  let r = "";
  if (right) {
    r = "right";
  } else {
    r = "left"
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

const showcase = (id: string, right: boolean, img: string, text: string, pills: string[], onClick: string, onClickInit: () => void = () => { }) => {
  let r = "";
  if (right) {
    r = "right";
  } else {
    r = "left"
  };
  
  const embed_id = id + "_embed";
  const button_id = id + "_button";

  afterInit.push(() => {
    const btn = document.querySelector<HTMLButtonElement>(`#${button_id}`)!;
    const embed = document.querySelector<HTMLDivElement>(`#${embed_id}`)!;
    btn.addEventListener("click", () => {
      btn.classList.add("clicked");
      embed.innerHTML = onClick;
      embed.style = "display: none"
      onClickInit();
      setTimeout(() => {
        embed.style = "";
        btn.parentElement!.removeChild(btn);
      }, 200)
    });
  });
  return `
     <div class="showcase big ${r}">
      <div>
        <button id=${button_id} class="showcase_button">
          <img class="top-bottom-border" src=${img}>
          <div class="fill play_img fancy_colors">
            <img src=${play_icon}>
          </div>
          <div class="fill text fancy_colors">
            ${text}
          </div>
        </button>
      </div>
      <div id=${embed_id}></div>
      <div class="pills">
        ${pills.join("")}
      </div>
    </div>
    `
};

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="toplevel">
    ${desc("Gun in a Well", "asd" + pill(godot, "Read GDD", "https://docs.google.com/document/d/1QmWzavC7sPQ4W5hAaHghU5D2UPZIBXyFjJylpJIrC14/edit?usp=sharing") + "asd")}
    ${showcase("gun_in_a_well", true, gun_in_a_well, "Click to run", [pills.godot, pills.gamedesign, pills.vfx], `
      <iframe class="itch_embed top-bottom-border" frameborder="0" src="https://itch.io/embed-upload/13659283?color=141414" allowfullscreen="">
        <a href="https://naruvan.itch.io/gun-in-a-well">Play Gun in a Well on itch.io</a>
      </iframe>
    `)}

    ${desc("Daemon Resource Department", "asd", true)}
    ${showcase("deamon", false, deamon, "Click to run", [pills.godot, pills.gamedesign, pills.vfx], `
      <iframe class="itch_embed top-bottom-border" frameborder="0" src="https://itch.io/embed-upload/13137580?color=141414" allowfullscreen="">
        <a href="https://naruvan.itch.io/daemon-resources-department">Play Daemon Resources Department on itch.io</a>
      </iframe>
    `)}

    ${desc("Shader Clock", "asd")}
    <div class="showcase big right">
      <iframe class="shadertoy_embed top-bottom-border" frameborder="0" src="https://www.shadertoy.com/embed/3fd3zX?gui=false&t=10&paused=false&muted=false" allowfullscreen></iframe>
      <div class="pills right">
        ${[pills.glsl, pills.vfx].join("")}
      </div>
    </div>

    ${desc("Assembler stuffs", "asd", true)}
    ${showcase("assebler", false, assembler, "Click to run", [pills.assembler], `
      <div id="dos" class="top-bottom-border" tabindex="0"></div>
    `, () => {
      // @ts-expect-error
      const dos = Dos(document.getElementById("dos"), {
        url: jsdos_game,
        autoStart: true,
        kiosk: true,
        noCloud: true,
      });
    })}

    ${desc("Extremely Ok Painting Restoration Studio", "asd")}
    ${showcase("restoration", true, restoration, "Click to watch", [pills.unity, pills.gamedesign], `
      <div class="showcase big">
        <iframe class="video_embed top-bottom-border" src="https://www.youtube.com/embed/5fttXWCcJEc?si=512SX2hHcefYK568&start=92&mute=1&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    `)}
    
    ${desc("Protorunner", "asd", true)}
    ${showcase("protorunner", false, protorunner, "Click to watch", [pills.unity, pills.gamedesign], `
      <video class="video_embed top-bottom-border" controls autoplay muted>
        <source src=${protorunner_video}>
      </video>
    `)}
    
    ${desc("Square Marchinator", "asd")}
    <div class="showcase big right">
      <div class="square_marchinator top-bottom-border">
        <div>
          <div id="grid"></div>
          <div id="palette"></div>
        </div>
        <canvas id="output"></canvas>
      </div>
      <div class="pills right">
        ${[pills.rust, pills.tool].join("")}
      </div>
    </div>

    ${desc("Fluid Simulation", "asd", true)}
    ${showcase("fluid", false, deamon, "Click to run", [pills.rust, pills.bevy], `
     // TODO
    `)}

    ${desc("Quick! Star Adventure", "asd" + pill(godot, "Read Manual (PL)", "https://docs.google.com/document/d/1PWics277INgrgUChXesr9yj4wXu-0R_LA31JhHfeAOM/edit?usp=sharing") + "asd", false)}
    ${showcase("quick", true, deamon, "Click to run", [pills.physical, pills.gamedesign, pills.mobile], `
     // TODO
    `)}

    ${desc("The Nightsky", "asd" + pill(godot, "Read Manual (EN)", "https://docs.google.com/document/d/1rBhy3hmvSn_Y10s-qRRIhcGWPf7vP6mEJt1ecXf9cug/edit?usp=sharing") + "asd", true)}
    ${showcase("stars", false, deamon, "Click to run", [pills.physical, pills.gamedesign], `
     // TODO
    `)}
  </div>`;

for (const initF of afterInit) {
  initF();
}

// Pixel Editor

const PIXEL_SIZE = 18;
const PIXEL_SIZE_MULT = 16;

const outputCanvas = document.getElementById('output') as HTMLCanvasElement;
outputCanvas.width = PIXEL_SIZE * PIXEL_SIZE_MULT + PIXEL_SIZE_MULT;
outputCanvas.height = PIXEL_SIZE * PIXEL_SIZE_MULT + PIXEL_SIZE_MULT;
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
  const buf = new Uint8Array(PIXEL_SIZE * PIXEL_SIZE * 4);
  
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

  const result = convert(PIXEL_SIZE, PIXEL_SIZE, buf, 3., 2.);
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
img.src = tile;
img.onload = () => { 
  const canvas = document.createElement('canvas');
  canvas.width = PIXEL_SIZE;
  canvas.height = PIXEL_SIZE;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  const cols = new Set<string>();

  for (let i = 0; i < PIXEL_SIZE * PIXEL_SIZE; i++) {
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