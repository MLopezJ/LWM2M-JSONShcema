import {
  createResourceDefinition,
  createLiteralDefinition,
  createEnumDefinition,
} from "./createResourceDefinition";

describe("createResourceDefinition", () => {
  it("Should return a typebox definition in string", () => {
    const name = "Communication Retry Count";
    const type = "Unsigned Integer";
    const description =
      "The number of successive communication attempts before which a communication sequence is considered as failed.";
    const mandatoryStatus = "Mandatory";
    const multipleInstances = "Single";
    const rangeEnumeration = "";
    const id = "16";
    const units = "";
    const typeboxDefinition = createResourceDefinition(
      name,
      type,
      description,
      mandatoryStatus,
      multipleInstances,
      rangeEnumeration,
      id,
      units
    );
    const result = `_16: Type.Number({title: 'Communication Retry Count', description: \"The number of successive communication attempts before which a communication sequence is considered as failed.\"})`;

    expect(typeboxDefinition).toContain(`title: '${name}'`);
    expect(typeboxDefinition).toContain(`description: "${description}"`);
    expect(typeboxDefinition).toBe(result);
  });

  it("Should return a typebox definition in string specifying minimum and maximum value", () => {
    const name = "Communication Retry Count";
    const type = "Unsigned Integer";
    const description =
      "The number of successive communication attempts before which a communication sequence is considered as failed.";
    const mandatoryStatus = "Mandatory";
    const multipleInstances = "Single";
    const rangeEnumeration = "1..65534";
    const minimum = 1;
    const maximum = 65534;
    const id = "16";
    const units = "";
    const typeboxDefinition = createResourceDefinition(
      name,
      type,
      description,
      mandatoryStatus,
      multipleInstances,
      rangeEnumeration,
      id,
      units
    );

    const result = `_16: Type.Number({title: 'Communication Retry Count', description: "The number of successive communication attempts before which a communication sequence is considered as failed.", minimum: 1, maximum: 65534})`;

    expect(typeboxDefinition).toContain(`minimum: ${minimum}`);
    expect(typeboxDefinition).toContain(`maximum: ${maximum}`);
    expect(typeboxDefinition).toBe(result);
  });

  it("Should return a typebox definition in string specifying units", () => {
    const name = "Communication Retry Count";
    const type = "Unsigned Integer";
    const description =
      "The number of successive communication attempts before which a communication sequence is considered as failed.";
    const mandatoryStatus = "Mandatory";
    const multipleInstances = "Single";
    const rangeEnumeration = "";
    const id = "16";
    const units = "s";
    const typeboxDefinition = createResourceDefinition(
      name,
      type,
      description,
      mandatoryStatus,
      multipleInstances,
      rangeEnumeration,
      id,
      units
    );
    const result = `_16: Type.Number({title: 'Communication Retry Count', description: "The number of successive communication attempts before which a communication sequence is considered as failed.", units: 's'})`;

    expect(typeboxDefinition).toContain(`units: '${units}'`);
    expect(typeboxDefinition).toBe(result);
  });

  it("Should return a typebox definition in string specifying optional value", () => {
    const name = "Communication Retry Count";
    const type = "Unsigned Integer";
    const description =
      "The number of successive communication attempts before which a communication sequence is considered as failed.";
    const mandatoryStatus = "Optional";
    const multipleInstances = "Single";
    const rangeEnumeration = "";
    const id = "16";
    const units = "";
    const typeboxDefinition = createResourceDefinition(
      name,
      type,
      description,
      mandatoryStatus,
      multipleInstances,
      rangeEnumeration,
      id,
      units
    );
    const result = `_16: Type.Optional(Type.Number({title: 'Communication Retry Count', description: "The number of successive communication attempts before which a communication sequence is considered as failed."}))`;

    expect(typeboxDefinition).toBe(result);
  });

  it("Should return a typebox definition in string specifying mandatory value", () => {
    const name = "Communication Retry Count";
    const type = "Unsigned Integer";
    const description =
      "The number of successive communication attempts before which a communication sequence is considered as failed.";
    const mandatoryStatus = "Mandatory";
    const multipleInstances = "Single";
    const rangeEnumeration = "";
    const id = "16";
    const units = "";
    const typeboxDefinition = createResourceDefinition(
      name,
      type,
      description,
      mandatoryStatus,
      multipleInstances,
      rangeEnumeration,
      id,
      units
    );
    const result = `_16: Type.Number({title: 'Communication Retry Count', description: "The number of successive communication attempts before which a communication sequence is considered as failed."})`;

    expect(typeboxDefinition).toBe(result);
  });

  it("Should return a typebox definition in string specifying it is a multiple instance", () => {
    const name = "Communication Retry Count";
    const type = "Unsigned Integer";
    const description =
      "The number of successive communication attempts before which a communication sequence is considered as failed.";
    const mandatoryStatus = "Mandatory";
    const multipleInstances = "Multiple";
    const rangeEnumeration = "";
    const id = "16";
    const units = "";
    const typeboxDefinition = createResourceDefinition(
      name,
      type,
      description,
      mandatoryStatus,
      multipleInstances,
      rangeEnumeration,
      id,
      units
    );
    const result = `_16: Type.Array(Type.Number({title: 'Communication Retry Count', description: "The number of successive communication attempts before which a communication sequence is considered as failed."}))`;

    expect(typeboxDefinition).toBe(result);
  });

  it("Should return a typebox definition in string specifying it is a single instance", () => {
    const name = "Communication Retry Count";
    const type = "Unsigned Integer";
    const description =
      "The number of successive communication attempts before which a communication sequence is considered as failed.";
    const mandatoryStatus = "Mandatory";
    const multipleInstances = "Single";
    const rangeEnumeration = "";
    const id = "16";
    const units = "";
    const typeboxDefinition = createResourceDefinition(
      name,
      type,
      description,
      mandatoryStatus,
      multipleInstances,
      rangeEnumeration,
      id,
      units
    );
    const result = `_16: Type.Number({title: 'Communication Retry Count', description: "The number of successive communication attempts before which a communication sequence is considered as failed."})`;

    expect(typeboxDefinition).toBe(result);
  });

  it("Should check typebox definition when rangeEnumeration format is invalid", () => {
    const name = "name";
    const type = "Integer";
    const description = "Description";
    const mandatoryStatus = "Mandatory";
    const multipleInstances = "Single";
    const rangeEnumeration = "0..255 bytes";
    const id = "16";
    const units = "";
    const typeboxDefinition = createResourceDefinition(
      name,
      type,
      description,
      mandatoryStatus,
      multipleInstances,
      rangeEnumeration,
      id,
      units
    );
    const result = `_16: Type.Number({title: 'name', description: "Description ... 0..255 bytes"})`;

    expect(typeboxDefinition).toBe(result);
  });

  it("Should check typebox definition when rangeEnumeration format is a range", () => {
    const name = "name";
    const type = "Integer";
    const description = "Description";
    const mandatoryStatus = "Mandatory";
    const multipleInstances = "Single";
    const rangeEnumeration = "0..255";
    const id = "16";
    const units = "";
    const typeboxDefinition = createResourceDefinition(
      name,
      type,
      description,
      mandatoryStatus,
      multipleInstances,
      rangeEnumeration,
      id,
      units
    );
    const result = `_16: Type.Number({title: 'name', description: "Description", minimum: 0, maximum: 255})`;

    expect(typeboxDefinition).toBe(result);
  });
});

describe("createLiteralDefinition", () => {
  it.each([
    [
      { isString: true, isUnion: false, value: "a", props: "" },
      `Type.Literal('a' ,{})`,
    ],
    [
      { isString: false, isUnion: false, value: 1, props: "" },
      `Type.Literal(1 ,{})`,
    ],
  ])("Should create a 'Literal' typebox definition", (params, expected) => {
    expect(
      createLiteralDefinition(
        params.isString,
        params.isUnion,
        params.value,
        params.props
      )
    ).toBe(expected);
  });
});

describe("createEnumDefinition", () => {
  it.each([
    [{ value: "a", props: "" }, `Type.Literal('a' ,{})`],
    [{ value: 1, props: "" }, `Type.Literal(1 ,{})`],
    [
      { value: [1, 2, 3], props: "" },
      `Type.Union([Type.Literal(1 ),Type.Literal(2 ),Type.Literal(3 )],{})`,
    ],
    [
      { value: ["a", "b", "c"], props: "" },
      `Type.Union([Type.Literal('a' ),Type.Literal('b' ),Type.Literal('c' )],{})`,
    ],
  ])("Should create a 'Enum' typebox definition", (params, expected) => {
    expect(createEnumDefinition(params.value, params.props)).toBe(expected);
  });
});
