import Paragraph from "@tiptap/extension-paragraph";

export const Action = Paragraph.extend({
  name: "Action",
  draggable: false,
  group: "block",
  content: "inline*",

  addAttributes() {
    return {
      class: {
        default: "action",
        renderHTML: (element) => {
          console.log(element);
        },
      },
    };
  },

  /*
  renderHTML({ HTMLAttributes }) {
    return ["p", HTMLAttributes, 0];
  },
  */

  parseHTML() {
    return [
      {
        tag: "p",
        class: "action",
      },
    ];
  },
});
