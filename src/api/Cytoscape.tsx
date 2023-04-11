import { useEffect } from "react";
import cytoscape from "cytoscape";
import Graph from "../classes/Graph";

let fcose = require('cytoscape-fcose');

type CytoGraphProps = {
    classname?: string;
    graph: Graph;
}

export default function CytoGraph({ graph, classname }: CytoGraphProps): JSX.Element {


    useEffect(() => {
        const elements = graph.generateCytoElements();
        const fcoseLayout = {
            name: "fcose",
            animate: false
        }
    
        const cy = cytoscape({
            container: document.getElementById("cy-container"), // container to render in

            elements: elements,

            style: [
                // the stylesheet for the graph
                {
                    selector: "node",
                    style: {
                        "border-width": 1,
                        "border-style": "solid",
                        "border-color": "#000100",
                        "background-color": "#B4D2E7",
                        width: 20,
                        height: 20,
                        label: "data(id)",
                        "font-size": "0.5em",
                        "text-valign": "center",
                        "text-halign": "center",
                        "font-weight": "bold"
                    },
                },
                {
                    selector: "edge",
                    style: {
                        width: 1,
                        "line-color": "#000000",
                        // "target-arrow-color": "#FF0000",
                        // "target-arrow-shape": "triangle",
                        "curve-style": "bezier",
                    },
                },
            ],

            layout: fcoseLayout,
            userPanningEnabled: false,
            userZoomingEnabled: false,
        });

        cy.fit();
    }, [graph]);

    return (
        <div
            className="w-full h-full"
            id="cy-container"
        >
        </div>
    );
}
