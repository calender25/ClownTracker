"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const clownDataManager = __importStar(require("./ClownDataManager"));
const app = express_1.default();
const router = express_1.default.Router();
const hostname = '127.0.0.1';
const port = 3500;
app.use(cors_1.default());
// Configuring body parser middleware
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.post('/login', (req, res) => {
    const login = req.body;
    console.log(login.userName);
    if (login.userName === "admin" && login.password === "admin") {
        res.send("success");
    }
    else {
        res.send("fail");
    }
});
app.post('/register', (req, res) => {
    const data = req.body;
    console.log(data.name);
    // add validations
    if (clownDataManager.ClownDataManager.getInstance().addClown(data)) {
        res.send("success");
    }
    else {
        res.send("fail");
    }
});
app.post('/uploadImage', (req, res) => {
    clownDataManager.ClownDataManager.getInstance().uploadImages(req, res);
});
app.post('/deregister', (req, res) => {
    const email = req.body;
    // add validations
    if (clownDataManager.ClownDataManager.getInstance().deleteClown(email)) {
        res.send("success");
    }
    else {
        res.send("fail");
    }
});
app.post('/search', (req, res) => {
    const name = req.body;
    // add validations
    const data = clownDataManager.ClownDataManager.getInstance().searchClown(name);
    if (!!data.length) {
        res.send(data);
    }
    else {
        res.send([]);
    }
});
app.get('/listClowns', (req, res) => {
    const data = clownDataManager.ClownDataManager.getInstance().getClowns();
    console.log("list clowns");
    res.send(data);
});
// add router in the Express app.
app.use("/", router);
app.listen(port, () => console.log('Server listening to port 3500 c${port}'));
//# sourceMappingURL=index.js.map