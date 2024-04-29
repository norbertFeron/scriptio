import Document from "@tiptap/extension-document";

export const Screenplay = Document.extend({
    name: "screenplay",
    content: "page+",
    group: "block",

    parseHTML() {
        return [{ tag: "div.screenplay" }];
    },
    renderHTML() {
        return ["div", { class: "screenplay" }, 0];
    },
});
