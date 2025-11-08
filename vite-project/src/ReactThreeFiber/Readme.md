# Content

1. [Introduction](#introduction)
2. [Installation And Set up](#installation-and-set-up)
3. [light components in React Three Fiber (R3F)](#light-components-in-react-three-fiber-r3f)
4. [mesh Shape/Material](#mesh-shapematerial)

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
# mesh Shape/Material

### Mesh Shapes (Geometries)
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
