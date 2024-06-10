import { useState } from "react";
import Form from "@rjsf/antd";
import validator from "@rjsf/validator-ajv8";

import { convertJsonSchema, convertUiSchema } from "../adaptor";

import data from "../data.json";
import modelForm from "../data-oss-2.json";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Select } from "@mantine/core";
import { useMemo } from "react";

function FormPage() {
  const [allFormData, setAllFormData] = useState(null);
  const [isConvertForm, setIsConvertForm] = useState(false);
  const [schema, setSchema] = useState({});
  const [uiSchema, setUiSchema] = useState({});
  function getData() {
    setAllFormData(data);
  }

  function convertDataSchema() {
    setIsConvertForm(!isConvertForm);
    setSchema(convertJsonSchema(modelForm));
    setUiSchema(convertUiSchema(modelForm));
  }

  const log = (type) => console.log.bind(console, type);

  // console.log(allFormData);

  const formDatas = useMemo(
    () =>
      data.data.map((item) => ({
        value: item.id,
        label: item.name,
        key: item.id,
      })),
    [data]
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <span>Get All Forms</span>
        <Button className="ml-4" onClick={() => getData()}>
          Click here
        </Button>
      </div>
      <div className="mb-8 border border-black p-4">
        <p className="mb-4 text-2xl">List all forms</p>
        {allFormData === null ? (
          <span>no Data...</span>
        ) : (
          <Select data={formDatas} />
        )}
      </div>
      <p className="mb-4">
        Get selected form model and Convert Form{" "}
        <Button className="ml-4" onClick={() => convertDataSchema()}>
          Click here
        </Button>
      </p>
      <p className="mb-4">RJSF FORMS</p>
      <div className="border border-slate-500 p-4">
        {isConvertForm ? (
          <Form
            schema={schema}
            validator={validator}
            uiSchema={uiSchema}
            onChange={log("changed")}
            onSubmit={log("submitted")}
            onError={log("errors")}
          />
        ) : null}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/form")({
  component: FormPage,
});
