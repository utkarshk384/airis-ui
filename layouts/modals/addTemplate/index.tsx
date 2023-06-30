import { Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";

/* Components */
import { MultiSelect, Toast, useDropdown } from "@components";
import { FooterComponent } from "@layouts/shared/footer";
import { Drawer, RichTextEditor, Input, Select, RadioGroup } from "@components";

/* Valdiations */
import { validationSchema } from "./validations";

/* Types */
import type { TemplatePayload } from "@src/api/types";
import { useOptionList, useRadiologistList, useTemplates } from "@src/api";

type DrawerProps = {
  open: boolean;
  isEdit?: boolean;
  setOpen: (val: boolean) => void;
};

type ContentProps = {
  formikProps: FormikProps<FormProps>;
  onTextChange: (text: string) => void;
};

type FormProps = Omit<TemplatePayload, "text"> & {
  status: "draft" | "confirmed";
};

export const AddTemplate: React.FC<DrawerProps> = (props) => {
  const { open, setOpen, isEdit } = props;

  const [text, setText] = useState("");

  /* APis */
  const { addUpdateTemplate } = useTemplates();

  /* Handlers */
  const onSubmit = async (values: FormProps) => {
    const data: TemplatePayload = {
      ...values,
      text,
    };

    const toastId = Toast.loading("Saving template...");
    await addUpdateTemplate.mutateAsync(data, {
      onSuccess: () => {
        setOpen(false);
        Toast.success("Template saved successfully", { id: toastId });
      },
      onError: () =>
        Toast.error("An error occured. Please try again.", { id: toastId }),
    });
  };

  return (
    <Drawer size="large" open={open} onOpenChange={(val) => setOpen(val)}>
      {({ Header, Footer }) => (
        <Formik
          initialValues={{
            exam: 0,
            bodyPart: "",
            modality: "",
            radiologist: "",
            tags: "",
            templateName: "",
            visibilty: "private" as "private" | "public",
            status: "draft",
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <>
              <Header title={`${isEdit ? "Edit" : "Add"} Template`} />
              <Content
                onTextChange={(val) => setText(val)}
                formikProps={formikProps}
              />
              <Footer>
                <FooterComponent
                  onConfirm={() => {
                    formikProps.setFieldValue("status", "confirmed");
                    return formikProps.handleSubmit();
                  }}
                  onDraft={() => {
                    formikProps.setFieldValue("status", "draft");
                    formikProps.handleSubmit();
                  }}
                  onCancel={() => setOpen(false)}
                />
              </Footer>
            </>
          )}
        </Formik>
      )}
    </Drawer>
  );
};

const Content: React.FC<ContentProps> = (props) => {
  const { onTextChange, formikProps } = props;
  const { setFieldValue } = formikProps;

  /* APIs */
  const { getRadiologistList } = useRadiologistList();
  const { dropdown: bodyPartDropdown } = useOptionList("BODYPART");
  const { dropdown: modalityDropdown } = useOptionList("MODALITY");

  /* States */
  const [radiologistDropdown, setRadiologistDropdown] = useDropdown();

  useEffect(() => {
    if (getRadiologistList.data)
      setRadiologistDropdown(getRadiologistList.data, [
        "radiologistFullName",
        "mcrnumber",
      ]);
  }, [getRadiologistList.data, setRadiologistDropdown]);

  return (
    <>
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
            options={radiologistDropdown}
            onChange={(val) => setFieldValue("radiologist", val.value)}
          />
          <Select
            name="modality"
            placeholder="eg: CT Scan"
            label="Modality:"
            isSearchable
            options={modalityDropdown}
            onChange={(val) => {
              setFieldValue("modality", val.value);
            }}
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
            options={bodyPartDropdown}
            label="Body Part:"
            onChange={(opts) => {
              setFieldValue(
                "bodyPart",
                opts.map((opt) => opt.value).join(", ")
              );
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
          <RichTextEditor height="50vh" onChange={onTextChange} />
        </div>
      </div>
    </>
  );
};
