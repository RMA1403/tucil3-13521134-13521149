import Graph from "../classes/Graph";

export default function uniformCostSearch(
  start: number,
  end: number,
  graph: Graph
): [number, number[]] {
  type queueEl = {
    cost: number;
    vertex: number;
    path: number[];
  };

  const prioQueue: queueEl[] = [];
  const visited: boolean[] = new Array(graph.getVertexCount()).fill(false);

  prioQueue.push({ cost: 0, vertex: start, path: [start] });
  while (prioQueue.length > 0) {
    prioQueue.sort((a, b) => b.cost - a.cost);

    const curr: queueEl = prioQueue[prioQueue.length - 1];
    prioQueue.pop();

    if (curr.vertex === end) {
      return [curr.cost, curr.path];
    }

    if (!visited[curr.vertex]) {
      for (let i = 0; i < graph.getVertexCount(); i++) {
        const edgeWeight: number = graph.getWeight(curr.vertex, i);
        if (edgeWeight !== 0) {
          prioQueue.push({
            cost: curr.cost + edgeWeight,
            vertex: i,
            path: curr.path.concat([i]),
          });
          visited[i] = true;
        }
      }
    }
  }

  return [0, [start]];
}
