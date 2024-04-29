import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";

export const CustomBold = Bold.extend({
    parseHTML() {
        return [{ tag: "span.bold" }];
    },
    renderHTML() {
        return ["span", { class: "bold" }, 0];
    },
});

export const CustomItalic = Italic.extend({
    parseHTML() {
        return [{ tag: "span.italic" }];
    },
    renderHTML() {
        return ["span", { class: "italic" }, 0];
    },
});

export const CustomUnderline = Underline.extend({
    parseHTML() {
        return [{ tag: "span.underline" }];
    },
    renderHTML() {
        return ["span", { class: "underline" }, 0];
    },
});
