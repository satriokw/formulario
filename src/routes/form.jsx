import { useState } from "react";
import Form from "@rjsf/antd";
import validator from "@rjsf/validator-ajv8";

import { convertJsonSchema, convertUiSchema } from "../adaptor";

import taskDatas from "../data/tasks.json";
import modelForm from "../data/data-oss-2.json";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Select } from "@mantine/core";
import { useMemo } from "react";
import { dataMap } from "../utils";

function FormPage() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [allFormData, setAllFormData] = useState(false);
  const [isConvertForm, setIsConvertForm] = useState(false);
  const [schema, setSchema] = useState({});
  const [uiSchema, setUiSchema] = useState({});
  function getData() {
    setAllFormData(!allFormData);
  }

  function convertDataSchema() {
    setIsConvertForm(!isConvertForm);
    console.log(dataMap[selectedTask.value]);
    setSchema(convertJsonSchema(dataMap[selectedTask.value]));
    setUiSchema(convertUiSchema(dataMap[selectedTask.value]));
  }

  const log = (type) => console.log.bind(console, type);

  // console.log(allFormData);

  const datas = useMemo(
    () =>
      taskDatas.data.map((item) => ({
        value: item.id,
        label: `${item.name} -- ${item.id}`,
        key: item.id,
      })),
    [taskDatas]
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <span>Get All Tasks</span>
        <Button className="ml-4" onClick={() => getData()}>
          Click here
        </Button>
      </div>
      <div className="mb-8 border border-black p-4">
        {!allFormData ? (
          <span>no Data...</span>
        ) : (
          <>
            <p className="mb-4 text-2xl">Select form by task-id</p>
            <Select
              data={datas}
              onChange={(_value, option) => setSelectedTask(option)}
            />
          </>
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
