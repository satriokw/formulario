import { Container, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, Group, TextInput } from "@mantine/core";

function Index() {
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  function login(values) {
    console.log(values);
    navigate({ to: "/form" });
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
