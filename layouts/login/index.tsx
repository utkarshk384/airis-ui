import * as yup from "yup";
import Link from "next/link";
import { Formik } from "formik";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";

/* Components */
import { useLogin } from "@src/api/hooks/useLogin";
import { Button, Input, Text, Toast } from "@components";

/* Consts */
import { COOKIE_KEYS, LOCAL_STORAGE_KEYS } from "@src/consts";

/* Utils */
import { setCookies } from "@utils/cookie";
import { PasswordValidation } from "../shared/validation";
import { setLocalStoragevalue } from "@utils/localStorage";
import { ParseStringDate, addMinutes } from "@utils/dates-fns";

/* Types */
import type { LoginPayload, LoginResult, RoleType } from "@src/api/types";

type FormValues = {
  userName: string;
  password: string;
};

const validationSchema = yup.object().shape({
  userName: yup.string().required("Username is required"),
  password: PasswordValidation,
});

const setValues = (res: LoginResult) => {
  const { token, userId, organizationId, branchId, fullName, id, roleId } = res;

  const parsed = new Date();
  const expiryDate = addMinutes(parsed, 14).toISOString();

  // If you add an item to this array then make sure to remove it from the logout function
  setCookies(
    [
      { name: COOKIE_KEYS.token, value: token },
      { name: COOKIE_KEYS.userId, value: userId },
      { name: COOKIE_KEYS.id, value: id },
      { name: COOKIE_KEYS.roleId, value: roleId },
    ],
    {
      hours: 6,
    }
  );

  setLocalStoragevalue(LOCAL_STORAGE_KEYS.name, fullName);
  setLocalStoragevalue(LOCAL_STORAGE_KEYS.branchId, branchId.toString());
  setLocalStoragevalue(LOCAL_STORAGE_KEYS.orgId, organizationId.toString());
  setLocalStoragevalue(LOCAL_STORAGE_KEYS.tokenValidity, expiryDate.toString());
};

const transformRoles = (roles: RoleType[]) => {
  const mappedRoles: Record<string, RoleType> = {};
  roles.forEach((role) => {
    mappedRoles[role.featureIdentifier] = role;
  });

  return mappedRoles;
};

export const LoginForm: React.FC = (props) => {
  const {
    LoginMutation: { mutate, isLoading },
    IPQuery,
    getRoles,
    setRolesPayload,
    rolesPayload,
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
          setRolesPayload({
            appRoleId: res.roleId,
            orgId: res.organizationId,
            branchId: res.branchId,
            userId: res.id,
            designationId: res.designationId,
          });

          Toast.success("Logged in successfully", { id: toastId });

          if (typeof redirect === "string") router.push(redirect);
          else router.push("/");
        },
        onError(data) {
          const error = data?.data?.failure?.message?.failure?.message;
          Toast.error(error || "Something went wrong", {
            id: toastId,
          });
        },
      });
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [IPQuery.data, mutate]
  );

  useEffect(() => {
    if (!rolesPayload.orgId) return;
    getRoles.refetch().then((res) => {
      if (res.isSuccess) {
        const mappedRoles = transformRoles(res.data);
        setLocalStoragevalue(LOCAL_STORAGE_KEYS.roles, mappedRoles);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolesPayload]);

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ userName: "", password: "" } as FormValues}
      onSubmit={onSubmit}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ handleSubmit }) => (
        <form className="flex flex-col items-center w-3/5 gap-4">
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
