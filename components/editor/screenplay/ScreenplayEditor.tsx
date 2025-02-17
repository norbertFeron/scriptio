import { EditorContent, Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

import styles from "./ScreenplayEditor.module.css";
import { join } from "@src/lib/utils/misc";

type ScreenplayEditorProps = {
    editor: Editor | null;
};

const ScreenplayEditor = ({ editor }: ScreenplayEditorProps) => {
    const [pages, setPages] = useState<number>(0);

    useEffect(() => {
        const target = document.getElementById("editor")!;
        const callback = (entries: ResizeObserverEntry[]) => {
            const height = entries[0].contentRect.height;
            const nbPages = +((height || 0) / 860).toFixed(0);
            setPages(nbPages);
        };
        const observer = new ResizeObserver(callback);
        observer.observe(target);
    }, []);

    return (
        <div id="editor" className={styles.container}>
            <div className={styles.page_counter}>
                {Array.from({ length: pages }, (_, page) => (
                    <p key={page} className={join(styles.page_count, "unselectable")}>
                        p.{page + 1}
                    </p>
                ))}
            </div>
            <EditorContent editor={editor} />
        </div>
    );
};

export default ScreenplayEditor;
