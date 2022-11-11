import { getRangeEnumeration, isInvalidFormat } from "./getRangeEnumeration";

describe("isInvalidFormat", () => {
  it.each([
    ["", false],
    ["\r\n        ", false],
    ["\r\n        \r\n ", false],
    ["\r\n    0..255 bytes    \r\n ", true],
    ["\r\n    0..255    \r\n ", false],
    ["\r\n    1,2,3    \r\n ", false],
    ["\r\n    1    \r\n ", false],
    ["0", false],
    ["value", false],
    ["0..125", false],
    ["1..256", false],
    ["16,32,48", false],
    ["0..255 bytes", true],
    ["1..64 Bytes", true],
    ["0..255 Gigabyte", true],
    ["no valid case", true],
    ["ValidCase", false],
  ])("Should check if format is invalid: %p -> %p", (value, expected) =>
    expect(isInvalidFormat(value)).toStrictEqual(expected)
  );
});

describe("getRangeEnumeration", () => {
  it.each([
    ["", { invalidFormat: false, value: null }],
    ["\r\n        ", { invalidFormat: false, value: null }],
    ["\r\n        \r\n ", { invalidFormat: false, value: null }],
    [
      "\r\n    0..255 bytes    \r\n ",
      { invalidFormat: true, value: "\r\n    0..255 bytes    \r\n " },
    ],
    [
      "\r\n    0..255    \r\n ",
      { invalidFormat: false, value: [0, 255], dataStruct: "range" },
    ],
    [
      "\r\n    1,2,3    \r\n ",
      { invalidFormat: false, value: [1, 2, 3], dataStruct: "enum" },
    ],
    [
      "\r\n    1    \r\n ",
      { invalidFormat: false, value: 1, dataStruct: "enum" },
    ],
    ["0", { invalidFormat: false, value: 0, dataStruct: "enum" }],
    ["value", { invalidFormat: false, value: "value", dataStruct: "enum" }],
    ["0..125", { invalidFormat: false, value: [0, 125], dataStruct: "range" }],
    ["1..256", { invalidFormat: false, value: [1, 256], dataStruct: "range" }],
    [
      "16,32,48",
      { invalidFormat: false, value: [16, 32, 48], dataStruct: "enum" },
    ],
    ["0..255 bytes", { invalidFormat: true, value: "0..255 bytes" }],
    ["1..64 Bytes", { invalidFormat: true, value: "1..64 Bytes" }],
    ["0..255 Gigabyte", { invalidFormat: true, value: "0..255 Gigabyte" }],
    ["no valid case", { invalidFormat: true, value: "no valid case" }],
    [
      "ValidCase",
      { invalidFormat: false, value: "ValidCase", dataStruct: "enum" },
    ],
  ])("Should return range enumeration object: %p -> %p", (value, expected) =>
    expect(getRangeEnumeration(value)).toStrictEqual(expected)
  );
});