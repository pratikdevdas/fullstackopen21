"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosis_1 = __importDefault(require("./routes/diagnosis"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors_1.default);
const PORT = 3001;
app.get('/ping', (_req, res) => {
    console.log('fds;');
    console.log('someone pinged here');
    res.send('pong');
});
app.use('/api/dianosis', diagnosis_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
