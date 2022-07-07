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
exports.getMe = void 0;
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
function getMe() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, status } = yield axios_1.default.get('https://api.figma.com/v1/me', {
                headers: {
                    Accept: 'application/json',
                    'X-Figma-Token': process.env.X_FIGMA_TOKEN || ''
                },
            });
            console.log(JSON.stringify(data, null, 4));
            console.log('RESPONSE STATUS: ', status);
            return data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                console.log('ERROR MESSAGE: ', error.message);
                return error.message;
            }
            else {
                console.log('UNEXPECTED ERROR: ', error);
                return 'AN UNEXPECTED ERROR OCCURED';
            }
        }
    });
}
exports.getMe = getMe;
