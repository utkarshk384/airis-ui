import { Formik } from "formik";
import { useCallback } from "react";
import Link from "next/link";

/* Components */
import { Button, Input, Text } from "@components";

type FormValues = {
  username: string;
  password: string;
};

export const LoginForm: React.FC = (props) => {
  const onSubmit = useCallback((values: FormValues) => {
    // Handle Submit
  }, []);
  return (
    <Formik
      initialValues={{ username: "", password: "" } as FormValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <form method="POST" className="flex flex-col items-center gap-4 w-full">
          <Input
            variant="underlined"
            placeholder="Username"
            name="username"
            type="text"
          />
          <Input
            variant="underlined"
            placeholder="Password"
            name="password"
            type="password"
          />

          <Button
            size="lg"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Text weight="500" color="white" as="p">
              LOGIN
            </Text>
          </Button>
          <Text size="xs" className="border-b-2 border-accent">
            <Link href="/forgot">Forgot Password?</Link>
          </Text>
        </form>
      )}
    </Formik>
  );
};
