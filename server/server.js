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
const express_1 = __importDefault(require("express"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const design_system_prototype_5a79b_4fd64a51bb9e_json_1 = __importDefault(require("./design-system-prototype-5a79b-4fd64a51bb9e.json"));
firebase_admin_1.default.initializeApp({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    credential: firebase_admin_1.default.credential.cert(design_system_prototype_5a79b_4fd64a51bb9e_json_1.default)
});
const db = firebase_admin_1.default.firestore();
const app = (0, express_1.default)();
const port = 8080;
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const styleRef = db.collection('users').doc('6MU0LKOQPpG2k9nAbfBk');
    const doc = yield styleRef.get();
    if (!doc.exists) {
        res.send("No document data");
    }
    else {
        res.send(doc.data());
    }
}));
app.listen(port, () => {
    console.log(`ELSE Design System Prototype signals to http://localhost:${port}`);
});
