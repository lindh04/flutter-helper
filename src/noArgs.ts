import { inherits } from "util";
import * as fs from "fs";
var inquirer = require("inquirer");
var Path = require("path");
import * as _ from "lodash";
import * as funcs from "./functions";

import { init } from "./init";
import { newScreen } from "./newScreen";

export async function noArgs() {
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
            await newScreen(answers.screenName)
          })
          break;
        }
        case "init": {
          await init()
          break;
        }
      }
    });
}
