"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnosis_1 = __importDefault(require("../../data/diagnosis"));
const getDiagnosis = () => {
    return diagnosis_1.default;
};
exports.default = {
    getDiagnosis,
};
