import { Formik } from "formik";
import React, { useEffect, useState } from "react";

/* Components */
import { Heading, Input } from "@components";
import { Switch } from "@components/Switch";

type Props = {
  children?: React.ReactNode;
};

type FormikValues = {
  name: string;
  regNo: string;
  shortName: string;
  email: string;
  contactNo: string;
  country: string;
  buildingNo: string;
  pinCode: string;
  street: string;
  logo: string;
  favicon: string;
  active: boolean;
};

const InitalValues: FormikValues = {
  name: "",
  regNo: "",
  shortName: "",
  email: "",
  contactNo: "",
  country: "",
  buildingNo: "",
  pinCode: "",
  street: "",
  logo: "",
  favicon: "",
  active: false,
};

export const OrganizationBranch: React.FC<Props> = (props) => {
  const {} = props;

  const [initValues, setInitValues] = useState<FormikValues>(InitalValues);

  const onSubmit = (values: FormikValues) => {};

  return (
    <div>
      <Formik initialValues={initValues} onSubmit={onSubmit}>
        {({ setFieldValue }) => (
          <div className="flex flex-col gap-12 py-6">
            <fieldset>
              <Heading size="lg" weight="600" className="mb-4">
                Organization Details
              </Heading>
              <div className="grid grid-cols-3">
                <Input
                  name="name"
                  placeholder="Your organization name"
                  label="Organization Name: "
                  variant="filled"
                />
                <Input
                  name="regNo"
                  placeholder="Company's Registration number"
                  label="Comp Reg No: "
                  variant="filled"
                />
                <Input
                  name="shortName"
                  placeholder="Short name of your organization"
                  label="Short Name:"
                  variant="filled"
                />
              </div>
            </fieldset>
            <fieldset>
              <Heading size="lg" weight="600" className="mb-4">
                Contact Details
              </Heading>
              <div className="grid grid-cols-3">
                <Input
                  name="email"
                  placeholder="Email address"
                  label="Email Address: "
                  variant="filled"
                />
                <Input
                  name="contactNo"
                  placeholder="Contact number"
                  label="Contact No: "
                  variant="filled"
                />
              </div>
            </fieldset>
            <fieldset>
              <Heading size="lg" weight="600" className="mb-4">
                Address Details
              </Heading>
              <div className="flex mb-6">
                <div className="w-4/12">
                  <Input
                    name="country"
                    placeholder="Country"
                    label="Country: "
                    variant="filled"
                  />
                </div>
                <div className="w-4/12">
                  <Input
                    className="w-3/4"
                    name="buildingNo"
                    placeholder="Building number"
                    label="Building No: "
                    variant="filled"
                  />
                </div>
                <div className="w-4/12">
                  <Input
                    className="w-1/2"
                    name="pinCode"
                    placeholder="Postal code"
                    label="Postal Code: "
                    variant="filled"
                  />
                </div>
              </div>
              <div className="w-[85%] mx-auto">
                <Input
                  wrapperClassName="!flex !w-full"
                  inputWrapperClassName="w-[58%]"
                  className="!w-full"
                  name="street"
                  placeholder="Street"
                  label="Street: "
                  variant="filled"
                />
              </div>
            </fieldset>
            <fieldset>
              <Heading size="lg" weight="600" className="mb-4">
                Other Details
              </Heading>
              <div className="grid grid-cols-3">
                <Input
                  name="logo"
                  type="file"
                  placeholder="Your organization name"
                  label="Organization Logo: "
                  variant="filled"
                />
                <Input
                  name="regNo"
                  type="file"
                  placeholder="Company's Registration number"
                  label="Comp Reg No: "
                  variant="filled"
                />
                <Switch
                  name="active"
                  label="Active: "
                  onChange={(checked) => setFieldValue("active", checked)}
                />
              </div>
            </fieldset>
          </div>
        )}
      </Formik>
    </div>
  );
};
