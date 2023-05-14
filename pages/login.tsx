import React from "react";

/* Components */
import { Heading, Text, Logo } from "@components";

/* Layout */
import { LoginForm } from "@layouts/login";
import { LoginLayoutCard } from "@layouts/shared/loginCard";

type Props = {
  children?: React.ReactNode;
};

const LoginPage: React.FC<Props> = (props) => {
  const {} = props;

  return (
    <div className="w-4/5 mx-auto grid place-items-start h-screen">
      <div className="w-full flex flex-col items-center gap-7">
        <Logo alt="Rxmed Logo" width={420} height={156} />
        <div className="flex gap-4 flex-col items-center">
          <Heading
            weight="700"
            size="3xl"
            color="primary"
            className="text-center"
          >
            Radiology information system
          </Heading>
          <Text weight="500">
            Please login to AIRIS to view the Patient Study, Report and status.
          </Text>
        </div>
        <LoginLayoutCard
          Component={LoginForm}
          titleText="Welcome Back"
          subTitleText="Login to your account"
        />
      </div>
    </div>
  );
};

export default LoginPage;
