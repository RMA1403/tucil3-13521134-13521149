import { useState } from "react";
import { fileReader } from "../functions/Utility";
import CytoGraph from "../api/Cytoscape";
import clsx from "clsx";
import Graph from "../classes/Graph";

// var cytoscape = require("cytoscape");

export default function App(): JSX.Element {
    const [isGmap, setGmap] = useState<boolean>(false);
    const [fileContent, setFileContent] = useState<string>("");
    const [graph, setGraph] = useState<Graph | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleFile = (e: React.FormEvent) => {
            const file = ((e.target as HTMLInputElement).files as FileList)[0];
        const reader = new FileReader();

        reader.onload = () => {
            setFileContent(reader.result as string);
            setGraph(fileReader(reader.result as string))
        };

        reader.readAsText(file);
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
                    <div className="h-[71vh] w-[55vw] border-4 border-[#94C5CC] rounded-md mt-4 p-4">
                        {graph && (
                            <CytoGraph graph={graph} />
                        )}
                    </div>
                </div>

                <div className="pt-[74px] px-5 flex-1">
                    <h2 className="text-[#000100] font-black text-3xl">File Input</h2>
                    <div className="w-[27vw] h-[15.6vh] mt-4 border-dashed border-2 border-[#A1A6B4] flex justify-center items-center">
                        <label
                            htmlFor="file-input"
                            className="block py-2 rounded-md text-center bg-[#94C5CC] w-[120px] hover:cursor-pointer"
                        >
                            Choose File
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            className=""
                            onChange={handleFile}
                        />
                        <button type="submit" onClick={handleSubmit}>
                            Start
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
