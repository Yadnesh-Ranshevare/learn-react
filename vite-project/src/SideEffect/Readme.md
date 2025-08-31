In React, a side effect is anything that affects something outside the scope of the current function/component.\
[click here to learn more about side effect](https://github.com/Yadnesh-Ranshevare/express-backend/blob/main/basics/FunctionalProgrammingTechniques/SideEffects/readme.md)


**Examples of side effects:**
- Fetching data from an API
- Updating the DOM manually
- Setting up a timer (setInterval, setTimeout)
- Subscribing/unsubscribing to events (like WebSocket, window resize, etc.)

So, side effects are things that go beyond just calculating/rendering UI.


Every impure function cause the side effect, so react encourage us to keep out component as a pure component i.e, it must render the same ui for same props 

> React doesn't stop us from making our component impure it just encourage us to keep the component pure without any side effect

### Problem of side effect

```jsx
export default function Have() {
    document.title = "side effect"  // side effect 
    const but = document.querySelector('.have')     // side effect 
    console.log(but)

    return (
        <div>
            <button className='have'> have side effect</button>
        </div>
    )
}
```
- in above code snippet we have two side effects as follows:
```jsx
document.title = "side effect" 
// and
const but = document.querySelector('.have') 
```
- What happens when React runs this component?
    - React calls your function `Have()`
    - Inside it, before the `return:`
        - `document.title = "side effect"`\
        → Changes the browser tab title. ✅ This is a side effect because it modifies something outside React.
        - `document.querySelector('.have')`\
        → Tries to find an element with class "have" in the DOM.\
        BUT at this moment, the `<button className="have">` has not been added to the DOM yet (because `return` hasn’t run and React hasn’t rendered it).\
        → So but will be null.
        - `console.log(but)`\
        → Prints `null` in the console.
    - Now the `<button class="have">` actually appears on the screen.
- form above example see that first side effect is not noticeable but the second side effect is noticeable i.e, it is printing `null` even though our element exist 

- this why react encourage us to keep our component pure



### How to handle side effects
`useEffect` is a React Hook that lets you run side effects in a functional component.

Think of it as:
> “After React renders the UI, do this extra stuff (side effect).”

> Note: useEffect hook execute after your component render successfully 

```jsx
export default function NotHave() {
    useEffect(()=>{
        const but = document.querySelector('.notHave')
        console.log(but)
    })
    return (
        <div>
            <button className='notHave'>not have side effect</button>
        </div>
    )
}
```
- React calls the function `NotHave()`
    - It returns JSX:
    ```html
    <div>
      <button class="notHave">not have side effect</button>
    </div>
    ```
    - React prepares to put this in the DOM, but does not run `useEffect` yet.
- After rendering is done, React runs the `useEffect` callback:
```jsx
const but = document.querySelector('.notHave')
console.log(but)
```
- This time, `querySelector('.notHave')` finds the button successfully
- Console prints:
```html
<button class="notHave">not have side effect</button>
```

### Side effects that are usually harmless to ignore
- `console.log` (for debugging only)
- Performance measurements (`performance.now()`, `Date.now()`)
- Reading values that don’t affect rendering

These don’t interfere with React’s rendering process. They just "talk" to the outside world without mutating state or DOM in unpredictable ways.


### Side effects you should not ignore
- Changing DOM directly (`document.getElementById`, `innerHTML`, etc.)
- Fetching data / API calls inside render
- Updating global state/variables
- Timers (`setTimeout`, `setInterval`)
- Subscriptions (WebSocket, EventListeners)

These can cause inconsistent UI, infinite re-renders, or memory leaks if not handled in `useEffect`.

### For example:
```jsx
// Good: harmless side effect
export default function Debug() {
  console.log("rendered"); // safe to ignore
  return <div>Hello</div>
}
```
```jsx
// Bad: real side effect inside render
export default function Bad() {
  fetch("/api/data")   // ❌ will run on every render → infinite loop
  return <div>Data</div>
}
```