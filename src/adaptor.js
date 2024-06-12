// const data = require("./flow-os.json");

const typeMap = {
  decimal: "number",
  integer: "integer",
  text: "string",
  password: "string",
  upload: "string",
  "radio-buttons": "string",
  dropdown: "string",
  boolean: "boolean",
  date: "string",
};

// function JSONSchema convert
export function convertJsonSchema(data) {
  // function JSONSchema convert
  const transformedData = {
    title: data.name,
    description: "",
    type: "object",
    required: [],
    properties: {},
  };
  data.fields.forEach((field) => {
    const { id, name, type } = field;

    // if the type is not on the typeMap, it will skip it.
    if (type in typeMap) {
      const property = {
        title: name,
        type: typeMap[type],
      };

      // min-max length
      if (field.hasOwnProperty("params") && field.params.minLength) {
        property.minLength = Number.parseInt(field.params.minLength);
      }
      if (field.hasOwnProperty("params") && field.params.maxLength) {
        property.maxLength = Number.parseInt(field.params.maxLength);
      }

      // Check if either the id or the name contains the string "email" to format email
      if (
        field.id.toLowerCase().includes("email") ||
        field.name.toLowerCase().includes("email")
      ) {
        // Set the variable property_format to "email"
        property.format = "email";
      }

      // pattern
      if (field.hasOwnProperty("params") && field.params.regexPattern) {
        property.pattern = `/^${field.params.regexPattern}$/`;
      }

      // radio-button and dropdown
      if (type === "dropdown" || type === "radio-buttons") {
        property.enum = field.options.map((item) => item.name);
      }

      // upload
      if (type === "upload") {
        property.format = "data-url";
      }

      // date
      if (type === "date") {
        property.format = "date";
      }

      // default value
      if (field.hasOwnProperty("value") && field.value !== null) {
        property.default = field.value;
      }
      if (
        field.type === "boolean" &&
        field.hasOwnProperty("value") &&
        field.value === null
      ) {
        property.default = false;
      }

      // required form
      if (field.required) {
        transformedData.required.push(id);
      }
      transformedData.properties[id] = property;
    }
  });

  return transformedData;
}

// function UISchema convert
export function convertUiSchema(data) {
  const uiSchema = {};
  data.fields.forEach((field) => {
    const { id } = field;

    // if the type is not on the typeMap, it will skip it.
    if (field.type in typeMap) {
      const uiProperty = {};

      // placeholder
      if (field.placeholder) {
        uiProperty["ui:placeholder"] = field.placeholder;
      }
      // readonly
      if (field.readOnly) {
        uiProperty["ui:readonly"] = field.readOnly;
      }
      // password
      if (field.type === "password") {
        uiProperty["ui:widget"] = "password";
      }

      // radio-buttons
      if (field.type === "radio-buttons") {
        (uiProperty["ui:widget"] = "radio"),
          (uiProperty["ui:options"] = {
            inilne: true,
          });
      }

      uiSchema[id] = uiProperty;
    }
  });

  return uiSchema;
}
