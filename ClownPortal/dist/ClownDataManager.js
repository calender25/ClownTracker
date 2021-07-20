"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClownDataManager = void 0;
const multer_1 = __importDefault(require("multer")); // used for multo form data/ uploading image data
class ClownDataManager {
    // methods
    // make constructor as private for singleton pattern
    constructor() {
        // properties
        this.clownMap = null;
        this.fileStorage = multer_1.default.diskStorage({
            destination(req, file, callback) {
                callback(null, './uploads');
            },
            filename(req, file, callback) {
                callback(null, file.fieldname + '-' + Date.now());
            }
        });
        this.upload = multer_1.default({ storage: this.fileStorage, fileFilter: this.filterImage }).array("images", 1);
        this.clownMap = new Map();
        let sample = { name: "Tom", address: "123 Central Rd, NewYork, 28848", dob: "03/02/1991", clownType: "ABC", email: "abc@gmail.com" };
        this.addClown(sample);
        sample = { name: "Don", address: "123 Market Rd, NewYork, 28848", dob: "03/02/1993", clownType: "ABC", email: "aaaa@gmail.com" };
        this.addClown(sample);
        sample = { name: "Harry", address: "567 Marquis Rd, NewYork, 28848", dob: "03/02/1992", clownType: "ABC", email: "bbbb@gmail.com" };
        this.addClown(sample);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
    addClown(data) {
        if (!!this.clownMap.has(data.email)) {
            // already existing
            return false;
        }
        else {
            this.clownMap.set(data.email, data);
            return true;
        }
    }
    deleteClown(email) {
        if (!this.clownMap.has(email)) {
            // not existing
            return false;
        }
        else {
            return this.clownMap.delete(email);
        }
    }
    searchClown(name) {
        name = name.toLowerCase();
        const clownDataArr = [];
        this.clownMap.forEach(clown => {
            if (clown.name.toLowerCase().indexOf(name) !== 0) {
                clownDataArr.push(clown);
            }
        });
        return clownDataArr;
    }
    getClowns() {
        const clownDataArr = [];
        let count = 0;
        this.clownMap.forEach(clown => {
            if (count > 10)
                return; // return only the 10 items
            clownDataArr.push(clown);
            count++;
        });
        return clownDataArr;
    }
    filterImage(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
    }
    uploadImages(req, res) {
        this.upload(req, res, (err) => {
            if (err) {
                return res.send(err);
            }
            res.send("Files are uploaded successfully");
        });
    }
}
exports.ClownDataManager = ClownDataManager;
ClownDataManager.instance = null;
//# sourceMappingURL=ClownDataManager.js.map