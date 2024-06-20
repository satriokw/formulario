import { Button, TextInput, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import axios, { HttpStatusCode } from "axios";

function Index() {
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    // },
  });

  function login(values) {
    const url =
      "/api" +
      import.meta.env.VITE_FLOWABLE_API_CONTEXT_PATH +
      "/idm-api/users/" +
      values.email;
    console.log(url);
    console.log(values);

    axios
      .get(url, {
        auth: {
          username: import.meta.env.VITE_FLOWABLE_API_USERNAME,
          password: import.meta.env.VITE_FLOWABLE_API_PASSWORD,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status == HttpStatusCode.Ok) {
          navigate({ to: "/form" });
        }
      });
    // navigate({ to: "/form" });
  }
  return (
    <Center h="100vh">
      <Grid justify="center" align="center" gutter="xl">
        <Grid.Col span={6}>
          <form onSubmit={form.onSubmit(login)}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />

            <PasswordInput
              className="mt-8"
              withAsterisk
              label="Password"
              placeholder="input password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />

            <Button fullWidth mt="md" type="submit">
              Submit
            </Button>
          </form>
        </Grid.Col>
        <Grid.Col span={6} p="lg">
          <img src={kwLogo.src} />
        </Grid.Col>
      </Grid>
    </Center>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});
