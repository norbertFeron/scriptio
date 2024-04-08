import { Project } from "@src/lib/utils/types";

import styles from "../screenplay/ScreenplayWrapper.module.css";
import TitlePageAndSidebar from "./TitlePageAndSidebar";

type TitlePageWrapperProps = {
    project: Project;
};

const TitlePageWrapper = ({ project }: TitlePageWrapperProps) => {
    return (
        <div id={styles.container}>
            <TitlePageAndSidebar project={project} />
        </div>
    );
};

export default TitlePageWrapper;
