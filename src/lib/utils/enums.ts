// ------------------------------ //
//             WEBSITE            //
// ------------------------------ //

export enum VerificationStatus {
    Success,
    Failed,
    Used,
}

export enum PasswordRecoverStatus {
    Success,
    Failed,
    Expired,
}

export enum Theme {
    Light = "light",
    Dark = "dark",
}

export enum Page {
    // /{page}
    Index = "index",
    Settings = "settings",
    About = "about",
    Login = "login",
    Signup = "signup",
    Recover = "recover",

    // /projects/{id}/{page}
    Screenplay = "screenplay",
    TitlePage = "title",
    Statistics = "statistics",
    Edit = "edit",
    Export = "export",
}

// ------------------------------ //
//            PROJECT             //
// ------------------------------ //

export enum SaveStatus {
    Saving,
    Saved,
    Error,
}

export enum SaveMode {
    Local = 1,
    Cloud = 2,
    Both = Local | Cloud,
}

// ------------------------------ //
//            EDITOR              //
// ------------------------------ //

export enum Style {
    None = 0,
    Bold = 1,
    Italic = 2,
    Underline = 4,
}

export type EditorElement = TitlePageElement | ScreenplayElement;
export enum TitlePageElement {
    Title = "title",
    Author = "author",
    Contact = "contact",
    Other = "other",
}

// String values must match the class names in the /public/scriptio.css file
export enum ScreenplayElement {
    Scene = "scene",
    Action = "action",
    Character = "character",
    Dialogue = "dialogue",
    Parenthetical = "parenthetical",
    Transition = "transition",
    Section = "section",
    Note = "note",
    None = "none",
}
