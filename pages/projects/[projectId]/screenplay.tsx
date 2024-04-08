import Head from "next/head";
import type { NextPage } from "next";
import ScreenplayWrapper from "@components/editor/screenplay/ScreenplayWrapper";
import Navbar from "@components/navbar/Navbar";
import Loading from "@components/utils/Loading";
import { useProjectFromUrl } from "@src/lib/utils/hooks";

const EditorPage: NextPage = () => {
    const { data: project } = useProjectFromUrl();

    if (!project) return <Loading />;

    return (
        <>
            <Head>
                <title>{project.title} • Scriptio</title>
            </Head>
            <Navbar />
            <ScreenplayWrapper project={project} />
        </>
    );
};

export default EditorPage;
