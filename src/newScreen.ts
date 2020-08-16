import { inherits } from "util";
import * as fs from "fs";
var inquirer = require("inquirer");
var Path = require("path");
import * as _ from "lodash";
var funcs = require("./functions");

let packageName: string = process.cwd().toString().split("\\").slice(-1)[0];

export function newScreen(screenName: string): void {
  let camelCaseScreenName: string = _.camelCase(screenName);
  let upperCamelCaseScreenName: string =
    camelCaseScreenName.charAt(0).toUpperCase() + camelCaseScreenName.substring(1);

  let screenDir: string = `./lib/Screens/${upperCamelCaseScreenName}`;
  fs.mkdirSync(screenDir);

  funcs.placeFile(`${screenDir}/${camelCaseScreenName}.dart`, "screenLib.dart.txt", {
    "screenname_lowercase_with_underscores": _.snakeCase(screenName),
    "ROOTDIR": packageName,
    "ScreennameUpperCamelCase": upperCamelCaseScreenName,
    "Screenname Upper Space Separated": _.startCase(screenName),
  });
}
