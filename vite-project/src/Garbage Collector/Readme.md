
# React Garbage Collector
```js
function Hello() {
  const [name] = React.useState("Alex");
  return <h1>Hello {name}</h1>;
}
```
- When `Hello` unmounts, React removes `<h1>` from DOM.
- `name` (state) becomes unreachable.
- GC reclaims memory → no leaks.


>
**When Does Garbage Collector clean automatically?**
1. React removes references to the component.
2. You properly clean up any side effects (like event listeners, subscriptions, timers, async calls).

> When a React component unmounts, React drops references to its state, props, and DOM → so Garbage Collector can clean them up.

> BUT: If you create side effects (event listeners, timers, subscriptions) and don’t clean them, those references stay alive → memory leak.

### Example: React setInterval
```js
function MyComponent() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

  }, []);

  return <h1>{count}</h1>;
}
```
- While mounted → `count` state, interval, and DOM `<h1>` exist in memory.
- When unmounted:
    - React removes `<h1>` from DOM.
    - But the interval keeps running ❌
- Since the interval’s callback still references `setCount`, which in turn references the state of `MyComponent`, that whole memory graph stays alive in the heap, even though you don’t need it anymore.

Fix:
```js
function MyComponent() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    // cleanup function
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <h1>{count}</h1>;
}
```

### Example: React EventListener  

```js
useEffect(() => {
  window.addEventListener("resize", () => console.log("resize"));
}, []); // ❌ no cleanup
```
- Even if the component unmounts, the listener stays alive.
- Because `window` still references it → memory leak.

Fix:
```js
useEffect(() => {
  const handleResize = () => console.log("resize");
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize); // ✅ cleanup
}, []);
```


