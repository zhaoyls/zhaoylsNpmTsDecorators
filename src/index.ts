import "reflect-metadata";
import * as form from "./form";
import * as utils from "./utils/";

function print(...args: unknown[]): void {
    console.log(...args);
}

print('form', form);
print('utils', utils);   