import "./style.css";
import init_pixel_editor from "./pixel_editor";
import "./pixel_editor.css";
import init_nightsky, { cards } from "./nightsky";
import "./nightsky.css";
import gun_in_a_well from "./gun_in_a_well.png";
import steam from "./steam-logo-black-transparent.png";
import assembler from "./assembler.png";
import deamon from "./deamon.png";
import restoration from "./restoration.jpg";
import godot from "./godot.png";
import rust from "./rust.png";
import bevy from "./bevy.svg";
import star_map from "./star-map.png";
import fluid_sim from "./fluid-sim.png";
import script from "./script-6.svg";
import brightness from "./brightness-4.svg";
import images from "./images.svg";
import spider from "./bug-spider-3.svg";
import settings from "./settings.svg";
import book from "./book.svg";
import unity from "./unity.png";
// https://feathericons.com as MIT license
import play_icon from "./play.svg";
import protorunner_video from "./protorunner.webm";
import protorunner from "./protorunner.jpg";
// @ts-ignore
import jsdos_game from "./bundle.jsdos?url";

const afterInit: Array<() => void> = [init_pixel_editor, init_nightsky];

const pill = (
  img: string,
  text: string,
  invert: boolean = false,
  url: string | null = null
) => {
  let invertClass = "";
  if (invert) {
    invertClass = `invert"`;
  }

  if (url != null) {
    return `
    <a href=${url} class="pill">
      <img class="fancy_colors ${invertClass}" src=${img}>
      ${text}
    </a>
    `;
  } else {
    return `
    <div class="pill">
      <img class="fancy_colors ${invertClass}" src=${img}>
      ${text}
    </div>
  `;
  }
};

const pills = {
  godot: pill(godot, "Godot", false, "https://godotengine.org/"),
  gamedesign: pill(script, "Game Design", true),
  vfx: pill(brightness, "VFX", true),
  assembler: pill(spider, "Assembler", true),
  glsl: pill(images, "GLSL", true),
  unity: pill(unity, "Unity", true, "https://unity.com/"),
  rust: pill(rust, "Rust", false, "https://www.rust-lang.org/"),
  tool: pill(settings, "Tool", true),
  bevy: pill(bevy, "Bevy", false, "https://bevy.org/"),
  physical: pill(book, "Physical", true),
  // mobile: pill(godot, "Mobile"),
};

const desc = (title: string, body: string, right: boolean = false) => {
  let r = "";
  if (right) {
    r = "right";
  } else {
    r = "left";
  }
  return `
  <div class="description ${r}">
    <h1>
      ${title}
    </h1>
    ${body}
  </div>
  `;
};

