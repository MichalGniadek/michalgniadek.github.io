
import card_back_a from './card-back-a.png';
import card_front_a from './card-front-a.png';
import card_back_b from './card-back-b.png';
import card_front_b from './card-front-b.png';

const card = (front: string, back: string, id: number) => { 
    return `
    <div class="card card${id}">
        <div class="card-inner">
            <div class="card-front">
                <img src=${front}>
            </div>
            <div class="card-back">
                <img src=${back}>
            </div>
        </div>
    </div>
    `;
}; 

export const cards = [
    card(card_back_a, card_front_a, 1),
    card(card_back_b, card_front_b, 2),
]

export default () => { 
    const img = document.getElementById("starImage") as HTMLImageElement;
    // @ts-ignore
    const svg = document.getElementById("starImageSVGOverlay") as SVGElement;
    const container = document.getElementById("starImageContainer") as HTMLDivElement;

    img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    };

    container.addEventListener("mouseenter", () => {
    drawAnimatedLines(true);
    });

    container.addEventListener("mouseleave", () => {
    drawAnimatedLines(false);
    });

    function drawAnimatedLines(show: boolean) {
    svg.innerHTML = "";
    
    const lines: [[number, number], [number, number], number][] = [
        [[160, 110], [60, 40], 1],
        [[160, 110], [157, 50], 1],
        [[160, 110], [145, 226], 1],
        [[83, 211], [145, 226], 2],
        [[83, 211], [35, 160], 2],
        [[142, 330], [145, 226], 3],
        [[142, 330], [60, 300], 3],
        [[142, 330], [202, 345], 3],
        [[190, 466], [70, 487], 4],
        [[190, 466], [202, 345], 4],
        [[33, 415], [60, 300], 5],
        [[33, 415], [70, 487], 5],
    ];

    lines.forEach(([[x1, y1], [x2, y2], delay]) => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const d = `M${x1},${y1} L${x2},${y2}`;
        path.setAttribute("d", d);
        path.setAttribute("stroke", "#EE4266");
        path.setAttribute("stroke-width", "7");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("fill", "none");

        const length = Math.hypot(x2 - x1, y2 - y1);
        path.setAttribute("stroke-dasharray", length.toString());

        const targetLength = ["0", length.toString()];

        path.setAttribute("stroke-dashoffset", targetLength[+show]);

        let delay_ = delay / 15;
        if (!show) {
        delay_ /= 3;
        }

        path.style.transition = `stroke-dashoffset 0.2s ease-out ${delay_}s`;
        
        svg.appendChild(path);

        requestAnimationFrame(() => {
        path.setAttribute("stroke-dashoffset", targetLength[+!show]);
        });
    });
    }
}