import { Request, Response } from "express";
import Graph from "../classes/Graph";
import { fileReader } from "../functions/Utility";

async function handleUCS(req: Request, res: Response) {
  try {
    const filePath: string = (req?.query.filePath as string) ?? "";

    const graph: Graph = await fileReader(filePath);
    for (let i = 0; i < graph.getVertexCount(); i++) {
      for (let j = 0; j < graph.getVertexCount(); j++) {
        console.log(graph.getStreetName(i, j));
      }
      console.log("newline");
    }

    res?.status(200).json({ filePath });
  } catch (err) {
    console.log(err);
    res?.status(500).json({ msg: "Something went wrong" });
  }
}

export { handleUCS };
