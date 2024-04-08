/* Components */
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import Loading from "@components/utils/Loading";

/* Utils */
import fetchJson from "@src/lib/fetchJson";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDesktop } from "@src/lib/utils/hooks";
import { UserContextProvider } from "@src/context/UserContext";
import { ProjectContextProvider } from "@src/context/ProjectContext";
import { PopupContextProvider } from "@src/context/PopupContext";

/* Styles */
import { Theme } from "@src/lib/utils/enums";
import layout from "../components/utils/Layout.module.css";

import "@public/css/default.css";
import "@public/css/scriptio.css";
import "@public/css/themes.css";
import "@public/css/fonts.css";

const DesktopNavbar = () => {
    return (
        <div data-tauri-drag-region className="titlebar">
            <div className="titlebar-button" id="titlebar-minimize">
                <img src="https://api.iconify.design/mdi:window-minimize.svg" alt="minimize" />
            </div>
            <div className="titlebar-button" id="titlebar-maximize">
                <img src="https://api.iconify.design/mdi:window-maximize.svg" alt="maximize" />
            </div>
            <div className="titlebar-button" id="titlebar-close">
                <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
            </div>
        </div>
    );
};

const ScriptioProviders = ({ children }: any) => {
    return (
        <UserContextProvider>
            <ProjectContextProvider>
                <PopupContextProvider>
                    <ThemeProvider themes={Object.values(Theme)} defaultTheme={Theme.Dark}>
                        {children}
                    </ThemeProvider>
                </PopupContextProvider>
            </ProjectContextProvider>
        </UserContextProvider>
    );
};

function ScriptioApp({ Component, pageProps }: AppProps) {
    const [pageLoading, setPageLoading] = useState<boolean>(false);
    const router = useRouter();
    const isDesktop = useDesktop();

    useEffect(() => {
        const handleStart = () => {
            setPageLoading(true);
        };
        const handleComplete = () => {
            setPageLoading(false);
        };

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);
    }, [router]);

    return (
        <>
            <Head>
                <title>Scriptio</title>
            </Head>
            <SWRConfig
                value={{
                    fetcher: fetchJson,
                    onSuccess: () => {},
                    onError: (err) => {
                        console.error(err);
                    },
                }}
            >
                <ScriptioProviders>
                    <div className={layout.main}>{pageLoading ? <Loading /> : <Component {...pageProps} />}</div>
                </ScriptioProviders>
            </SWRConfig>
        </>
    );
}

export default ScriptioApp;
