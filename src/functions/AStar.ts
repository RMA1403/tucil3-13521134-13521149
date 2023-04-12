import Graph from "../classes/Graph";
import { dequeuePQ, enqueuePQ, type PQElement, findNodeIdxPQ, euclideanDistance } from "./Utility";

function heur(graph: Graph, start: number, v: number): number {
  return euclideanDistance(graph.getCoord(start), graph.getCoord(v));
}

function constructPath(
  start: number,
  end: number,
  parent_node: number[],
  g_score: number[]
): [number, number[]] {
  let dist = 0;
  let graphPath = [end];

  while (end !== start) {
    dist += g_score[end];
    graphPath.unshift(parent_node[end]);
    end = parent_node[end];
  }

  return [dist, graphPath];
}

export default function aStar(
  start: number,
  end: number,
  graph: Graph
): [number, number[]] {
  const parent_node: number[] = Array(graph.getVertexCount()).fill(-1);
  let pq: PQElement[] = [{ f_score: heur(graph, start, start), node: start }];

  const g_score: number[] = Array(graph.getVertexCount()).fill(-1);
  g_score[start] = 0;

  while (pq.length > 0) {
    let current: number = dequeuePQ(pq) as number;
    if (current === end) return constructPath(start, end, parent_node, g_score);

    for (let i = 0; i < graph.getVertexCount(); i++) {
      const edgeWeight: number = graph.getWeight(current, i);
      if (edgeWeight === 0) continue;

      if (g_score[i] === -1 || g_score[current] + edgeWeight < g_score[i]) {
        parent_node[i] = current;
        g_score[i] = g_score[current] + edgeWeight;
        const tentative_f_score = g_score[i] + heur(graph, start, i);

        const pqIdx = findNodeIdxPQ(pq, i);
        if (pqIdx === -1) {
          enqueuePQ(pq, { f_score: tentative_f_score, node: i });
        } else if (tentative_f_score < pq[pqIdx].f_score) {
          pq.splice(pqIdx, 1);
          enqueuePQ(pq, { f_score: tentative_f_score, node: i });
        }
      }
    }
  }

  throw Error("Path to destination not found!");
}
