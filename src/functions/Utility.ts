import Graph from "../classes/Graph";

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
    graph.addEdge(Number(temp[0]), Number(temp[1]), 10, temp[2]);
  }

  console.log(inputFile);

  return graph;
}

export { fileReader };
