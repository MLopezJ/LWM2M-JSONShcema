import fs from "fs";

/**
 * Get the equivalent data type
 * @param type
 * @returns string
 */
const getType = (type: string): string => {
  switch (type) {
    case "Integer":
      return "Number";
    case "Unsigned Integer":
      return "Number";
    case "Boolean":
      return "Boolean";
    case "String":
      return "String";
    default:
      return "Any";
  }
};

/**
 * Generate typebox definition with received params
 * @param key
 * @param type
 * @param description
 * @param isOptional
 * @param rangeEnumeration
 * @param id
 * @param units
 * @returns string
 */
export const getTypebox = (
  key: string,
  type: string,
  description: string,
  isOptional: boolean,
  rangeEnumeration: string[],
  id: string,
  units: string
): string => {
  const minimum = rangeEnumeration ? Number(rangeEnumeration[0]) : null;
  const maximun = rangeEnumeration ? Number(rangeEnumeration[1]) : null;

  const props = [
    `$id: '${id}'`,
    `description: "${description}"`,
    minimum ? `minimun: ${minimum}` : undefined,
    maximun ? `maximun: ${maximun}` : undefined,
    units ? `units: '${units}'` : undefined,
  ].reduce((previous, current, index) => {
    if (current) {
      if (index === 0) return current;
      return `${previous}, ${current}`;
    }
    return previous;
  }, "");

  const definition = `Type.${getType(type)}({${props}})`;
  return isOptional
    ? `${key}: Type.Optional(${definition})`
    : `${key}: ${definition}`;
};

export const parseItem = (element: any) => {
  // pick properties from the current element to generate the typebox definition
  const key = element.Name[0].replaceAll(" ", "_").replaceAll("-", "_");
  const type = element.Type[0];
  const description = element.Description[0]
    .replaceAll(`"`, "'")
    .replaceAll("’", "'")
    .replaceAll("\n", " ");
  const isOptional = element.Mandatory[0] === "Optional";
  const rangeEnumeration = element.RangeEnumeration[0].split("..");
  const id = element.ATTR.ID;
  const units = element.Units[0];

  return [key, type, description, isOptional, rangeEnumeration, id, units];
};

export const parsedItemToTypeBox = (
  key: string,
  type: string,
  description: string,
  isOptional: boolean,
  rangeEnumeration: string[],
  id: string,
  units: string
): string =>
  getTypebox(key, type, description, isOptional, rangeEnumeration, id, units);

/**
 * Iterates over the items and construct the definition of the object
 */
export const defineProperties = (
  items: any[],
  toTypeBox?: typeof parsedItemToTypeBox
): string => {
  const converted = items.map(parseItem);

  const result = converted.reduce(
    (
      object,
      [key, type, description, isOptional, rangeEnumeration, id, units]
    ) => {
      const typebox = (toTypeBox ?? parsedItemToTypeBox)(
        key,
        type,
        description,
        isOptional,
        rangeEnumeration,
        id,
        units
      );
      return object.length === 0 ? typebox : `${object}, ${typebox}`;
    },
    ""
  );

  return result;
};

/**
 * Typebox import statement in string
 */
const importTypeBox = `import { Type } from '@sinclair/typebox'`;

/**
 * General description of processed object
 */
const generalObjectDescription = (description: string): string =>
  description.replaceAll(`"`, "'").replaceAll("’", "'").replaceAll("\n", " ");

/**
 * name of processed object
 */
const objectName = (name: string): string => name.replaceAll(" ", "_");

/**
 * Transform json object in typebox definition.
 * Then write the result in a json file.
 * @param dir
 * @param description
 * @param items
 * @param name
 */
export const main =
  (dir: string, description: string, items: any[], name: string) =>
  (
    importStatement = importTypeBox,
    getGeneralDescription = () => generalObjectDescription(description),
    getProperties = (items: any[]) => defineProperties(items),
    getName = () => objectName(name),
    write = (dir: string, jsonSchema: any) =>
      fs.writeFileSync(dir, jsonSchema, "utf8")
  ): void => {
    const object = `export const ${getName()} = Type.Object({${getProperties(
      items
    )}}, {description: "${getGeneralDescription()}"})`;
    const jsonSchema = `${importStatement}\n ${object}`;
    write(dir, jsonSchema);
  };
