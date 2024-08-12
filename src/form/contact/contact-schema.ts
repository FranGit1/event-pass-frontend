import * as yup from "yup";
import { errorMessageStrings } from "../../utils";
import { Maybe } from "../../types";
import { parseRTEValue } from "../../fields/controlled/RichTextEditor";

const contactSchemaObject = yup.object().shape({
  firstName: yup.string().required(t(errorMessageStrings.firstNameRequired)),
  lastName: yup.string().required(t(errorMessageStrings.lastNameRequired)),
  email: yup
    .string()
    .required(t(errorMessageStrings.emailRequired))
    .email(t(errorMessageStrings.emailBadFormat)),
  message: yup.string().required(t(errorMessageStrings.messageRequired)),
});

export const CreateEventSchema = createEventSchemaObject.pick(["eventData"]);
