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
        choices: ["New page widget", "New app-wide widget", "New Page", "init"],
      },
    ])
    .then((answers) => {
      console.info("Answer:", answers.action);
    });
}
