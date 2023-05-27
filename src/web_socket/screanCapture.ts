import {screen, Region, mouse} from "@nut-tree/nut-js";
import Jimp from "jimp";

export const makeScreanShot = async () => {
    const cursorPos = await mouse.getPosition();

    const img = await screen.grabRegion(new Region(cursorPos.x, cursorPos.y, 200, 200));

    const imgData = await new Jimp(await img.toRGB()).getBase64Async(Jimp.MIME_PNG);

    return imgData.replace("data:image/png;base64,", "");
}