"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noArgs = void 0;
var inquirer = require("inquirer");
var Path = require("path");
const init_1 = require("./init");
const newScreen_1 = require("./newScreen");
async function noArgs() {
    await inquirer
        .prompt([
        {
            type: "list",
            name: "action",
            message: "What to do...?",
            choices: ["New widget for screen", "New app-wide widget", "New Screen", "init"],
        },
    ])
        .then(async (answers) => {
        switch (answers.action) {
            case "New widget for screen": {
                break;
            }
            case "New app-wide widget": {
                break;
            }
            case "New Screen": {
                await inquirer.prompt([{
                        type: "input",
                        name: "screenName",
                        message: "Screen Name"
                    }]).then(async (answers) => {
                    await newScreen_1.newScreen(answers.screenName);
                });
                break;
            }
            case "init": {
                await init_1.init();
                break;
            }
        }
    });
}
exports.noArgs = noArgs;
