import React from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import { Extension } from "@tiptap/core";
import Bold from '@tiptap/extension-bold'


const customBold = Bold.extend({
    addKeyboardShortcuts() {
        return {
            "Mod-l": () => this.editor.chain().focus().toggleBold().run(),
        };
    }
})

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
        extensions: [StarterKit, CustomExtension, customBold],
        content: "<p>Hello tip tap editor</p>",
    });

    const isBold = useEditorState({
        editor,
        selector: ({ editor }) => editor.isActive("bold"),
    });

    console.log("isBold:", isBold);

    return (
        <>
            <button onClick={() => editor.chain().focus().toggleBold().run()}>{isBold ? "Unbold" : "Bold"}</button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()}>{editor.isActive("italic") ? "Unitalic" : "Italic"}</button>
            <button onClick={() => editor.chain().focus().logContent().run()}>custom</button>
            <EditorContent editor={editor} />
        </>
    );
}
