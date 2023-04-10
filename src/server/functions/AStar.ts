import Graph from "../classes/Graph";
import { dequeuePQ, enqueuePQ } from "./Utility";

function heur(v: number): number {
  return 0;
}

function constructPath(
  start: number,
  end: number,
  parent_node: number[]
): [number, number[]] {
  return [0, [0]];
}

export default function aStar(
  start: number,
  end: number,
  graph: Graph
): [number, number[]] {
  const parent_node: number[] = Array(graph.getVertexCount()).fill(-1);
  let pq: number[] = [start];

  const g_score: number[] = Array(graph.getVertexCount()).fill(-1);
  g_score[start] = 0;

  const f_score: number[] = Array(graph.getVertexCount()).fill(-1);
  f_score[start] = heur(start);

  while (pq.length > 0) {
    let current: number = dequeuePQ(pq) as number;
    if (current === end) return constructPath(start, end, parent_node);

    for (let i = 0; i < graph.getVertexCount(); i++) {
      const edgeWeight: number = graph.getWeight(current, i);
      if (edgeWeight === 0) continue;
      if (g_score[i] === -1 || g_score[current] + edgeWeight < g_score[i]) {
        parent_node[i] = current;
        g_score[i] = g_score[current] + edgeWeight;
        f_score[i] = g_score[i] + heur(i);
        if (!pq.includes(i)) enqueuePQ(pq, i);
      }
    }
  }

  return [-1, [0]];
}
