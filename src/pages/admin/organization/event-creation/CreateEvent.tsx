import { useTranslation } from "react-i18next";
import { Typography } from "../../../../ui/Typography";
import { useNavigation } from "../../../../hooks/use-navigation";
import * as yup from "yup";
import { CreateEventSchema } from "../../../../form/create-event/create-event-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Topics } from "../../../../api-types";
import { Form } from "../../../../fields/form";
import tw from "twin.macro";
import { GeoapifyGeocoderAutocomplete } from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { useState } from "react";
import { Button } from "../../../../ui/buttons/Button";
import { addAsterisk, transformEvent } from "../../../../utils";
import { useMutation } from "@tanstack/react-query";
import { http } from "../../../../http";
import { CreateEventDto } from "../../../../types";
import { useParams } from "react-router-dom";

export const CreateEventData = () => {
  const data = {};
  return <CreateEventForm data={data} />;
};

interface ICreateEventFormProps {
  data: any;
}

export const CreateEventForm = (props: ICreateEventFormProps) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const { organizationId } = useParams();
  const createNewEventMutation = useMutation({
    mutationFn: (eventData: CreateEventDto) =>
      http.createNewEvent(eventData, Number(organizationId)),
    onSuccess: () => {},
  });

  type CreateEventFormInferred = yup.InferType<typeof CreateEventSchema>;

  const createEventDataForm = useForm<CreateEventFormInferred>({
    resolver: yupResolver(CreateEventSchema),
    defaultValues: {
      eventData: {
        ...props.data,
      },
    },
  });

  const onSubmit = createEventDataForm.handleSubmit(async (values) => {
    console.log(values);

    const eventData = transformEvent(values.eventData);
    createNewEventMutation.mutateAsync(eventData);
  });

  const onPlaceSelect = (value: any) => {
    const locationObj = {
      city: value.properties.city,
      country: value.properties.country,
      name: value.properties.address_line1,
      latitude: value.properties.lat,
      longitude: value.properties.lon,
    };
    createEventDataForm.setValue("eventData.location", locationObj);
  };

  return (
    <div tw="px-12 py-4 mb-20">
      <FormProvider {...createEventDataForm}>
        <Typography.H3>{t("Create new event")}</Typography.H3>
        <Button.Contained
          onClick={() => {
            console.log(createEventDataForm.formState.errors);

            onSubmit();
          }}
        >
          Create Event
        </Button.Contained>
        <div tw="flex flex-col gap-y-6 mt-8">
          <Form.TextInput.Rounded
            name="eventData.title"
            label="Event title"
            required={true}
            placeholder="Enter event title"
            containerCss={[tw`w-1/3`]}
          />
          <Form.RichTextEditor
            name="eventData.description"
            placeholder="Enter event description"
            containerCss={[tw`w-2/3`]}
          />
          <Form.TextInput.Rounded
            name="eventData.price"
            label="Ticket price"
            required={true}
            placeholder="Enter a price of the ticket"
            containerCss={[tw`w-1/3`]}
          />
          <Form.DatePicker
            name="eventData.startDate"
            label="Start date"
            required={true}
            placeholder="Choose event start date"
            containerCss={[tw`w-1/3`]}
          />
          <Form.DatePicker
            name="eventData.endDate"
            label="End date"
            required={true}
            placeholder="Choose event end date"
            containerCss={[tw`w-1/3`]}
          />
          <Form.TextInput.Rounded
            name="eventData.keywords"
            label="Event keywords"
            required={true}
            placeholder="Enter keywords for event"
            containerCss={[tw`w-1/3`]}
          />
          <Form.TextInput.Rounded
            name="eventData.featuredImage"
            label="Featured image"
            required={true}
            placeholder="Enter a link for featured image"
            containerCss={[tw`w-1/3`]}
          />
          <Form.Checkbox
            name={"eventData.displayInSlider"}
            label="Display event in slider"
          />
          <Form.TextInput.Rounded
            name="eventData.sliderPosition"
            label="Slider position"
            required={true}
            placeholder="Enter a position of event in slider"
            containerCss={[tw`w-1/3`]}
          />
          <Form.Select
            name="eventData.topic"
            label="Topic of event"
            options={Object.values(Topics).map((value: any) => ({
              label: value.name,
              value: value.id,
            }))}
            required={true}
            containerCss={[tw`w-1/3`]}
          />{" "}
          <div tw="w-1/3">
            <Typography.Body containerCss={[tw`text-primary mb-2`]}>
              {addAsterisk(
                "Location",
                true,
                !!createEventDataForm.getFieldState("eventData.location").error
              )}
            </Typography.Body>
            <GeoapifyGeocoderAutocomplete
              placeholder="Enter address here"
              lang={"en"}
              value={createEventDataForm.getValues("eventData.location")?.name}
              placeSelect={onPlaceSelect}
            />
          </div>
        </div>
      </FormProvider>
    </div>
  );
};
