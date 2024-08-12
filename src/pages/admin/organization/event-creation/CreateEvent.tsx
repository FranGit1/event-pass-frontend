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
import { Button } from "../../../../ui/buttons/Button";
import {
  addAsterisk,
  formatFetchedEventData,
  transformEvent,
} from "../../../../utils";
import { useMutation } from "@tanstack/react-query";
import { http } from "../../../../http";
import { CreateEventDto, FetchedEventData } from "../../../../types";
import { useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { routes } from "../../../../navigation/admin/routing";
import { useRecoilValue } from "recoil";
import { adminSelectedEventIdAtom } from "../../../../recoil/atoms/adminSelectedEventIdAtom";
import { useGetEventByEventId } from "../../../../queries";
import { toast } from "../../../../ui/indicators/Toast";

export const CreateEventData = () => {
  const eventIdValue = useRecoilValue(adminSelectedEventIdAtom);

  const { data, isFetched } = useGetEventByEventId(eventIdValue || 0);
  return (
    isFetched && <CreateEventForm data={data} eventIdValue={eventIdValue} />
  );
};

interface ICreateEventFormProps {
  data: FetchedEventData | undefined;
  eventIdValue: number | undefined;
}

export const CreateEventForm = (props: ICreateEventFormProps) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const { organizationId } = useParams();
  const formatedData = props.data ? formatFetchedEventData(props.data) : [];
  const createNewEventMutation = useMutation({
    mutationFn: (eventData: CreateEventDto) =>
      http.createNewEvent(eventData, Number(organizationId)),
    onSuccess: () => {
      toast.success("Successfully created event");
      navigate(routes.base);
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: (data: { eventData: CreateEventDto; eventId: number }) =>
      http.updateEvent(data.eventData, data.eventId),
    onSuccess: () => {
      toast.success(t("eventUpdatedSuccess"));
    },
  });
  const deleteEventMutation = useMutation({
    mutationFn: (eventId: number) => http.deleteEvent(eventId),
    onSuccess: () => {
      toast.success(t("eventDeletedSuccess"));
      navigate(routes.base);
    },
  });

  type CreateEventFormInferred = yup.InferType<typeof CreateEventSchema>;

  const createEventDataForm = useForm<CreateEventFormInferred>({
    resolver: yupResolver(CreateEventSchema),
    defaultValues: {
      //@ts-ignore
      eventData: {
        ...formatedData,
      },
    },
  });

  const onSubmit = createEventDataForm.handleSubmit(async (values) => {
    const eventData = transformEvent(values.eventData);

    if (props.eventIdValue && values.eventData.id) {
      updateEventMutation.mutateAsync({
        eventData,
        eventId: values.eventData.id,
      });
    } else {
      createNewEventMutation.mutateAsync(eventData);
    }
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
    <div tw="px-12 py-4 mb-20 flex flex-col">
      <FormProvider {...createEventDataForm}>
        <Typography.H3>{t("Create new event")}</Typography.H3>
        <div tw="w-full flex flex-row justify-between items-center my-10">
          <Button.Text
            containerCss={[tw` self-start min-w-0 pl-0 md:flex`]}
            lead={IoChevronBack}
            onClick={() => {
              navigate(-1);
            }}
          >
            {t("back")}
          </Button.Text>
          <div tw="self-end flex flex-row gap-x-4">
            <Button.Contained
              containerCss={[tw``]}
              onClick={() => {
                onSubmit();
              }}
            >
              {props.eventIdValue ? `Update Event` : `Create Event`}
            </Button.Contained>

            {props.eventIdValue && (
              <Button.Contained
                containerCss={[tw`bg-error`]}
                onClick={() => {
                  if (props.eventIdValue)
                    deleteEventMutation.mutateAsync(props.eventIdValue);
                }}
              >
                {t("deleteEvent")}
              </Button.Contained>
            )}
          </div>
        </div>
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
          <Form.Files
            name="eventData.featuredImage"
            label={t("projectFiles")}
            multiple={false}
            uploadMessage={t("acceptedFiles1")}
            uploadMessageSub={t("acceptedFilesSub1")}
            helperText={t("thumbDesc")}
            containerCss={[tw`w-1/3`]}
            imageUrl={props.data?.featuredImage}
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
