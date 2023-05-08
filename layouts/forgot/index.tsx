import Link from "next/link";
import { Formik } from "formik";
import { useCallback } from "react";

/* Components */
import { Button, Input, Text } from "@components";

type FormValues = {
  username: string;
  password: string;
};

export const ForgotForm: React.FC = (props) => {
  const onSubmit = useCallback((values: FormValues) => {
    // Handle Submit
  }, []);
  return (
    <Formik
      initialValues={{ username: "", password: "" } as FormValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <form method="POST" className="flex flex-col gap-4 w-3/5 mx-auto">
          <div className="relative">
            <Input
              variant="underlined"
              className="w-3/4"
              placeholder="Username"
              name="email"
            />
            <Button
              className="absolute -right-20 top-0"
              size="base"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              typographyProps={{
                size: "xs",
                weight: "500",
                color: "white",
              }}
            >
              Send OTP
            </Button>
          </div>
          <Input variant="underlined" placeholder="Enter OTP" name="otp" />
          <Input
            variant="underlined"
            placeholder="New Password"
            name="Password"
          />
          <div className="flex justify-center w-full">
            <Button
              disabled
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              typographyProps={{
                weight: "500",
                color: "white",
              }}
            >
              Reset Password
            </Button>
          </div>
          <div className="flex justify-center">
            <Text size="xs" className="border-b-2 w-fit border-accent">
              <Link href="/login">Back to Login</Link>
            </Text>
          </div>
        </form>
      )}
    </Formik>
  );
};
