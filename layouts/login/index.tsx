import * as yup from "yup";
import Link from "next/link";
import { Formik } from "formik";
import { useCallback } from "react";
import { useRouter } from "next/router";

/* Components */
import { useLogin } from "@src/api/hooks/useLogin";
import { Button, Input, Text, Toast } from "@components";

/* Consts */
import { COOKIE_KEYS, LOCAL_STORAGE_KEYS } from "@src/consts";

/* Utils */
import { setCookies } from "@utils/cookie";
import { ParseStringDate, addMinutes } from "@utils/dates-fns";
import { setLocalStoragevalue } from "@utils/localStorage";

/* Types */
import type { LoginPayload, LoginResult } from "@src/api/types";

type FormValues = {
  userName: string;
  password: string;
};

const validationSchema = yup.object().shape({
  userName: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const setValues = (res: LoginResult) => {
  const {
    token,
    userId,
    organizationId,
    branchId,
    fullName,
    otpExpiryDatetime,
    id,
  } = res;

  /* TODO: Get Expiry from backend */
  const parsed = new Date();
  const expiryDate = addMinutes(parsed, 14).toISOString();

  setCookies([
    { name: COOKIE_KEYS.token, value: token },
    { name: COOKIE_KEYS.userId, value: userId },
    { name: COOKIE_KEYS.id, value: id },
  ]);

  setLocalStoragevalue(LOCAL_STORAGE_KEYS.name, fullName);
  setLocalStoragevalue(LOCAL_STORAGE_KEYS.branchId, branchId.toString());
  setLocalStoragevalue(LOCAL_STORAGE_KEYS.orgId, organizationId.toString());
  setLocalStoragevalue(LOCAL_STORAGE_KEYS.tokenValidity, expiryDate.toString());
};

export const LoginForm: React.FC = (props) => {
  const {
    LoginMutation: { mutate, isLoading },
    IPQuery,
  } = useLogin();

  const router = useRouter();

  const onSubmit = useCallback(
    (values: FormValues) => {
      let vals: LoginPayload = { ...values, ipAddress: "" };
      if (IPQuery.data) vals["ipAddress"] = IPQuery.data.IPv4;

      const toastId = Toast.loading("Logging in...");
      mutate(vals, {
        onSuccess(data) {
          const res = data.success.result;
          const redirect = router.query["redirect_uri"];
          setValues(res);
          Toast.success("Logged in successfully", { id: toastId });

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
            isLoading={isLoading}
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
