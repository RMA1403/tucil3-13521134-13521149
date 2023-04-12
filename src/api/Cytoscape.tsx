import { useEffect, useState } from "react";
import cytoscape from "cytoscape";
import Graph from "../classes/Graph";

let fcose = require("cytoscape-fcose");

type CytoGraphProps = {
  classname?: string;
  graph: Graph;
  graphPath: number[];
};

export default function CytoGraph({
  graph,
  graphPath,
}: CytoGraphProps): JSX.Element {
  const [cyto, setCyto] = useState<cytoscape.Core>();

  useEffect(() => {
    clearArrows();
    for (let idx = 1; idx < graphPath.length; idx++) {
      const source = graphPath[idx - 1];
      const target = graphPath[idx];

      if (cyto && cyto.edges().map((x) => x.id()).includes(`${target + "-" + source}`))
        cyto.remove(`#${target + "-" + source}`);
      
      if (cyto && cyto.edges().map((x) => x.id()).includes(`${source + "-" + target}`))
        cyto.remove(`#${source + "-" + target}`);

      if (cyto)
        cyto.add({
          group: "edges",
          data: {
            id: `${source + "-" + target}`,
            source: source.toString(),
            target: target.toString(),
          },
          classes: "directed",
        });
    }

    if (graphPath.length > 1 && cyto) cyto.fit();
  }, [graphPath]);

  useEffect(() => {
    cytoscape.use(fcose);

    const elements = graph.generateCytoElements();
    const fcoseLayout = {
      name: "fcose",
      animate: false,
    };

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
            "font-weight": "bold",
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
        {
          selector: ".directed",
          style: {
            "target-arrow-color": "#000",
            "target-arrow-shape": "triangle-backcurve",
          },
        },
      ],

      layout: fcoseLayout,
      userPanningEnabled: false,
      userZoomingEnabled: false,
    });

    cy.fit();
    setCyto(cy);
  }, [graph]);

  const clearArrows = () => {
    if (cyto) {
      cyto.edges().removeClass("directed");
    }
  }

  return <div className="w-full h-full" id="cy-container"></div>;
}
