import { readFile } from "fs/promises";
import Graph from "../classes/Graph";

async function fileReader(filePath: string): Promise<Graph> {
  const data: Buffer = await readFile(filePath.slice(1, filePath.length - 1));

  const inputFile: string[] = data.toString().split("\n");
  const graph: Graph = new Graph(Number(inputFile[0]));

  for (let i = 1; i <= graph.getVertexCount(); i++) {
    const temp: string[] = inputFile[i]
      .slice(1, inputFile[i].length - 1)
      .split(",");
    graph.addVertex(i - 1, Number(temp[0]), Number(temp[1]));
  }

  for (let i = graph.getVertexCount() + 2; i < inputFile.length; i++) {
    const temp: string[] = inputFile[i].split(" ");
    graph.addEdge(Number(temp[0]), Number(temp[1]), 10, temp[2]);
  }

  return graph;
}

export { fileReader };
