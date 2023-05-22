import * as yup from "yup";
import Link from "next/link";
import { Formik } from "formik";
import { useCallback } from "react";
import { useRouter } from "next/router";

/* Components */
import { Button, Input, Text, Toast } from "@components";
import { useLogin } from "@src/api/hooks/useLogin";

/* Consts */
import { LOCAL_STORAGE_KEYS } from "@src/consts";

/* Types */
import { LoginPayload } from "@src/api/types";
import useLocalStorage from "@src/hooks/useLocalStorage";

type FormValues = {
  userName: string;
  password: string;
};

const validationSchema = yup.object().shape({
  userName: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const LoginForm: React.FC = (props) => {
  const {
    LoginMutation: { mutate },
    IPQuery,
  } = useLogin();

  const router = useRouter();
  const { setMultipleStorageValues } = useLocalStorage();

  const onSubmit = useCallback(
    (values: FormValues) => {
      let vals: LoginPayload = { ...values, ipAddress: "" };
      if (IPQuery.data) vals["ipAddress"] = IPQuery.data.IPv4;

      const toastId = Toast.loading("Logging in...");
      mutate(vals, {
        onSuccess(data) {
          const res = data.success.result;
          const redirect = router.query["redirect_uri"];

          Toast.success("Logged in successfully", { id: toastId });
          setMultipleStorageValues([
            { key: LOCAL_STORAGE_KEYS.token, value: res.token },
            { key: LOCAL_STORAGE_KEYS.userId, value: res.userId },
          ]);

          if (typeof redirect === "string") router.push(redirect);
          else router.push("/");
        },
        onError(error) {
          if (error.statusCode === 401)
            Toast.error(
              "Please check your username or password and try again.",
              { id: toastId }
            );
          else
            Toast.error("Something went wrong while logging in", {
              id: toastId,
            });
        },
      });
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [IPQuery.data, mutate]
  );
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ userName: "", password: "" } as FormValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <form className="flex flex-col items-center gap-4 w-3/5">
          <Input
            variant="underlined"
            placeholder="Username"
            name="userName"
            type="text"
          />
          <Input
            variant="underlined"
            placeholder="Password"
            name="password"
            type="password"
          />

          <Button
            variant="solid"
            typographyProps={{
              weight: "500",
              color: "white",
            }}
            size="lg"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            LOGIN
          </Button>
          <Text size="xs" className="border-b-2 border-accent">
            <Link href="/forgot">Forgot Password?</Link>
          </Text>
        </form>
      )}
    </Formik>
  );
};
