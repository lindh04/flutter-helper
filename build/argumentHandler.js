"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argumentHandler = void 0;
var inquirer = require("inquirer");
var Path = require("path");
const init_1 = require("./init");
async function argumentHandler(args) {
    if (args[0].toLowerCase() == "init") {
        await init_1.init();
    }
}
exports.argumentHandler = argumentHandler;
