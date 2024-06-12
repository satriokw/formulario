import { useState } from "react";
import Form from "@rjsf/antd";
import validator from "@rjsf/validator-ajv8";

import { convertJsonSchema, convertUiSchema } from "../adaptor";

import taskDatas from "../data/tasks.json";
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
    setIsConvertForm(true);
    // console.log(dataMap[selectedTask.value]);
    if (!dataMap[selectedTask.value].hasOwnProperty("error")) {
      setSchema(convertJsonSchema(dataMap[selectedTask.value]));
      setUiSchema(convertUiSchema(dataMap[selectedTask.value]));
    }
  }

  function changeTask(option) {
    setIsConvertForm(false);
    setSelectedTask(option);
  }

  const log = (type) => console.log.bind(console, type);

  const datas = useMemo(
    () =>
      taskDatas.data.map((item) => ({
        value: item.id,
        label: `${item.name} -- ${item.id}`,
        key: item.id,
      })),
    [taskDatas]
  );

  function downloadData() {
    const json = JSON.stringify(schema);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'json_schema.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    downloadUiSchema()
  };

  function downloadUiSchema() {
    const json = JSON.stringify(uiSchema);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ui_shcema.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-8 grid grid-cols-2 gap-8">
      <div>
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
                onChange={(_value, option) => changeTask(option)}
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
        {isConvertForm && (
          <p className="mb-4">
            <Button className="ml-4" onClick={downloadData}>
              Download RJSF Form format file
            </Button>
          </p>
        )}
      </div>
      <div>
        <p className="mb-4">RJSF FORMS</p>
        {isConvertForm && (
          <div className="border border-slate-500 p-4">
            {selectedTask &&
            dataMap[selectedTask.value].hasOwnProperty("error") ? (
              <>
                <p>{dataMap[selectedTask.value].error.message}</p>
                <p>{dataMap[selectedTask.value].error.exception}</p>
              </>
            ) : (
              <Form
                schema={schema}
                validator={validator}
                uiSchema={uiSchema}
                onChange={log("changed")}
                onSubmit={log("submitted")}
                onError={log("errors")}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/form")({
  component: FormPage,
});
