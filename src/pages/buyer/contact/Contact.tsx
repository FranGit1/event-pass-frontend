import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { errorMessageStrings } from "../../../utils";
import { yupResolver } from "@hookform/resolvers/yup";
import tw from "twin.macro";
import { Typography } from "../../../ui/Typography";
import { Form } from "../../../fields/form";
import { Button } from "../../../ui/buttons/Button";
import { PageContainer } from "../../../components/layout/PageContainer";
import { useTranslation } from "react-i18next";
import { IoChevronBack } from "react-icons/io5";
import { useNavigation } from "../../../hooks/use-navigation";
import { useParams } from "react-router-dom";
import { useMedia } from "react-use";
import { useState } from "react";

export const Contact = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const { slug } = useParams();
  const [isSent, setIsSent] = useState<boolean>(false);
  const isMobile = useMedia("(max-width: 1200px)");
  const schema = yup.object().shape({
    firstName: yup.string().required(t(errorMessageStrings.firstNameRequired)),
    lastName: yup.string().required(t(errorMessageStrings.lastNameRequired)),
    email: yup
      .string()
      .required(t(errorMessageStrings.emailRequired))
      .email(t(errorMessageStrings.emailBadFormat)),
    message: yup.string().required(t(errorMessageStrings.messageRequired)),
  });

  type IForm = yup.InferType<typeof schema>;

  const methods = useForm<IForm>({
    defaultValues: {},
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = methods.handleSubmit(async (values) => {
    console.log(values);
  });

  return (
    <PageContainer containerCss={[tw` pt-12 md:pt-4`]}>
      {!isSent ? (
        <div>
          <Button.Text
            containerCss={[tw` self-start justify-start p-0 hidden md:flex`]}
            lead={IoChevronBack}
            onClick={() => {
              navigate(-1);
            }}
          >
            {t("back")}
          </Button.Text>
          <FormProvider {...methods}>
            <form
              css={[
                tw`flex flex-col justify-center items-center h-full px-4 md:(px-20 pb-24) xl:px-30 2xl:(px-[30rem]) lg:px-40 sm:px-20`,
              ]}
            >
              {isMobile ? (
                <Typography.H2
                  containerCss={[tw`mb-12 2xl:mt-24 w-full text-center `]}
                >
                  {t("contact")}
                </Typography.H2>
              ) : (
                <Typography.H1
                  containerCss={[tw`mb-12 2xl:mt-24 w-full text-center `]}
                >
                  {t("contact")}
                </Typography.H1>
              )}
              <div tw="w-full flex flex-col">
                <Form.TextInput.Rounded
                  name="firstName"
                  label={t("name")}
                  placeholder={t("namePlaceholder")}
                  required={true}
                  type="text"
                />
                <Form.TextInput.Rounded
                  name="lastName"
                  label={t("surname")}
                  placeholder={t("surnamePlaceholder")}
                  required={true}
                  type="text"
                />
              </div>
              <div tw="w-full">
                <Form.TextInput.Rounded
                  name="email"
                  label={t("email")}
                  placeholder={t("emailPlaceholder")}
                  type="email"
                  required={true}
                />
                <Form.TextArea.Outlined
                  name="message"
                  label={t("notesInput")}
                  placeholder={t("notesInputPlaceholder")}
                  required={true}
                  containerCss={[tw`mb-1`]}
                />
              </div>
              <Typography.Notice
                containerCss={[tw`mb-4 hidden md:block text-center px-12`]}
              >
                {t("protectedByRecaptcha")}
                <span css={[tw`text-primary cursor-pointer`]}>
                  {" "}
                  {t("privacyPolicy")}{" "}
                </span>{" "}
                {t("and")}{" "}
                <span css={[tw`text-primary cursor-pointer`]}>
                  {t("termsOfService")}
                </span>{" "}
                {t("apply")}.
              </Typography.Notice>
              <div
                css={[
                  tw`flex flex-col w-full gap-y-4  justify-center md:(flex-row gap-x-8) items-center `,
                ]}
              >
                <Button.Contained
                  containerCss={[tw`rounded-full w-full md:w-4 bg-cancel`]}
                  onClick={() => navigate(-1)}
                >
                  {t("cancel")}
                </Button.Contained>
                <Button.Contained
                  allowLoader
                  containerCss={[tw`rounded-full w-full md:w-4`]}
                  onClick={onSubmit}
                >
                  {t("send")}
                </Button.Contained>
              </div>
            </form>
          </FormProvider>
        </div>
      ) : (
        <div tw="">
          <Button.Text
            containerCss={[
              tw` self-start justify-start mb-20 ml-2 p-0 md:flex`,
            ]}
            lead={IoChevronBack}
            onClick={() => {
              navigate(-1);
            }}
          >
            {t("back")}
          </Button.Text>
          <div tw="flex items-center justify-center mt-20">
            <Typography.H3>{t("contactUsMailSent")}</Typography.H3>
          </div>
        </div>
      )}
    </PageContainer>
  );
};
