import { useEffect, useState } from "react";
import { fileReader, graphFromList } from "../functions/Utility";
import CytoGraph from "../api/Cytoscape";
import clsx from "clsx";
import Graph from "../classes/Graph";
import Dropzone from "./Dropzone";
import Dropdown, { DropdownOptions } from "./Dropdown";
import Map from "../api/Leaflet";
import { coordinate, mapEdge } from "../classes/Graph";

import Button from "./Button";
import uniformCostSearch from "../functions/UniformCostSearch";
import aStar from "../functions/AStar";

export default function App(): JSX.Element {
  const [isGmap, setGmap] = useState<boolean>(false);
  const [graph, setGraph] = useState<Graph | null>(null);
  const [nodeOptions, setNodeOptions] = useState<DropdownOptions[]>([
    { value: "none", text: "None Selected" },
  ]);
  const [sourceNode, setSourceNode] = useState<string>("none");
  const [destNode, setDestNode] = useState<string>("none");
  const [pathMethod, setPathMethod] = useState<string>("A*");
  const [nodeList, setNodeList] = useState<coordinate[]>([]);
  const [edgeList, setEdgeList] = useState<mapEdge[]>([]);
  const [graphPath, setGraphPath] = useState<number[]>([]);
  const [pathDist, setPathDist] = useState<number>(0);
  const [pathStr, setPathStr] = useState<string>("");
  const [fileErrorMsg, setFileErrorMsg] = useState<string>("");
  const [searchErrorMsg, setSearchErrorMsg] = useState<string>("");

  useEffect(() => {
    const newNodeOptions = [{ value: "none", text: "None Selected" }];
    if (graph) {
      for (let idx = 0; idx < graph.getVertexCount(); idx++) {
        newNodeOptions.push({ value: idx.toString(), text: `Node ${idx}` });
      }
    }
    setNodeOptions(newNodeOptions);
  }, [graph]);

  const handleFileChange = (file: File) => {
    if (!file.name.endsWith(".txt")) {
      setFileErrorMsg("Files should end with .txt!");
      return;
    }
    const reader = new FileReader();

    reader.onload = () => {
      try {
        setGraph(fileReader(reader.result as string));
        setFileErrorMsg("");
      } catch (error: any) {
        setFileErrorMsg(error.message);
      }
    };

    reader.readAsText(file);
  };

  const handleSearch = () => {
    let dist = 0;
    let path: number[] = [];

    try {
      if (sourceNode === "none" || destNode === "none")
        throw Error("Please set your source and destination nodes!");

      if (pathMethod === "A*" && graph)
        [dist, path] = aStar(parseInt(sourceNode), parseInt(destNode), graph);
      if (pathMethod === "UCS" && graph)
        [dist, path] = uniformCostSearch(
          parseInt(sourceNode),
          parseInt(destNode),
          graph
        );
    } catch (error: any) {
      setSearchErrorMsg(error.message);
      return;
    }

    setGraphPath(path);
    setPathDist(dist);

    let str = "";
    for (let idx = 1; idx < path.length; idx++) {
      str += graph?.getStreetName(path[idx - 1], path[idx]);
      if (idx !== path.length - 1) str += " - ";
    }

    setPathStr(str);
    setSearchErrorMsg("");
  };

  return (
    <main className="pb-4">
      <div className="bg-[#94C5CC] w-full py-4 px-9">
        <h1 className="text-[#000100] font-black text-4xl">PathFinder</h1>
      </div>
      <div className="flex w-[95vw] mx-auto">
        <div className="pt-4">
          <div className="flex items-center">
            <button
              onClick={() => {
                setGmap(!isGmap);
                setEdgeList([]);
                setNodeList([]);
                setGraph(null);
              }}
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
          <div className="h-[71vh] w-[55vw] border-4 border-[#94C5CC] rounded-md mt-4 p-4">
            {isGmap ? (
              <Map
                addNode={(coord: coordinate) =>
                  setNodeList([...nodeList, coord])
                }
                addEdge={(edge: mapEdge) => setEdgeList([...edgeList, edge])}
              />
            ) : (
              graph && <CytoGraph graphPath={graphPath} graph={graph} />
            )}
          </div>
        </div>

        <div className="pt-[74px] px-5 flex-1">
          {isGmap ? (
            <>
              <h2 className="text-[#000100] mb-4 font-black text-3xl">
                Input Markers
              </h2>
              <Button
                onClick={() => setGraph(graphFromList(nodeList, edgeList))}
              >
                Set as Graph
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-[#000100] mb-4 font-black text-3xl">
                File Input
              </h2>
              <Dropzone id="file-dropzone" onFileChange={handleFileChange} />
              <p
                className={clsx(
                  "text-sm text-red-600",
                  fileErrorMsg === "" && "invisible"
                )}
              >
                {fileErrorMsg} Please choose another file.
              </p>
            </>
          )}
          <div className="flex flex-col mt-4 gap-3">
            <Dropdown
              label="Source Node"
              value={sourceNode}
              onChange={(e) => {
                setSourceNode(e.target.value);
              }}
              options={nodeOptions}
            />
            <Dropdown
              label="Destination Node"
              value={destNode}
              onChange={(e) => {
                setDestNode(e.target.value);
              }}
              options={nodeOptions}
            />
            <Dropdown
              label="Pathfinding Method"
              value={pathMethod}
              onChange={(e) => {
                setPathMethod(e.target.value);
              }}
              options={[
                { value: "A*", text: "A*" },
                { value: "UCS", text: "UCS" },
              ]}
            />
          </div>
          <div className="flex mt-5 gap-2">
            <Button onClick={handleSearch}>Start Search</Button>
            <p
              className={clsx(
                "text-sm text-red-600 flex-1",
                searchErrorMsg === "" && "invisible"
              )}
            >
              {searchErrorMsg}
            </p>
          </div>
          {graphPath.length > 0 && (
            <div className="text-[#000100] text-xl  my-4">
              <h2 className="font-black text-3xl">Result</h2>
              <h4 className="font-bold mt-4">Shortest Path</h4>
              <p>{pathStr}</p>
              <h4 className="font-bold mt-4">Distance:</h4>
              <p>{pathDist}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
