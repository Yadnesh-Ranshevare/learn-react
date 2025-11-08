# Content

1. [Introduction](#introduction)
2. [Installation And Set up](#installation-and-set-up)
3. [Canvas and mesh Component](#canvas-and-mesh-component)
4. [light components in React Three Fiber (R3F)](#light-components-in-react-three-fiber-r3f)
5. [mesh Geometries/Material](#mesh-geometriesmaterial)
6. [Repositioning mesh/3D Object](#repositioning-mesh3d-object)
7. [useFrame()](#useframe)
8. [camera](#camera)
9. [@react-three/drei](#react-threedrei)
10. [helpers](#helpers) 
11. [Integrate 3D Models](#integrate-3d-models)

---

# Introduction

React Three Fiber (R3F) is a React renderer for Three.js, which means it lets you build 3D graphics and animations using React components instead of directly writing Three.js code.

### Three Js

Three.js is a JavaScript 3D graphics library that makes it easy to create 3D scenes, animations, and visual effects in the browser — using WebGL under the hood.

> Think of WebGL as a low-level graphics engine — powerful, but hard to use.

Three.js is like a friendly layer on top of WebGL that gives you ready-made tools to:

-   Create 3D objects (meshes, lights, cameras)
-   Load 3D models, textures, and materials
-   Add animations, shadows, and physics
-   Render it all in the browser with just JavaScript.

### Impacts

1. **Performance Impact**

    - R3F uses WebGL (via Three.js) to render 3D scenes on the GPU.
    - This means: - 3D rendering = more CPU/GPU usage compared to normal HTML/CSS. - Large or complex 3D scenes (many models, lights, shadows) can slow down low-end devices.
        > Use 3D only where it adds value (like interactive backgrounds, product views, or small 3D components). You can also use suspense + lazy loading to load 3D parts separately.

2. **Visual/UX Impact**

    - It gives your website a modern, interactive, and immersive feel.
    - You can:
        - Add 3D animations, rotating models, backgrounds, or scroll-linked scenes.
        - Improve engagement — users often stay longer on sites with 3D visuals.

3. **Bundle Size Impact**
    - R3F adds extra weight (~150–200 KB depending on what you import). If your site doesn’t need 3D, that’s unnecessary load time.
        > Optimization Tip:
        >
        > Dynamically import R3F components with next/dynamic or React.lazy.
        >
        > Use @react-three/drei helpers instead of manually creating everything — they’re optimized.

[Go To Top](#content)

---

# Installation And Set up

### Step 1: install React

```bash
npm create vite@latest
```

### Step 2: Get Inside your React Project

```bash
cd my-app
```

### Step 3: install R3F

```bash
npm install three @react-three/fiber
```

Next.js supports React Three Fiber automatically, but if you use some extra Three.js-based libraries, you may need to configure Next.js to process them properly.

**For Next.Js 13.1 or latest Version**

-   You need to add three to `transpilePackages` property in `next.config.js`:
    `js
    transpilePackages: ['three'],
    `
    **For Next.Js 13.1 or oldest Version**

-   You can install the `next-transpile-modules` module:
    ```bash
    npm install next-transpile-modules --save-dev
    ```
-   then, add this to your `next.config.js`
    ```js
    const withTM = require("next-transpile-modules")(["three"]);
    module.exports = withTM();
    ```
-   Make sure to check out our [official next.js starter](https://github.com/pmndrs/react-three-next), too!

[Go To Top](#content)

---

# Canvas and mesh Component

These two are the core building blocks of React Three Fiber (R3F).

### 1. `<Canvas>` Component

-   It’s the root of every React Three Fiber scene.
-   Think of it like ReactDOM’s `<div id="root">`, but for 3D.
-   It automatically sets up: 
    - The Three.js renderer 
    - A scene 
    - A camera 
    - The render loop (to keep rendering frames)
    > Basically, `<Canvas>` creates the 3D world where everything (lights, objects, camera) will live.

**Example:**

```js
<Canvas style={{ background: "lightblue" }}>
    {/* All your 3D objects go here */}
</Canvas>
```

### 2. `<mesh>` Component

-   A mesh is a 3D object — it combines:
    -   Geometry (the shape — e.g., box, sphere, plane)
    -   Material (the look — e.g., color, metal, glass)
-   Every visible object in your 3D scene is a mesh.

**Example:**

```js
<mesh>
    <boxGeometry />
</mesh>
```

### Combine Canvas and mesh
```js
import { Canvas } from "@react-three/fiber";

export default function R3F() {
    return (
        <>
            <Canvas>
                <mesh>
                    <boxGeometry />
                </mesh>
            </Canvas>
        </>
    );
}
```
> This will simply display a Box on our screen

[Go To Top](#content)

---
# light components in React Three Fiber (R3F)
| **Light Type**                                       | **Shape / Effect**                             | **Key Properties**                                                                       | **Casts Shadows** | **Common Use Case**                         |
| ---------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------- | ------------------------------------------- |
| [**`<ambientLight>`**](#1-ambientlight)                                 | Fills scene evenly with soft light             | `color`, `intensity`                                                                     | ❌                 | Basic global light; removes full darkness   |
| [**`<directionalLight>`**](#2-directionallight)                             | Light from one direction, like sunlight        | `color`, `intensity`, `position`, `castShadow`, `shadow-*`                               | ✅                 | Sunlight or moonlight                       |
| [**`<pointLight>`**](#3-pointlight)                                  | Emits light in all directions from a point     | `color`, `intensity`, `position`, `distance`, `decay`                                    | ✅                 | Bulbs, candles, torches                     |
| [**`<spotLight>`**](#4-spotlight)                                    | Cone-shaped beam of light                      | `color`, `intensity`, `position`, `angle`, `penumbra`, `distance`, `decay`, `castShadow` | ✅                 | Flashlights, stage lights                   |
| [**`<hemisphereLight>`**](#5-hemispherelight)                              | Mixes sky and ground colors                    | `skyColor`, `groundColor`, `intensity`                                                   | ❌                 | Outdoor/natural lighting                    |
| [**`<rectAreaLight>`**](#6-rectarealight)                               | Light from a rectangular surface               | `color`, `intensity`, `width`, `height`, `position`, `lookAt`                            | ❌                 | Softbox, studio or indoor lights            |
| **`<lightProbe>`**                                   | Samples ambient environment for indirect light | (no main props; usually paired with environment maps)                                    | ❌                 | Realistic reflections and indirect lighting |
| [**`<spotLightHelper>` / `<directionalLightHelper>`**](#7-spotlighthelper--directionallighthelper) | Debug visual for light direction               | `args` (size), `ref` (to light)                                                          | ❌                 | Visual debugging of light direction         |

### 1. AmbientLight
Gives soft, even light to everything in the scene (no shadows).
Good for background/base lighting.
```jsx
<ambientLight
  color="white"       // light color
  intensity={0.5}     // brightness (default = 1)
 />
```

### 2. DirectionalLight
Acts like sunlight — shines in one direction.
Casts shadows and creates highlights on surfaces.
```jsx
<directionalLight
  color="white"
  intensity={1}
  position={[5, 10, 5]}
  castShadow={true}
/>
```
You can also fine-tune shadows:
```jsx
<directionalLight
  castShadow
  shadow-mapSize-width={1024}
  shadow-mapSize-height={1024}
  shadow-camera-far={50}
/>
```

### 3. PointLight
Emits light from a single point in all directions (like a bulb).
```jsx
<pointLight
  color="white"
  intensity={1}
  position={[10, 10, 10]}
  distance={50}     // how far the light reaches
  decay={2}         // how fast light fades (realistic = 2)
/>
```
### 4. SpotLight
Cone-shaped light (like a flashlight or stage spotlight)
```jsx
<spotLight
  color="white"
  intensity={2}
  position={[5, 10, 5]}
  angle={0.3}        // cone spread (in radians)
  penumbra={0.5}     // edge softness
  distance={50}
  decay={2}
  castShadow
/>
```
### 5. HemisphereLight
Simulates natural outdoor light — mixes sky and ground color.
```jsx
<hemisphereLight
  skyColor="blue"
  groundColor="brown"
  intensity={0.6}
/>
```
### 6. RectAreaLight
Light shining from a rectangular plane (good for studio or softbox effects).
```jsx
<rectAreaLight
  color="white"
  intensity={5}
  width={5}
  height={3}
  position={[0, 5, 5]}
  lookAt={[0, 0, 0]}     // points the light toward target
/>
```

### 7. SpotLightHelper / DirectionalLightHelper
Used for debugging — shows where the light is pointing.
```jsx
import { useHelper } from "@react-three/drei"
import { DirectionalLightHelper } from "three"
import { useRef } from "react"

function Light() {
  const light = useRef()
  useHelper(light, DirectionalLightHelper, 5)
  return <directionalLight ref={light} position={[5, 10, 5]} />
}
```


### Example Scene with Multiple Lights

```jsx
<Canvas style={{ background: "#111" }}>
  {/* Base light */}
  <ambientLight intensity={0.3} />

  {/* Sunlight */}
  <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

  {/* Lamp light */}
  <pointLight position={[-5, 5, 5]} intensity={1.2} />

  {/* Flashlight */}
  <spotLight position={[0, 10, 0]} angle={0.4} penumbra={0.5} intensity={2} />

  {/* Sky/Ground */}
  <hemisphereLight skyColor="lightblue" groundColor="brown" intensity={0.5} />
</Canvas>
```


[Go To Top](#content)

---
# mesh Geometries/Material

### Mesh Geometries 
> Visit [Three js official docs](https://threejs.org/docs/#BoxGeometry) to learn more about this geometries

| **Geometry Component**     | **Shape Description**      | **Key Props (via `args` or direct)**                           | **Use Case**                   |
| -------------------------- | -------------------------- | -------------------------------------------------------------- | ------------------------------ |
| `<boxGeometry />`          | Cube / rectangular box     | `args={[width, height, depth]}`                                | Cubes, boxes, dice             |
| `<sphereGeometry />`       | Perfect 3D sphere          | `args={[radius, widthSegments, heightSegments]}`               | Planets, balls, globes         |
| `<planeGeometry />`        | Flat 2D surface            | `args={[width, height, widthSegments, heightSegments]}`        | Ground, walls, screens         |
| `<circleGeometry />`       | Flat circle                | `args={[radius, segments]}`                                    | Discs, holes, circular plates  |
| `<coneGeometry />`         | Cone shape                 | `args={[radius, height, radialSegments]}`                      | Cones, trees, spikes           |
| `<cylinderGeometry />`     | Cylinder / tube            | `args={[topRadius, bottomRadius, height, radialSegments]}`     | Pipes, columns                 |
| `<torusGeometry />`        | Donut / ring               | `args={[radius, tubeRadius, radialSegments, tubularSegments]}` | Rings, wheels                  |
| `<torusKnotGeometry />`    | Twisted torus shape        | `args={[radius, tube, tubularSegments, radialSegments, p, q]}` | Decorative shapes              |
| `<tetrahedronGeometry />`  | 4-sided pyramid            | `args={[radius, detail]}`                                      | Simple poly shapes             |
| `<octahedronGeometry />`   | 8-faced sphere-like        | `args={[radius, detail]}`                                      | Crystals, jewels               |
| `<icosahedronGeometry />`  | 20-faced sphere-like       | `args={[radius, detail]}`                                      | Low-poly spheres               |
| `<dodecahedronGeometry />` | 12-faced shape             | `args={[radius, detail]}`                                      | Low-poly spheres               |
| `<ringGeometry />`         | Flat ring (hole in middle) | `args={[innerRadius, outerRadius, segments]}`                  | Rings, halos                   |
| `<tubeGeometry />`         | Tube along a 3D curve      | `args={[path, tubularSegments, radius]}`                       | Wires, paths                   |
| `<extrudeGeometry />`      | Shape extruded into 3D     | `args={[shape, options]}`                                      | Logos, text, custom extrusions |
| `<textGeometry />`         | 3D text                    | `args={[text, options]}`                                       | 3D text titles                 |
| `<shapeGeometry />`        | Custom 2D shape to 3D      | `args={[shape]}`                                               | Custom drawn outlines          |
| `<latheGeometry />`        | Rotated 2D curve           | `args={[points, segments]}`                                    | Vases, bowls, bottles          |


### Mesh Materials
| **Material Component**     | **Visual Effect**                                           | **Key Props**                                      | **Supports Light?**        | **Use Case**                           |
| -------------------------- | ----------------------------------------------------------- | -------------------------------------------------- | -------------------------- | -------------------------------------- |
| `<meshBasicMaterial />`    | Flat color, ignores light                                   | `color`, `wireframe`, `map`                        | ❌                          | Simple unlit objects (UI, backgrounds) |
| `<meshStandardMaterial />` | Realistic lighting & reflections (PBR)                      | `color`, `metalness`, `roughness`, `map`           | ✅                          | Most common for real-world objects     |
| `<meshPhongMaterial />`    | Shiny, smooth light reflection                              | `color`, `specular`, `shininess`                   | ✅                          | Plastic, glossy surfaces               |
| `<meshLambertMaterial />`  | Diffuse light (no shiny reflections)                        | `color`, `emissive`, `map`                         | ✅                          | Matte surfaces, walls                  |
| `<meshPhysicalMaterial />` | Advanced version of Standard (adds clearcoat, transmission) | `clearcoat`, `transmission`, `ior`, `reflectivity` | ✅                          | Glass, water, metals                   |
| `<meshToonMaterial />`     | Cartoon-like shading                                        | `color`, `gradientMap`                             | ✅                          | Anime/cel-shaded effects               |
| `<meshDepthMaterial />`    | Shades based on distance from camera                        | `color`, `wireframe`                               | ⚙️ (used in depth effects) | Depth-based effects, fog               |
| `<meshMatcapMaterial />`   | Uses special “matcap” texture for instant shading           | `matcap`, `color`                                  | ❌                          | Stylized look, quick shading           |
| `<meshNormalMaterial />`   | Colors based on surface normals                             | `wireframe`, `flatShading`                         | ❌                          | Debugging, funky visuals               |
| `<shadowMaterial />`       | Transparent material for receiving shadows                  | `opacity`                                          | ✅ (for shadow catcher)     | Shadow-only ground planes              |


### Example
Simple Cube
```jsx
<mesh>
  <boxGeometry args={[1, 1, 1]} />
  <meshStandardMaterial color="orange" metalness={0.3} roughness={0.7} />
</mesh>
```
Sphere with cartoon look

```jsx
<mesh>
  <sphereGeometry args={[1, 32, 32]} />
  <meshToonMaterial color="lime" />
</mesh>
```
Reflective Metal Ball
```jsx
<mesh>
  <sphereGeometry args={[1, 32, 32]} />
  <meshPhysicalMaterial metalness={1} roughness={0.1} clearcoat={1} />
</mesh>
```


[Go To Top](#content)

---
# Repositioning mesh/3D Object
In React Three Fiber (R3F), you reposition a mesh using its `position`, `rotation`, or `scale` props — just like in Three.js — but with a simpler, React-style syntax.

### 1. Positioning a Mesh
You can move (translate) your mesh in x, y, z direction using the `position` prop.

Example:
```jsx
<mesh position={[2, 1, -3]}>
  <boxGeometry args={[1, 1, 1]} />
  <meshStandardMaterial color="orange" />
</mesh>
```
| Axis | Effect                    |
| ---- | ------------------------- |
| `x`  | Left (-x) or Right (+x)   |
| `y`  | Down (-y) or Up (+y)      |
| `z`  | Forward (-z) or Back (+z) |

> When you move the mesh’s position, it looks like the camera view also shifts.
>
> But in reality — the camera is not moving at all. Only the mesh moves in 3D space — and since the camera is fixed at [0, 0, 0] looking toward -Z, the perspective changes, making it look like your view moved.

Think of it like this:\
Imagine you’re standing still and watching an object in front of you:
- If the object moves to the right,\
it looks like your view shifted left — but you didn’t move.

- If it moves toward you,\
it appears bigger — but the change is from the object’s position, not yours.

That’s exactly what’s happening in Positioning.

### 2. Rotating a Mesh
You can rotate the mesh using the `rotation` prop in radians (not degrees!).

Example
```jsx
<mesh rotation={[Math.PI / 4, Math.PI / 2, 0]}>
  <boxGeometry args={[1, 1, 1]} />
  <meshStandardMaterial color="skyblue" />
</mesh>
```
| Axis | Rotation Effect                   |
| ---- | --------------------------------- |
| `x`  | Tilt up/down                      |
| `y`  | Spin left/right                   |
| `z`  | Rotate clockwise/counterclockwise |

> Tip: Math.PI / 2 = 90°, Math.PI = 180°.

### 3. Scaling a Mesh
You can resize the mesh using the `scale` prop.

Example
```jsx
<mesh scale={[2, 1, 1]}>
  <sphereGeometry args={[1, 32, 32]} />
  <meshStandardMaterial color="lime" />
</mesh>
```
| Axis | Effect               |
| ---- | -------------------- |
| `x`  | Stretch horizontally |
| `y`  | Stretch vertically   |
| `z`  | Stretch depth-wise   |


[Go To Top](#content)

---
# useFrame()
`useFrame` is a special hook provided by `@react-three/fiber` that lets you run code on every rendered frame — just like an animation loop in Three.js.

### Syntax
```jsx
useFrame((state, delta) => {
  // your code runs here every frame (≈ 60 times per second)
});
```
| Parameter | Meaning                                                                   |
| --------- | ------------------------------------------------------------------------- |
| `state`   | Gives access to the renderer’s current state (camera, mouse, clock, etc.) |
| `delta`   | the time difference (in seconds) between the current frame and the previous frame.          |


### Example
```jsx
// R3F.jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./R3F.css";

function RotatingBox() {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.y += delta;    {/*add animation to reference mesh*/}
    ref.current.rotation.x += delta + 0.01;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>   {/*get the reference if the mesh that you want to animate*/}
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function R3F() {
  return (
    <Canvas>
      <directionalLight position={[0, 0, 5]} intensity={1} />
      <ambientLight intensity={0.4} />
      <RotatingBox />
    </Canvas>
  );
}

```
This makes the box rotate continuously — like a smooth animation loop.

> `useFrame()` only works inside the React component tree rendered by `<Canvas>`.

[Go To Top](#content)

---
# Camera
A camera in 3D graphics works just like a real camera in the physical world — it defines what part of the 3D world you can see and how you see it.

Think of your 3D scene as a room filled with objects.
The camera decides:
- Where you’re standing in that room,
- What direction you’re looking at,
- How wide your field of view is.

In React Three Fiber (Three.js) The camera converts your 3D world → into a 2D image on your screen.

By default, React Three Fiber uses:
```jsx
<Canvas camera={{ position: [0, 0, 0], fov: 75 }} />
```
| Property              | Meaning                                             |
| --------------------- | --------------------------------------------------- |
| `position`            | Where the camera is located in 3D space `[x, y, z]` |
| `fov` (Field of View) | How wide the camera sees (like zoom)                |
| `near` and `far`      | The visible distance range (clipping planes)        |
| `lookAt()`            | Which direction the camera is looking               |

### Types of Cameras
**1. Perspective Camera**

> (Default in React Three Fiber & Three.js)
    
| Feature                | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| 👁️ **View style**     | Real-world view — like your eyes or a real camera.   |
| 📏 **Distance effect** | Objects farther away look smaller.                   |
| 🧮 **Uses**            | Realistic 3D scenes, games, 3D models, environments. |
| ⚙️ **Main properties** | `fov`, `aspect`, `near`, `far`, `position`.          |

Behavior:
- When the cube moves away (z increases), it appears smaller.
- Feels natural, like human vision.

**Example**
```jsx
<Canvas
  camera={{
    position: [0, 0, 5],
    fov: 75,          // wider view angle
    near: 0.1,
    far: 1000
  }}
>
  <mesh>
    <boxGeometry />
    <meshStandardMaterial color="orange" />
  </mesh>
</Canvas>
```


**2. Orthographic Camera**

(Flat / 2D-style projection)
| Feature                | Description                                                               |
| ---------------------- | ------------------------------------------------------------------------- |
| 📏 **View style**      | No perspective — all objects appear the same size regardless of distance. |
| 📦 **Distance effect** | Objects far away do **not** shrink.                                       |
| 🧮 **Uses**            | 2D games, UI overlays, architectural drawings, CAD-like visuals.          |
| ⚙️ **Main properties** | `left`, `right`, `top`, `bottom`, `near`, `far`, `zoom`, `position`.      |

Behavior:
- Cube looks the same size no matter how far it is.
- Perfect for top-down or flat UIs.

**Example**
```jsx
<Canvas orthographic camera={{ zoom: 100, position: [0, 0, 10] }}>
  <mesh>
    <boxGeometry />
    <meshStandardMaterial color="orange" />
  </mesh>
</Canvas>
```


### Perspective Camera vs Orthographic Camera
| Property        | PerspectiveCamera    | OrthographicCamera            |
| --------------- | -------------------- | ----------------------------- |
| Projection type | Realistic (3D depth) | Flat (2D-style)               |
| Distant objects | Appear smaller       | Stay same size                |
| Common uses     | Games, 3D models     | 2D UI, CAD, maps              |
| Has FOV         | ✅ Yes                | ❌ No                          |
| Has Zoom        | ✅ Yes                | ✅ Yes                         |
| Realistic feel  | ✅ High               | ❌ Low                         |
| Performance     | Normal               | Slightly faster for 2D scenes |





### PerspectiveCamera Camera Properties 
| **Property**          | **Type / Example**                       | **Description**                                                        |
| --------------------- | ---------------------------------------- | ---------------------------------------------------------------------- |
| `position`            | `[x, y, z]` → `[0, 0, 5]`                | Where the camera is placed in 3D space                                 |
| `rotation`            | `[x, y, z]`                              | Orientation of the camera (in radians)                                 |
| `fov` (Field of View) | `75`                                     | Determines how “wide” or “zoomed in” the view is — smaller = zoomed in |
| `aspect`              | `window.innerWidth / window.innerHeight` | Width/height ratio; usually auto-set by R3F                            |
| `near`                | `0.1`                                    | Closest distance visible to the camera                                 |
| `far`                 | `1000`                                   | Farthest distance visible to the camera                                |
| `zoom`                | `1`                                      | Zoom level (higher zooms in closer)                                    |
| `lookAt(x, y, z)`     | Function                                 | Points the camera at a specific 3D coordinate                          |
| `up`                  | `[0, 1, 0]`                              | Defines the “up” direction for the camera                              |
| `target`              | `[x, y, z]` (OrbitControls)              | The point around which the camera orbits                               |
| `filmGauge`           | `35`                                     | Simulates physical camera film size (for FOV scaling)                  |
| `focus`               | `10`                                     | Used in depth-of-field effects (for realistic blur)                    |

### Example of PerspectiveCamera
```jsx
<Canvas
  camera={{
    position: [3, 2, 5],
    fov: 60,
    near: 0.1,
    far: 100,
    zoom: 1,
  }}
>
  <mesh>
    <boxGeometry />
    <meshStandardMaterial color="orange" />
  </mesh>
</Canvas>
```

### Orthographic Camera Properties
| **Property**         | **Type / Example**         | **Description**                                                      |
| -------------------- | -------------------------- | -------------------------------------------------------------------- |
| `left`               | `-5`                       | Sets how far the left edge of the camera’s view extends.             |
| `right`              | `5`                        | Sets how far the right edge of the camera’s view extends.            |
| `top`                | `5`                        | Sets how far the top edge of the camera’s view extends.              |
| `bottom`             | `-5`                       | Sets how far the bottom edge of the camera’s view extends.           |
| `near`               | `0.1`                      | Nearest distance the camera can render (anything closer is clipped). |
| `far`                | `1000`                     | Farthest distance the camera can render.                             |
| `zoom`               | `1`                        | Zooms in/out — higher value = zooms in.                              |
| `position`           | `[x, y, z]` → `[0, 0, 10]` | Defines where the camera is placed.                                  |
| `rotation`           | `[x, y, z]`                | Rotates the camera around each axis (in radians).                    |
| `up`                 | `[0, 1, 0]`                | Defines the upward direction for the camera.                         |
| `lookAt(x, y, z)`    | Function                   | Points the camera toward a target coordinate.                        |
| `matrixWorldInverse` | Internal                   | Used internally to calculate transformations.                        |
| `projectionMatrix`   | Internal                   | Defines how the 3D world is projected onto 2D.                       |

### Example Orthographic
```jsx
<Canvas
  orthographic
  camera={{
    left: -5,
    right: 5,
    top: 5,
    bottom: -5,
    near: 0.1,
    far: 100,
    zoom: 80,
    position: [5, 5, 5],
  }}
>
  <ambientLight intensity={0.5} />
  <mesh>
    <boxGeometry />
    <meshStandardMaterial color="orange" />
  </mesh>
</Canvas>
```

[Go To Top](#content)

---
# @react-three/drei

`drei` (German for “three”) is a helper library for @react-three/fiber.

It provides ready-made, reusable components built on top of Three.js — so you don’t have to code everything from scratch.

### Why use drei?
Without `drei`, you’d have to manually set up:
- Controls for camera movement
- Loaders for models or textures
- Environment lights, sky, and reflections
- Helpers like grid, axes, orbit, etc.

With `drei`, it’s often just one line of code.

### Install
```bash
npm install @react-three/drei
```

### Popular Components from drei
| **Component**                        | **Purpose / Description**                                  |
| ------------------------------------ | ---------------------------------------------------------- |
| `<OrbitControls />`                  | Lets you rotate, zoom, and pan the camera with your mouse. |
| `<PerspectiveCamera />`              | Easy camera setup directly in JSX.                         |
| `<OrthographicCamera />`             | 2D-like camera setup.                                      |
| `<Environment />`                    | Adds realistic background lighting and reflections.        |
| `<Sky />`                            | Adds a dynamic sky.                                        |
| `<Plane />`, `<Box />`, `<Sphere />` | Prebuilt geometric shapes.                                 |
| `<Text />`                           | Render 3D text easily.                                     |
| `<Html />`                           | Render regular HTML inside the 3D scene.                   |
| `<Stars />`                          | Adds starry background sky.                                |
| `<useGLTF />`                        | Hook to load 3D `.glb/.gltf` models.                       |
| `<useTexture />`                     | Hook to load and apply textures.                           |
| `<Float />`                          | Makes an object smoothly float and rotate.                 |
| `<ContactShadows />`                 | Adds soft shadows beneath objects.                         |

### Example
```jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";

export default function DreiDemo() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <OrbitControls />
      <Environment preset="sunset" />
      <Float>
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </Float>
    </Canvas>
  );
}
```
**Result:**\
A floating orange cube, interactive camera, and realistic lighting —
all with only a few lines of code.

[Go To Top](#content)

---

# helpers
in Three.js and React Three Fiber, “helpers” are special visual debugging tools that help you see and understand your 3D scene better.

> Helpers are small visual guides that show invisible elements like lights, cameras, or axes in your 3D space.
>
> They don’t affect the final rendering — they just help you as the developer to visualize positions, directions, or ranges.


### Example
```jsx
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function HelpersDemo() {
  return (
    <Canvas camera={{ position: [3, 3, 5], fov: 75 }}>
      <axesHelper args={[5]} />
      <gridHelper args={[10, 10]} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <mesh position={[0, 1, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}
```
**Output:**\
You’ll see a floor grid, XYZ axes, and your cube — helps you perfectly visualize space.

### useHelper() Hook
useHelper() is a React Hook provided by @react-three/drei that lets you easily attach Three.js “helpers” (visual guides) to any object — like lights, cameras, or axes — without manually adding or removing them from the scene

**Basic Syntax**
```js
useHelper(ref, HelperClass, ...args)
```
| Parameter     | Description                                                                        |
| ------------- | ---------------------------------------------------------------------------------- |
| `ref`         | A React ref to the Three.js object (e.g., a light or camera).                      |
| `HelperClass` | The helper class from `three`, like `DirectionalLightHelper`, `CameraHelper`, etc. |
| `...args`     | Optional parameters passed to the helper (like size or color).                     |

**Example — Light Helper**
```jsx
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";

function Scene() {
  const lightRef = useRef();
  
  // Attach a helper that shows the light direction
  useHelper(lightRef, DirectionalLightHelper, 2, "hotpink");

  return (
    <>
      <directionalLight ref={lightRef} position={[3, 3, 3]} intensity={1} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
}

export default function App() {
  return <Canvas><Scene /></Canvas>;
}
```
When you run this:
- A pink wireframe arrow appears showing your light’s direction.
- It updates automatically if your light moves.
- The helper is removed automatically when the component unmounts.

### Common Helpers 
| **Helper Name**          | **Purpose**                                                   | **How It Helps You**                                    | **Usage / Example**                                 |
| ------------------------ | ------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------- |
| `AxesHelper`             | Shows 3 colored axes — X (red), Y (green), Z (blue).          | Helps understand orientation and rotation in the scene. | `<axesHelper args={[5]} />`                                 |
| `GridHelper`             | Draws a grid on the ground.                                   | Useful for aligning and positioning objects.            | `<gridHelper args={[10, 10]} />`                            |
| `BoxHelper`              | Displays the bounding box of a mesh.                          | Lets you visualize object boundaries.                   | `useHelper(meshRef, BoxHelper)`                             |
| `CameraHelper`           | Shows the camera frustum (visible area).                      | Helps you see what your camera captures.                | `useHelper(cameraRef, CameraHelper)`                        |
| `DirectionalLightHelper` | Displays the direction and source of a directional light.     | Useful for debugging lighting direction.                | `useHelper(lightRef, DirectionalLightHelper, 1, "hotpink")` |
| `PointLightHelper`       | Shows a small sphere representing the point light’s position. | Helps visualize point light placement.                  | `useHelper(lightRef, PointLightHelper, 1)`                  |
| `SpotLightHelper`        | Visualizes the cone of a spotlight.                           | Helps adjust spotlight angle, position, and target.     | `useHelper(lightRef, SpotLightHelper)`                      |
| `SkeletonHelper`         | Displays bones and joints of a rigged model.                  | Useful when animating 3D characters.                    | `useHelper(skinnedMeshRef, SkeletonHelper)`                 |



[Go To Top](#content)

---
# Integrate 3D Models

### Step-by-step guide — overview
1. Prepare/optimize model → convert to `.glb` (recommended).
2. Put model in your app’s `public` folder.
3. Load model with `useGLTF()` (drei).
4. Render with `<primitive object={scene} />` or use children.
5. Add lights, camera (Canvas), controls, and `Suspense` + `Loader`.
6. Handle animations with `useAnimations` if model has them.
8. Optimize runtime (draco, LOD, instances, compress textures).

### 1. Prepare & optimize the model (recommended)

Preferred format: `.glb` (binary glTF). Smaller, faster, contains materials & animations.

### 2. Put the model file in your public folder
For Vite, place files under public/ so you can request them by path:
```cpp
project/
 ├─ public/
 │   └─ models/
 │       └─ monk.glb
 └─ src/
     └─ ...
```
Access path: `"/models/monk.glb"`.

### 3. Load model with `useGLTF()` (drei).
```js
const { scene } = useGLTF("/models/monk.glb"); // path in public/
```

### 4. Render with `<primitive object={scene} />` or use children.

```jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function MonkModel() {
    const { scene } = useGLTF("/models/monk.gltf");
    return <primitive object={scene} scale={2} />;
}

export default function ExtrnalModal() {
    return (
        <Canvas camera={{ position: [3, 2, 5] }}>
            <MonkModel />
        </Canvas>
    );
}
```

### 5. Add lights, camera (Canvas), controls, and `Suspense` + `Loader`.
```jsx
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function MonkModel() {
    const { scene } = useGLTF("/models/monk.gltf");
    return <primitive object={scene} scale={2} />;
}

export default function ExtrnalModal() {
    return (
        <Canvas camera={{ position: [3, 2, 5] }}>
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} />
            <Suspense fallback={null}>
                <MonkModel />
            </Suspense>
            <OrbitControls />
        </Canvas>
    );
}
```
### 6. Handling animated models
If your `.glb` includes animations (skeletons):
```jsx
// AnimatedModel.jsx
import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function AnimatedModel() {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/character.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions?.Idle) actions.Idle.play();      // start "Idle" clip if exists
    // or actions['Walk'].play();
  }, [actions]);

  return <primitive ref={group} object={scene} scale={1.2} />;
}
```
`useAnimations` ties GLTF animation clips to the loaded model and provides `.play()`, `.stop()`, `.fadeIn()`, etc.

[Go To Top](#content)

---
