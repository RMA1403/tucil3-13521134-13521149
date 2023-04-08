"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Graph {
    constructor(vertexCount) {
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
    getVertexCount() {
        return this.vertexCount;
    }
    getStreetName(v1, v2) {
        return this.adjMatrix[v1][v2].street;
    }
    getWeight(v1, v2) {
        return this.adjMatrix[v1][v2].weight;
    }
    getCoord(vertex) {
        return this.coordList[vertex];
    }
    addVertex(idx, long, lat) {
        this.coordList[idx] = { long, lat };
    }
    addEdge(v1, v2, weight, street) {
        this.adjMatrix[v1][v2] = { weight, street };
        this.adjMatrix[v2][v1] = { weight, street };
    }
}
exports.default = Graph;
