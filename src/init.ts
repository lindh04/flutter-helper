import { inherits } from "util";
import * as fs from "fs";
var inquirer = require("inquirer");
var Path = require("path");
import * as _ from "lodash";
import * as funcs from "./functions";

export async function init(): Promise<void> {
  if (funcs.listFiles("./").includes("flutter-helper.json")) {
    console.log("Firebase init has already been run");
    return;

    // TODO - Implement ability to change settings when init is used again
  } else {
    let packageName: string = process.cwd().toString().split("\\").slice(-1)[0];
    funcs.deleteFolder("./lib");

    fs.mkdirSync("./lib");
    fs.mkdirSync("./lib/Screens");
    fs.mkdirSync("./lib/GlobalWidgets");
    funcs.placeFile("./lib/GlobalWidgets/globalWidgets.dart", "globalWidgets.dart.txt");

    funcs.placeFile("./lib/lib.dart", "lib.dart.txt");

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
