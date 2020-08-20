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
exports.newScreen = void 0;
const fs = __importStar(require("fs"));
var inquirer = require("inquirer");
var Path = require("path");
const _ = __importStar(require("lodash"));
var funcs = require("./functions");
let packageName = process.cwd().toString().split("\\").slice(-1)[0];
function newScreen(screenNameOrPath) {
    let screenName = screenNameOrPath;
    let camelCaseScreenName = _.camelCase(screenName);
    let upperCamelCaseScreenName = camelCaseScreenName.charAt(0).toUpperCase() + camelCaseScreenName.substring(1);
    let screenPath = screenNameOrPath;
    if (screenNameOrPath.includes("/")) {
        let screenPathArray = screenNameOrPath.split("/");
        screenName = screenPathArray[screenPathArray.length - 1];
        camelCaseScreenName = _.camelCase(screenName);
        upperCamelCaseScreenName = camelCaseScreenName.charAt(0).toUpperCase() + camelCaseScreenName.substring(1);
        screenPath = (screenPathArray.slice(0, screenPathArray.length - 1)).join("/") + "/" + upperCamelCaseScreenName;
    }
    else if (screenNameOrPath.includes("\\")) {
        let screenPathArray = screenNameOrPath.split("\\");
        screenName = screenPathArray[screenPathArray.length - 1];
        camelCaseScreenName = _.camelCase(screenName);
        upperCamelCaseScreenName = camelCaseScreenName.charAt(0).toUpperCase() + camelCaseScreenName.substring(1);
        screenPath = (screenPathArray.slice(0, screenPathArray.length - 1)).join("/") + "/" + upperCamelCaseScreenName;
    }
    let screenDir = `./lib/Screens/${screenPath}`;
    fs.mkdirSync(screenDir);
    funcs.placeFile(`${screenDir}/${camelCaseScreenName}.dart`, "screenLib.dart.txt", {
        "screenname_lowercase_with_underscores": _.snakeCase(screenName),
        "ROOTDIR": packageName,
        "ScreennameUpperCamelCase": upperCamelCaseScreenName,
        "Screenname Upper Space Separated": _.startCase(screenName),
    });
}
exports.newScreen = newScreen;
