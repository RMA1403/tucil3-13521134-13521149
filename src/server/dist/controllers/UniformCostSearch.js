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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUCS = void 0;
const Utility_1 = require("../functions/Utility");
function handleUCS(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filePath = (_a = req === null || req === void 0 ? void 0 : req.query.filePath) !== null && _a !== void 0 ? _a : "";
            const graph = yield (0, Utility_1.fileReader)(filePath);
            for (let i = 0; i < graph.getVertexCount(); i++) {
                for (let j = 0; j < graph.getVertexCount(); j++) {
                    console.log(graph.getStreetName(i, j));
                }
                console.log("newline");
            }
            res === null || res === void 0 ? void 0 : res.status(200).json({ filePath });
        }
        catch (err) {
            console.log(err);
            res === null || res === void 0 ? void 0 : res.status(500).json({ msg: "Something went wrong" });
        }
    });
}
exports.handleUCS = handleUCS;
