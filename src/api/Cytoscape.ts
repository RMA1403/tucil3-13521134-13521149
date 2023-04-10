const cytoscape = require("cytoscape");

export default function initCytoscape() {
  const cy = cytoscape({
    container: document.getElementById("cy-container"), // container to render in

    elements: [
      // list of graph elements to start with
      {
        // node a
        data: { id: "a" },
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
          label: "data(id)",
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

  cy.add([
    {
      group: "nodes",
      data: { id: "c" },
      // renderedPosition: { x: 0, y: 20 },
    },
    {
      group: "edges",
      data: { id: "ac", source: "a", target: "c" },
    },
    {
      group: "edges",
      data: { id: "bc", source: "b", target: "c" },
    },
  ]);
  cy.add([
    {
      group: "nodes",
      data: { id: "d" },
      renderedPosition: { x: 20, y: 20 },
    },
    {
      group: "edges",
      data: { id: "cd", source: "c", target: "d" },
    },
  ]);

  cy.fit();
}
