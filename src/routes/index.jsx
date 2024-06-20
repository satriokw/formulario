import { Container, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, Group, TextInput } from "@mantine/core";
import  axios, { HttpStatusCode }  from "axios";

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
    const url = '/api' + import.meta.env.VITE_FLOWABLE_API_CONTEXT_PATH + '/idm-api/users/' + values.email
    console.log(url)
    console.log(values);

    axios.get(url, {
      auth: {
        username: import.meta.env.VITE_FLOWABLE_API_USERNAME,
        password: import.meta.env.VITE_FLOWABLE_API_PASSWORD
      }
    }).then(res=>{
      console.log(res);
      if(res.status == HttpStatusCode.Ok) {
        navigate({ to: "/form" });
        
      }

    })
    // navigate({ to: "/form" });
  }
  return (
    <div className="mt-12 p-2">
      <Container>
        <p className="mb-8 text-2xl font-bold">
          Login
        </p>
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

          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Container>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});
