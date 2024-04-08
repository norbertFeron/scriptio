import { TDocumentDefinitions } from "pdfmake/interfaces";
import { ExportDataPDF } from "@components/projects/export/ExportProjectContainer";
import { env } from "process";
import { JSONContent } from "@tiptap/react";
import { getNodeData } from "@src/lib/editor/screenplay";
import { ScreenplayElement as SE } from "@src/lib/utils/enums";
import * as pdfMake from "pdfmake/build/pdfmake";

const LOCAL = "http://localhost:3000";
const PRODUCTION = "https://scriptio.app";
const BASE_URL = env.NODE_ENV === "production" ? PRODUCTION : LOCAL;

const fonts = {
    CourierPrime: {
        normal: BASE_URL + "/fonts/Courier%20Prime.ttf",
        bold: BASE_URL + "/fonts/Courier%20Prime%20Bold.ttf",
        italics: BASE_URL + "/fonts/Courier%20Prime.ttf",
        bolditalics: BASE_URL + "/fonts/Courier%20Prime.ttf",
    },
};

const DEFAULT_OFFSET = 13;

const addOffset = (pdfNodes: any[]) => {
    pdfNodes.push(getPDFNodeTemplate("offset", ""));
};

const getPDFTableTemplate = (text: string, type: string) => {
    return {
        layout: "noBorders",
        table: {
            widths: ["*"],
            body: [
                [
                    {
                        text,
                        style: [type],
                    },
                ],
            ],
        },
    };
};

const getPDFNodeTemplate = (style: string, text: string) => {
    return {
        text,
        style: [style],
    };
};

const getWatermarkData = (text: string) => {
    return {
        text,
        color: "grey",
        opacity: 0.15,
        bold: true,
        italics: false,
    };
};

const generatePDF = (exportData: ExportDataPDF, pdfNodes: any[]): TDocumentDefinitions => {
    return {
        info: {
            title: exportData.title,
            author: exportData.author,
        },
        content: pdfNodes,
        pageMargins: exportData.margins,
        defaultStyle: {
            font: "CourierPrime",
            fontSize: 12,
            alignment: "left",
            characterSpacing: -0.4,
        },
        styles: {
            scene: {
                bold: true,
                fillColor: "#e4e4e4",
                lineHeight: 0.85,
                margin: [4, 0, 0, 0],
            },
            note: {
                fillColor: exportData.notesColor ?? "#FFFF68",
                margin: [6, 0, 0, 0],
            },
            character: {
                margin: [170, 0, 0, 0],
            },
            dialogue: {
                margin: [100, 0, 100, 0],
            },
            parenthetical: {
                margin: [140, 0],
            },
            action: {
                margin: [0, 0, 0, DEFAULT_OFFSET],
            },
            transition: {
                alignment: "right",
                margin: [0, 0, 0, DEFAULT_OFFSET],
            },
            section: {
                alignment: "center",
                decoration: "underline",
                margin: [0, 0, 0, DEFAULT_OFFSET],
            },
            offset: {
                margin: [0, 0, 0, DEFAULT_OFFSET],
            },
        },
    };
};

/**
 * Export editor JSON screenplay to .pdf format
 * @param exportData PDF export settings
 * @param json editor content JSON
 */
export const exportToPDF = async (json: JSONContent, exportData: ExportDataPDF) => {
    const characters = exportData.characters;
    const nodes = json.content!;
    let pdfNodes = [];

    for (let i = 0; i < nodes.length; i++) {
        const node = getNodeData(nodes[i]);
        if (node.type === SE.None) continue;

        let nextType = SE.Action;
        if (i + 1 < nodes.length) nextType = nodes[i + 1]["attrs"]!["class"];

        // Don't export unselected characters
        if (node.type === SE.Character && characters && !characters.includes(node.text)) {
            let j = i + 1;
            for (; j < nodes.length; j++) {
                const currNode = getNodeData(nodes[j]);
                const isCharacterOrParenthetical = currNode.type === SE.Character || currNode.type === SE.Parenthetical;

                if (isCharacterOrParenthetical) continue;

                break;
            }
            i = j - 1;
            continue;
        }

        switch (node.type) {
            case SE.Scene:
                pdfNodes.push(getPDFTableTemplate(node.text.toUpperCase(), "scene"));
                addOffset(pdfNodes);
                break;
            case SE.Character:
                pdfNodes.push(getPDFNodeTemplate("character", node.text.toUpperCase()));
                break;
            case SE.Dialogue:
                pdfNodes.push(getPDFNodeTemplate("dialogue", node.text));
                if (nextType !== SE.Parenthetical) {
                    addOffset(pdfNodes);
                }
                break;
            case SE.Parenthetical:
                pdfNodes.push(getPDFNodeTemplate("parenthetical", "(" + node.text + ")"));
                break;
            case SE.Transition:
                pdfNodes.push(getPDFNodeTemplate("transition", node.text.toUpperCase() + ":"));
                break;
            case SE.Section:
                pdfNodes.push(getPDFNodeTemplate("section", node.text.toUpperCase()));
                break;
            case SE.Note:
                if (exportData.notes) {
                    pdfNodes.push(getPDFTableTemplate(node.text, "note"));
                    addOffset(pdfNodes);
                }
                break;
            default:
                pdfNodes.push(getPDFNodeTemplate("action", node.text));
        }
    }

    let pdf = generatePDF(exportData, pdfNodes);
    if (exportData.watermark) {
        pdf.watermark = getWatermarkData(exportData.author);
    }

    pdfMake.createPdf(pdf, undefined, fonts).open();
};
