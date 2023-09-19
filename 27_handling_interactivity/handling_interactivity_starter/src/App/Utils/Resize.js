import { sizesStore } from "./Store";

export default class Resize {
    constructor() {

        const { setState } = sizesStore

        window.addEventListener("resize", () => {
            setState({
                width: window.innerWidth,
                height: window.innerHeight,
                pixelRatio: Math.min(window.devicePixelRatio, 2),
            })
          
          });

    }
}