/* Extensions */
import { ScriptElement } from "./extensions/element";
import { Page } from "./extensions/page";
import { Screenplay } from "./extensions/screenplay";
import { Text } from "@tiptap/extension-text";
import { History } from "@tiptap/extension-history";
import { CustomBold, CustomItalic, CustomUnderline } from "./extensions/marks";

/* Utils */
import { useContext } from "react";
import { Editor, JSONContent, useEditor } from "@tiptap/react";
import { SaveStatus, ScreenplayElement, Style, TitlePageElement } from "../utils/enums";
import { SuggestionData } from "@components/editor/SuggestionMenu";
import { ProjectContext } from "@src/context/ProjectContext";
import {
    deferredCharactersUpdate,
    deferredSceneUpdate,
    deferredScreenplaySave,
    deferredTitlePageSave,
    getStylesFromMarks,
    replaceScreenplay,
} from "./utils";

/* Scriptio extensions */
const BASE_EXTENSIONS = [Screenplay, Text, History, CustomBold, CustomItalic, CustomUnderline];
export const SCREENPLAY_EXTENSIONS = [...BASE_EXTENSIONS, ScriptElement, Page];
export const TITLE_PAGE_EXTENSIONS = [...BASE_EXTENSIONS, ScriptElement];

// ------------------------------ //
//              HOOKS             //
// ------------------------------ //

export const useScreenplayEditor = (
    screenplay: JSONContent,
    setActiveElement: (element: ScreenplayElement, applyStyle: boolean) => void,
    setSelectedStyles: (style: Style) => void,
    updateSuggestions: (suggestions: string[]) => void,
    updateSuggestionsData: (data: SuggestionData) => void
) => {
    const projectCtx = useContext(ProjectContext);
    const editorView = useEditor({
        extensions: SCREENPLAY_EXTENSIONS,

        // update on each screenplay update
        onUpdate({ editor, transaction }) {
            const screenplay = editor.getJSON();
            projectCtx.updateSaveStatus(SaveStatus.Saving);
            deferredScreenplaySave(screenplay, projectCtx);
            deferredSceneUpdate(screenplay, projectCtx);
            deferredCharactersUpdate(screenplay, projectCtx);
        },

        onCreate({ editor }) {
            projectCtx.updateScreenplayEditor(editor as Editor);
            replaceScreenplay(editor as Editor, screenplay);
        },

        // update active on caret update
        onSelectionUpdate({ editor, transaction }) {
            const anchor = (transaction as any).curSelection.$anchor;
            const elementAnchor = anchor.parent.attrs.class;

            setActiveElement(elementAnchor, false);
            if (anchor.nodeBefore) setSelectedStyles(getStylesFromMarks(anchor.nodeBefore.marks));

            /*processAutoComplete(
                anchor,
                projectCtx,
                editor as Editor,
                updateSuggestions,
                updateSuggestionsData
            );*/
        },
    });
    return editorView;
};

export const useTitlePageEditor = (
    titlePage: JSONContent,
    setActiveElement: (element: TitlePageElement, applyStyle: boolean) => void,
    setSelectedStyles: (style: Style) => void
) => {
    const projectCtx = useContext(ProjectContext);
    const editorView = useEditor({
        extensions: TITLE_PAGE_EXTENSIONS,

        // update on each title page update
        onUpdate({ editor }) {
            const screenplay = editor.getJSON();
            projectCtx.updateSaveStatus(SaveStatus.Saving);
            deferredTitlePageSave(screenplay, projectCtx);
        },

        onCreate({ editor }) {
            projectCtx.updateTitleEditor(editor as Editor);
            replaceScreenplay(editor as Editor, titlePage);
        },

        // update active on caret update
        onSelectionUpdate({ editor, transaction }) {
            const anchor = (transaction as any).curSelection.$anchor;
            const elementAnchor = anchor.parent.attrs.class;

            setActiveElement(elementAnchor, false);
            if (anchor.nodeBefore) setSelectedStyles(getStylesFromMarks(anchor.nodeBefore.marks));
        },
    });
    return editorView;
};
