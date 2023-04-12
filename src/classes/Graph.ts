import { ElementDefinition } from "cytoscape";

export type coordinate = {
  long: number;
  lat: number;
};

export type mapEdge = {
  source: number;
  dest: number;
  sourceCoord: coordinate;
  destCoord: coordinate;
};

type matrixEntry = {
  weight: number;
  street: string;
};

export default class Graph {
  private vertexCount: number;
  private adjMatrix: matrixEntry[][];
  private coordList: coordinate[];

  constructor(vertexCount: number) {
    this.vertexCount = vertexCount;
    this.adjMatrix = [];
    this.coordList = [];

    for (let i = 0; i < vertexCount; i++) {
      this.adjMatrix[i] = [];
      for (let j = 0; j < vertexCount; j++) {
        this.adjMatrix[i][j] = {
          weight: 0,
          street: "",
        };
      }
    }
  }

  public getVertexCount(): number {
    return this.vertexCount;
  }

  public getStreetName(v1: number, v2: number): string {
    return this.adjMatrix[v1][v2].street;
  }

  public getWeight(v1: number, v2: number): number {
    return this.adjMatrix[v1][v2].weight;
  }

  public getCoord(vertex: number): coordinate {
    return this.coordList[vertex];
  }

  public addVertex(idx: number, long: number, lat: number) {
    this.coordList[idx] = { long, lat };
  }

  public addEdge(v1: number, v2: number, weight: number, street: string) {
    this.adjMatrix[v1][v2] = { weight, street };
    this.adjMatrix[v2][v1] = { weight, street };
  }

  public generateCytoElements(): ElementDefinition[] {
    let elements: ElementDefinition[] = [];

    for (let idx = 0; idx < this.getVertexCount(); idx++) {
      elements.push({
        group: "nodes",
        data: {
          id: idx.toString(),
        },
      });
    }

    for (let i = 0; i < this.vertexCount; i++) {
      for (let j = i; j < this.vertexCount; j++) {
        if (this.getWeight(i, j) !== 0)
          elements.push({
            group: "edges",
            data: {
              id: i.toString() + "-" + j.toString(),
              source: i.toString(),
              target: j.toString(),
            },
          });
      }
    }

    return elements;
  }
}
