import { readFile } from "fs/promises";
import Graph, { coordinate } from "../classes/Graph";

function fileReader(fileData: string): Graph {
  const inputFile: string[] = fileData.split("\n");
  const graph: Graph = new Graph(Number(inputFile[0]));

  for (let i = 1; i <= graph.getVertexCount(); i++) {
    const temp: string[] = inputFile[i]
      .slice(1, inputFile[i].length - 1)
      .split(",");
    graph.addVertex(i - 1, Number(temp[0]), Number(temp[1]));
  }

  for (let i = graph.getVertexCount() + 2; i < inputFile.length; i++) {
    const temp: string[] = inputFile[i].split(" ");
    graph.addEdge(Number(temp[0]), Number(temp[1]), Number(temp[2]), temp[3]);
  }

  console.log(inputFile);

  return graph;
}

function euclideanDistance(c1: coordinate, c2: coordinate) {
  return Math.sqrt((c2.lat - c1.lat) ** 2 + (c2.long - c1.long) ** 2);
}

function enqueuePQ(pq: Object[], x: Object): void {
  let idx = 0;
  while (idx < pq.length && pq[idx] < x) idx++;
  pq.splice(idx, 0, x);
}

function dequeuePQ(pq: Object[]): Object {
  const x = pq[0];
  pq.splice(0, 1);
  return x;
}

export { fileReader, euclideanDistance, enqueuePQ, dequeuePQ };
