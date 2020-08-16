"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noArgs = void 0;
var inquirer = require("inquirer");
var Path = require("path");
async function noArgs() {
    await inquirer
        .prompt([
        {
            type: "list",
            name: "action",
            message: "What to do...?",
            choices: ["New page widget", "New app-wide widget", "New Page", "init"],
        },
    ])
        .then((answers) => {
        console.info("Answer:", answers.action);
    });
}
exports.noArgs = noArgs;
