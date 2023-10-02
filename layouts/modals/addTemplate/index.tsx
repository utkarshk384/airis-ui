import { Formik, FormikProps } from "formik";
import { useEffect, useMemo, useState } from "react";

/* Components */
import { MultiSelect, Toast, useDropdown } from "@components";
import { FooterComponent } from "@layouts/shared/footer";
import { Drawer, RichTextEditor, Input, Select, RadioGroup } from "@components";

/* Valdiations */
import { validationSchema } from "./validations";

/* APIs */
import { useOptionList, useRadiologistList, useTemplates } from "@src/api";

/* Types */
import type { TemplatePayload } from "@src/api/types";

type BaseProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  refetchFn?: () => void;
};

type DrawerProps = BaseProps &
  (
    | {
        isEdit?: true;
        defaultValue: DefaultValueType;
      }
    | {
        isEdit?: false;
        defaultValue?: never;
      }
  );

type DefaultValueType = FormProps & {
  reportTemplate: string;
  id: number;
};

type ContentProps = {
  formikProps: FormikProps<FormProps>;
  onTextChange: (text: string) => void;
  textDefaultValue?: string;
};

type FormProps = Omit<TemplatePayload, "text"> & {
  status: "draft" | "confirmed";
};

const INITIAL_STATE = {
  exam: 0,
  bodyPart: "",
  modality: "",
  radiologist: "",
  tags: "",
  templateName: "",
  visibilty: "private" as "private" | "public",
  status: "draft" as "draft" | "confirmed",
};

export const AddTemplate: React.FC<DrawerProps> = (props) => {
  const { open, setOpen, isEdit, refetchFn, defaultValue } = props;

  /* States */
  const [text, setText] = useState("");
  const [initialValues, setInitialValues] = useState<FormProps>(INITIAL_STATE);

  /* APIs */
  const { addUpdateTemplate } = useTemplates();

  /* Handlers */
  const onSubmit = async (values: FormProps) => {
    const data: TemplatePayload = {
      ...values,
      reportTemplateId: defaultValue?.id || 0,
      text,
    };

    const toastId = Toast.loading("Saving template...");
    await addUpdateTemplate.mutateAsync(data, {
      onSuccess: () => {
        refetchFn?.();
        setOpen(false);
        Toast.success("Template saved successfully", { id: toastId });
      },
      onError: () =>
        Toast.error("An error occured. Please try again.", { id: toastId }),
    });
  };

  useEffect(() => {
    if (defaultValue) setInitialValues(defaultValue);
    if (defaultValue?.reportTemplate) setText(defaultValue.reportTemplate);
  }, [defaultValue]);

  return (
    <Drawer size="large" open={open} onOpenChange={(val) => setOpen(val)}>
      {({ Header, Footer }) => (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <>
              <Header title={`${isEdit ? "Edit" : "Add"} Template`} />
              <Content
                textDefaultValue={defaultValue?.reportTemplate}
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
  const { onTextChange, formikProps, textDefaultValue } = props;
  const { setFieldValue } = formikProps;

  /* APIs */
  const { getRadiologistList } = useRadiologistList();
  const { dropdown: bodyPartDropdown } = useOptionList("BODYPART");
  const { dropdown: modalityDropdown } = useOptionList("MODALITY");
  const { dropdown: examDropdown } = useOptionList("PROCEDUREMASTER");

  /* States */
  const [radiologistDropdown, setRadiologistDropdown] = useDropdown();

  useEffect(() => {
    if (getRadiologistList.data)
      setRadiologistDropdown(getRadiologistList.data, [
        "radiologistFullName",
        "mcrnumber",
      ]);
  }, [getRadiologistList.data, setRadiologistDropdown]);

  const bodyPartDefaultValue = useMemo(() => {
    if (!formikProps.values.bodyPart) return undefined;

    const splitValues = formikProps.values.bodyPart.split(", ");

    return bodyPartDropdown.filter((opt) =>
      splitValues.includes(`${opt.value}`)
    );
  }, [bodyPartDropdown, formikProps.values.bodyPart]);

  const tagsDefaultValue = useMemo(() => {
    if (!formikProps.values.tags) return undefined;

    return formikProps.values.tags
      .split(", ")
      .map((item) => ({ label: item, value: item }));
  }, [formikProps.values.tags]);

  // console.log(formikProps.values);
  return (
    <>
      <div className="grid grid-rows-[1fr_2fr]">
        <div className="grid grid-cols-2 gap-4 p-4 justify-items-end">
          <Input
            name="templateName"
            placeholder="eg:  Hand Injury template"
            label="Template Name* :"
            variant="filled"
          />
          <Select
            name="radiologist"
            placeholder="Select radiologist"
            label="Radiologist / Author* :"
            isSearchable
            initialSelectedItem={radiologistDropdown.find(
              (opt) => opt.value === formikProps.values.radiologist
            )}
            errorText={formikProps.errors.radiologist}
            options={radiologistDropdown}
            onChange={(val) => setFieldValue("radiologist", val.value)}
          />
          <Select
            name="modality"
            placeholder="eg: CT Scan"
            label="Modality* :"
            isSearchable
            initialSelectedItem={modalityDropdown.find(
              (opt) => `${opt.value}` === formikProps.values.modality
            )}
            errorText={formikProps.errors.modality}
            options={modalityDropdown}
            onChange={(val) => {
              setFieldValue("modality", val.value);
            }}
          />
          <Select
            name="exam"
            placeholder="eg:  EXM2020"
            errorText={formikProps.errors.exam}
            label="Exam Name:"
            options={examDropdown}
            onChange={(val) => setFieldValue("exam", val.value)}
          />
          <MultiSelect
            createOptions
            placeholder="Select body parts..."
            name="bodyPart"
            isSearchable
            defaultValue={bodyPartDefaultValue}
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
            defaultValue={tagsDefaultValue}
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
            defaultChecked={formikProps.values.visibilty.toLocaleLowerCase()}
            items={[
              { label: "Public", value: "public" },
              { label: "Private", value: "private" },
            ]}
            onChange={(val) => setFieldValue("visibilty", val)}
          />
        </div>
        <div className="p-4 h-full flex justify-stretch w-full max-w-[var(--drawer-width)] flex-col">
          <RichTextEditor
            defaultValue={textDefaultValue}
            height="50vh"
            onChange={onTextChange}
          />
        </div>
      </div>
    </>
  );
};
