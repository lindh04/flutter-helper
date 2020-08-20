import { inherits } from "util";
import * as fs from "fs";
var inquirer = require("inquirer");
var Path = require("path");
import * as _ from "lodash";
var funcs = require("./functions");

let packageName: string = process.cwd().toString().split("\\").slice(-1)[0];

export function newScreen(screenNameOrPath: string): void {
  let screenName: string = screenNameOrPath;
  let camelCaseScreenName: string = _.camelCase(screenName);
  let upperCamelCaseScreenName: string = camelCaseScreenName.charAt(0).toUpperCase() + camelCaseScreenName.substring(1);
  let screenPath: string = screenNameOrPath

  if (screenNameOrPath.includes("/")) {
    let screenPathArray: string[] = screenNameOrPath.split("/");

    screenName = screenPathArray[screenPathArray.length - 1];

    camelCaseScreenName = _.camelCase(screenName);
    upperCamelCaseScreenName = camelCaseScreenName.charAt(0).toUpperCase() + camelCaseScreenName.substring(1);

    screenPath = (screenPathArray.slice(0, screenPathArray.length - 1)).join("/") + "/" + upperCamelCaseScreenName;
  }

  else if (screenNameOrPath.includes("\\")) {
    let screenPathArray: string[] = screenNameOrPath.split("\\");

    screenName = screenPathArray[screenPathArray.length - 1];

    camelCaseScreenName = _.camelCase(screenName);
    upperCamelCaseScreenName = camelCaseScreenName.charAt(0).toUpperCase() + camelCaseScreenName.substring(1);

    screenPath = (screenPathArray.slice(0, screenPathArray.length - 1)).join("/") + "/" + upperCamelCaseScreenName;
  }


  let screenDir: string = `./lib/Screens/${screenPath}`;
  fs.mkdirSync(screenDir);

  funcs.placeFile(`${screenDir}/${camelCaseScreenName}.dart`, "screenLib.dart.txt", {
    "screenname_lowercase_with_underscores": _.snakeCase(screenName),
    "ROOTDIR": packageName,
    "ScreennameUpperCamelCase": upperCamelCaseScreenName,
    "Screenname Upper Space Separated": _.startCase(screenName),
  });
}
