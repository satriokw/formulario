import { Link, createFileRoute } from "@tanstack/react-router";
import validator from "@rjsf/validator-ajv8";
import { AppShell, Button, Container, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Form from "@rjsf/antd";
import { useMemo, useEffect } from "react";
import { convertJsonSchema, convertUiSchema } from "../../adaptor";
import axios from "axios";
import { HttpStatusCode } from "axios";
import { useState } from "react";

function FormByTaskIdPage() {
  const { taskId } = Route.useParams();
  const [opened] = useDisclosure();
  const [formData, setFormData] = useState(null);

  const log = (type) => console.log.bind(console, type);

  function getData() {
    const url =
      "/api" + "/flowable-rest/service/runtime/tasks/" + taskId + "/form";

    axios
      .get(url, {
        auth: {
          username: "rest-admin",
          password: "test",
        },
      })
      .then((res) => {
        if (res.status == HttpStatusCode.Ok) {
          console.log("ok");
          setFormData(res.data);
        }
      });
    // setAllFormData(!allFormData);
  }

  useEffect(() => {
    getData();
  }, [taskId]);

  const schema = useMemo(() => {
    if (taskId !== undefined && formData !== null) {
      return convertJsonSchema(formData);
    } else return [];
  }, [formData, taskId]);
  const uiSchema = useMemo(() => {
    if (taskId !== undefined && formData !== null) {
      return convertUiSchema(formData);
    } else return [];
  }, [formData, taskId]);

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <Stack mih="100%" justify="space-between">
          <Stack align="stretch" justify="center" gap="md">
            <Text mt="xl" mb="4rem">
              Admin
            </Text>
            <Button>Task</Button>
            <Button variant="default">History</Button>
          </Stack>
          <Button fullWidth>Sign out</Button>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container fluid>
          <Link to="/tasks">
            <Button mb="xl">{`<- Back`}</Button>
          </Link>
          {schema.length === 0 ? (
            <div>schema is empty</div>
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
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export const Route = createFileRoute("/form/$taskId")({
  component: FormByTaskIdPage,
});
