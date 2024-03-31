import { ArcRotateCamera, StandardMaterial } from "@babylonjs/core";
import { AppOne as App } from "./AppOne";
import { initPostmate } from "./embedding/postmateClient";
import Postmate from "../../types/postmate";

console.log(`main.ts starting ${App.name}`);
window.addEventListener("DOMContentLoaded", async () => {
    let canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    let app = new App(canvas);
    app.run();

    const scene = app.scene;
    const material = <StandardMaterial>scene.getMaterialByName("material");
    const camera = <ArcRotateCamera>scene.activeCamera;

    let child: Postmate.ChildAPI;
    const postmateModel: any = {
        // Expose your model to the Parent. Property values may be functions, promises, or regular values
        boxColor: () => {
            if (material?.diffuseColor) {
                return material.diffuseColor.toHexString();
            }
            return "#000000";
        },
        lookFromAbove: async (value: number) => {
            camera.alpha = 0;
            camera.beta = 0;
            camera.radius = value;
        },
    };
    // When parent <-> child handshake is complete, events may be emitted to the parent
    child = await initPostmate(postmateModel);

    const emitCamera = () => {
        child?.emit("camera", {
            alpha: camera.alpha,
            beta: camera.beta,
            radius: camera.radius,
        });
    };

    scene.onBeforeRenderObservable.add(() => {
        emitCamera();
    });
});