const showcase = (
  id: string,
  right: boolean,
  img: string,
  text: string,
  pills: string[],
  onClick: string,
  onClickInit: () => void = () => {}
) => {
  let r = "";
  if (right) {
    r = "right";
  } else {
    r = "left";
  }

  const embed_id = id + "_embed";
  const button_id = id + "_button";

  afterInit.push(() => {
    const btn = document.querySelector<HTMLButtonElement>(`#${button_id}`)!;
    const embed = document.querySelector<HTMLDivElement>(`#${embed_id}`)!;
    btn.addEventListener("click", () => {
      btn.classList.add("clicked");
      embed.innerHTML = onClick;
      embed.style = "display: none";
      onClickInit();
      setTimeout(() => {
        embed.style = "";
        btn.parentElement!.removeChild(btn);
      }, 200);
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
    `;
};

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="toplevel ibm-plex-sans">
    <div class="header">
      <h1>  
        Michał Gniadek —  Hi!
      </h1>
      I'm a programmer, game developer and a game designer who loves experimenting and jumping into new things.
      I'm interested in everything games: digital, physical, serious, not serious, game studies and everything in between.
    </div>

    ${desc(
      "Gun in a Well",
      "An action roguelike where the only way to dodge is to shoot. Jump around using recoil, kill enemies with bullets, destroy them with electricity or burn them to a crisp. Manage health and ammo, choose your upgrades, break the game and reach the bottom of the well!" +
        pill(
          steam,
          "Steam",
          true,
          "https://store.steampowered.com/app/3509950/Gun_in_a_Well"
        ) +
        pill(
          book,
          "Read GDD",
          true,
          "https://docs.google.com/document/d/1QmWzavC7sPQ4W5hAaHghU5D2UPZIBXyFjJylpJIrC14/edit?usp=sharing"
        )
    )}
    ${showcase(
      "gun_in_a_well",
      true,
      gun_in_a_well,
      "Click to run",
      [pills.godot, pills.gamedesign, pills.vfx],
      `
      <iframe class="itch_embed top-bottom-border" frameborder="0" src="https://itch.io/embed-upload/13659283?color=141414" allowfullscreen="">
        <a href="https://naruvan.itch.io/gun-in-a-well">Play Gun in a Well on itch.io</a>
      </iframe>
    `
    )}

    ${desc(
      "Blob Clock",
      "Real time clock running in real time on GPU using the ray marching method. Use left mouse button to play around with blobs.",
      true
    )}
    <div class="showcase big left">
      <iframe class="shadertoy_embed top-bottom-border" frameborder="0" src="https://www.shadertoy.com/embed/3fd3zX?gui=false&t=10&paused=false&muted=false" allowfullscreen></iframe>
      <div class="pills left">
        ${[pills.glsl, pills.vfx].join("")}
      </div>
    </div>

    ${desc(
      "Assembler Raycasting",
      "Old-school raycasting inspired by classic games, written entirely in Assembly and running in 16-bit DOS. Use arrow keys to move.",
      false
    )}
    ${showcase(
      "assebler",
      true,
      assembler,
      "Click to run",
      [pills.assembler],
      `
      <div id="dos" class="top-bottom-border" tabindex="0"></div>
    `,
      () => {
        // @ts-expect-error
        const dos = Dos(document.getElementById("dos"), {
          url: jsdos_game,
          autoStart: true,
          kiosk: true,
          noCloud: true,
        });
      }
    )}

    ${desc(
      "Extremely Ok Painting Restoration Studio",
      "The game took Sixth place in the Polish GameDev GameJam and was created in a team of four people. <p> The player is tasked with restoring classic Polish paintings to their former glory. They must clear the grime from the surface and retouch the image, hopefully not worsening the damage themselves.",
      true
    )}
    ${showcase(
      "restoration",
      false,
      restoration,
      "Click to watch",
      [pills.unity, pills.gamedesign],
      `
      <div class="showcase big">
        <iframe class="video_embed top-bottom-border" src="https://www.youtube.com/embed/5fttXWCcJEc?si=512SX2hHcefYK568&start=92&mute=1&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    `
    )}
    
    ${desc(
      "Daemon Resource Department",
      "A prototype of a strategic roguelike in which you play a corporate demon banisher. Buy spells from the Windows 95 inspired productivity software, visit potion cafeteria and destroy demons!",
      false
    )}
    ${showcase(
      "deamon",
      true,
      deamon,
      "Click to run",
      [pills.godot, pills.gamedesign, pills.vfx],
      `
      <iframe class="itch_embed top-bottom-border" frameborder="0" src="https://itch.io/embed-upload/13137580?color=141414" allowfullscreen="">
        <a href="https://naruvan.itch.io/daemon-resources-department">Play Daemon Resources Department on itch.io</a>
      </iframe>
    `
    )}

    ${desc(
      "Protorunner",
      "Short and sweet 3D parkour game. Run, jump, climb and wall run in a minimalist world and get in the flow with satisfying mechanics. Prove your skills in varied challenges and try to finish them as fast as you can. ",
      true
    )}
    ${showcase(
      "protorunner",
      false,
      protorunner,
      "Click to watch",
      [pills.unity, pills.gamedesign],
      `
      <video class="video_embed top-bottom-border" controls autoplay muted>
        <source src=${protorunner_video}>
      </video>
    `
    )}
    
    ${desc(
      "Square Marchinator",
      "A tool for converting pixel art images into high-resolution pictures and trying to convey a more hand-drawn feel. Successfully used in multiple other games and prototypes."
    )}
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

    ${desc(
      "Fluid Simulation",
      "Simulation based on Lattice Boltzmann Method, written in Rust using the Bevy game engine. The fluid flows from left to right, through an obstacle.",
      true
    )}
    ${showcase(
      "fluid",
      false,
      fluid_sim,
      "Click to run",
      [pills.rust, pills.bevy],
      `
      <iframe class="itch_embed top-bottom-border" frameborder="0" src="https://itch.io/embed-upload/13976995?color=141414" allowfullscreen="">
        <a href="https://naruvan.itch.io/fluid-sim">Play Daemon Resources Department on itch.io</a>
      </iframe>
    `
    )}

    ${desc(
      "The Nightsky",
      "A finalist of GenCant 18 Card Flip and Write Challenge. <p> A game where any number of players are tasked with creating a complex constellation out of colourful stars using just a deck of cards, piece of paper and a pen" +
        pill(
          book,
          "Read Manual",
          true,
          "https://drive.google.com/file/d/153kmZe16xE8_qR6NUyYYeHrjAf068j4Y/view?usp=drive_link"
        ),
      false
    )}
    <div class="showcase big right">
      <div id="starImageContainer" class="top-bottom-border">
        <img src=${star_map} id="starImage" />
        <svg id="starImageSVGOverlay" class="fancy_colors"></svg>
        ${cards[0]}
        ${cards[1]}
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
