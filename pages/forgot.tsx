import React from "react";

/* Components */
import { Heading, Logo, Text } from "@components";

/* Layout */
import { LoginLayoutCard } from "@layouts/shared/loginCard";
import { ForgotForm } from "@layouts/forgot";

type Props = {
  children?: React.ReactNode;
};

const ForgotPage: React.FC<Props> = (props) => {
  const {} = props;

  return (
    <div className="w-4/5 mx-auto grid place-items-start h-screen">
      <div className="w-full flex flex-col items-center gap-7">
        <Logo alt="Rxmed Logo" width={280} height={104} />
        <div className="flex gap-4 flex-col items-center">
          <Heading
            weight="700"
            size="3xl"
            color="primary"
            className="text-center"
          >
            Radiology information system
          </Heading>
          <Text weight="500" className="text-center">
            Please RESET YOUR PASSWORD to view the Patient Study, Report and
            status.
          </Text>
        </div>
        <LoginLayoutCard
          className="!h-[65vh]"
          Component={ForgotForm}
          titleText="Forgot Password?"
          subTitleText="Reset your password"
        />
      </div>
    </div>
  );
};

export default ForgotPage;
