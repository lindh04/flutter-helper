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
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeFile = exports.deleteFolder = exports.listFiles = exports.getDirectories = void 0;
const fs = __importStar(require("fs"));
var inquirer = require("inquirer");
var Path = require("path");
function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path + "/" + file).isDirectory();
    });
}
exports.getDirectories = getDirectories;
function listFiles(path) {
    return fs.readdirSync(path);
}
exports.listFiles = listFiles;
function deleteFolder(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file, index) => {
            const curPath = Path.join(path, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                // recurse
                deleteFolder(curPath);
            }
            else {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}
exports.deleteFolder = deleteFolder;
function placeFile(path, file, replace) {
    const libFile = fs.readFileSync(`${__dirname}/fileTemplates/${file}`, {
        encoding: "utf8",
    });
    if (replace) {
        function escapeRegExp(string) {
            return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
        }
        function replaceAll(str, find, replace) {
            return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
        }
        let replaced = libFile;
        Object.keys(replace).forEach((key, index) => {
            let find = key;
            replaced = replaceAll(replaced, find, replace[key]);
        });
        fs.writeFileSync(path, replaced);
    }
    else {
        fs.writeFileSync(path, libFile);
    }
}
exports.placeFile = placeFile;
