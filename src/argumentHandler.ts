import { inherits } from "util";
import * as fs from "fs";
var inquirer = require("inquirer");
var Path = require("path");
import * as _ from "lodash";
import * as funcs from "./functions";

import { init } from "./init";
import { newScreen } from "./newScreen";

export async function argumentHandler(args: string[]) {
  if (args[0].toLowerCase() == "init") {
    await init();
  }
}
