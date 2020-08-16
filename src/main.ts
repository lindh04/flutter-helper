import { inherits } from "util";
import * as fs from "fs";
var inquirer = require("inquirer");
var Path = require("path");
import * as _ from "lodash";
import * as funcs from "./functions";

import { init } from "./init";
import { newScreen } from "./newScreen";
import { argumentHandler } from "./argumentHandler";
import { noArgs } from "./noArgs";

function main() {
  let packageName: string = process.cwd().toString().split("\\").slice(-1)[0];

  let args: string[] = process.argv.slice(2);

  if (args.length != 0) {
    argumentHandler(args);
  } else {
    noArgs();
  }
}

if (!funcs.listFiles("./").includes("pubspec.yaml")) {
  console.log("This is not a flutter project");
  process.exit();
} else {
  main();
}
