import * as yup from "yup";
import { errorMessageStrings } from "../../utils";
import { Maybe } from "../../types";
import { parseRTEValue } from "../../fields/controlled/RichTextEditor";

const createEventSchemaObject = yup.object().shape({
  eventData: yup.object().shape({
    id: yup.number().nullable(),
    title: yup.string().required(),
    description: yup
      .string()
      .nullable()
      .test(
        "rteRequired",
        errorMessageStrings.messageRequired,
        (value: Maybe<string>, context) => {
          const { createError } = context;
          const rteValue = parseRTEValue(value);
          return (
            rteValue.length !== 0 ||
            createError({ message: errorMessageStrings.messageRequired })
          );
        }
      ),
    price: yup.string().required(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
    keywords: yup.string().required(),
    featuredImage: yup.array(yup.mixed().required()).min(1).max(1),
    displayInSlider: yup.boolean().required(),
    sliderPosition: yup.number().required(),
    location: yup.object().shape({
      id: yup.number().nullable(),
      city: yup.string().required(),
      country: yup.string().required(),
      name: yup.string().required(),
      latitude: yup.number().required(),
      longitude: yup.number().required(),
    }),
    topic: yup.object().shape({
      label: yup.string(),
      value: yup.number(),
    }),
  }),
});

export const CreateEventSchema = createEventSchemaObject.pick(["eventData"]);
