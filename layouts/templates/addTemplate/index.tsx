import { Formik } from "formik";
import { useEffect, useState } from "react";

/* Components */
import { MultiSelect, Toast, useDropdown } from "@components";
import { FooterComponent } from "@layouts/shared/footer";
import { Drawer, RichTextEditor, Input, Select, RadioGroup } from "@components";

/* Types */
import type { TemplatePayload } from "@src/api/types";
import { useRadiologistList, useTemplates } from "@src/api";

type DrawerProps = {
  open: boolean;
  isEdit?: boolean;
  setOpen: (val: boolean) => void;
};

type ContentProps = {
  initalValues: FormikProps;
};

type FormikProps = Omit<TemplatePayload, "text">;

export const AddTemplate: React.FC<DrawerProps> = (props) => {
  const { open, setOpen, isEdit } = props;

  return (
    <Drawer size="large" open={open} onOpenChange={(val) => setOpen(val)}>
      {({ Header, Footer }) => (
        <>
          <Header title={`${isEdit ? "Edit" : "Add"} Template`} />
          <Content
            initalValues={{
              exam: 0,
              bodyPart: "",
              modality: 0,
              radiologist: "",
              tags: "",
              templateName: "",
              visibilty: "private",
            }}
          />
          <Footer>
            <FooterComponent onCancel={() => setOpen(false)} />
          </Footer>
        </>
      )}
    </Drawer>
  );
};

const Content: React.FC<ContentProps> = (props) => {
  const [text, setText] = useState("");

  const { addUpdateTemplate } = useTemplates();
  const { getRadiologistList } = useRadiologistList();
  const [options, setOptsData] = useDropdown();

  useEffect(() => {
    if (getRadiologistList.data)
      setOptsData(getRadiologistList.data, [
        "radiologistFullName",
        "mcrnumber",
      ]);
  }, [getRadiologistList.data, setOptsData]);

  /* Handlers */
  const handleSubmit = async (values: FormikProps) => {
    const data: TemplatePayload = {
      ...values,
      text,
    };

    const toastId = Toast.loading("Saving template...");
    const res = await addUpdateTemplate.mutateAsync(data, {
      onSuccess: () =>
        Toast.success("Template saved successfully", { id: toastId }),
      onError: () =>
        Toast.error("An error occured. Please try again.", { id: toastId }),
    });
  };

  return (
    <Formik initialValues={props.initalValues} onSubmit={handleSubmit}>
      {({ setFieldValue }) => (
        <div className="grid grid-rows-[1fr_2fr]">
          <div className="p-4 gap-4 grid grid-cols-2 justify-items-end">
            <Input
              name="templateName"
              placeholder="eg:  Hand Injury template"
              label="Template Name:"
              variant="filled"
            />
            <Select
              name="radiologist"
              placeholder="Select radiologist"
              label="Radiologist / Author:"
              isSearchable
              options={options}
              onChange={(val) => setFieldValue("radiologist", val.value)}
            />
            <Select
              name="modaility"
              placeholder="eg: CT Scan"
              label="Modaility:"
              isSearchable
              options={[
                {
                  label: "Abdomen",
                  value: "abdomen",
                },
                {
                  label: "Modality",
                  value: "abdomen1",
                },
                {
                  label: "Tests",
                  value: "abdomen2",
                },
                {
                  label: "CT Scan",
                  value: "abdomen3",
                },
                {
                  label: "Tags",
                  value: "abdomen4",
                },
              ]}
              onChange={(val) => setFieldValue("modality", val.value)}
            />
            <Select
              name="exam"
              placeholder="eg:  EXM2020"
              label="Exam Name:"
              options={[]}
              onChange={(val) => setFieldValue("exam", val.value)}
            />
            <MultiSelect
              createOptions
              placeholder="Select body parts..."
              name="bodyPart"
              isSearchable
              options={[]}
              label="Body Part:"
              onChange={(opts) => {
                setFieldValue(
                  "bodyPart",
                  opts.map((opt) => opt.value).join(", ")
                );
                console.log(opts.map((opt) => opt.value).join(", "));
              }}
            />
            <MultiSelect
              createOptions
              placeholder="Select tags..."
              name="tags"
              isSearchable
              options={[]}
              label="Tags:"
              onChange={(opts) =>
                setFieldValue("tags", opts.map((opt) => opt.value).join(", "))
              }
            />
            <RadioGroup
              label="Visibility:"
              name="visibilty"
              variant="button"
              defaultChecked="public"
              items={[
                { label: "Public", value: "public" },
                { label: "Private", value: "private" },
              ]}
              onChange={(val) => setFieldValue("visibilty", val)}
            />
          </div>
          <div className="p-4 h-full flex justify-stretch w-full max-w-[var(--drawer-width)] flex-col">
            <RichTextEditor height="50vh" onChange={(val) => setText(val)} />
          </div>
        </div>
      )}
    </Formik>
  );
};
