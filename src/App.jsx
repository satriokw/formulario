import { useState } from "react";
import Form from "@rjsf/core";
import { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";

import data from "./data.json";
import modelForm from "./data-form-model.json";

function App() {
  const [allFormData, setAllFormData] = useState(null);
  const [selectedForm, setSelectedForm] = useState({ name: null, id: null });
  const [isGetFormDataClicked, setIsGetFormDataClicked] = useState(false);
  function getData() {
    setAllFormData(data);
  }
  function selectForm(value) {
    setSelectedForm(value);
  }
  const schema = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
      title: { type: "string", title: "Title", default: "A new task" },
      done: { type: "boolean", title: "Done?", default: false },
    },
  };

  const log = (type) => console.log.bind(console, type);

  return (
    <div className="p-8">
      <div className="mb-8">
        <span>Get All Forms</span>
        <button
          className="ml-4 p-2 border border-black bg-slate-300"
          onClick={() => getData()}
        >
          Klik here
        </button>
      </div>
      <div className="mb-8 border border-black p-4">
        <p className="mb-4 text-2xl">List all forms</p>
        <ul>
          {allFormData === null ? (
            <li>null</li>
          ) : (
            allFormData.data.map((item) => (
              <li
                key={item.id}
                className="mb-4 hover:bg-blue-400"
                onClick={() => selectForm({ name: item.name, id: item.id })}
              >
                Name: {item.name}
                <ul>
                  <li>Key: {item.key}</li>
                  <li>Id: {item.id}</li>
                  <li>Version: {item.version}</li>
                </ul>
              </li>
            ))
          )}
        </ul>
      </div>
      <p className="mb-4">
        Selected form:{" "}
        <span>{`${selectedForm.name} --- ${selectedForm.id}`}</span>
      </p>
      <p className="mb-4">
        Get selected form model{" "}
        <button
          className="ml-4 p-2 border border-black bg-slate-300"
          onClick={() => setIsGetFormDataClicked(!isGetFormDataClicked)}
        >
          Klik Here
        </button>
      </p>
      <p className="mb-4">Form model</p>
      <div className="mb-8 border border-black p-4">
        {isGetFormDataClicked ? (
          <pre>{JSON.stringify(modelForm, null, 2)}</pre>
        ) : (
          <>No Data...</>
        )}
      </div>
      <p className="mb-8">
        Convert form model into RJSF{" "}
        <button
          className="ml-4 p-2 border border-black bg-slate-300"
          onClick={() => {}}
        >
          Klik Here
        </button>
      </p>
      <p className="mb-4">RJSF FORMS</p>
    </div>
  );
}

export default App;
