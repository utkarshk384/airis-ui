import Link from "next/link";
import { Formik } from "formik";
import { useRouter } from "next/router";
import type { ValidationError } from "yup";
import { useCallback, useEffect, useState } from "react";

/* Components */
import { Button, Input, Text, Toast } from "@components";

/* Validation */
import { PartialValidate, validationSchema } from "./validation";

/* Types */
import type { SetFormikError } from "./types";
import type { ForgotPayload, PartialForgotPayload } from "@src/api/types";

/* APIs */
import { useForgot } from "@src/api";

export const ForgotForm: React.FC = (props) => {
  const { ForgotMutation, OtpMutation } = useForgot();

  const router = useRouter();

  const onSubmit = useCallback((values: ForgotPayload) => {
    ForgotMutation.mutateAsync(values, {
      onSuccess() {
        Toast.success("Password successfully reset.");
        router.push("/login");
      },
      onError(data) {
        Toast.error(
          "Something went wrong while resetting password. Please try again."
        );
      },
    });
  }, []);

  const [isOtpSent, setIsOtpSent] = useState(false);

  const sendOtp = useCallback(
    (values: PartialForgotPayload, setError: SetFormikError) => {
      let validatedValues: PartialForgotPayload | null = null;
      try {
        validatedValues = PartialValidate.validateSync(values, {
          stripUnknown: true,
          abortEarly: false,
        });
      } catch (e) {
        const errors = e as ValidationError;
        if (errors.inner.length > 0)
          errors.inner.forEach((err) => {
            setError(err.path!, err.message);
          });
        else setError(errors.path!, errors.message);

        return;
      }
      if (!validatedValues) return;

      // Send OTP
      setIsOtpSent(true);
      const toastId = Toast.loading("Sending OTP...");

      OtpMutation.mutate(validatedValues, {
        onSuccess() {
          Toast.success("Sucessfully sent OTP", { id: toastId });
        },
        onError() {
          Toast.error("An error occured. Please try again.", { id: toastId });
        },
      });
    },
    []
  );

  useEffect(() => {}, []);

  return (
    <Formik
      initialValues={
        { userId: "", email: "", password: "", otp: "" } as ForgotPayload
      }
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, setFieldError }) => (
        <form
          method="POST"
          className="flex flex-col transition-all duration-200 ease-in-out gap-4 w-3/5 mx-auto"
        >
          <div className="relative">
            <Input
              variant="underlined"
              className="w-3/4"
              placeholder="Username"
              name="userId"
              errorBeforeTouch
            />
            <Input
              variant="underlined"
              className="w-3/4"
              placeholder="Email"
              name="email"
              errorBeforeTouch
            />
            <Button
              size="base"
              className="absolute -right-5 bottom-2"
              onClick={(e) => {
                e.preventDefault();
                sendOtp(values, setFieldError);
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
          {isOtpSent && (
            <Input variant="underlined" placeholder="Enter OTP" name="otp" />
          )}
          <Input
            variant="underlined"
            placeholder="New Password"
            name="password"
            type="password"
          />
          <div className="flex justify-center w-full">
            <Button
              disabled={!isOtpSent}
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
