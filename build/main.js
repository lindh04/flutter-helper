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
var inquirer = require("inquirer");
var Path = require("path");
const funcs = __importStar(require("./functions"));
const argumentHandler_1 = require("./argumentHandler");
const noArgs_1 = require("./noArgs");
function main() {
    let packageName = process.cwd().toString().split("\\").slice(-1)[0];
    let args = process.argv.slice(2);
    if (args.length != 0) {
        argumentHandler_1.argumentHandler(args);
    }
    else {
        noArgs_1.noArgs();
    }
}
if (!funcs.listFiles("./").includes("pubspec.yaml")) {
    console.log("This is not a flutter project");
    process.exit();
}
else {
    main();
}
