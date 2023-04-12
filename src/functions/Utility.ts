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

  return graph;
}

function euclideanDistance(c1: coordinate, c2: coordinate) {
  return Math.sqrt((c2.lat - c1.lat) ** 2 + (c2.long - c1.long) ** 2);
}

type PQElement = {
  f_score: number;
  node: number;
}

function enqueuePQ(pq: PQElement[], x: PQElement): void {
  let idx = 0;
  while (idx < pq.length && pq[idx].f_score < x.f_score) idx++;
  pq.splice(idx, 0, x);
}

function dequeuePQ(pq: PQElement[]): Object {
  const x = pq[0].node;
  pq.splice(0, 1);
  return x;
}

function findNodeIdxPQ(pq: PQElement[], node: number): number {
  for (let idx = 0; idx < pq.length; idx++) {
    if (pq[idx].node === node)
      return idx;
  }
  return -1;
}

export { fileReader, euclideanDistance, enqueuePQ, dequeuePQ, findNodeIdxPQ, type PQElement };
