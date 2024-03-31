# Embedding a BabylonJS app into a parent app and communicate between the two apps

## Start the client BabylonJS app

```bash
cd babylonjs-embedding
cd client
npm i
npm run dev
```

Have a look at the console and notice the port which the app was started on. Usually 5173. If it starts on this port you can skip this step, if not open `host/src/pages/IndexPage.vue` and set the port in the `url` of the `postmateOptions` in the `onMounted` callback function. Located around line 60.

## Start the host Quasar 2/Vue 3 app

```bash
cd ..
cd host
npm i
npm run dev
```

Now if you manipulate the camera on the scene the sliders will reflect the camera values. By pressing the `GET BOX COLOR` button you get the color of the box. You can change the material color in the inspector and click on the button again so it always gives you the color at that given time. You can click on the two reamining buttons to position the camera on the scene.

Uses the cool messaging library from <https://github.com/dollarshaveclub/postmate>. You should definitely check the docs here to understand the underlying functionality.
