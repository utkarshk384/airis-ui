import {
  ArrowTopRightOnSquareIcon as ExternalLinkIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";

/* Components */
import { FooterComponent } from "@layouts/shared/footer";
import {
  Accordion,
  Drawer,
  Button,
  Text,
  RichTextEditor,
  Input,
  RadioGroup,
} from "@components";
import { Formik } from "formik";

type DrawerProps = {
  open: boolean;
  isEdit?: boolean;
  setOpen: (val: boolean) => void;
};

type ContentProps = {
  initalValues: Record<string, unknown>;
};

export const AddTemplate: React.FC<DrawerProps> = (props) => {
  const { open, setOpen, isEdit } = props;

  return (
    <Drawer size="large" open={open} onOpenChange={(val) => setOpen(val)}>
      {({ Header, Footer }) => (
        <>
          <Header title={`${isEdit ? "Edit" : "Add"} Template`} />
          <Content initalValues={{}} />
          <Footer>
            <FooterComponent onCancel={() => setOpen(false)} />
          </Footer>
        </>
      )}
    </Drawer>
  );
};

const Content: React.FC<ContentProps> = (props) => {
  const handleSubmit = (values: any) => {};

  return (
    <Formik initialValues={props.initalValues} onSubmit={handleSubmit}>
      {() => (
        <div className="grid grid-rows-[1fr_2fr]">
          <div className="p-4 gap-4 grid grid-cols-2 justify-items-end">
            <Input
              name="template-name"
              placeholder="eg:  Hand Injury template"
              label="Template Name:"
              variant="filled"
            />
            <Input
              name="radiologist"
              placeholder="Add your initials..."
              label="Radiologist / Author:"
              variant="filled"
            />
            <Input
              name="modaility"
              placeholder="eg: CT Scan"
              label="Modaility:"
              variant="filled"
            />
            <Input
              name="exam"
              placeholder="eg:  EXM2020"
              label="Exam Name:"
              variant="filled"
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
            />
            <div></div>
          </div>
          <div className="p-4 h-full flex justify-stretch w-full flex-col">
            <RichTextEditor height="40vh" />
          </div>
        </div>
      )}
    </Formik>
  );
};
