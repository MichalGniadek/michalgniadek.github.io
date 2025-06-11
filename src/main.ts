import './style.css';
import init_pixel_editor from './pixel_editor';
import './pixel_editor.css';
import gun_in_a_well from './gun_in_a_well.png';
import assembler from './assembler.png';
import deamon from './deamon.png';
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
  <div class="toplevel ibm-plex-sans">
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

    ${desc("The Nightsky", "asd" + pill(godot, "Read Manual (EN)", "https://drive.google.com/file/d/153kmZe16xE8_qR6NUyYYeHrjAf068j4Y/view?usp=drive_link") + "asd", false)}
    <div class="showcase big right">
      <div class="container" id="imageContainer">
        <img src="deb0e130-06d5-43b4-a0de-6501e2f5e468.png" id="starImage" />
        <svg id="svgOverlay"></svg>
      </div>
      <div class="pills right">
        ${[pills.physical, pills.gamedesign].join("")}
      </div>
    </div>
    
    </div>`;
    
// ${showcase("stars", true, deamon, "Click to run", [pills.physical, pills.gamedesign], `
//  // TODO
// `)}



// ${desc("Quick! Star Adventure", "asd" + pill(godot, "Read Manual (PL)", "https://docs.google.com/document/d/1PWics277INgrgUChXesr9yj4wXu-0R_LA31JhHfeAOM/edit?usp=sharing") + "asd", false)}
//     ${showcase("quick", true, deamon, "Click to run", [pills.physical, pills.gamedesign, pills.mobile], `
//      // TODO
//     `)}

for (const initF of afterInit) {
  initF();
}

init_pixel_editor();