# Content
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Integrate Tiptap into your React app](#integrate-tiptap-into-your-react-app)
4. [Commands](#commands)
5. [useEditorState](#useeditorstate)
6. [The active state / isActive](#the-active-state)
7. [Extensions](#extensions)
8. [Custom Extension](#custom-extension)
9. [Change Existing Extension](#change-existing-extension)


[**Official Docs**](https://tiptap.dev/docs/editor/getting-started/overview)

---


# Introduction
Tiptap is a headless rich-text editor framework that lets you build a custom editor completely tailored to your and your customers' needs.

**Modular by default:** Add only the extensions you need, from bold and links to complex tables and slash-menus. Keep the bundle small and your schema under control.

Headless first Plug Tiptap into React, Vue, Svelte, plain JS, or any other framework. Or integrate with React UI Components and templates

**Open source & Pro extensions:** Tiptap's open source is published on GitHub under the MIT license

[Go To Top](#content)

---

# Installation
```bash
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit
```

- `@tiptap/react:` The React bindings for Tiptap including Tiptap's core functionality.
- `@tiptap/pm:` Tiptap's ProseMirror dependencies, which are required for the editor to function.
- `@tiptap/starter-kit:` A collection of commonly used extensions that provide basic functionality like paragraphs, headings, bold, italic, and more.

[Go To Top](#content)

---

# Integrate Tiptap into your React app
To start using Tiptap, create a new component. Let's call it `TipTapEditor` and add the following code:
```jsx
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";

export default function TipTapEditor() {
    const editor = useEditor({
        extensions: [StarterKit], // define your extension array
        content: "<p>Hello World!</p>", // initial content
    });

    return (
        <>
            <EditorContent editor={editor} />
            <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
            <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
        </>
    );
}
```

- `useEditor` is a React hook that creates, manages, and gives you access to a TipTap editor instance.
- [`FloatingMenu`](https://tiptap.dev/docs/editor/getting-started/style-editor/custom-menus#floating-menu) appears near the cursor when you’re on an empty line or a new block.
- [`BubbleMenu`](https://tiptap.dev/docs/editor/getting-started/style-editor/custom-menus#bubble-menu) appears only when you select text.

[Go To Top](#content)

---

# Commands
Commands are predefined actions that change the editor’s state or content.

Examples:
- make text bold
- insert a paragraph
- add a heading
- undo / redo
- set content

Basic syntax for command:


```js
editor.chain().focus().toggleBold().run()
```
1. `editor` should be a Tiptap instance,
2. `chain()` is used to tell the editor you want to execute multiple commands,
3. `focus()` sets the focus back to the editor,
4. `toggleBold()` marks the selected text bold. If the text is already bold, it removes the bold mark.
5. `run()` will execute the chain.

This will be a typical Bold button for your text editor.

### Keep the focus
You have already seen the `focus()` command in the above example. When you click on the button, the browser focuses that DOM element and the editor loses focus. It's likely you want to add `focus()` to all your menu buttons, so the writing flow of your users isn't interrupted.

Example
```js
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";

export default function TipTapEditor() {
    const editor = useEditor({
        extensions: [StarterKit], // define your extension array
        content: "<p>Hello tip tap editor</p>", // initial content
    });

    return (
        <>
            <EditorContent editor={editor} />
            <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
            <BubbleMenu editor={editor}>
                <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
            </BubbleMenu>
        </>
    );
}
```
Now whenever you select the text it will display a bold button, once click on it will convert the selected text to bold

[Go To Top](#content)

---

# useEditorState
useEditorState is a React hook that lets you subscribe to specific parts of the editor state and re-render only when those parts change.
> Editor state is the complete snapshot of the editor at a given moment.

React only re-renders when:
- props change
- state changes

TipTap editor state changes outside React.

So when you:
- select text
- move cursor
- toggle bold

➡️ Editor state changes

➡️ React component does NOT re-render

➡️ Button stays stale

```js
import React from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";

export default function TipTapEditor() {
    const editor = useEditor({
        extensions: [StarterKit], 
        content: "<p>Hello tip tap editor</p>", 
    });

    const isBold = useEditorState({
        editor,
        selector: ({ editor }) => editor.isActive("bold"),
    });

    return (
        <>
            <button onClick={()=>editor.chain().focus().toggleBold().run()}>{isBold ? "Unbold" : "Bold"}</button>
            <EditorContent editor={editor} />
        </>
    );
}
```

[Go To Top](#content)

---

# The active state
The editor provides an `isActive()` method to check if something is applied to the selected text already. 

```jsx
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";

export default function TipTapEditor() {
    const editor = useEditor({
        extensions: [StarterKit], 
        content: "<p>Hello tip tap editor</p>", 
    });

    return (
        <>
            <button onClick={()=>editor.chain().focus().toggleBold().run()}>
                {editor.isActive("bold") ? "Unbold" : "Bold"}
            </button>
            <EditorContent editor={editor} />
        </>
    );
}
```
The problem with this approach is that react does not re-render on button click, as TipTap editor state changes outside React causing react to ignore re-rendering.
> Although you can not see the change in button UI, but when you type into the editor you can see the button is working

Therefor we need to use [`useEditorState`](#useeditorstate)
```js
import React from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";

export default function TipTapEditor() {
    const editor = useEditor({
        extensions: [StarterKit], 
        content: "<p>Hello tip tap editor</p>", 
    });

    useEditorState({    // this hook will cause the re-render every time the editors state changes
        editor,
        selector: ({ editor }) => editor.state, // re-render for every state change
    });

    return (
        <>
            <button onClick={()=>editor.chain().focus().toggleBold().run()}>{editor.isActive("bold") ? "Unbold" : "Bold"}</button>
            <EditorContent editor={editor} />
        </>
    );
}
```
If you want it to re-render only when specific state change:
```js
import React from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";

export default function TipTapEditor() {
    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>Hello tip tap editor</p>",
    });

    const isBold = useEditorState({ 
        editor,
        selector: ({ editor }) => editor.isActive("bold"), // re-render only when bold state changes
    });

    return (
        <>
            <button onClick={()=>editor.chain().focus().toggleBold().run()}>
                {isBold ? "Unbold" : "Bold"}
            </button>

            <button onClick={()=>editor.chain().focus().toggleItalic().run()}>  
                {editor.isActive("italic") ? "Unitalic" : "Italic"}     {/* UI does on update onClick as this state is not causing re-rendering */}
            </button>           

            <EditorContent editor={editor} />
        </>
    );
}
```

[Go To Top](#content)

---

# extensions 
Extensions are modular building blocks that define what your editor can do.
> Without extensions, TipTap is basically an empty text box.

#### you’re already using
```js
extensions: [StarterKit]
```
`StarterKit` is just a bundle of common extensions.

It includes:
- Paragraph
- Text
- Bold / Italic / Strike
- Heading
- Bullet & Ordered List
- Code & CodeBlock
- History (undo/redo)
- Blockquote
- HardBreak

There are 4 type of Extensions
1. **Nodes extensions**

    If you think of the document as a tree, then nodes are just a type of content in that tree. 

    Examples of nodes are paragraphs, headings, or code blocks. But nodes don’t have to be blocks. 

    They decide:
    - what blocks exist
    - how content is nested
    - how data is stored

    Visit the official docs to see the list of available [Node Extensions](https://tiptap.dev/docs/editor/extensions/nodes)

2. **Mark extensions**

     Marks decorate text without changing structure.

     Examples
    - Bold
    - Italic
    - Underline
    - Strike
    - Link
    - Highlight

    Visit the official docs to see the list of available [Mark Extensions](https://tiptap.dev/docs/editor/extensions/marks)

3. **Functionality extensions**

    Extensions do not always render content, but can also provide additional functionality to the editor. 
    
    This includes tools for collaboration, text editing, and more.

    Visit the official docs to see the list of available [Functionality Extensions](https://tiptap.dev/docs/editor/extensions/functionality)

4. **custom extension**

    One of the strengths of Tiptap is its extendability. You don’t depend on the provided extensions, it is intended to extend the editor to your liking.

    With custom extensions you can add new content types and new functionalities, on top of what already exists or from scratch. 


[Go To Top](#content)

---


# custom extension

Syntax
```jsx
import { Extension } from '@tiptap/core'

const CustomExtension = Extension.create({
  name: 'customExtension',

  onUpdate() {
    console.log(this.editor.getJSON())
  },
})
```
Or you can also use a callback function to create an extension.
```jsx
import { Extension } from '@tiptap/core'

const CustomExtension = Extension.create(() => {
  // Define variables or functions to use inside your extension
  const customVariable = 'foo'

  function onCreate() {}

  return {
    name: 'customExtension',
    onCreate,

    // Your code goes here.
  }
})
``` 

### addCommands
The `addCommands` method is used to define the extension's commands. This method should return an object with the commands that can be executed by the user.
```jsx
import { Extension } from "@tiptap/core";

const CustomExtension = Extension.create({
    name: "customExtension",

    addCommands() {
        return {
            logContent:
                () =>
                ({ editor }) => {
                    console.log(editor.getJSON());
                    return true;
                },
        };
    },
});
```
This exposes commands which can be executed by the user:
```jsx
const editor = new Editor({
  extensions: [CustomExtension],
})

editor.commands.customCommand() // 'Custom command executed'
editor.chain().customCommand().run() // 'Custom command executed'
```

### Example
```jsx
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Extension } from "@tiptap/core";

const CustomExtension = Extension.create({
    name: "customExtension",

    addCommands() {
        return {
            logContent:
                () =>
                ({ editor }) => {
                    console.log(editor.getJSON());
                    return true;
                },
        };
    },
});

export default function TipTapEditor() {
    const editor = useEditor({
        extensions: [StarterKit, CustomExtension],
        content: "<p>Hello tip tap editor</p>",
    });

    return (
        <>
            <button onClick={() => editor.chain().focus().logContent().run()}>custom</button>
            <EditorContent editor={editor} />
        </>
    );
}
```

There are other useful extension option are available in tip tap like 
- `addKeyboardShortcuts`: method is used to define keyboard shortcuts.
- `addInputRules`: you can define regular expressions to listen for user inputs.
- `addPasteRules`: work like input rules (see above) do. But instead of listening to what the user types, they are applied to pasted content.\
etc...

[Visit the official doc to see the list of all available options](https://tiptap.dev/docs/editor/extensions/custom-extensions/create-new/extension#extension-options)

### Similarly you can create the custom Node and Mark extension
```jsx
import { Node } from '@tiptap/core'

const CustomNode = Node.create({
  name: 'customNode',

  // Your code goes here.
})
```
```jsx
import { Mark } from '@tiptap/core'

const CustomMark = Mark.create({
  name: 'customMark',

  // Your code goes here.
})
```
[Go To Top](#content)

---


# Change Existing Extension
Every extension has an `extend()` method, which takes an object with everything you want to change or add to it.

Let’s say, you’d like to change the keyboard shortcut for the bullet list. 
```jsx
// 1. Import the extension
import BulletList from '@tiptap/extension-bullet-list'

// 2. Overwrite the keyboard shortcuts
const CustomBulletList = BulletList.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-l': () => this.editor.commands.toggleBulletList(),   // shift + l
    }
  },
})

// 3. Add the custom extension to your editor
new Editor({
  extensions: [
    CustomBulletList,
    // …
  ],
})
```
> The same applies to every aspect of an existing extension, except to the name.

### Example
```jsx
import React from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";

const customBold = Bold.extend({
    addKeyboardShortcuts() {
        return {
            "Mod-l": () => this.editor.chain().focus().toggleBold().run(),
        };
    },
});

export default function TipTapEditor() {
    const editor = useEditor({
        extensions: [StarterKit, customBold],
        content: "<p>Hello tip tap editor</p>",
    });

    const isBold = useEditorState({
        editor,
        selector: ({ editor }) => editor.isActive("bold"),
    });

    return (
        <>
            <button onClick={() => editor.chain().focus().toggleBold().run()}>{isBold ? "Unbold" : "Bold"}</button>
            <EditorContent editor={editor} />
        </>
    );
}
```
> now you can use shift+l to toggle between bold

There are soo many things you can change through the extend method, [Visit the official doc to understand that](https://tiptap.dev/docs/editor/extensions/custom-extensions/extend-existing)

[Go To Top](#content)

---