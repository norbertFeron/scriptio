import { Node, NodePos } from "@tiptap/react";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        Page: {
            isOverflow: () => ReturnType;
        };
    }
}

export const isOverflown = (element: HTMLElement) => {
    const parent = element.parentElement!;
    const elementHeightPos = element.offsetTop + element.offsetHeight;

    if (elementHeightPos > parent.clientHeight - 96) return true;
    return false;
};

export const Page = Node.create({
    name: "page",
    content: "element+",
    group: "block",
    selectable: false,

    onTransaction({ transaction }) {
        const { selection } = transaction;
        const { $from } = selection;
        console.log("isOverflow call");

        const fromNodePos = new NodePos($from, editor);
        const fromNodePage = fromNodePos.closest("page")!;
        const lastNode = fromNodePage.lastChild!;
        const overflow = isOverflown(lastNode.element);

        const pages = editor.$nodes("page")!;

        return true;
    },

    addCommands() {
        return {
            isOverflow:
                () =>
                ({ editor }) => {
                    const { selection } = editor.state;
                    const { $from } = selection;
                    console.log("isOverflow call");

                    const fromNodePos = new NodePos($from, editor);
                    const fromNodePage = fromNodePos.closest("page")!;
                    const lastNode = fromNodePage.lastChild!;
                    const overflow = isOverflown(lastNode.element);

                    const pages = editor.$nodes("page")!;

                    return true;
                },
        };
    },
    parseHTML() {
        return [{ tag: "div.page" }];
    },
    renderHTML() {
        return ["div", { class: "page" }, 0];
    },
});
