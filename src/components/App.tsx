import { useEffect } from "react";

var cytoscape = require("cytoscape");

export default function App(): JSX.Element {
  useEffect(() => {
    const cy = cytoscape({
      container: document.getElementById("cy-container"), // container to render in

      elements: [
        // list of graph elements to start with
        {
          // node a
          data: { id: "a", position: { x: 0, y: 100 } },
        },
        {
          // node b
          data: { id: "b" },
        },
        {
          // edge ab
          data: { id: "ab", source: "a", target: "b" },
        },
      ],

      style: [
        // the stylesheet for the graph
        {
          selector: "node",
          style: {
            "background-color": "#0000FF",
            width: 10,
            height: 10,
            // label: "data(id)",
          },
        },

        {
          selector: "edge",
          style: {
            width: 3,
            "line-color": "#FF0000",
            // "target-arrow-color": "#FF0000",
            // "target-arrow-shape": "triangle",
            "curve-style": "bezier",
          },
        },
      ],

      layout: {
        name: "grid",
        rows: 1,
      },
      userPanningEnabled: false,
      userZoomingEnabled: false,
    });

    cy.add({
      group: "nodes",
      data: { id: "c" },
      renderedPosition: { x: 0, y: 20 },
    });

    cy.fit();
  }, []);

  return (
    <main>
      <h1 className="text-green-600 text-6xl">HELLO</h1>
      <div className="h-[100vh] w-[80vw] border" id="cy-container"></div>
    </main>
  );
}
