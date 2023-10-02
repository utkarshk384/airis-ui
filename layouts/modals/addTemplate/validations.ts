import * as Yup from "yup";

export const validationSchema = Yup.object({
  templateName: Yup.string().required().label("Template Name"),
  radiologist: Yup.string().required().label("Radiologist"),
  modality: Yup.string().required().label("Modality"),
  exam: Yup.string().nullable().label("Exam Name"),
  bodyPart: Yup.string().nullable().label("Body Part"),
  tags: Yup.string().nullable().label("Tags"),
  visibilty: Yup.string()
    .matches(/(public|private)/, "Invalid visibilty")
    .required()
    .label("Visibilty"),
  text: Yup.string().label("Template"),
});
