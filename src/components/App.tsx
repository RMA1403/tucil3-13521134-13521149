import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

var cytoscape = require("cytoscape");

function initCytoscape() {
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
      renderedPosition: { x: 0, y: 20 },
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

  cy.fit();
}

export default function App(): JSX.Element {
  const [isGmap, setGmap] = useState(false);

  const fileForm = useRef(null);

  useEffect(initCytoscape, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(new FormData(fileForm.current ?? undefined));
  };

  return (
    <main>
      <div className="bg-[#94C5CC] w-full py-4 px-9">
        <h1 className="text-[#000100] font-black text-4xl">PathFinder</h1>
      </div>
      <div className="flex w-[95vw] mx-auto">
        <div className="pt-4">
          <div className="flex items-center">
            <button
              onClick={() => setGmap(!isGmap)}
              className={clsx(
                "w-[74px] h-[42px] rounded-[35px] border-2 border-[#79747E] relative",
                isGmap ? "bg-[#94C5CC]" : "bg-[#E0E9EC]"
              )}
            >
              <div
                className={clsx(
                  "w-[22px] h-[22px] rounded-full absolute top-2.5",
                  isGmap ? "right-3 bg-white" : "left-3 bg-[#A1A6B4]"
                )}
              ></div>
            </button>
            <h2 className="uppercase text-[#000100] font-black text-3xl ml-4">
              Gmaps
            </h2>
          </div>
          <div
            className="h-[71vh] w-[55vw] border-4 border-[#94C5CC] rounded-md mt-4"
            id="cy-container"
          ></div>
        </div>

        <div className="pt-[74px] px-5 flex-1">
          <h2 className="text-[#000100] font-black text-3xl">File Input</h2>
          <form
            ref={fileForm}
            className="w-[27vw] h-[15.6vh] mt-4 border-dashed border-2 border-[#A1A6B4] flex justify-center items-center"
          >
            <label
              htmlFor="file-input"
              className="block py-2 rounded-md text-center bg-[#94C5CC] w-[120px] hover:cursor-pointer"
            >
              Choose File
            </label>
            <input id="file-input" type="file" className="" />
            <button type="submit" onClick={handleSubmit}>
              Start
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
