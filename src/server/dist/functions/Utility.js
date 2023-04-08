"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileReader = void 0;
const promises_1 = require("fs/promises");
const Graph_1 = __importDefault(require("../classes/Graph"));
function fileReader(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, promises_1.readFile)(filePath.slice(1, filePath.length - 1));
        const inputFile = data.toString().split("\n");
        const graph = new Graph_1.default(Number(inputFile[0]));
        for (let i = 1; i <= graph.getVertexCount(); i++) {
            const temp = inputFile[i]
                .slice(1, inputFile[i].length - 1)
                .split(",");
            graph.addVertex(i - 1, Number(temp[0]), Number(temp[1]));
        }
        for (let i = graph.getVertexCount() + 2; i < inputFile.length; i++) {
            const temp = inputFile[i].split(" ");
            graph.addEdge(Number(temp[0]), Number(temp[1]), 10, temp[2]);
        }
        return graph;
    });
}
exports.fileReader = fileReader;
