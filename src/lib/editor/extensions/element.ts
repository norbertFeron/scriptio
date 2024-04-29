import Paragraph from "@tiptap/extension-paragraph";

export const ScriptElement = Paragraph.extend({
    name: "element",
    content: "text*",
    group: "block",

    addAttributes() {
        return {
            class: {
                default: "action",
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "p",
                getAttrs(node) {
                    return { class: node.getAttribute("class") };
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ["p", HTMLAttributes, 0];
    },
});
