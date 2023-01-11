"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const diagnosisService_1 = __importDefault(require("../services/diagnosisService"));
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.send(diagnosisService_1.default.getDiagnosis());
});
exports.default = router;
