import { EditorContent, Editor } from "@tiptap/react";

import styles from "./TitlePageEditor.module.css";

type TitlePageEditorProps = {
    editor: Editor | null;
};

const TitlePageEditor = ({ editor }: TitlePageEditorProps) => {
    return (
        <div className={styles.container}>
            <EditorContent editor={editor} />
        </div>
    );
};

export default TitlePageEditor;
