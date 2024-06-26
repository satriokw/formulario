import { Link, createFileRoute } from "@tanstack/react-router";
import {
  AppShell,
  Button,
  Flex,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import allTasksData from "../data/tasks.json";
import axios, { HttpStatusCode } from "axios";
import { useEffect } from "react";
import { useState } from "react";

function TaskPage() {
  const [opened] = useDisclosure();
  const [allTaskData, setAllTaskData] = useState(null);

  function getData() {
    const username = "santo";
    const url =
      "/api" + "flowable-rest/service/runtime/tasks?assignee=" + username;

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
          setAllTaskData(res.data);
        }
      });
    // setAllFormData(!allFormData);
  }

  useEffect(() => {
    getData();
  }, []);

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
        <Flex
          gap="md"
          justify="flex-end"
          align="flex-start"
          direction="row"
          wrap="wrap"
          my={32}
        >
          <Title order={3}>
            Task Active (Update Time: 2024-06-18 09:00:00)
          </Title>
        </Flex>

        <Table withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Owner</Table.Th>
              <Table.Th>Created Time</Table.Th>
              <Table.Th>Priority</Table.Th>
              <Table.Th>Due Date</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {allTaskData !== null ? (
              allTaskData.data.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.id}</Table.Td>
                  <Table.Td>{item.name}</Table.Td>
                  <Table.Td>{item.description ?? "-"}</Table.Td>
                  <Table.Td>{item.owner ?? "-"}</Table.Td>
                  <Table.Td>{item.createTime}</Table.Td>
                  <Table.Td>{item.priority}</Table.Td>
                  <Table.Td>{item.dueDate ?? "-"}</Table.Td>
                  <Table.Td>
                    <Link
                      to="/form/$taskId"
                      params={{
                        taskId: item.id,
                      }}
                    >
                      <Button>View Task</Button>
                    </Link>
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Text>Data not found</Text>
            )}
          </Table.Tbody>
        </Table>
      </AppShell.Main>
    </AppShell>
  );
}

export const Route = createFileRoute("/tasks")({
  component: TaskPage,
});
