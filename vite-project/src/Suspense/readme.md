in this code snippet we have two files i.e, `Profile.jsx` and `Suspense.jsx` where,

`Suspense.jsx` is a light file without any heavy computation and will render almost instantly
```jsx
import React from "react";

function SuspenseExample() {
  return (
    <div>
        <h1>Welcome!</h1>
        <Profile />
    </div>
  );
}

export default SuspenseExample;
```
Whereas `Profile.jsx` is a heavy file with a heavy computation operation which may take some time causing the page to render after some time
```jsx
export default function Profile() {
    const list = [];
    for(let i = 0; i < 100; i++){   // heavy computation operation
        list.push(i);
    }
    return (
        list.map((val,idx)=>(<div key={idx}>{val}</div>))
    )
}
```

### What will happen without `Suspense` component
- The lightweight component (`SuspenseExample`) should render quickly.
- But since it contains the heavyweight component (`Profile`), React must wait until `Profile` finishes computing.
- This means the entire page waits and renders slowly.

**In other words:**\
“When a heavyweight component is inside a lightweight component, the lightweight one also becomes slow to render.”


### Using `React.Suspense`
By wrapping the `Profile` component in a `Suspense` boundary, we can show a fallback (like a loading message) while the heavyweight component is being loaded.
```jsx
import React, { Suspense, lazy } from "react";

const Profile = lazy(() => import("./Profile"));

function SuspenseExample() {
  return (
    <div>
      <h1>Welcome!</h1>

      {/* Suspense shows fallback while Profile is loading */}
      <Suspense fallback={<p>Loading profile...</p>}>
        <Profile />
      </Suspense>
    </div>
  );
}

export default SuspenseExample;
```
- The lightweight part (`Welcome!`) renders immediately.
- While the heavyweight component (`Profile`) is still being loaded, React shows the fallback (`Loading profile...`).
- Once `Profile` is ready, it replaces the fallback without blocking the page.

**This makes the app feel faster and smoother, because the user sees something instantly, instead of waiting for everything.**