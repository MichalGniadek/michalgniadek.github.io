import './style.css'
import gun_in_a_well from './gun_in_a_well.png';
import assembler from './assembler.png';
import deamon from './deamon.png';
import protorunner_video from './protorunner.webm';
import protorunner from './protorunner.jpg';
// @ts-ignore
import jsdos_game from './bundle.jsdos?url';

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
      <div id="grid"></div>
      <div id="palette"></div>
    </div>
  </div>`;

for (const initF of afterInit) {
  initF();
}

// Pixel Editor

const colors: string[] = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00'];
let selectedColor: string = colors[0];

const grid = document.getElementById('grid')!;
const palette = document.getElementById('palette')!;

for (let i = 0; i < 16 * 16; i++) {
  const pixel = document.createElement('div');
  pixel.className = 'pixel';
  pixel.dataset.color = '';

  pixel.addEventListener('click', () => {
    const currentColor = pixel.dataset.color;
    if (currentColor === selectedColor) {
      pixel.style.backgroundColor = 'rgba(255, 255, 255, 0.075)';
      pixel.dataset.color = '';
    } else {
      pixel.style.backgroundColor = selectedColor;
      pixel.dataset.color = selectedColor;
    }
  });

  grid.appendChild(pixel);
}

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