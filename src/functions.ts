import { inherits } from "util";
import * as fs from "fs";
var inquirer = require("inquirer");
var Path = require("path");
import * as _ from "lodash";

export function getDirectories(path: string): string[] {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + "/" + file).isDirectory();
  });
}

export function listFiles(path: string): string[] {
  return fs.readdirSync(path);
}

export function deleteFolder(path: string) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      const curPath = Path.join(path, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolder(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

export function placeFile(path: string, file: string, replace?: Object): void {
  const libFile = fs.readFileSync(`${__dirname}/fileTemplates/${file}`, {
    encoding: "utf8",
  });

  if (replace) {
    function escapeRegExp(string) {
      return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    }

    function replaceAll(str, find, replace) {
      return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
    }
    let replaced = libFile;
    Object.keys(replace).forEach((key, index) => {
      let find: string = key;
      replaced = replaceAll(replaced, find, replace[key]);
    });
    fs.writeFileSync(path, replaced);
  } else {
    fs.writeFileSync(path, libFile);
  }
}
