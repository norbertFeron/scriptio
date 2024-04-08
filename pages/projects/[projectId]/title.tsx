import ScreenplayAndSidebars from "@components/editor/screenplay/ScreenplayAndSidebars";
import TitlePageWrapper from "@components/editor/title/TitlePageWrapper";
import Navbar from "@components/navbar/Navbar";
import Loading from "@components/utils/Loading";
import { useProjectFromUrl } from "@src/lib/utils/hooks";
import { NextPage } from "next";
import Head from "next/head";

const ScreenplayTitlePage: NextPage = () => {
    const { data: project } = useProjectFromUrl();

    if (!project) return <Loading />;

    return (
        <>
            <Head>
                <title>{project.title} • Title Page</title>
            </Head>
            <Navbar />
            <TitlePageWrapper project={project} />
        </>
    );
};

export default ScreenplayTitlePage;
