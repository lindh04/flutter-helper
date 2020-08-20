import { inherits } from "util";
import * as fs from "fs";
var inquirer = require("inquirer");
var Path = require("path");
import * as _ from "lodash";
import * as funcs from "./functions";
var replaceInFile = require("replace-in-file");

export async function init(): Promise<void> {
  if (funcs.listFiles("./").includes("flutter-helper.json")) {
    console.log("Firebase init has already been run");
    return;

    // TODO - Implement ability to change settings when init is used again
  } else {
    let packageName: string = process.cwd().toString().split("\\").slice(-1)[0];
    await funcs.deleteFolder("./lib");

    await fs.mkdirSync("./lib");
    await fs.mkdirSync("./lib/Screens");
    await fs.mkdirSync("./lib/GlobalWidgets");
    await funcs.placeFile("./lib/GlobalWidgets/globalWidgets.dart", "globalWidgets.dart.txt");

    await funcs.placeFile("./lib/lib.dart", "lib.dart.txt");

    let json = {};

    await inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "App Name",
          default: _.startCase(packageName),
        },
      ])
      .then((answers) => {
        funcs.placeFile("./lib/main.dart", "main.dart.txt", {
          "APP NAME": answers.name,
        });
        json["AppName"] = answers.name;
      });
    await inquirer
      .prompt([
        {
          type: "checkbox",
          name: "assets",
          message: "What assets folders are required?",
          choices: ["images", "icons", "animations"],
        },
      ])
      .then((answers) => {
        fs.mkdirSync("./assets");
        answers.assets.forEach((element) => {
          fs.mkdirSync(`./assets/${element}`);
        });
        let pubscpecAssets: string = `  assets:\n`;
        answers.assets.forEach((element) => {
          pubscpecAssets += `    - assets/${element}\n`;
        });

        console.log("\n" + pubscpecAssets);
        funcs.editPubspec({
          replace: fs.readFileSync(`${__dirname}/pubspecReplace/assets.txt`, { encoding: "utf-8" }),
          replaceWith: pubscpecAssets,
        });
      });
    await inquirer
      .prompt([
        {
          type: "confirm",
          name: "useFirebase",
          message: "Setup firebase?",
          default: false,
        },
      ])
      .then(async (answers) => {
        if (answers.useFirebase) {
          await inquirer
            .prompt([
              {
                type: "checkbox",
                name: "firebaseParts",
                message: "What parts of Firebase do you need?",
                choices: [
                  "Firestore",
                  "Analytics",
                  "Performance Monitoring",
                  "Crashlytics",
                  "Firebase Local Emulator",
                ],
              },
            ])
            .then(async (userInput) => {
              json["useFirebase"] = userInput.firebaseParts;

              // TODO - Setup firebase in project
            });
        } else {
          json["useFirebase"] = false;
        }
      });
    fs.writeFileSync("./flutter-helper.json", JSON.stringify(json));
  }
}
