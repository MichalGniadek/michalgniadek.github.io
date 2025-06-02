import './style.css'
import gun_in_a_well from './gun_in_a_well.png';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="toplevel shantell-sans">
      <div class="description">
        <h1>
          Gun in a Well
        </h1>
        asdsada asd
asdasdsdfdfgfdggdhf
        asdasd as
      </div>
      
      <div class="showcase">
        <button id="guninawell_img" class="guninawell_img">
          <img src=${gun_in_a_well}>
          <div>
            Click to play
          </div>
        </button>

        <iframe id="guninawell_embed" class="hidden" frameborder="0" src="https://itch.io/embed-upload/13659283?color=141414" allowfullscreen="">
          <a href="https://naruvan.itch.io/gun-in-a-well">Play Gun in a Well on itch.io</a>
        </iframe>
    </div>
  </div>
`

const gunInAWellImg = document.querySelector<HTMLButtonElement>("#guninawell_img")!;
gunInAWellImg.addEventListener("click", () => {
  document.querySelector<HTMLImageElement>("#guninawell_embed")!.className = "";
  gunInAWellImg.className = "hidden";
});
